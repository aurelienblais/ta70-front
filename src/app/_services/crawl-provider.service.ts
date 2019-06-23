import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CrawlProviderService {

    constructor(private http: HttpClient) {
    }

    getCrawls() {
        return this.http.get<any>(`${environment.API_URL}/crawls`);
    }

    getCrawl(id) {
        return this.http.get<any>(`${environment.API_URL}/crawls/${id}`);
    }

    deleteCrawl(id) {
        return this.http.delete<any>(`${environment.API_URL}/crawls/${id}`);
    }

    createCrawl(crawl) {
        return this.http.post<any>(`${environment.API_URL}/crawls`,
            {
                crawl:
                    {
                        name: crawl.name,
                        description: crawl.description,
                        event_date: crawl.event_date
                    }
            });
    }
}
