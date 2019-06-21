import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-crawls-view',
    templateUrl: './crawls-view.page.html',
    styleUrls: ['./crawls-view.page.scss'],
})
export class CrawlsViewPage implements OnInit {

    constructor() {
    }

    ngOnInit() {
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

}
