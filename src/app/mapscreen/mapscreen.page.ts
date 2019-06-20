import {Component, OnInit} from '@angular/core';
import {Icon, Map, marker, tileLayer} from 'leaflet';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {HttpClient} from '@angular/common/http';
import {PoiProviderService} from '../_services/poi-provider.service';
import {first} from 'rxjs/operators';


@Component({
    selector: 'app-mapscreen',
    templateUrl: './mapscreen.page.html',
    styleUrls: ['./mapscreen.page.scss'],
})
export class MapscreenPage implements OnInit {

    map: Map;
    currentPOI: any;
    currentPosition: any;
    poiMarker: Icon;
    userMarker: Icon;

    constructor(
        private geolocation: Geolocation,
        private http: HttpClient,
        private PoiProvider: PoiProviderService,
    ) {
    }

    ngOnInit() {
        this.poiMarker = new Icon({
            iconUrl: '/assets/icon/poiMarker.png',
            shadowUrl: '',

            iconSize: [50, 50], // size of the icon
            shadowSize: [0, 0], // size of the shadow
            iconAnchor: [22, 50], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 50],  // the same for the shadow
            popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        });

        this.userMarker = new Icon({
            iconUrl: '/assets/icon/userMarker.png',
            shadowUrl: '',

            iconSize: [50, 50], // size of the icon
            shadowSize: [0, 0], // size of the shadow
            iconAnchor: [22, 50], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 50],  // the same for the shadow
            popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        });

        this.createMap();
        this.getUserPosition();
    }

    getUserPosition() {
        this.geolocation.getCurrentPosition().then((coords) => {
            this.currentPosition = coords;
            this.showUser();
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    createMap() {
        // In setView add latLng and zoom
        this.map = new Map('mapUser');
        tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
            , {attribution: 'Barathon o/',}).addTo(this.map);
    }

    showUser() {
        this.map.setView([this.currentPosition.coords.latitude, this.currentPosition.coords.longitude], 17);
        marker([this.currentPosition.coords.latitude, this.currentPosition.coords.longitude], {icon: this.userMarker}).addTo(this.map)
            .bindPopup('Vous êtes ici')
            .openPopup();

        this.showPoI();
    }

    showPoI() {
        this.PoiProvider.getPois(this.currentPosition.coords.latitude, this.currentPosition.coords.longitude)
            .pipe(first())
            .subscribe(
                data => {
                    for (const poi of data) {
                        this.addMarkerOnMap(poi);
                    }
                },
                error => {
                    console.log('error');
                }
            );

    }

    addMarkerOnMap(poi: any) {
        marker([poi.attributes.lat, poi.attributes.lng], {icon: this.poiMarker}).on('click', (e) => {
            this.currentPOI = poi;
        }).addTo(this.map);
    }

    closeModal() {
        this.currentPOI = null;
    }

    centerMap() {
        this.geolocation.getCurrentPosition().then((coords) => {
            this.currentPosition = coords;
            this.map.setView([this.currentPosition.coords.latitude, this.currentPosition.coords.longitude], 17);
        });
    }
}
