export interface UserPreferences {
  travel_style: 'budget' | 'mid-range' | 'luxury';
  interests: string[];
  budget_range: 'low' | 'medium' | 'high';
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  preferences_json: UserPreferences | null;
  created_at: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: Pick<User, 'id' | 'email' | 'full_name' | 'avatar_url'>;
}
