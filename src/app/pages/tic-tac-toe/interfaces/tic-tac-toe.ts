export interface Col {
  name: string;
  values: Square[];
}

export interface Square {
  value: number;
  marquee?: string;
  isSelected: boolean;
  color?: string;
}
