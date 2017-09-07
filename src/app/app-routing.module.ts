import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfilePageComponent } from './profile-page/profile-page.component';
import { MyOrdersComponent } from './profile-page/my-orders/my-orders.component';
import { MySettingsComponent } from './profile-page/my-settings/my-settings.component';
import { MyGalleryComponent } from './profile-page/my-gallery/my-gallery.component';
import { OrderPageComponent } from './order-page/order-page.component';


const routes: Routes = [
    {
        path: 'profile-page',
        component: ProfilePageComponent,
        children: [
            {
                path: 'my-orders',
                component: MyOrdersComponent
            },
            {
                path: 'my-settings',
                component: MySettingsComponent
            },
            {
                path: 'my-gallery',
                component: MyGalleryComponent
            }
        ]
    },
    {
        path: 'order-page',
        component: OrderPageComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{}
export const routingComponents = [ProfilePageComponent, MyOrdersComponent, MySettingsComponent, MyGalleryComponent, OrderPageComponent];