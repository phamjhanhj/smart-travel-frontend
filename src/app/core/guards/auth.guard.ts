import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { from, switchMap, of } from 'rxjs';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = () => {
  const storage = inject(StorageService);
  const router = inject(Router);

  return from(storage.getAccessToken()).pipe(
    switchMap(token => {
      if (token) return of(true);
      router.navigate(['/auth/login']);
      return of(false);
    }),
  );
};
