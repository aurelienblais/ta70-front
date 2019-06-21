import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-add-poi-crawl',
  templateUrl: './add-poi-crawl.page.html',
  styleUrls: ['./add-poi-crawl.page.scss'],
})
export class AddPoiCrawlPage implements OnInit {

  poiList: any[] = [{name: 'nom'}, {name: 'nom'}, {name: 'nom'},
    {name: 'nom'}, {name: 'nom'}, {name: 'nom'}, {name: 'nom'}, {name: 'nom'}, {name: 'nom'}, {name: 'nom'}];
  constructor(
      private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  disposeModal() {
    this.modalCtrl.dismiss();
  }

}
