import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  public opened: boolean = false;
  constructor() { }
}
