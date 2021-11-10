import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) {
  }

  sendMessage(url: string, data: any): Observable<PhpData>{
    return this.http.post<PhpData>(environment.url.concat(url), data, {withCredentials: true});
  }


}
export interface PhpData {
  status: string;
  data: any;
}
