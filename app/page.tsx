import Image from "next/image";
import ModeTabs from "@/components/ModeTabs";
import Timer from "@/components/Timer";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center px-6 pb-12 md:pb-24 lg:pb-12">
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

      <Timer />

      <button
        type="button"
        aria-label="Settings"
        className="mt-settings-sm opacity-50 transition-opacity hover:opacity-100 md:mt-settings-md lg:mt-settings-lg"
      >
        <Image src="/images/icon-settings.svg" alt="" width={28} height={28} />
      </button>
    </main>
  );
}
