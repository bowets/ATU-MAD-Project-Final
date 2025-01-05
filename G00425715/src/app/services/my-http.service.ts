import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class MyHttpService {

  constructor() { }

  // Get request using Capacitor Http 
  async get(options: HttpOptions) {
    return await CapacitorHttp.get(options);
  }
}
