import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ProfilePageComponent} from './profile-page/profile-page.component';

const routes: Routes = [
    {
        path: 'profile-page',
        component: ProfilePageComponent
    },
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
export const routingComponents = [ProfilePageComponent];