export interface Training {
  internal_id: string;
  topic: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  instructor: Trainer;
  seats: number | undefined;
}

export interface Trainer {
  name: string;
  fields: string[];
}
