"use client";

import useSettingsStore from "@/store/settingStore";
import Image from "next/image";
import { useShallow } from "zustand/shallow";

const SettingsIcon = () => {
  const { openSettings } = useSettingsStore(
    useShallow((state) => ({ openSettings: state.openSettings })),
  );
  return (
    <>
      <button
        type="button"
        aria-label="Settings"
        className="cursor-pointer mt-settings-sm opacity-50 transition-opacity hover:opacity-100 md:mt-settings-md lg:mt-settings-lg"
        onClick={openSettings}
      >
        <Image src="/images/icon-settings.svg" alt="" width={28} height={28} />
      </button>
    </>
  );
};

export default SettingsIcon;
