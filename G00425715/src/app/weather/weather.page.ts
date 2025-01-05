import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class WeatherPage implements OnInit {


  // ------ VARIABLES ------------

  captialCity: string = "";
  latitude: string = "";
  longitude: string = "";
  apiKey: string = "95ac14c90998ec1e08b942ebac0260df";
  units: string = "";
  url: string = "https://api.openweathermap.org/data/2.5/weather?lat=" + this.latitude + "&lon=" + this.longitude + "&units=" + this.units + "&appid=" + this.apiKey
  weatherData: any;
  icon: string = ""
  description: string = ""
  temp: string = ""

  options: HttpOptions = {
    url: this.url
  }


  // ------ CONSTRUCTOR ------------

  constructor(private dataService: MyDataService, private httpservice:MyHttpService) { }


  // ------- LIFECYCLE ------------
  ngOnInit() {
    this.getDataFromStorage();
  }

  ionViewDidEnter() {
    this.getWeather();
  }

  // ------- METHODS ------------

  // Get the data from the storage
  async getDataFromStorage() {
    this.captialCity = await this.dataService.get('capitalCity');
    let latlng = await this.dataService.get('latitudeLongitude');
    this.latitude = latlng[0];
    this.longitude = latlng[1];
    this.units = await this.dataService.get('settings');
    this.url = "https://api.openweathermap.org/data/2.5/weather?lat=" + this.latitude + "&lon=" + this.longitude + "&units=" + this.units + "&appid=" + this.apiKey
    console.log(this.url);
  }

  // Get weather information from the API
  async getWeather() {
    this.options.url = this.url;
    let result = await this.httpservice.get(this.options);
    this.weatherData = result.data;
    console.log(this.weatherData);
    this.icon = this.weatherData.weather[0].icon;
    this.description = this.weatherData.weather[0].description;
    this.temp = this.weatherData.main.temp;
  }


}
