import { Component, OnInit } from '@angular/core';
import { Map, tileLayer,  marker } from 'leaflet';
import { Geolocation  } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-mapscreen',
  templateUrl: './mapscreen.page.html',
  styleUrls: ['./mapscreen.page.scss'],
})
export class MapscreenPage implements OnInit {

  map: Map;

  constructor(private geolocation: Geolocation /*, http: HttpClient*/) { }

  ngOnInit() { this.getUserPosition(); }

  getUserPosition() {
    this.geolocation.getCurrentPosition().then((coords) => {
      this.showUser(coords);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  showUser(currentPos) {
    // In setView add latLng and zoom
    this.map = new Map('mapUser').setView([currentPos.coords.latitude, currentPos.coords.longitude], 17);
    tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: '© ionic LeafLet',
    }).addTo(this.map);

    marker([currentPos.coords.latitude, currentPos.coords.longitude]).addTo(this.map)
        .bindPopup('NOM USER')
        .openPopup();
  }

  /*showPoI( coords) {

    const poiList = this.http.get('https://localhost:8000?lat=' + coords.coords.latitude + '&lng=' +  coords.coords.longitude);


    for (const poi of JSON.stringify(poiList)) {
      const poiLat = poi.attributes.lat;
      const poiLng = poi.attributes.lng;
      const poiName = poi.attributes.name;

      marker([poiLat, poiLng]).addTo(this.map)
          .bindPopup(poiName)
          .openPopup();
    }
  }*/
}
