import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {API_URL, POI_TYPE} from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class PoiProviderService {

    constructor(private http: HttpClient) {
    }

    getPois(lat: number, lng: number) {
        return this.http.get<any>(`${API_URL}/pois?lat=` + lat + '&lng=' + lng + '&family=' + POI_TYPE, )
            .pipe(map(poi => poi.data));
    }

}
