import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {API_URL} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CrawlProviderService {

    constructor(private http: HttpClient) {
    }

    getPublicCrawls() {
        return this.http.get<any>(`${API_URL}/crawls`)
            .pipe(map(crawl => crawl.data));
    }
}
