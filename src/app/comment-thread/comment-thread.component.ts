import {Component, Input, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {CommentThreadProviderService} from '../_services/comment-thread-provider.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../_services/authentication-service.module';

@Component({
    selector: 'app-comment-thread',
    templateUrl: './comment-thread.component.html',
    styleUrls: ['./comment-thread.component.scss'],
})
export class CommentThreadComponent implements OnInit {

    @Input() subject: string;
    comments: any;
    commentForm: FormGroup;
    submitted = false;
    canAddComment = false;

    constructor(private formBuilder: FormBuilder,
                private modalCtrl: ModalController,
                private ctProvider: CommentThreadProviderService,
                private navParams: NavParams,
                private authService: AuthenticationService) {
    }

    get f() {
        return this.commentForm.controls;
    }

    ngOnInit() {
        this.ctProvider.get(this.navParams.get('ct_id')).subscribe(data => {
            this.comments = data.data.attributes.comments.data;
            if (this.authService.currentUserValue()) {
                this.canAddComment = data.data.attributes.can_comment;
            }
        });

        this.commentForm = this.formBuilder.group({
            comment: ['', [Validators.required]],
            note: ['', Validators.required]
        });
    }

    disposeModal() {
        this.modalCtrl.dismiss();
    }

    onSubmit() {
        // stop here if form is invalid
        if (this.commentForm.invalid) {
            return;
        }

        this.submitted = true;

        this.ctProvider.createComment(this.navParams.get('ct_id'), this.f.comment.value, this.f.note.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.comments.unshift(data.data);
                    this.canAddComment = false;
                });

    }


}
