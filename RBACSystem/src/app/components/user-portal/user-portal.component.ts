import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-portal',
  standalone: false,
  templateUrl: './user-portal.component.html',
  styleUrls: ['./user-portal.component.css']
})
export class UserPortalComponent implements OnInit {
  user: any;
  selectedFile: File | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Retrieve user data from sessionStorage
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser); // Parse user data
    } else {
      console.error('User data not found in sessionStorage.');
    }
  }

  // Handle file selection
  onFileSelect(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Upload profile photo
  uploadPhoto(): void {
    if (!this.selectedFile) {
      alert('Please select a photo to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('photo', this.selectedFile, this.selectedFile.name);

    // Retrieve user email from session storage
    const userEmail = this.user?.email;

    if (!userEmail) {
      alert('User email not found.');
      return;
    }

    const headers = {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`, // Add the token if required
      'User-Email': userEmail  // Add email in the header
    };

    // Make the HTTP PUT request to upload the profile photo
    this.http.put<any>('http://localhost:5000/upload-photo', formData, { headers }).subscribe(
      (response) => {
        // Update user profile photo in the session storage
        this.user.photo = response.user.photo;
        sessionStorage.setItem('user', JSON.stringify(this.user));

        // Update the displayed photo and details
        alert('Profile photo uploaded successfully.');
      },
      (error) => {
        console.error('Error uploading photo:', error);
        alert('Failed to upload profile photo. Please try again.');
      }
    );
  }
}
