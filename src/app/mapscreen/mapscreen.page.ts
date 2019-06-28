import {Component, OnInit} from '@angular/core';
import {Icon, Map, marker, tileLayer} from 'leaflet';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {HttpClient} from '@angular/common/http';
import {PoiProviderService} from '../_services/poi-provider.service';
import {first} from 'rxjs/operators';
import {ModalController} from '@ionic/angular';
import {PoiDetailPage} from '../poi-detail/poi-detail.page';


@Component({
    selector: 'app-mapscreen',
    templateUrl: './mapscreen.page.html',
    styleUrls: ['./mapscreen.page.scss']
})
export class MapscreenPage implements OnInit {

    map: Map;
    currentPOI: any;
    currentPosition: any;
    poiMarker: Icon;
    userMarker: Icon;
    userPosition: marker;
    poiMarkers = [];
    loadCoordinates: any;

    constructor(
        private geolocation: Geolocation,
        private http: HttpClient,
        private PoiProvider: PoiProviderService,
        private modalCtrl: ModalController
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
        this.geolocation.getCurrentPosition().then((data) => {
            this.currentPosition = data.coords;
            this.map.setView([this.currentPosition.latitude, this.currentPosition.longitude], 15);
            setTimeout(() => {
                this.centerMap();
            }, 1000);
            this.showUser();

            this.geolocation.watchPosition().subscribe((data) => {

                // Calculate difference between last load coordinates and new coordinates (Haversine)
                const a = Math.sin((data.coords.latitude - this.loadCoordinates.latitude) * 0.017453292 / 2) *
                    Math.sin((data.coords.longitude - this.loadCoordinates.longitude) * 0.017453292 / 2) +
                    Math.sin(this.loadCoordinates.longitude * 0.017453292 / 2) *
                    Math.sin(data.coords.longitude * this.loadCoordinates.latitude * 0.017453292 / 2) *
                    Math.cos(this.loadCoordinates.latitude * 0.017453292) * Math.cos(data.coords.latitude * 0.017453292);
                const dist = 2 * 6371 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

                // If distance is more than 200 meters, get poi again
                if (dist > 0.2) {
                    this.poiMarkers.forEach(e => this.map.removeLayer(e));
                    this.showPoI();
                }

                this.currentPosition = data.coords;
                this.setUserPosition();
            });
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
        this.userPosition = marker([this.currentPosition.latitude, this.currentPosition.longitude], {icon: this.userMarker})
            .addTo(this.map)
            .bindPopup('Vous êtes ici')
            .openPopup();
        this.showPoI();
    }

    showPoI() {
        this.PoiProvider.getPois(this.currentPosition.latitude, this.currentPosition.longitude)
            .pipe(first())
            .subscribe(
                data => {
                    this.loadCoordinates = this.currentPosition;
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
        let m = new marker([poi.attributes.lat, poi.attributes.lng], {icon: this.poiMarker}).on('click', (e) => {
            this.currentPOI = poi;
        });
        this.poiMarkers.push(m);
        m.addTo(this.map);
    }

    closeModal() {
        this.currentPOI = null;
    }

    setUserPosition() {
        this.userPosition.setLatLng([this.currentPosition.latitude, this.currentPosition.longitude]);
        this.centerMap();
    }

    centerMap() {
        this.map.flyTo([this.currentPosition.latitude, this.currentPosition.longitude], 15);
        this.map.invalidateSize();
    }

    async presentPoiDetails(id) {
        const modal = await this.modalCtrl.create({
            component: PoiDetailPage,
            componentProps: {poi_id: id}
        });
        return await modal.present();
    }
}
