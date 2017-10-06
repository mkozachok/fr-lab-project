import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ProfilePageComponent } from './profile-page.component';
import { MyGalleryComponent } from './my-gallery';
import { MyOrdersComponent } from './my-orders';
import { AboutMeComponent } from './about-me';
import { AuthGuard } from '../guards';


const profilePageRoutes: Routes = [
    {
        path: 'profile-page',
        component: ProfilePageComponent,
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'about-me',
                component: AboutMeComponent
            },
            {
                path: 'my-gallery',
                component: MyGalleryComponent
            },
            {
                path: 'my-orders',
                component: MyOrdersComponent
            },

        ]
    },


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

