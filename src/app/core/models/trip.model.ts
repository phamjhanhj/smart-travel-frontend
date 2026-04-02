export type TripStatus = 'draft' | 'active' | 'completed';

export interface DayPlanSummary {
  id: string;
  day_number: number;
  date: string;
  activities_count: number;
}

export interface Trip {
  id: string;
  user_id?: string;
  title: string;
  destination: string;
  start_date: string;
  end_date: string;
  budget: number;
  num_travelers: number;
  preferences: string | null;
  status: TripStatus;
  cover_image_url: string | null;
  day_plans?: DayPlanSummary[];
  created_at: string;
  updated_at?: string;
}

export interface CreateTripDto {
  title: string;
  destination: string;
  start_date: string;
  end_date: string;
  budget: number;
  num_travelers: number;
  preferences?: string;
}

export interface UpdateTripDto extends Partial<CreateTripDto> {
  status?: TripStatus;
  cover_image_url?: string;
}
