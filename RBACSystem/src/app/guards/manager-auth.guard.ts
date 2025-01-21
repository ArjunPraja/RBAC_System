import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const managerAuthGuard: CanActivateFn = (route, state) => {
  // Get the user role from session storage (or wherever it's stored)
  const role = sessionStorage.getItem('role'); // Assuming role is stored in sessionStorage

  // If the role is 'manager', allow access
  if (role === 'manager') {
    return true;
  }

  // If the role is not 'manager', redirect to the login page or another page
  const router = inject(Router);
  router.navigate(['/login']); // Redirect to login or another appropriate page
  return false; // Deny access
};
