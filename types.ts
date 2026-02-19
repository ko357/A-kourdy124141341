
export interface Dhikr {
  id: string;
  text: string;
  target: number;
}

export interface StatsData {
  name: string;
  count: number;
}

export interface DailyInspiration {
  verse: string;
  translation?: string;
  reference: string;
}
