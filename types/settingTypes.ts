interface Time {
  id: number;
  label: string;
  value: number;
}

interface Fonts {
  id: number;
  name: string;
  className: string;
}

interface Colors {
  id: number;
  name: string;
  className: string;
  value: string;
}

export type Times = Time[];

export type Font = Fonts[];

export type Color = Colors[];

export interface SettingsFormValues {
  times: number[];
  fontId: number;
  colorId: number;
}
