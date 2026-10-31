import { Times, Font, Color, SettingsFormValues } from "@/types/settingTypes";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface Settings {
  times: Times;
  fonts: Font;
  colors: Color;
}

type SettingsStore = {
  // open settings
  isOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;

  //set settings
  settings: Settings;
  selectedFontId: number;
  selectedColorId: number;
  selectedTimeId: number;
  selectTime: (id: number) => void;
  applySettings: (values: SettingsFormValues) => void;
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
        {
          id: 1,
          name: "red",
          className: "bg-primary",
          value: "var(--color-primary)",
        },
        {
          id: 2,
          name: "cyan",
          className: "bg-cyan",
          value: "var(--color-cyan)",
        },
        {
          id: 3,
          name: "purple",
          className: "bg-purple",
          value: "var(--color-purple)",
        },
      ],
    },
    selectedFontId: 1,
    selectedColorId: 1,
    selectedTimeId: 1,
    selectTime: (id) => set({ selectedTimeId: id }),

    // apply settings from the form
    applySettings: ({ times, fontId, colorId }) =>
      set((state) => {
        state.settings.times.forEach((time, i) => {
          time.value = times[i];
        });
        state.selectedFontId = fontId;
        state.selectedColorId = colorId;
      }),
  })),
);

export default useSettingsStore;
