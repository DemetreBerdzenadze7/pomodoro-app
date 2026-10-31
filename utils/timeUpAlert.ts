const canNotify = () =>
  typeof window !== "undefined" && "Notification" in window;

export const requestNotificationPermission = () => {
  if (canNotify() && Notification.permission === "default") {
    Notification.requestPermission();
  }
};

const playBeep = () => {
  const ctx = new AudioContext();
  [0, 0.4, 0.8].forEach((delay) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.2, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + delay + 0.3,
    );
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + 0.3);
  });
  setTimeout(() => ctx.close(), 1500);
};

export const alertTimeUp = (label: string) => {
  playBeep();
  if (canNotify() && Notification.permission === "granted") {
    new Notification("Time's up!", { body: `Your ${label} is over.` });
  }
};
