// src/store.ts
import { create } from 'zustand';

interface AppState {
  locale: 'en' | 'pt' | 'es'; // Adicione o novo idioma aqui
  setLocale: (locale: 'en' | 'pt' | 'es') => void;
}

const useStore = create<AppState>((set) => ({
  locale: 'en', // Idioma padrão
  setLocale: (locale) => set({ locale }),
}));

export default useStore;