import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AppComponent } from './app.component';

const routes: Routes = [
    {
        path: 'profile-page',
        component: ProfilePageComponent,
    }
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{}
export const routingComponents = [ProfilePageComponent];