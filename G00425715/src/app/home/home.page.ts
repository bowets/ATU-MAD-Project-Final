import { Component } from '@angular/core';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButtons, 
  IonButton, 
  IonIcon,
  IonInput
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settingsOutline} from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { MyDataService } from '../services/my-data.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButtons, 
    IonButton, 
    IonIcon, 
    IonInput,
    RouterModule,
    FormsModule
  ],
})
export class HomePage {

  // ------ VARIABLES ------------

  countryInput: string = "";



  // ------ CONSTRUCTOR ------------
  constructor(private ds: MyDataService, private router: Router) {
    addIcons({
      'settings-outline': settingsOutline
    });
  }

  // ------- LIFECYCLE ------------

  // On initialization, check if settings exist and set default if not
  ngOnInit() {
    this.checkSettings();
  }

  // ------- METHODS ------------

  // Check if settings exist. If not, set metric as default
  async checkSettings() {
    // Get current settings
    let settings = await this.ds.get('settings');
    // If settings exist, log it. It means this app has been used before
    if (settings) {
      console.log("Settings exist: " + settings);
      // If settings do not exist (the app is being run for the first time), set metric as default
    } else {
      console.log("Settings do not exist. Setting default settings: metric");
      this.ds.set('settings', 'metric');
    }
  }

  async searchCountry() {
    if (!this.countryInput) {
      console.log("No country entered");
      return;
    }
    console.log("Searching for country " + this.countryInput);
    await this.ds.set('country', this.countryInput);
    this.router.navigate(['/countries']);
  }

}
