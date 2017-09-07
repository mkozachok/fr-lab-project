import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';


import { ProfilePageComponent } from './profile-page.component';
import { MyGalleryComponent } from './my-gallery/my-gallery.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MySettingsComponent } from './my-settings/my-settings.component';


const profilePageRoutes: Routes = [
    {
        path: '',
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
                path: 'my-settings',
                component: MySettingsComponent
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
export const profilePageRoutingComponents = [MyGalleryComponent, MyOrdersComponent, MySettingsComponent];