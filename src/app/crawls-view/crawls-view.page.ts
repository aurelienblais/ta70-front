import {Component, OnInit} from '@angular/core';
import {CrawlProviderService} from '../_services/crawl-provider.service';
import {ToastController} from '@ionic/angular';
import {ModalController} from '@ionic/angular';
import {CrawlDetailsPage} from '../crawl-details/crawl-details.page';

@Component({
    selector: 'app-crawls-view',
    templateUrl: './crawls-view.page.html',
    styleUrls: ['./crawls-view.page.scss'],
})

export class CrawlsViewPage implements OnInit {
    crawls: any;

    constructor(
        private crawlProviderService: CrawlProviderService,
        public toastController: ToastController,
        private modalCtrl: ModalController

    ) {
    }

    ngOnInit() {
        this.loadCrawls();
    }

    loadCrawls() {
        this.crawlProviderService.getCrawls().subscribe(data => {
            this.crawls = data.data;
            console.log(this.crawls);
        });
    }

    createCrawl() {
        this.showCrawlDetail(0);
    }

    showCrawl(id) {
        this.showCrawlDetail(id);
    }

    addToList(crawl) {
        this.crawls.push(crawl);
    }

    vision(item) {
        this.visionToast();
    }

    duplicate(crawl) {
        this.duplicateToast();
    }

    delete(crawl) {
        this.deleteToast();
    }

    async visionToast() {
        this.showToast('Barathon passé en privé/publique');
    }

    async duplicateToast() {
        this.showToast('Barathon dupliqué');
    }


    async deleteToast() {
        this.showToast('Barathon supprimé');
    }

    async showToast(message) {

        const toast = await this.toastController.create({
                message,
                duration: 4000,
                position: 'bottom',
                buttons: [
                    {
                        text: 'Done',
                        role: 'cancel',
                        handler: () => {
                            console.log('Cancel clicked');
                        }
                    }
                ]
            }
        );
        toast.present();
    }

    async showCrawlDetail(id) {
        const modal = await this.modalCtrl.create({
            component: CrawlDetailsPage,
            componentProps: {crawl_id: id}
        });
        return await modal.present();
    }


}




