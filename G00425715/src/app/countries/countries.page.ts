import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCardTitle, IonCard, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';
import { Router } from '@angular/router';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardContent, IonCard, IonCardTitle, IonCardHeader, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CountriesPage implements OnInit {

  // ------ VARIABLES ------------

  countrySearch: string = "";
  options: HttpOptions = {
    url: "https://restcountries.com/v3.1/name/"
  }
  countryData: any;


  // ------ CONSTRUCTOR ------------
  constructor(private ds: MyDataService, private router:Router, private mhs:MyHttpService) { }


  // ------- LIFECYCLE ------------

  ngOnInit() {
    this.countryData = [];
    this.initialStoregeData();
  }


  // ------- METHODS ------------

  // Get the country data from the API and store it in the countryData variable
  async initialStoregeData() {
    this.countrySearch = await this.ds.get('country'); //BOJAN: get from router
    this.options.url = "https://restcountries.com/v3.1/name/" + this.countrySearch;
    let result = await this.mhs.get(this.options);
    this.countryData = result.data;
    console.log(result);
  }


  // set the country name and coode in storage and navigate to the news page
  async getNews(countryCode: string, countryName: string) {
    console.log('Getting news from ' + countryCode);
    await this.ds.set('countryCode', countryCode)
    await this.ds.set('countryName', countryName)
    this.router.navigate(['/news']);
  }


  // set the capital city and latitude and longitude in storage and navigate to the weather page
  async getWeather(capitalCity: string, latitudeLongitude: any) {
    console.log(capitalCity, latitudeLongitude);
    await this.ds.set('capitalCity', capitalCity);
    await this.ds.set('latitudeLongitude', latitudeLongitude);
    console.log('Getting weather');
    this.router.navigate(['/weather']);
  }
}
