import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams, ToastController} from '@ionic/angular';
import {first} from 'rxjs/operators';
import {FriendsProviderService} from '../_services/friends-provider.service';
import {CrawlUserProviderService} from '../_services/crawl-user-provider.service';

@Component({
    selector: 'app-add-friend-crawl',
    templateUrl: './add-friend-crawl.page.html',
    styleUrls: ['./add-friend-crawl.page.scss'],
})
export class AddFriendCrawlPage implements OnInit {
    friendList: any;

    constructor(
        private modalCtrl: ModalController,
        private friendsProviderService: FriendsProviderService,
        private crawlUserService: CrawlUserProviderService,
        private navParams: NavParams,
        private toastCtrl: ToastController
    ) {
    }

    ngOnInit() {
        this.friendsProviderService.getFriends().pipe(first()).subscribe(data => {
            this.friendList = data;
            this.navParams.get('friend_ids').forEach(id => this.friendList = this.friendList.filter(e => e.attributes.friend.id !== id));
        });
    }

    invite(id) {
        this.crawlUserService.createCrawlUser(this.navParams.get('crawl_id'), id).subscribe(_ => {
            this.friendList = this.friendList.filter(e => e.attributes.friend.id !== id);
            const toast = this.toastCtrl.create({
                message: 'Ami ajouté !',
                duration: 2000,
                color: 'success',
                position: 'top'
            });
            toast.then(toast => toast.present());
        });
    }

    disposeModal() {
        this.modalCtrl.dismiss();
    }

}
