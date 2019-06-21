import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddFriendCrawlPage } from './add-friend-crawl.page';

const routes: Routes = [
  {
    path: '',
    component: AddFriendCrawlPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddFriendCrawlPage]
})
export class AddFriendCrawlPageModule {}
