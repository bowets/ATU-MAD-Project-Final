import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';
import { Router } from '@angular/router';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardContent, IonCard, IonCardSubtitle, IonCardTitle, IonCardHeader, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
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
  async initialStoregeData() {
    this.countrySearch = await this.ds.get('country');
    this.options.url = "https://restcountries.com/v3.1/name/" + this.countrySearch;
    let result = await this.mhs.get(this.options);
    this.countryData = result.data;
    console.log(JSON.stringify(this.countryData[0]));
  }

  getNews() {
    console.log('Getting news');
    this.router.navigate(['/news']);
  };

  getWeather() {
    console.log('Getting weather');
    this.router.navigate(['/weather']);

  };

}
