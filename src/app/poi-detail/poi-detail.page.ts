import {Component, EventEmitter, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {PoiProviderService} from '../_services/poi-provider.service';

@Component({
    selector: 'app-poi-detail',
    templateUrl: './poi-detail.page.html',
    styleUrls: ['./poi-detail.page.scss'],
})
export class PoiDetailPage implements OnInit {

    poi: any;

    constructor(private poiService: PoiProviderService, private navParams: NavParams, private modalCtrl: ModalController) {
    }

    ngOnInit() {
        this.poiService.getPoi(this.navParams.get('poi_id')).subscribe(p => {
            this.poi = p.data.attributes;
        });
    }

    disposeModal() {
        this.modalCtrl.dismiss();
    }

}
