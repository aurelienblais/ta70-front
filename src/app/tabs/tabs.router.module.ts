import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'mapscreen',
                children: [
                    {
                        path: '',
                        loadChildren: '../mapscreen/mapscreen.module#MapscreenPageModule'
                    }
                ]
            },
            {
                path: 'login',
                children: [
                    {
                        path: '',
                        loadChildren: '../login/login.module#LoginPageModule'
                    }
                ]
            },
            {
                path: 'register',
                children: [
                    {
                        path: '',
                        loadChildren: '../register/register.module#RegisterPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/mapscreen',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/mapscreen',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
