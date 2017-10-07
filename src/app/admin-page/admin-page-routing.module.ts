import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AdminPageComponent } from './admin-page.component';
import { AddMenuComponent } from './add-menu';
import { RemoveMenuComponent } from './remove-menu';
import { NewOrdersComponent } from './new-orders';

import { AdminGuard } from '../guards/admin.guard';

const adminPageRoutes: Routes = [
    {
        path: 'admin-page',
        component: AdminPageComponent,
        canActivateChild: [AdminGuard],
        children: [
            {
                path: 'add-menu',
                component: AddMenuComponent
            },
            {
                path: 'remove-menu',
                component: RemoveMenuComponent
            },
            {
                path: 'new-orders',
                component: NewOrdersComponent
            }
            

        ]
    },



];

@NgModule({
    imports: [
        RouterModule.forChild(adminPageRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminPageRoutingModule { }
export const adminPageRoutingComponents = [AddMenuComponent, RemoveMenuComponent, NewOrdersComponent];

