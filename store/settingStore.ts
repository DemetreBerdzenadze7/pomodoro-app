import { Times, Font } from "@/types/settingTypes";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface Settings {
  times: Times;
  fonts: Font;
  colors: Font;
}

type SettingsStore = {
  // open settings
  isOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;

  //set settings
  settings: Settings;
  incrementTime: (id: number) => void;
  decrementTime: (id: number) => void;
};

const useSettingsStore = create<SettingsStore>()(
  immer((set) => ({
    // open settings
    isOpen: false,
    openSettings: () => set({ isOpen: true }),
    closeSettings: () => set({ isOpen: false }),

    // set settings
    settings: {
      times: [
        { id: 1, label: "pomodoro", value: 25 },
        { id: 2, label: "short break", value: 5 },
        { id: 3, label: "long break", value: 15 },
      ],
      fonts: [
        { id: 1, name: "Kumbh Sans", className: "font-sans" },
        { id: 2, name: "Roboto Slab", className: "font-slab" },
        { id: 3, name: "Space Mono", className: "font-mono" },
      ],
      colors: [
        { id: 1, name: "red", className: "bg-primary" },
        { id: 2, name: "cyan", className: "bg-cyan" },
        { id: 3, name: "purple", className: "bg-purple" },
      ],
    },
    incrementTime: (id) =>
      set((state) => {
        const time = state.settings.times.find((t) => t.id === id);
        if (time) time.value = Math.min(60, (time.value += 5));
      }),
    decrementTime: (id) =>
      set((state) => {
        const time = state.settings.times.find((t) => t.id === id);
        if (time) time.value = Math.max(0, (time.value -= 5));
      }),
  })),
);

export default useSettingsStore;
