import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrawlProviderService {

  constructor(private http: HttpClient) { }

  getCrawls(userID: number) {
    return this.http.get<any>('https://ta70.naritaya.org/crawls?user[id]=' + userID)
        .pipe(map(crawl => crawl.data));
  }
}
