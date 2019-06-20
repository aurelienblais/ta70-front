import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CrawlDetailsPage } from './crawl-details.page';

const routes: Routes = [
  {
    path: '',
    component: CrawlDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CrawlDetailsPage]
})
export class CrawlDetailsPageModule {}
