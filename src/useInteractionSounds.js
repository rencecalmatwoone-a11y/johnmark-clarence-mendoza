import { createContext, useContext } from 'react'

export const SoundContext = createContext(null)

export function useInteractionSounds() {
  return useContext(SoundContext)
}
