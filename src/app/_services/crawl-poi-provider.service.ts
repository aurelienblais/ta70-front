import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrawlPoiProviderService {

  constructor(private http: HttpClient) { }

  deleteCrawlPoi(crawlid, id) {
    return this.http.delete<any>(`${environment.API_URL}/crawls/${crawlid}/poi_crawls/${id}`);
  }

  createCrawlPoi(crawlid, id) {
    return this.http.post<any>(`${environment.API_URL}/crawls/${crawlid}/poi_crawls`, { poi_crawl : { poi_id: id } });
  }
}
