import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  async getLandmarks() {
    const Landmark = Parse.Object.extend('Landmark');
    const query = new Parse.Query(Landmark);
    query.ascending('order');
    return await query.find().catch((error) => {
      this.handleParseError(error);
    });
  }

  async getLandmark(id: any) {
    const Landmark = Parse.Object.extend('Landmark');
    const query = new Parse.Query(Landmark).get(id);
    return await query.catch((error) => {
      this.handleParseError(error);
    });
  }

  async updateLandmark(id: any, payload: any) {
    const Landmark = Parse.Object.extend('Landmark');
    const query = new Parse.Query(Landmark).get(id);
    return await query
      .then((landmark) => {
        landmark.set('title', payload.title);
        landmark.set('short_info', payload.short_info);
        landmark.set('url', payload.url);
        landmark.set('description', payload.description);
        return landmark.save().then(() => {
          this.toastService.show('Landmark updated successfully', {
            classname: 'bg-success text-light text-center',
            delay: 5000,
          });
        });
      })
      .catch((error) => {
        this.handleParseError(error);
      });
  }

  async uploadImage(id: any, name: string, file: File) {
    const parseFile = new Parse.File(name, file);
    return await parseFile
      .save()
      .then(async () => {
        const Landmark = Parse.Object.extend('Landmark');
        const query = new Parse.Query(Landmark).get(id);
        await query.then(async (landmark) => {
          landmark.set('photo', parseFile);
          await landmark.save();
        });
        this.toastService.show('Photo uploaded successfully', {
          classname: 'bg-success text-light text-center',
          delay: 5000,
        });
      })
      .catch((error) => {
        this.handleParseError(error);
      });
  }

  handleParseError(err: any) {
    switch (err.code) {
      case Parse.Error.INVALID_SESSION_TOKEN:
        this.toastService.show('Invalid session token', {
          classname: 'bg-danger text-light text-center',
          delay: 5000,
        });
        this.authService.logout();
        break;
      case 400:
        this.toastService.show(err.message, {
          classname: 'bg-danger text-light text-center',
          delay: 5000,
        });
        break;
      default:
        this.toastService.show('Something went wrong', {
          classname: 'bg-danger text-light text-center',
          delay: 5000,
        });
    }
  }
}
