import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {first} from 'rxjs/operators';
import {FriendsProviderService} from '../_services/friends-provider.service';

@Component({
  selector: 'app-add-friend-crawl',
  templateUrl: './add-friend-crawl.page.html',
  styleUrls: ['./add-friend-crawl.page.scss'],
})
export class AddFriendCrawlPage implements OnInit {

  friendList: any[] = [{name: 'nom'}, {name: 'nom'}, {name: 'nom'},
    {name: 'nom'}, {name: 'nom'}, {name: 'nom'}, {name: 'nom'}, {name: 'nom'}, {name: 'nom'}, {name: 'nom'}];

  constructor(
      private modalCtrl: ModalController,
      private friendsProviderService: FriendsProviderService,
  ) { }

  ngOnInit() {
   // this.friendsProviderService.getFriends().pipe(first()).subscribe( data => { this.friendList = data; console.log(data); } );
  }

  disposeModal() {
    this.modalCtrl.dismiss();
  }

}
