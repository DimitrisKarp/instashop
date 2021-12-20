import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import * as Parse from 'parse';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  async getLandmarks() {
    const Landmark = Parse.Object.extend('Landmark');
    const query = new Parse.Query(Landmark);
    query.ascending('order');
    return of(await query.find());
  }

  async getLandmark(id: any) {
    const Landmark = Parse.Object.extend('Landmark');
    const query = new Parse.Query(Landmark).get(id);
    return of(await query);
  }
}
