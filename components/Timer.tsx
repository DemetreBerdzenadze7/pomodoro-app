"use client";

import useSettingsStore from "@/store/settingStore";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

const STROKE_WIDTH = 3.2;
const RADIUS = 50 - STROKE_WIDTH / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const PROGRESS = 0.72;

export default function Timer() {
  const { settings } = useSettingsStore(
    useShallow((state) => ({ settings: state.settings })),
  );

  const time = settings.times.find((item) => item.label === "pomodoro");
  const [totalSeconds, setTotalSeconds] = useState<number>(
    (time?.value ?? 0) * 60,
  );
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  useEffect(() => {
    if (!isRunning) return;

    if (!totalSeconds) {
      setIsRunning(false);
      setTotalSeconds((time?.value ?? 0) * 60);
    }

    const timer = setInterval(() => {
      setTotalSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [totalSeconds, isRunning]);

  return (
    <div className="mt-timer-sm flex size-timer-outer-sm items-center justify-center rounded-full bg-linear-315 from-navy-700 to-navy-950 shadow-timer-sm md:mt-timer-md md:size-timer-outer-md md:shadow-timer-md lg:mt-timer-lg">
      <div className="relative flex size-[89.33%] items-center justify-center rounded-full bg-navy-900">
        <svg
          className="absolute size-timer-ring-sm -rotate-90 md:size-timer-ring-md"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            className="stroke-accent"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - PROGRESS)}
          />
        </svg>

        <div className="relative flex flex-col items-center">
          <span className="text-timer-sm font-bold leading-none md:text-timer-lg">
            {formatted}
          </span>
          {isRunning ? (
            <button
              type="button"
              className="cursor-pointer mt-5 pl-label-sm text-label-sm font-bold uppercase tracking-label-sm transition-colors hover:text-accent md:pl-label-lg md:text-label-lg md:tracking-label-lg"
              onClick={() => setIsRunning(false)}
            >
              Stop
            </button>
          ) : (
            <button
              type="button"
              className="cursor-pointer mt-5 pl-label-sm text-label-sm font-bold uppercase tracking-label-sm transition-colors hover:text-accent md:pl-label-lg md:text-label-lg md:tracking-label-lg"
              onClick={() => setIsRunning(true)}
            >
              Start
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
