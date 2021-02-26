import {Injectable} from '@angular/core';
import {MessageService} from '../message/message.service';
import {Observable} from 'rxjs';

export interface PhpData {
  status: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(
    private messageService: MessageService
  ) {
  }

  sendLogin(login: string, password: string): Observable<PhpData> {
    const form = new FormData();
    form.append('login', login);
    form.append('password', password);
    return this.messageService.sendMessage('checkLogin', form);
  }

  finalizeAuthentication(data: PhpData): void {
    if (data.status === 'ok') {
      this.isAuthenticated = true;
    }
  }
}
