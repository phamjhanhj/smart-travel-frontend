import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

const KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
} as const;

@Injectable({ providedIn: 'root' })
export class StorageService {
  async setTokens(accessToken: string, refreshToken: string): Promise<void> {
    await Promise.all([
      Preferences.set({ key: KEYS.ACCESS_TOKEN, value: accessToken }),
      Preferences.set({ key: KEYS.REFRESH_TOKEN, value: refreshToken }),
    ]);
  }

  async getAccessToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: KEYS.ACCESS_TOKEN });
    return value;
  }

  async getRefreshToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: KEYS.REFRESH_TOKEN });
    return value;
  }

  async setUser(user: object): Promise<void> {
    await Preferences.set({ key: KEYS.USER, value: JSON.stringify(user) });
  }

  async getUser<T>(): Promise<T | null> {
    const { value } = await Preferences.get({ key: KEYS.USER });
    return value ? JSON.parse(value) : null;
  }

  async clearAll(): Promise<void> {
    await Preferences.clear();
  }
}
