import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError, from, switchMap } from 'rxjs';
import { StorageService } from '../services/storage.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const storage = inject(StorageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        from(storage.clearAll()).subscribe(() =>
          router.navigate(['/auth/login']),
        );
      }
      if (error.status === 403) {
        router.navigate(['/tabs/trips']);
      }
      return throwError(() => error);
    }),
  );
};
