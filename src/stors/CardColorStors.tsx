import { create } from 'zustand';

interface StoreState {
    cardColor: string;
    setCardColor: (newColor: string) => void;
}

const useStore = create<StoreState>((set) => ({
    cardColor: '',
    setCardColor: (newColor) => set(() => ({ cardColor: newColor })),
}));

export default useStore;