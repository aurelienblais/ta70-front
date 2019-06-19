import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CrawlProviderService {

    constructor(private http: HttpClient) {
    }

    getPublicCrawls() {
        return this.http.get<any>(`${environment.API_URL}/crawls`)
            .pipe(map(crawl => crawl.data));
    }
}
