import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, from, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';
import { ApiResponse } from '../models/api-response.model';
import { AuthTokens, User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = environment.apiUrl;

  currentUser = signal<User | null>(null);

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private router: Router,
  ) {}

  async init(): Promise<void> {
    const user = await this.storage.getUser<User>();
    if (user) this.currentUser.set(user);
  }

  login(email: string, password: string): Observable<ApiResponse<AuthTokens>> {
    return this.http
      .post<ApiResponse<AuthTokens>>(`${this.api}/auth/login`, { email, password })
      .pipe(
        tap(async res => {
          const { access_token, refresh_token, user } = res.data;
          await this.storage.setTokens(access_token, refresh_token);
          await this.storage.setUser(user);
          this.currentUser.set(user as User);
        }),
      );
  }

  register(email: string, password: string, full_name: string): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${this.api}/auth/register`, {
      email,
      password,
      full_name,
    });
  }

  refreshToken(): Observable<ApiResponse<{ access_token: string }>> {
    return from(this.storage.getRefreshToken()).pipe(
      switchMap(refresh_token =>
        this.http.post<ApiResponse<{ access_token: string }>>(`${this.api}/auth/refresh`, {
          refresh_token,
        }),
      ),
      tap(async res => {
        await this.storage.setTokens(res.data.access_token, (await this.storage.getRefreshToken()) ?? '');
      }),
    );
  }

  async logout(): Promise<void> {
    await this.storage.clearAll();
    this.currentUser.set(null);
    await this.router.navigate(['/auth/login']);
  }

  async isLoggedIn(): Promise<boolean> {
    const token = await this.storage.getAccessToken();
    return !!token;
  }
}
