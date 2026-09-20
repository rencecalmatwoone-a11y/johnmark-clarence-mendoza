// Short, locally synthesized sounds; no downloads or audio on page load.
export function createInteractionAudio() {
  let context
  let output
  let noise
  let enabled = true
  let lastPlayed = -Infinity

  function unlock() {
    if (!enabled) return
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!AudioContext) return
      if (!context) {
        context = new AudioContext()
        output = context.createGain()
        output.gain.value = 0.65
        output.connect(context.destination)
      }
      if (context.state === 'suspended') void context.resume().catch(() => {})
    } catch {
      // Sound is optional when the browser or device cannot provide audio.
    }
  }

  function play(kind, value = 0, position = 0) {
    if (!enabled || !context || context.state !== 'running' || document.hidden) return
    const time = context.currentTime
    if (kind === 'message') {
      // A locally synthesized, iMessage-style ascending bell chime.
      // Message arrivals are independent of the hover/swipe rate limit.
      const notes = [1567.98, 2093, 2637.02]
      const activeGains = []
      notes.forEach((frequency, index) => {
        const start = time + index * 0.085
        const end = start + 0.32
        const gain = context.createGain()
        activeGains.push(gain)
        gain.gain.setValueAtTime(0, start)
        gain.gain.linearRampToValueAtTime(0.055, start + 0.005)
        gain.gain.exponentialRampToValueAtTime(0.0001, end)
        gain.gain.setValueAtTime(0, end + 0.01)
        gain.connect(output)

        const source = context.createOscillator()
        source.type = 'sine'
        source.frequency.setValueAtTime(frequency, start)
        source.connect(gain)
        source.onended = () => {
          source.disconnect()
          gain.disconnect()
        }
        source.start(start)
        source.stop(end + 0.02)
      })
      // Let the card silence a chime immediately when it leaves the viewport.
      return () => activeGains.forEach((gain) => gain.disconnect())
    }
    if (time - lastPlayed < (kind === 'swipe' ? 0.12 : 0.055)) return
    lastPlayed = time

    const swipe = kind === 'swipe'
    const duration = swipe ? 0.24 : 0.13
    const gain = context.createGain()
    const pan = context.createStereoPanner?.()
    gain.gain.setValueAtTime(0, time)
    gain.gain.linearRampToValueAtTime(swipe ? 0.075 : 0.035, time + (swipe ? 0.04 : 0.006))
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration)
    gain.gain.setValueAtTime(0, time + duration + 0.01)
    gain.connect(pan || output)
    if (pan) {
      pan.connect(output)
      pan.pan.setValueAtTime(swipe ? Math.sign(value) * 0.65 : position * 0.55, time)
      if (swipe) pan.pan.linearRampToValueAtTime(-Math.sign(value) * 0.65, time + duration)
    }

    let source
    let filter
    if (swipe) {
      if (!noise) {
        noise = context.createBuffer(1, Math.ceil(context.sampleRate * 0.3), context.sampleRate)
        const samples = noise.getChannelData(0)
        for (let i = 0; i < samples.length; i += 1) samples[i] = Math.random() * 2 - 1
      }
      source = context.createBufferSource()
      source.buffer = noise
      filter = context.createBiquadFilter()
      filter.type = 'bandpass'
      filter.Q.value = 0.7
      filter.frequency.setValueAtTime(1800, time)
      filter.frequency.exponentialRampToValueAtTime(450, time + duration)
      source.connect(filter)
      filter.connect(gain)
    } else {
      source = context.createOscillator()
      source.type = 'sine'
      const frequency = [330, 392, 440, 523.25, 659.25][Math.max(0, Math.min(4, value))]
      source.frequency.setValueAtTime(frequency, time)
      source.frequency.exponentialRampToValueAtTime(frequency * 0.92, time + duration)
      source.connect(gain)
    }
    source.onended = () => {
      source.disconnect()
      filter?.disconnect()
      gain.disconnect()
      pan?.disconnect()
    }
    source.start(time)
    source.stop(time + duration + 0.02)
    return () => gain.disconnect()
  }

  return {
    unlock,
    play,
    setEnabled(next) {
      enabled = next
      if (output) output.gain.setTargetAtTime(next ? 0.65 : 0, context.currentTime, 0.01)
    },
    silence() {
      if (output) output.gain.setValueAtTime(0, context.currentTime)
    },
    restore() {
      if (output) output.gain.setValueAtTime(enabled ? 0.65 : 0, context.currentTime)
    },
    dispose() {
      if (context && context.state !== 'closed') void context.close().catch(() => {})
      context = undefined
      output = undefined
      noise = undefined
    },
  }
}
