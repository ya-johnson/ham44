import create from 'zustand'
import { persist } from 'zustand/middleware'

let store = (set) => ({
  ham: null,
  setHam: (ham) => set(() => ({ ham: ham})),
  ready: false,
  setReady: (ready) => set(() => ({ ready: ready}))
})

store = persist(store, { name: 'ham' })

const useStore = create(store)

export default useStore