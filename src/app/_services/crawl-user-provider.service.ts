import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrawlUserProviderService {

  constructor(private http: HttpClient) { }

  deleteCrawlUser(crawlid, id) {
    return this.http.delete<any>(`${environment.API_URL}/crawls/${crawlid}/crawl_users/${id}`);
  }

  createCrawlUser(crawlid, id) {
    return this.http.post<any>(`${environment.API_URL}/crawls/${crawlid}/crawl_users`, { crawl_user : {  user_id: id } });
  }
}
