import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CrawlProviderService} from '../_services/crawl-provider.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalController, NavParams, ToastController} from '@ionic/angular';
import {AddFriendCrawlPage} from '../add-friend-crawl/add-friend-crawl.page';
import {AddPoiCrawlPage} from '../add-poi-crawl/add-poi-crawl.page';
import {first} from 'rxjs/operators';
import {CrawlUserProviderService} from '../_services/crawl-user-provider.service';
import {CrawlPoiProviderService} from '../_services/crawl-poi-provider.service';
import {PoiDetailPage} from '../poi-detail/poi-detail.page';


@Component({
    selector: 'app-crawl-details',
    templateUrl: './crawl-details.page.html',
    styleUrls: ['./crawl-details.page.scss'],
})
export class CrawlDetailsPage implements OnInit {

    crawl: any;
    crawlForm: FormGroup;
    submitted = false;
    display = false;
    owner = false;

    constructor(
        private route: ActivatedRoute,
        private crawlProviderService: CrawlProviderService,
        private crawlPoiProvider: CrawlPoiProviderService,
        private crawlUserProvider: CrawlUserProviderService,
        private formBuilder: FormBuilder,
        private modalCtrl: ModalController,
        private navParams: NavParams,
        private toastCtrl: ToastController
    ) {

    }

    ngOnInit() {
        if (this.navParams.get('crawl_id') !== 0) {
            this.crawlProviderService.getCrawl(this.navParams.get('crawl_id')).subscribe(data => {
                this.crawl = data.data;
                this.crawlForm = this.formBuilder.group({
                    name: [this.crawl.attributes.name, Validators.required],
                    event_date: [this.crawl.attributes.event_date, Validators.required],
                    description: [this.crawl.attributes.description, []]
                });
                this.display = true;
                this.owner = this.crawl.attributes.is_owner;
            });
        } else {
            this.crawlForm = this.formBuilder.group({
                name: ['', Validators.required],
                event_date: ['', Validators.required],
                description: ['', []]
            });
            this.display = true;
            this.owner = true;
        }
    }

    loadCrawl() {
        this.crawlProviderService.getCrawl(this.navParams.get('crawl_id')).subscribe(data => this.crawl = data.data);
    }

    get f() {
        return this.crawlForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        if (this.crawlForm.invalid) {
            return;
        }

        if (this.crawl) {
            this.crawlProviderService.updateCrawl(this.crawl.id, this.f.name.value, this.f.event_date.value, this.f.description.value)
                .pipe(first())
                .subscribe(data => this.crawl = data.data);
            const toast = this.toastCtrl.create({
                message: 'Mis à jour !',
                duration: 2000,
                color: 'success',
                position: 'top'
            });
            toast.then(toast => toast.present());

        } else {
            this.crawlProviderService.createCrawl(this.f.name.value, this.f.event_date.value, this.f.description.value)
                .pipe(first())
                .subscribe(data => this.crawl = data.data);
        }
    }

    confirmInviteDelete(id) {
        this.crawlUserProvider.deleteCrawlUser(this.crawl.id, id)
            .subscribe(_ => this.crawl.attributes.users.data = this.crawl.attributes.users.data.filter(e => e.id !== id));
        const toast = this.toastCtrl.create({
            message: 'Invité supprimé',
            duration: 2000,
            color: 'danger',
            position: 'top'
        });
        toast.then(toast => toast.present());
    }

    confirmPoiDelete(id) {
        this.crawlPoiProvider.deleteCrawlPoi(this.crawl.id, id)
            .subscribe(_ => this.crawl.attributes.pois.data = this.crawl.attributes.pois.data.filter(e => e.id !== id));
        const toast = this.toastCtrl.create({
            message: 'Bar supprimé',
            duration: 2000,
            color: 'danger',
            position: 'top'
        });
        toast.then(toast => toast.present());
    }

    async presentAddFriendCrawl() {
        const modal = await this.modalCtrl.create({
            component: AddFriendCrawlPage,
            componentProps: {crawl_id: this.crawl.id, friend_ids: this.crawl.attributes.users.data.map(e => e.attributes.name.id)}
        });

        modal.onDidDismiss().then(_ => this.loadCrawl());

        return await modal.present();
    }

    async presentAddPoiCrawl() {
        const modal = await this.modalCtrl.create({
            component: AddPoiCrawlPage,
            componentProps: {crawl_id: this.crawl.id, poi_ids: this.crawl.attributes.pois.data.map(e => e.attributes.poi.id)}
        });

        modal.onDidDismiss().then(_ => this.loadCrawl());

        return await modal.present();
    }

    async showPoi(id) {
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
