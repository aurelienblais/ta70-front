import {Component, OnInit} from '@angular/core';
import {CrawlProviderService} from '../_services/crawl-provider.service';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-crawls-view',
    templateUrl: './crawls-view.page.html',
    styleUrls: ['./crawls-view.page.scss'],
})

export class CrawlsViewPage implements OnInit {
    crawls: any;

    constructor(private crawlProviderService: CrawlProviderService, public toastController: ToastController) {
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
    }

    showCrawl(id) {
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

}




