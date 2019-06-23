import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {PoiProviderService} from '../_services/poi-provider.service';
import {CommentThreadComponent} from '../comment-thread/comment-thread.component';

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
        this.loadPoi();
    }

    loadPoi() {
        this.poiService.getPoi(this.navParams.get('poi_id')).subscribe(p => {
            this.poi = p.data.attributes;
        });
    }

    disposeModal() {
        this.modalCtrl.dismiss();
    }

    async showComments(id) {
        const modal = await this.modalCtrl.create({
            component: CommentThreadComponent,
            componentProps: {ct_id: id, subject: this.poi.name}
        });

        modal.onDidDismiss().then( _ => this.loadPoi() );

        return await modal.present();
    }

}
