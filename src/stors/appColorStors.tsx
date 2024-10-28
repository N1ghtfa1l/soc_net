import { create } from 'zustand';

interface StoreState {
    appColor: string;
    setAppColor: (newColor: string) => void;
}

const useStore = create<StoreState>((set) => ({
    appColor: '',
    setAppColor: (newColor) => set(() => ({ appColor: newColor })),
}));

export default useStore;