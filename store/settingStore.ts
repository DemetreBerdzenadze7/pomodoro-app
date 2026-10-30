import { create } from "zustand";

type SettingsStore = {
  isOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
};

const useSettingsStore = create<SettingsStore>((set) => ({
  isOpen: false,
  openSettings: () => set({ isOpen: true }),
  closeSettings: () => set({ isOpen: false }),
}));

export default useSettingsStore;
