import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CrawlProviderService} from '../_services/crawl-provider.service';
import {first} from 'rxjs/operators';
import {Crawl} from '../_models/crawl';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {AddFriendCrawlPage} from '../add-friend-crawl/add-friend-crawl.page';
import {AddPoiCrawlPage} from '../add-poi-crawl/add-poi-crawl.page';


@Component({
  selector: 'app-crawl-details',
  templateUrl: './crawl-details.page.html',
  styleUrls: ['./crawl-details.page.scss'],
})
export class CrawlDetailsPage implements OnInit {

  crawl: any;
  crawlForm: FormGroup;
  crawUserslList: any[] = [{name: 'nom'},{name: 'nom'},{name: 'nom'},{name: 'nom'},{name: 'nom'},{name: 'nom'},{name: 'nom'},{name: 'nom'},{name: 'nom'},{name: 'nom'}];
  poiCrawlList:   any[] = [{name: 'poi'},{name: 'poi'},{name: 'poi'},{name: 'poi'},{name: 'poi'},{name: 'poi'},{name: 'poi'},{name: 'poi'},{name: 'poi'},{name: 'poi'}];


  constructor(
      private route: ActivatedRoute,
      private crawlProviderService: CrawlProviderService,
      private formBuilder: FormBuilder,
      private modalCtrl: ModalController
  ) { }

  ngOnInit() {

    this.crawlForm = this.formBuilder.group({
      crawlname: ['', []],
      crawldate: ['', []],

    });

    this.route.params.subscribe( params => {

        if (params.id === '0') {
          this.crawl = new Crawl();
        } else {
           this.crawlProviderService.getCrawl(params.id).pipe(first()).subscribe( data => { this.crawl = data; console.log(data); } );
        }
    }
        );

  }

  get f() {
    return this.crawlForm.controls;
  }

  onSubmit() {
    console.log('submited');

    console.log(this.f.crawlname.value);
  }

  async presentAddFriendCrawl() {
    const modal = await this.modalCtrl.create({
      component: AddFriendCrawlPage,
    });
    return await modal.present();
  }

  async presentAddPoiCrawl() {
    const modal = await this.modalCtrl.create({
      component: AddFriendCrawlPage,
    });
    return await modal.present();
  }

}
