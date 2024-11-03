import { HttpInterceptorFn } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService); // Use inject to access the spinner service
  
  spinner.show(); // Show the spinner when request starts

  return next(req).pipe(
    finalize(() => spinner.hide()) // Hide the spinner once the request completes or errors out
  );
};