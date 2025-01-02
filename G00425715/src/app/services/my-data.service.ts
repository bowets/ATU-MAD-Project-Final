import { Injectable } from '@angular/core';

// Import the storage module to use it in the service
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class MyDataService {

  constructor(private storage:Storage) {
    //Creates the storage object when the service is created
    this.init();
   }

   // Creates the storage object
   async init() {
    const storage = await this.storage.create();
   }

   // Method that will get the value stored in the key
   async set(key: string, value: any) {
    await this.storage.set(key, value);
   }

   // Method that will get the value at the key
   async get(key: string) {
    return await this.storage.get(key);
   }
}
