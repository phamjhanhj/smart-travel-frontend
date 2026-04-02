export type ActivityType = 'meal' | 'attraction' | 'hotel' | 'transport' | 'other';

export interface Activity {
  id: string;
  day_plan_id: string;
  location_id: string | null;
  title: string;
  description: string | null;
  type: ActivityType;
  start_time: string | null;
  end_time: string | null;
  estimated_cost: number;
  order_index: number;
  booking_url: string | null;
  notes: string | null;
}

export interface DayPlan {
  id: string;
  trip_id: string;
  day_number: number;
  date: string;
  activities: Activity[];
}

export interface CreateActivityDto {
  title: string;
  type: ActivityType;
  start_time?: string;
  end_time?: string;
  estimated_cost?: number;
  description?: string;
  notes?: string;
  booking_url?: string;
  location_id?: string;
  order_index?: number;
}

export interface UpdateActivityDto extends Partial<CreateActivityDto> {}
