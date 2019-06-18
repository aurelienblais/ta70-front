import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {APIURL} from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class PoiProviderService {

    constructor(private http: HttpClient) {
    }

    getPois(lat: number, lng: number, poiType: string) {
        return this.http.get<any>(`${APIURL}/pois?lat=` + lat + '&lng=' + lng)
            .pipe(map(poi => poi.data));
    }

}
