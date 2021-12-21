import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private authService: AuthService) {}

  async getLandmarks() {
    const Landmark = Parse.Object.extend('Landmark');
    const query = new Parse.Query(Landmark);
    query.ascending('order');
    return await query.find().catch((error) => {
      this.authService.handleParseError(error);
    });
  }

  async getLandmark(id: any) {
    const Landmark = Parse.Object.extend('Landmark');
    const query = new Parse.Query(Landmark).get(id);
    return await query.catch((error) => {
      this.authService.handleParseError(error);
    });
  }

  async updateLandmark(id: any, payload: any) {
    const Landmark = Parse.Object.extend('Landmark');
    const query = new Parse.Query(Landmark).get(id);
    query
      .then((landmark) => {
        landmark.set('title', payload.title);
        landmark.set('short_info', payload.short_info);
        landmark.set('url', payload.url);
        landmark.set('description', payload.description);
        return landmark.save();
      })
      .catch((error) => {
        this.authService.handleParseError(error);
      });
  }
}
