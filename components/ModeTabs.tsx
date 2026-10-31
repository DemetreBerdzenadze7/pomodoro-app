"use client";

import useSettingsStore from "@/store/settingStore";
import { useShallow } from "zustand/shallow";

export default function ModeTabs() {
  const { times, selectedTimeId, selectTime } = useSettingsStore(
    useShallow((state) => ({
      times: state.settings.times,
      selectedTimeId: state.selectedTimeId,
      selectTime: state.selectTime,
    })),
  );

  return (
    <nav className="mt-tabs-sm flex w-tabs-w-sm items-center justify-between rounded-full bg-navy-900 p-2 md:mt-tabs-md md:w-tabs-w-md">
      {times.map((mode) => (
        <button
          key={mode.id}
          type="button"
          aria-pressed={mode.id === selectedTimeId}
          onClick={() => selectTime(mode.id)}
          className={`cursor-pointer h-12 w-tab-w-sm rounded-full text-tab-sm font-bold md:w-tab-w-md md:text-tab-lg ${
            mode.id === selectedTimeId
              ? "bg-accent text-navy-800"
              : "text-light-muted transition-colors hover:text-light"
          }`}
        >
          {mode.label}
        </button>
      ))}
    </nav>
  );
}
