"use client";

import useSettingsStore from "@/store/settingStore";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import {
  alertTimeUp,
  requestNotificationPermission,
} from "@/utils/timeUpAlert";

const STROKE_WIDTH = 3.2;
const RADIUS = 50 - STROKE_WIDTH / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function Timer() {
  const { time } = useSettingsStore(
    useShallow((state) => ({
      time: state.settings.times.find(
        (item) => item.id === state.selectedTimeId,
      ),
    })),
  );

  const initialSeconds = (time?.value ?? 0) * 60;
  const [totalSeconds, setTotalSeconds] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const progress = initialSeconds ? 1 - totalSeconds / initialSeconds : 0;
  const isFinished = initialSeconds > 0 && totalSeconds === 0;
  const label = time?.label ?? "pomodoro";

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      const next = totalSeconds - 1;
      setTotalSeconds(next);
      if (next <= 0) {
        setIsRunning(false);
        alertTimeUp(label);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [totalSeconds, isRunning, initialSeconds, label]);

  useEffect(() => {
    const originalTitle = document.title;
    if (isFinished) document.title = `⏰ Time's up! – ${label}`;
    else if (isRunning) document.title = `${formatted} – ${label}`;
    return () => {
      document.title = originalTitle;
    };
  }, [isFinished, isRunning, formatted, label]);

  return (
    <div className="mt-timer-sm flex size-timer-outer-sm items-center justify-center rounded-full bg-linear-315 from-navy-700 to-navy-950 shadow-timer-sm md:mt-timer-md md:size-timer-outer-md md:shadow-timer-md lg:mt-timer-lg">
      <div className="relative flex size-[89.33%] items-center justify-center rounded-full bg-navy-900">
        <svg
          className={`absolute size-timer-ring-sm -rotate-90 md:size-timer-ring-md ${isFinished ? "animate-pulse" : ""}`}
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          {progress > 0 && (
            <circle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              className="stroke-accent"
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
            />
          )}
        </svg>

        <div className="relative flex flex-col items-center">
          <span
            className={`text-timer-sm font-bold leading-none md:text-timer-lg ${isFinished ? "text-accent" : ""}`}
          >
            {formatted}
          </span>
          <span role="status" className="sr-only">
            {isFinished ? `Time's up! Your ${label} is over.` : ""}
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
              onClick={() => {
                if (!totalSeconds) setTotalSeconds(initialSeconds);
                requestNotificationPermission();
                setIsRunning(true);
              }}
            >
              {isFinished ? "Restart" : "Start"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
