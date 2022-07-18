import { Injectable } from '@angular/core';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class GeoService {
  public userGeo = new Map();

  constructor(userDataService: DataService) {
    userDataService.getUsers()
      .subscribe(users => users.forEach(user => this.userGeo.set(user.id, user.address.geo)));
  }

  getUserGeoById(userId: number): {lat: string, lng: string} {
    return this.userGeo.get(userId);
  }
}
