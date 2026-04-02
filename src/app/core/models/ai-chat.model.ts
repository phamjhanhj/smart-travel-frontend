export type ChatRole = 'user' | 'assistant';
export type SuggestionType = 'itinerary' | 'place' | 'budget';
export type SuggestionStatus = 'pending' | 'accepted' | 'rejected';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  message: string;
  created_at: string;
}

export interface SendMessageDto {
  message: string;
  stream: boolean;
}

export interface AiSuggestion {
  id: string;
  trip_id: string;
  type: SuggestionType;
  status: SuggestionStatus;
  content_json: Record<string, unknown>;
  created_at: string;
}
