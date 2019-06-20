import {Component, OnInit} from '@angular/core';
import {FriendsProviderService} from '../_services/friends-provider.service';
import {AlertController, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-friends',
    templateUrl: './friends.page.html',
    styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
    friends: any;
    requests: any;

    constructor(private friendsService: FriendsProviderService, private alertCtrl: AlertController, private toastCtrl: ToastController) {
    }

    ngOnInit() {
        this.friendsService.getFriends().subscribe(data => this.friends = data);
        this.friendsService.getFriendsRequests().subscribe(data => this.requests = data);
    }

    acceptRequest(id) {
        this.friendsService.acceptRequest(id).subscribe(user => {
            this.requests = this.requests.filter(e => e.id !== id);
            this.friends.push(user.data);
            const toast = this.toastCtrl.create({
                message: 'Ami ajouté',
                duration: 2000,
                color: 'success',
                position: 'top'
            });
            toast.then( toast => toast.present() );
        });
    }

    refuseRequest(id) {
        this.friendsService.refuseRequest(id).subscribe(_ => this.requests = this.requests.filter(e => e.id !== id));
        const toast = this.toastCtrl.create({
            message: 'Ami refusé',
            duration: 2000,
            color: 'danger',
            position: 'top'
        });
        toast.then( toast => toast.present() );
    }

    async confirmFriendDelete(id) {
        const alert = await this.alertCtrl.create({
            header: 'Voulez-vous supprimer cet ami ?',
            message: 'Vous pourrez l\'ajouter de nouveau plus tard en lui envoyant de nouveau une demande',
            buttons: [
                {
                    text: 'Non',
                    role: 'cancel'
                },
                {
                    text: 'Oui',
                    handler: () => {
                        this.friendsService.deleteFriend(id).subscribe(_ => this.friends = this.friends.filter(e => e.id !== id));
                        const toast = this.toastCtrl.create({
                            message: 'Ami supprimé',
                            duration: 2000,
                            color: 'success',
                            position: 'top'
                        });
                        toast.then( toast => toast.present() );
                    }
                }
            ]
        });
        await alert.present();
    }

    async addFriend() {
        const alert = await this.alertCtrl.create({
            header: 'Ajouter un ami',
            inputs: [
                {
                    name: 'mail',
                    type: 'email',
                    placeholder: 'E-mail'
                }
            ],
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: 'Ajouter',
                    handler: (data) => {
                        this.friendsService.addFriend(data.mail).subscribe(
                            user => {
                                const toast = this.toastCtrl.create({
                                    message: 'Demande envoyée',
                                    duration: 2000,
                                    color: 'success',
                                    position: 'top'
                                });
                                toast.then( toast => toast.present() );                            },
                            _ => {
                                const toast = this.toastCtrl.create({
                                    message: 'Utilisateur introuvable',
                                    duration: 2000,
                                    color: 'danger',
                                    position: 'top'
                                });
                                toast.then( toast => toast.present() );
                            }
                        );
                    }
                }
            ]
        });

        await alert.present();

    }
}
