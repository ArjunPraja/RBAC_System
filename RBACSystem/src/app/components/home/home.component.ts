import { Component } from '@angular/core';

@Component({
  selector: 'app-home',  // Ensure this selector is unique
  standalone: false,
  host: { '[attr.id]': '"home-" + id' },  // Dynamic ID based on 'id' property
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  // Correct the property name (plural: styleUrls)
})
export class HomeComponent {
  id = Math.random().toString(36).substr(2, 9);  // Generating a random ID for each instance
}
