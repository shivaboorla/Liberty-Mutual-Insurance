import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';

// @Injectable()
// export class TokenInterceptorService implements HttpInterceptor {
//   constructor() {}
//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const token = localStorage.getItem('jwtToken');
//     if (token) {
//       const cloned = req.clone({
//         headers: req.headers.set('Authorization', `Bearer ${token}`),
//       });
//       return next.handle(cloned);
//     }
//     return next.handle(req);
//   }
// }

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
