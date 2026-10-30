"use client";
import useSettingsStore from "@/store/settingStore";
import { useShallow } from "zustand/shallow";

const times = [
  { label: "pomodoro", value: 25 },
  { label: "short break", value: 5 },
  { label: "long break", value: 15 },
];

const fonts = [
  { name: "Kumbh Sans", className: "font-sans" },
  { name: "Roboto Slab", className: "font-slab" },
  { name: "Space Mono", className: "font-mono" },
];

const colors = [
  { name: "red", className: "bg-primary" },
  { name: "cyan", className: "bg-cyan" },
  { name: "purple", className: "bg-purple" },
];

const headingClasses =
  "text-center text-modal-heading-sm font-bold uppercase tracking-modal-heading-sm text-navy-900 md:text-left md:text-modal-heading-lg md:tracking-modal-heading-lg";

const arrowClasses =
  "flex cursor-pointer text-navy-800/25 transition-colors hover:text-navy-800";

const optionHoverClasses =
  "outline outline-1 outline-offset-4 outline-transparent transition-[outline-color] hover:outline-input";

export default function Settings() {
  const { closeSettings } = useSettingsStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      closeSettings: state.closeSettings,
    })),
  );

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-overlay px-6">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        className="relative w-modal-sm rounded-modal-sm bg-white pb-14 text-navy-800 md:w-modal-md md:rounded-modal-md md:pb-14"
      >
        <header className="flex items-center justify-between border-b border-divider p-modal-pad-sm md:px-modal-pad-md md:py-8">
          <h2
            id="settings-title"
            className="text-modal-title-sm font-bold md:text-modal-title-lg"
          >
            Settings
          </h2>
          <button
            type="button"
            aria-label="Close settings"
            className="cursor-pointer text-navy-800/50 transition-colors hover:text-navy-800"
            onClick={closeSettings}
          >
            <svg width="14" height="14" aria-hidden="true">
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11.95.636l1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95z"
              />
            </svg>
          </button>
        </header>

        <div className="px-modal-pad-sm md:px-modal-pad-md">
          <fieldset className="border-b border-divider py-6 md:pb-6">
            <legend className={`${headingClasses} float-left w-full`}>
              Time (minutes)
            </legend>
            <div className="clear-both flex flex-col gap-2 pt-4 md:flex-row md:gap-5 md:pt-6">
              {times.map(({ label, value }) => (
                <label
                  key={label}
                  className="flex items-center justify-between md:flex-col md:items-start md:gap-2"
                >
                  <span className="text-modal-label font-bold text-navy-800/40">
                    {label}
                  </span>
                  <span className="relative flex h-time-input-h-sm w-time-input items-center rounded-input bg-input md:h-time-input-h-md">
                    <input
                      type="number"
                      min={1}
                      defaultValue={value}
                      className="size-full rounded-input bg-transparent px-4 text-modal-input font-bold tracking-modal-input text-navy-800 outline-none"
                    />
                    <span className="absolute right-4 flex flex-col gap-2">
                      <button
                        type="button"
                        aria-label={`Increase ${label}`}
                        className={arrowClasses}
                      >
                        <svg width="14" height="7" aria-hidden="true">
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            d="M1 6l6-4 6 4"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        aria-label={`Decrease ${label}`}
                        className={arrowClasses}
                      >
                        <svg width="14" height="7" aria-hidden="true">
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            d="M1 1l6 4 6-4"
                          />
                        </svg>
                      </button>
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-col items-center gap-4 border-b border-divider py-6 md:flex-row md:justify-between">
            <h3 className={headingClasses}>Font</h3>
            <div className="flex gap-4">
              {fonts.map(({ name, className }, i) => (
                <button
                  key={name}
                  type="button"
                  aria-label={name}
                  aria-pressed={i === 0}
                  className={`cursor-pointer size-option rounded-full text-font-option ${optionHoverClasses} ${className} ${
                    i === 0
                      ? "bg-navy-900 font-bold text-white"
                      : "bg-input text-navy-800/70"
                  }`}
                >
                  Aa
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 pt-6 md:flex-row md:justify-between">
            <h3 className={headingClasses}>Color</h3>
            <div className="flex gap-4">
              {colors.map(({ name, className }, i) => (
                <button
                  key={name}
                  type="button"
                  aria-label={name}
                  aria-pressed={i === 0}
                  className={`cursor-pointer flex size-option items-center justify-center rounded-full ${optionHoverClasses} ${className}`}
                >
                  {i === 0 && (
                    <svg width="15" height="11" aria-hidden="true">
                      <path
                        fill="none"
                        stroke="#161932"
                        strokeWidth="2"
                        d="M1 5.5L4.95 9.45 13.4 1"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          className="cursor-pointer absolute bottom-0 left-1/2 h-apply-h w-apply-w -translate-x-1/2 translate-y-1/2 rounded-full bg-primary text-apply font-bold text-white transition-colors hover:bg-primary-hover"
        >
          Apply
        </button>
      </section>
    </div>
  );
}
