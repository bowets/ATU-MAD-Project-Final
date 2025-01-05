import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NewsPage implements OnInit {

  // ------ VARIABLES ------------

  countryCode: string = "";
  countryName: string = "";
  apiKey: string = "pub_6417998f44dd852f53db31e9f29b66ca9389f";
  newsData: any;
  options: HttpOptions = {
    url: "https://newsdata.io/api/1/latest?apikey=" + this.apiKey + "&country="
  }
  hasNews: boolean = false;


  // ------ CONSTRUCTOR ------------
  constructor(private ds: MyDataService, private mhs: MyHttpService) { }

  // ------- LIFECYCLE ------------
  ngOnInit() {
    this.getCountry();
  }

  ionViewDidEnter() {
    this.getNews();
  }

  // ------- METHODS ------------

  // Get the country code and name from the data service
  async getCountry() {
    this.countryCode = await this.ds.get('countryCode');
    this.countryName = await this.ds.get('countryName');
  }

  // Check if the news data is empty to display a message on the page
  checkData(newsData: any) {
    if (newsData.length > 0) {
      this.hasNews = true;
    } else {
      this.hasNews = false
  }
}

// Get the news data from the API
  async getNews() {
    this.options.url = this.options.url.concat(this.countryCode);
    console.log(this.options.url);
    let result = await this.mhs.get(this.options);
    this.newsData = result.data.results;
    this.checkData(this.newsData);
    console.log(this.newsData);
  }



}
