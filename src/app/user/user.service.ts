import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { IUser } from './models/user';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserService {

  public isLogged: Boolean = null;
  public userData: IUser = null

  constructor(private storage: StorageService, private http: HttpClient) {
    this.isLogged = this.storage.getItem('isLogged');
    this.userData = this.storage.getItem('userData');
  }

  register(userData) {
    return this.http.post(`/users/register`, userData)
      .pipe(tap({ next: (data) => this.reset(data) }));
  }

  login(userData) {
    return this.http.post(`/users/login`, userData)
      .pipe(tap({ next: (data) => this.reset(data) }));
  }

  logout() {
    return this.http.get(`/users/logout`)
      .pipe(tap({ next: () => this.reset() }));
  }

  updateProfile(updatedData) {
    return this.http.put(`/users/profile`, updatedData)
      .pipe(tap({ next: (data) => this.reset(data) }));
  }

  reset(data = undefined): void {
    if (data) {
      this.storage.setItem("isLogged", true);
      this.storage.setItem("userData", data);
    } else {
      this.storage.setItem('isLogged', null);
      this.storage.setItem('userData', null);
    }
    this.isLogged = this.storage.getItem('isLogged');
    this.userData = this.storage.getItem('userData');
  }
}