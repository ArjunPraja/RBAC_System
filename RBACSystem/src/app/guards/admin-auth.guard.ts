import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  // Get the user role from session storage (or local storage)
  const role = sessionStorage.getItem('role'); // Assuming role is stored in sessionStorage
  
  // If the role is 'admin', allow access
  if (role === 'admin') {
    return true;
  }

  // If the role is not 'admin', redirect to the login page or some other page
  const router = inject(Router);
  router.navigate(['/login']); // Redirect to login or another appropriate page
  return false; // Deny access
};
