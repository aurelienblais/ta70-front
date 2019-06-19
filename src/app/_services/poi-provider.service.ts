import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PoiProviderService {

    constructor(private http: HttpClient) {
    }

    getPois(lat: number, lng: number) {
        return this.http.get<any>(`${environment.API_URL}/pois?lat=` + lat + '&lng=' + lng + '&family=' + environment.POI_TYPE, )
            .pipe(map(poi => poi.data));
    }

}
