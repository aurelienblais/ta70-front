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
    getCrawl(id) {
        return this.http.get<any>(`${environment.API_URL}/crawls/${id}`)
            .pipe(map(crawl => crawl.data));
    }

    deleteCrawl( id ) {
        return this.http.delete<any>(`${environment.API_URL}/crawls/${id}` );
    }

    createCrawl( crawl ) {
        return this.http.post<any>(`${environment.API_URL}/crawls` ,
            {crawl :
                    { name       : crawl.name
                ,     description: crawl.description
                ,     event_date : crawl.event_date
                ,     status     : crawl.status
                    }
            });
    }
}
