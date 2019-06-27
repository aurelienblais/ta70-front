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

    createCrawl(name, event_date, description) {
        return this.http.post<any>(`${environment.API_URL}/crawls`,
            {
                crawl:
                    {
                        name: name,
                        description: description,
                        event_date: event_date
                    }
            });
    }

    updateCrawl(id, name, event_date, description) {
        return this.http.patch<any>(`${environment.API_URL}/crawls/${id}`,
            {
                crawl:
                    {
                        name: name,
                        description: description,
                        event_date: event_date
                    }
            });
    }
}
