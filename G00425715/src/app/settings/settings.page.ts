import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRadioGroup, IonRadio } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonRadio, IonRadioGroup, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {

  currentSetting: string = "";

  constructor(private ds: MyDataService, private router: Router) { }

  ngOnInit() {
    this.checkSettings();
  }

  // Get the current setting from the data service
  async checkSettings() {
    this.currentSetting = await this.ds.get('settings');
  }

  // Save the setting when the radio button is changed
  async onRadioChange(event: any) {
    this.currentSetting = event.detail.value;
    await this.ds.set('settings', this.currentSetting);
    this.router.navigate(['/home']);
  }
}
