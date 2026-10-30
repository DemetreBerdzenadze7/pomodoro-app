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

export type Times = Time[];

export type Font = Fonts[];
