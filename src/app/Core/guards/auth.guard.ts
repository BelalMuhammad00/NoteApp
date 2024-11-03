import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { first, map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const _auth = inject(AuthService);
  const _router = inject(Router);

  return _auth.user.pipe(
    first(),
    map(user => {
      if (user) {
        return true;
      } else {
        _router.navigate(['/login']);
        return false;
      }
    })
  );
};
