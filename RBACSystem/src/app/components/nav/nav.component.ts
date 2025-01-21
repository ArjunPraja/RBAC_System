import { Component } from '@angular/core';
import { SessionService } from './session.service'; // Import your session service

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private sessionService: SessionService) {}

  // Getter to check if session data exists (user logged in)
  get isLoggedIn(): boolean {
    return !!this.sessionService.getSessionData(); // True if user data exists in session
  }

  // Logout function to clear session data
  logout(): void {
    this.sessionService.clearSession(); // Clear session data (user logout)
    // Optionally, you can navigate to a different page (like login or home) after logout
  }
}
