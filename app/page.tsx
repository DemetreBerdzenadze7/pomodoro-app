"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import ModeTabs from "@/components/ModeTabs";
import Settings from "@/components/Settings";
import Timer from "@/components/Timer";
import SettingsIcon from "@/components/SettingsIcon";
import useSettingsStore from "@/store/settingStore";
import { useShallow } from "zustand/shallow";

export default function Home() {
  const { isOpen, font, color, time } = useSettingsStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      time: state.settings.times.find((t) => t.id === state.selectedTimeId),
      font: state.settings.fonts.find((f) => f.id === state.selectedFontId),
      color: state.settings.colors.find((c) => c.id === state.selectedColorId),
    })),
  );
  return (
    <main
      style={{ "--color-accent": color?.value } as CSSProperties}
      className={`${font?.className} flex flex-1 flex-col items-center px-6 pb-12 md:pb-24 lg:pb-12`}
    >
      <h1 className="mt-logo-sm md:mt-logo-md lg:mt-logo-lg">
        <Image
          src="/images/logo.svg"
          alt="pomodoro"
          width={153}
          height={32}
          className="h-6 w-auto md:h-8"
          priority
        />
      </h1>

      <ModeTabs />

      <Timer key={`${time?.id}-${time?.value}`} />

      <SettingsIcon />

      {isOpen && <Settings />}
    </main>
  );
}
