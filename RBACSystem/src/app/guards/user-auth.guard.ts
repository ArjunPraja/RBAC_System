import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const userAuthGuard: CanActivateFn = (route, state) => {
  // Get the user's role from sessionStorage (or wherever it's stored)
  const role = sessionStorage.getItem('role'); // Assuming the role is stored in sessionStorage

  // If the role is 'user', allow access
  if (role === 'user') {
    return true;
  }

  // If the role is not 'user', redirect to the login page or another appropriate page
  const router = inject(Router);
  router.navigate(['/login']); // Redirect to login or another page as required
  return false; // Deny access
};
