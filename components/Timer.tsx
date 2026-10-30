const RADIUS = 46;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const PROGRESS = 0.72;

export default function Timer() {
  return (
    <div className="mt-timer-sm flex size-timer-outer-sm items-center justify-center rounded-full bg-linear-315 from-navy-700 to-navy-950 shadow-timer-sm md:mt-timer-md md:size-timer-outer-md md:shadow-timer-md lg:mt-timer-lg">
      <div className="relative flex size-[89.33%] items-center justify-center rounded-full bg-navy-900">
        <svg
          className="absolute size-[92.5%] -rotate-90"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            className="stroke-primary"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - PROGRESS)}
          />
        </svg>

        <div className="relative flex flex-col items-center">
          <span className="text-timer-sm font-bold leading-none md:text-timer-lg">
            17:59
          </span>
          <button
            type="button"
            className="cursor-pointer mt-5 pl-label-sm text-label-sm font-bold uppercase tracking-label-sm transition-colors hover:text-primary md:pl-label-lg md:text-label-lg md:tracking-label-lg"
          >
            Pause
          </button>
        </div>
      </div>
    </div>
  );
}
