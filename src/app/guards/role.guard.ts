// import { CanActivateFn } from '@angular/router';

// export const roleGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRole = route.data['expectedRole'];
    let token: string | null = null;
    if (typeof window !== 'undefined') {
      // Check if running in browser
      token = localStorage.getItem('jwtToken');
    }
    // const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        if (tokenPayload.role === expectedRole) {
          return true;
        }
      } catch (error) {
        console.error('Error parsing token', error);
      }
    }
    this.router.navigate(['/login']);
    return false;
    // if (token) {
    //   // Decode token (simple implementation; consider using a library for production)
    //   const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    //   if (tokenPayload.role === expectedRole) {
    //     return true;
    //   }
    // }
    // this.router.navigate(['/login']);
    // return false;
  }
}
