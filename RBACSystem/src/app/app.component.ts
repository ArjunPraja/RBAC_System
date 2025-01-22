import { Component } from '@angular/core'; 
import {WebcamImage} from 'ngx-webcam'; 
import {Subject, Observable} from 'rxjs'; 

@Component({ 
selector: 'app-root', 
templateUrl: './app.component.html', 
styleUrls: ['./app.component.scss'] ,
standalone:true

}) 
export class AppComponent { 
title = 'RBAC_System'; 

public webcamImage: WebcamImage | undefined; 
private trigger: Subject<void> = new Subject<void>(); 
triggerSnapshot(): void { 
this.trigger.next(); 
} 
handleImage(webcamImage: WebcamImage): void { 
console.info('Saved webcam image', webcamImage); 
this.webcamImage = webcamImage; 
} 

public get triggerObservable(): Observable<void> { 
return this.trigger.asObservable(); 
} 
}
