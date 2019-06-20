import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-crawl-details',
  templateUrl: './crawl-details.page.html',
  styleUrls: ['./crawl-details.page.scss'],
})
export class CrawlDetailsPage implements OnInit {

  crawl: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( params =>
        console.log(params.id)) ;

  }

}
