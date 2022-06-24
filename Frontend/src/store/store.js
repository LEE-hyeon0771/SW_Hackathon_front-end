import create from 'zustand'

const useStore = create((set) => ({
  storeList: [],
  currentStore: null,
  setStoreList: (value) => set(() => ({ storeList: value })),
  setCurrentStore: (value) => set(() => ({ currentStore: value })),
}))

export default useStore;