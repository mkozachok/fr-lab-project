import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';


import { AdminPageComponent } from './admin-page.component';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { RemoveMenuComponent } from './remove-menu/remove-menu.component'

import { AuthGuard } from '../guards/auth.guard';

const adminPageRoutes: Routes = [
    {
        path: 'admin-page',
        component: AdminPageComponent,
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'add-menu',
                component: AddMenuComponent
            },
            {
                path: 'remove-menu',
                component: RemoveMenuComponent
            },
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
export const adminPageRoutingComponents = [AddMenuComponent, RemoveMenuComponent];

