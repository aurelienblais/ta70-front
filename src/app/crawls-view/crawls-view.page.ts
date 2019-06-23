import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {CrawlProviderService} from '../_services/crawl-provider.service';
import { ToastController } from '@ionic/angular';
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-crawls-view',
    templateUrl: './crawls-view.page.html',
    styleUrls: ['./crawls-view.page.scss'],
})

export class CrawlsViewPage implements OnInit {

  crawlList: any[] = [
      { titre: 'test', test: 'test'}, { titre: 'test2', test: 'test'},
      { titre: 'test', test: 'test'}, { titre: 'test2', test: 'test'},
      { titre: 'test', test: 'test'}, { titre: 'test2', test: 'test'},
      { titre: 'test', test: 'test'}, { titre: 'test2', test: 'test'},
      { titre: 'test', test: 'test'}, { titre: 'test2', test: 'test'},
      { titre: 'test', test: 'test'}, { titre: 'test2', test: 'test'},
      { titre: 'test', test: 'test'}, { titre: 'test2', test: 'test'},
      { titre: 'test', test: 'test'}, { titre: 'test2', test: 'test'},
      { titre: 'test', test: 'test'}, { titre: 'test2', test: 'test'},
      { titre: 'test', test: 'test'}, { titre: 'test2', test: 'test'},
      { titre: 'test', test: 'test'}, { titre: 'test2', test: 'test'},
      { titre: 'test', test: 'test'}, { titre: 'test2', test: 'test'},
      { titre: 'test', test: 'test'}, { titre: 'test2', test: 'test'},
      { titre: 'test', test: 'test'}, { titre: 'test2', test: 'test'},
      { titre: 'test', test: 'test'}, { titre: 'test2', test: 'test'},
      { titre: 'test', test: 'test'}, { titre: 'test2', test: 'test'},
      { titre: 'test', test: 'test'}, { titre: 'test2', test: 'test'},
      { titre: 'test', test: 'test'}, { titre: 'test2', test: 'test'},
      { titre: 'test', test: 'test'}, { titre: 'test2', test: 'test'},
      { titre: 'test', test: 'test'}, { titre: 'test2', test: 'test'},
      { titre: 'test', test: 'test'}, { titre: 'test2', test: 'test'},
      { titre: 'test', test: 'test'}, { titre: 'test2', test: 'test'},
      ];

  constructor(private crawlProviderService: CrawlProviderService, public toastController: ToastController) { }

  ngOnInit() {
  }

  showCrawls() {
      this.crawlProviderService.getPublicCrawls()
          .pipe(first())
          .subscribe(
              data => {
                for ( const  crawl of data) { this.addToList(crawl); }
              },
              error => { console.log(error); }
          );
    }

  addToList( crawl) {
    this.crawlList.push(crawl);
  }
    vision(item) {
        this.visionToast();
    }

    duplicate( crawl) {
        this.duplicateToast();
    }

    delete( crawl){
      this.deleteToast();
    }
    async visionToast() {
        this.showToast('Barathon passé en privé/publique');
    }

    async duplicateToast() {
        this.showToast('Barathon dupliqué');
    }


    async deleteToast() {
        this.showToast('Barathon supprimé' );
    }

    async showToast( message ) {

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




