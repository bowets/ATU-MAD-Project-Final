import { Component } from '@angular/core';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButtons, 
  IonButton, 
  IonIcon } 
  from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settingsOutline} from 'ionicons/icons';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon ],
})
export class HomePage {
  constructor() {
    addIcons({
      'settings-outline': settingsOutline
    });
  }

}
