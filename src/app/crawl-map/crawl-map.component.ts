import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import * as L from 'leaflet';
import {CrawlProviderService} from '../_services/crawl-provider.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import 'leaflet-routing-machine';
import {PoiDetailPage} from '../poi-detail/poi-detail.page';

@Component({
    selector: 'app-crawl-map',
    templateUrl: './crawl-map.component.html',
    styleUrls: ['./crawl-map.component.scss'],
})
export class CrawlMapComponent implements OnInit {
    crawl: any;
    map: any;
    poiMarker: L.Icon;
    userMarker: L.Icon;
    currentPosition: any;
    currentPoi: any;
    userPosition: any;
    waypoints = [];

    constructor(private navParams: NavParams,
                private crawlProvider: CrawlProviderService,
                private geolocation: Geolocation,
                private modalCtrl: ModalController) {

        this.poiMarker = new L.Icon({
            iconUrl: '/assets/icon/poiMarker.png',
            shadowUrl: '',

            iconSize: [50, 50], // size of the icon
            shadowSize: [0, 0], // size of the shadow
            iconAnchor: [22, 50], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 50],  // the same for the shadow
            popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        });

        this.userMarker = new L.Icon({
            iconUrl: '/assets/icon/userMarker.png',
            shadowUrl: '',

            iconSize: [50, 50], // size of the icon
            shadowSize: [0, 0], // size of the shadow
            iconAnchor: [22, 50], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 50],  // the same for the shadow
            popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        });
    }

    ngOnInit() {
        this.crawlProvider.getCrawl(this.navParams.get('crawl_id')).subscribe(data => {
            this.crawl = data.data;
            this.initMap();
        });
    }

    initMap() {
        this.map = new L.Map('crawlMap');
        L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
            , {attribution: 'Barathon o/',}).addTo(this.map);
        this.map.setView([this.crawl.attributes.pois.data[0].attributes.poi.latitude,
            this.crawl.attributes.pois.data[0].attributes.poi.longitude], 15);
        this.setUserPosition();
        this.displayPoi();
    }

    async getGeolocation() {
        await this.geolocation.getCurrentPosition().then((data) => this.currentPosition = data.coords);
        this.geolocation.watchPosition().subscribe(
            (data) => {
                this.currentPosition = data.coords;
                this.userPosition.setLatLng([this.currentPosition.latitude, this.currentPosition.longitude]);
                this.centerMap();
            }
        );
    }

    setUserPosition() {
        this.getGeolocation().then(_ => {
            this.userPosition = L.marker([this.currentPosition.latitude, this.currentPosition.longitude], {icon: this.userMarker})
                .addTo(this.map)
                .bindPopup('Vous êtes ici')
                .openPopup();
            this.centerMap();
        });
    }

    displayPoi() {
        this.crawl.attributes.pois.data.forEach(e => {
            this.addMarkerOnMap(e);
            this.waypoints.push([e.attributes.poi.latitude, e.attributes.poi.longitude]);
        });

        L.Routing.control({
            waypoints: this.waypoints,
            router: L.Routing.mapbox('pk.eyJ1IjoibmFyaXRheWEiLCJhIjoiY2p4ZXI4M3p4MDVxODNvbWQ2YTBidng5eSJ9.yCkdmTyjoOZ1DHl_T0u02Q'),
            draggableWaypoints: false,
            addWaypoints: false,
            lineOptions: {
                styles: [{color: 'red', opacity: .8, weight: 3}, {color: 'black', opacity: .5, weight: 3}]
            },
            createMarker: function() {
                return null;
            }
        }).addTo(this.map);
        document.getElementsByClassName('leaflet-routing-container')[0].remove();
    }

    addMarkerOnMap(poi: any) {
        L.marker([poi.attributes.poi.latitude, poi.attributes.poi.longitude], {icon: this.poiMarker})
            .on('click', _ => this.openPoi(poi.attributes.poi.id)).addTo(this.map);
    }

    centerMap() {
        this.map.flyTo([this.currentPosition.latitude, this.currentPosition.longitude], 15);
        this.map.invalidateSize();
    }

    async openPoi(id) {
        const modal = await this.modalCtrl.create({
            component: PoiDetailPage,
            componentProps: {poi_id: id}
        });
        return await modal.present();
    }

    disposeModal() {
        this.modalCtrl.dismiss();
    }

}
