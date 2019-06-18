import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {BarathonViewPage} from './barathon-view.page';

const routes: Routes = [
    {
        path: '',
        component: BarathonViewPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [BarathonViewPage]
})
export class BarathonViewPageModule {
}
