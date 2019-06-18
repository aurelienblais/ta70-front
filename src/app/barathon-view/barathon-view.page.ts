import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {CrawlProviderService} from '../_services/crawl-provider.service';


@Component({
  selector: 'app-barathon-view',
  templateUrl: './barathon-view.page.html',
  styleUrls: ['./barathon-view.page.scss'],
})
export class BarathonViewPage implements OnInit {

  constructor(private crawlProviderService: CrawlProviderService ) { }

  ngOnInit() {
  }

  /*showCrawls()
  {
    this.crawlProviderService.getCrawls(1)
        .pipe(first())
        .subscribe(
            data => {
              for ( const  poi of data) { this.addMarkerOnMap(poi); }
            },
            error => { console.log('error'); }
        );
  }*/

}
