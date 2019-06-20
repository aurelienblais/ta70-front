import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrawlUserProviderService {

  constructor(private http: HttpClient) { }


  updateCrawlUser(crawlid, id) {
    return this.http.patch<any>(`${environment.API_URL}/crawls/${crawlid}/crawl_user`, { craw_user : {  crawl_users: id } });
  }

  deleteCrawlUser(crawlid, id) {
    return this.http.delete<any>(`${environment.API_URL}/crawls/${crawlid}/crawl_users/${id}`);
  }

  createCrawlUser(crawlid, id) {
    return this.http.post<any>(`${environment.API_URL}/crawls/${crawlid}/crawl_users`, { craw_user : {  crawl_users: id } });
  }
}
