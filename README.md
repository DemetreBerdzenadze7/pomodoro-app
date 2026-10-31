# Pomodoro

A Pomodoro timer built with Next.js, React and Tailwind CSS. It has three modes (pomodoro, short break and long break) and lets you change their durations, the font and the accent color. Settings and timer state are saved, so the timer keeps running after a page refresh.

## Features

- **Three timer modes**: pomodoro (25 min), short break (5 min) and long break (15 min) by default
- **Progress ring**: fills from 0% to a full circle as time runs out
- **Start / Stop / Restart** controls
- **Customizable settings**:
  - each mode's duration (1–60 minutes)
  - font: Kumbh Sans, Roboto Slab or Space Mono
  - accent color: red, cyan or purple
- **Survives refresh**: the timer stores its end time rather than a countdown, so it stays accurate after a reload, in a background tab or while the computer is asleep
- **Time's up alerts**:
  - a short beep, generated with the Web Audio API (no sound file)
  - a system notification, if you allow notifications
  - the browser tab title
  - an on-page highlight (pulsing ring, accent-colored time)
- **Responsive**: mobile-first layout with tablet and desktop breakpoints
- **Accessible**: semantic markup, ARIA attributes on the tabs and the dialog, and a screen-reader status message when time is up

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack, Cache Components) |
| UI | [React 19](https://react.dev), [Tailwind CSS 4](https://tailwindcss.com) |
| State | [Zustand 5](https://zustand.docs.pmnd.rs) with `immer` and `persist` middleware |
| Forms | [React Hook Form](https://react-hook-form.com) |
| Language | TypeScript |
| Tooling | ESLint |

## Getting started

### Requirements

- Node.js 20 or newer
- npm

### Installation

```bash
git clone <repository-url>
cd pomodoro-app
npm install
```

### Development

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm run start
```

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
pomodoro-app/
├── app/
│   ├── globals.css        # Tailwind import and @theme design tokens
│   ├── layout.tsx         # Root layout and font loading (next/font)
│   └── page.tsx           # Home page; applies the selected font and color
├── components/
│   ├── ModeTabs.tsx       # Pomodoro / short break / long break switcher
│   ├── Timer.tsx          # Countdown, progress ring and controls
│   ├── Settings.tsx       # Settings dialog (react-hook-form)
│   └── SettingsIcon.tsx   # Button that opens the settings dialog
├── store/
│   └── settingStore.ts    # Zustand store: settings, active mode, timer state
├── types/
│   └── settingTypes.ts    # Shared TypeScript types
├── utils/
│   └── timeUpAlert.ts     # Sound and notification helpers
└── public/images/         # Logo and icons
```

## How it works

### Timer state

The store keeps two values for the active timer:

| `endTime` | `pausedAt` | State |
| --- | --- | --- |
| `null` | `null` | Not started: shows the full duration |
| timestamp | `null` | Running: remaining time = `endTime - now` |
| `null` | seconds | Paused: shows `pausedAt`; `0` means time is up |

- **Start** sets `endTime = Date.now() + remaining * 1000`.
- **Stop** turns the remaining time into `pausedAt` and clears `endTime`.
- Switching modes, or changing the active mode's duration in Settings, resets the timer.

The interval only re-renders the component every 250 ms. It doesn't count down by itself, so a throttled interval in a background tab can't throw the time off.

### Persistence

The store uses Zustand's `persist` middleware and saves to `localStorage` under the key `pomodoro-settings`. It saves the durations, the selected font, color and mode, and the timer state. UI state such as whether the settings dialog is open isn't saved.

Because the page is prerendered on the server, where `localStorage` doesn't exist, the store uses `skipHydration: true` and is rehydrated in a `useEffect` on the client. This avoids hydration mismatches. As a side effect, the default values show for a moment right after a reload.

### Design tokens

All colors, font sizes, spacing, sizes, radii, shadows and breakpoints are defined as Tailwind CSS 4 `@theme` tokens in [`app/globals.css`](app/globals.css). The accent color is a CSS variable (`--color-accent`) that is overridden at runtime based on the selected color.

## Browser support

- **Notifications** need a secure context (`localhost` or HTTPS) and the user's permission, which is asked for the first time the timer is started.
- On **iOS Safari**, notifications only work for web apps added to the Home Screen. The sound, tab title and on-page alerts still work.
- No alert can fire while the page is closed. If the time ran out in the meantime, the timer shows as finished when the page is opened again.
