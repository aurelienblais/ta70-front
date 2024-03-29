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
                path: 'crawls',
                children: [
                    {
                        path: '',
                        loadChildren: '../crawls-view/crawls-view.module#CrawlsViewPageModule'
                    }
                ]
            },

            {
                path: 'crawlDetails',
                children: [
                    {
                        path: 'tabs/crawldetails/:id',
                        loadChildren: '../crawl-details/crawl-details.module#CrawlDetailsPageModule'
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
                path: 'profile',
                children: [
                    {
                        path: '',
                        loadChildren: '../profile/profile.module#ProfilePageModule'
                    }
                ]
            },
            {
                path: 'friends',
                children: [
                    {
                        path: '',
                        loadChildren: '../friends/friends.module#FriendsPageModule'
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
