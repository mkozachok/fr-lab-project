import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';


import { ProfilePageComponent } from './profile-page.component';
import { MyGalleryComponent } from './my-gallery/my-gallery.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AboutMeComponent } from './about-me/about-me.component';


const profilePageRoutes: Routes = [
    {
        path: 'profile-page',
        component: ProfilePageComponent,
        children: [
            {
                path: 'my-gallery',
                component: MyGalleryComponent
            },
            {
                path: 'my-orders',
                component: MyOrdersComponent
            },
            {
                path: 'about-me',
                component: AboutMeComponent
            }
        ]
    }

];

@NgModule({
    imports: [
        RouterModule.forChild(profilePageRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProfilePageRoutingModule { }
export const profilePageRoutingComponents = [MyGalleryComponent, MyOrdersComponent, AboutMeComponent];

