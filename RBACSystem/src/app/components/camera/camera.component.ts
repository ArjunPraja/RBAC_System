import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-camera',
  standalone: false,
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent {
  stream: MediaStream | null = null;
  Status: string | null = null;
  trigger: Subject<void> = new Subject<void>();
  apiUrl: string = 'http://localhost:5000/users'; // Adjusted API base URL for image saving
// Method to stop the camera
// Method to stop the camera
stopCamera(): void {
  if (this.stream) {
    const tracks = this.stream.getTracks();  // Get all the media tracks
    tracks.forEach(track => track.stop());  // Stop all tracks
    this.stream = null;  // Clear the stream
    this.Status = 'Stopped';  // Update the status
  }

}
  previewImage: string = ''; // Preview image data
  uuid: string | null = null; // User's UUID to associate with the image

  constructor(private http: HttpClient) {
    this.fetchUserUuid(); // Fetch the UUID when the component initializes
  }
  cancelImage(): void {
    this.previewImage = "";  // Remove the preview image
  }
  get $trigger(): Observable<void> {
    return this.trigger.asObservable(); // Getter to expose trigger as observable
  }

  
  // Fetch UUID from session storage
  fetchUserUuid() {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.uuid = user.uuid;
      console.log('Fetched UUID from session storage:', this.uuid);
    } else {
      console.error('User not found in session storage. Please log in again.');
      alert('User session expired. Please log in.');
    }
  }

  // Check if webcam permissions are granted and initialize webcam stream
  checkpermissions() {
    navigator.mediaDevices
      .getUserMedia({ video: { height: 500, width: 500 } })
      .then((stream) => {
        this.stream = stream;
        this.Status = 'Camera is accessible!';
      })
      .catch((error) => {
        console.error(error);
        this.Status = this.handleError(error);
      });
  }

  
  // Capture snapshot from webcam
  snapshot(event: WebcamImage) {
    this.previewImage = event.imageAsDataUrl; // Store the captured image as preview
  }

  // Trigger image capture
  captureImage() {
    this.trigger.next(); // Emit the trigger event
  }

  // Save the captured image to backend
  saveImage() {
    if (!this.uuid) {
      alert('User UUID not found. Please log in again.');
      return;
    }
    

    const imageBlob = this.dataUrlToBlob(this.previewImage);
    const formData = new FormData();
    formData.append('image', imageBlob, 'captured_image.png');
    formData.append('uuid', this.uuid);

    // Upload image to backend
    this.http.post(`${this.apiUrl}/${this.uuid}/images`, formData).subscribe({
      next: (response) => {
        console.log('Image saved successfully:', response);
        alert('Image saved successfully!');
      },
      error: (error) => {
        console.error('Error saving the image:', error);
        alert('Failed to save the image. Please try again.');
      }
    });
  }

  // Convert Data URL to Blob
  dataUrlToBlob(dataUrl: string): Blob {
    const byteString = atob(dataUrl.split(',')[1]);
    const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  }

  // Handle error scenarios for webcam access
  private handleError(error: any): string {
    if (error?.message === 'Permission Denied') {
      return 'Permission Denied. Please try again later.';
    } else if (error?.message === 'Device not found') {
      return 'No camera device detected. Please check your camera.';
    } else {
      return 'An unexpected error occurred. Please try again.';
    }
  }
}
