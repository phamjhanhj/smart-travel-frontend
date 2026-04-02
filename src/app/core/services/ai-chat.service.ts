import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';
import { ApiResponse } from '../models/api-response.model';
import { ChatMessage, SendMessageDto, AiSuggestion } from '../models/ai-chat.model';

@Injectable({ providedIn: 'root' })
export class AiChatService {
  private readonly api = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private storage: StorageService,
  ) {}

  getChatHistory(tripId: string, limit = 50): Observable<ApiResponse<ChatMessage[]>> {
    const params = new HttpParams().set('limit', limit);
    return this.http.get<ApiResponse<ChatMessage[]>>(
      `${this.api}/trips/${tripId}/chat/history`,
      { params },
    );
  }

  sendMessage(tripId: string, dto: SendMessageDto): Observable<ApiResponse<ChatMessage>> {
    return this.http.post<ApiResponse<ChatMessage>>(
      `${this.api}/trips/${tripId}/chat`,
      { ...dto, stream: false },
    );
  }

  /**
   * SSE streaming — HttpClient does not support SSE.
   * Uses fetch API and emits each text delta as a string.
   */
  sendMessageStream(tripId: string, message: string): Subject<string> {
    const subject = new Subject<string>();

    this.storage.getAccessToken().then(token => {
      fetch(`${this.api}/trips/${tripId}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message, stream: true }),
      }).then(async response => {
        const reader = response.body!.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) { subject.complete(); break; }

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n').filter(l => l.startsWith('data: '));
          for (const line of lines) {
            try {
              const json = JSON.parse(line.slice(6));
              if (json.data?.delta) subject.next(json.data.delta);
              if (json.data?.done) subject.complete();
            } catch { /* skip malformed */ }
          }
        }
      }).catch(err => subject.error(err));
    });

    return subject;
  }

  getSuggestions(tripId: string, status?: string): Observable<ApiResponse<AiSuggestion[]>> {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    return this.http.get<ApiResponse<AiSuggestion[]>>(
      `${this.api}/trips/${tripId}/suggestions`,
      { params },
    );
  }

  updateSuggestionStatus(
    suggestionId: string,
    status: 'accepted' | 'rejected',
  ): Observable<ApiResponse<unknown>> {
    return this.http.patch<ApiResponse<unknown>>(
      `${this.api}/suggestions/${suggestionId}/status`,
      { status },
    );
  }
}
