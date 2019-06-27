import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams, ToastController} from '@ionic/angular';
import {PoiProviderService} from '../_services/poi-provider.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {first} from 'rxjs/operators';
import {CrawlPoiProviderService} from '../_services/crawl-poi-provider.service';

@Component({
    selector: 'app-add-poi-crawl',
    templateUrl: './add-poi-crawl.page.html',
    styleUrls: ['./add-poi-crawl.page.scss'],
})
export class AddPoiCrawlPage implements OnInit {
    poiList: any;

    constructor(
        private modalCtrl: ModalController,
        private poiProvider: PoiProviderService,
        private navParams: NavParams,
        private toastCtrl: ToastController,
        private geolocation: Geolocation,
        private crawlPoiProvider: CrawlPoiProviderService
    ) {
    }

    ngOnInit() {
        this.geolocation.getCurrentPosition().then((d) => {
            this.poiProvider.getPois(d.coords.latitude, d.coords.longitude).pipe(first()).subscribe(data => {
                this.poiList = data;
                this.navParams.get('poi_ids').forEach(id => this.poiList = this.poiList.filter(e => e.id != id));
            });
        });
    }

    add(id) {
        this.crawlPoiProvider.createCrawlPoi(this.navParams.get('crawl_id'), id).subscribe(_ => {
            this.poiList = this.poiList.filter(e => e.id !== id);
            const toast = this.toastCtrl.create({
                message: 'Bar ajouté !',
                duration: 2000,
                color: 'success',
                position: 'top'
            });
            toast.then(toast => toast.present());
        });
    }

    disposeModal() {
        this.modalCtrl.dismiss();
    }

}
