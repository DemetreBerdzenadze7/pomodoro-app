const modes = ["pomodoro", "short break", "long break"];

export default function ModeTabs() {
  return (
    <nav className="mt-tabs-sm flex w-tabs-w-sm items-center justify-between rounded-full bg-navy-900 p-2 md:mt-tabs-md md:w-tabs-w-md">
      {modes.map((mode, i) => (
        <button
          key={mode}
          type="button"
          className={`cursor-pointer h-12 w-tab-w-sm rounded-full text-tab-sm font-bold md:w-tab-w-md md:text-tab-lg ${
            i === 0
              ? "bg-accent text-navy-800"
              : "text-light-muted transition-colors hover:text-light"
          }`}
        >
          {mode}
        </button>
      ))}
    </nav>
  );
}
