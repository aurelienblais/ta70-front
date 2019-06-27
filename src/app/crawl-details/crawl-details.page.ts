import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CrawlProviderService} from '../_services/crawl-provider.service';
import {first} from 'rxjs/operators';
import {Crawl} from '../_models/crawl';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ModalController, NavParams} from '@ionic/angular';
import {AddFriendCrawlPage} from '../add-friend-crawl/add-friend-crawl.page';
import {AddPoiCrawlPage} from '../add-poi-crawl/add-poi-crawl.page';


@Component({
  selector: 'app-crawl-details',
  templateUrl: './crawl-details.page.html',
  styleUrls: ['./crawl-details.page.scss'],
})
export class CrawlDetailsPage implements OnInit {

  crawl: Crawl;
  crawlForm: FormGroup;
  crawUserslList: any[] = [{name: 'nom'},{name: 'nom'},{name: 'nom'},{name: 'nom'},{name: 'nom'},{name: 'nom'},{name: 'nom'},{name: 'nom'},{name: 'nom'},{name: 'nom'}];
  poiCrawlList:   any[] ;//= [{name: 'poi'},{name: 'poi'},{name: 'poi'},{name: 'poi'},{name: 'poi'},{name: 'poi'},{name: 'poi'},{name: 'poi'},{name: 'poi'},{name: 'poi'}];


  constructor(
      private route: ActivatedRoute,
      private crawlProviderService: CrawlProviderService,
      private formBuilder: FormBuilder,
      private modalCtrl: ModalController,
      private navParams: NavParams,

) { }

  ngOnInit() {

  this.loadCrawl();
  this.loadCrawlFrom();
  }

  loadCrawlFrom() {
    this.crawlForm = this.formBuilder.group({
      crawlname: ['', []],
      crawldate: ['', []],
    });
  }
  loadCrawl() {
    const id = this.navParams.get('crawl_id');

    if (id !== 0) {
      this.crawlProviderService.getCrawl(id).subscribe(data => {
        this.crawl = data.data;
        console.log(this.crawl); } );
    } else {
      this.crawl = new Crawl();
    }
  }

  get f() {
    return this.crawlForm.controls;
  }

  onSubmit() {

    this.crawlProviderService.createCrawl(this.crawl);
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
      component: AddPoiCrawlPage,
    });
    return await modal.present();
  }

  disposeModal() {
    this.modalCtrl.dismiss();
  }

}
