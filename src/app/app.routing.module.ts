import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdditionalInfoComponent } from './additional-info/additional-info.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { RedactorPageComponent } from './redactor-page/redactor-page.component';
import { MakeOrderComponent } from './order-page/make-order/make-order.component';
import { AdminPageComponent } from './admin-page';

import { ProfilePageComponent, AboutMeComponent } from './profile-page';
import {
    AdminGuard,
    AuthGuard,
    UnregisteredGuard,
    OrderGuard
} from './guards';

const routes: Routes = [
    {
        path: '',
        component: HomepageComponent
    },
    {
        path: 'admin-page',
        component: AdminPageComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'profile-page',
        canActivate: [AuthGuard],
        component: ProfilePageComponent,
        children: [
            {
                path: '',
                redirectTo: 'about-me',
                pathMatch: 'prefix'
            },
            {
                path: 'about-me',
                component: AboutMeComponent
            }
        ]

    },
    {
        path: 'redactor-page',
        canActivate: [AuthGuard],
        component: RedactorPageComponent
    },
    {
        path: 'registration-page',
        component: RegistrationPageComponent,
        canActivate: [UnregisteredGuard]
    },
    {
        path: 'login-page',
        component: LoginPageComponent,
        canActivate: [UnregisteredGuard]
    },
    {
        path: 'order-page',
        component: OrderPageComponent
    },
    {
        path: 'make-order',
        component: MakeOrderComponent,
        canActivate: [OrderGuard]
    },
    {
        path: 'additional-info',
        component: AdditionalInfoComponent
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
export class AppRoutingModule { }
export const routingComponents = [
    HomepageComponent,
    AdminPageComponent,
    ProfilePageComponent,
    RegistrationPageComponent,
    OrderPageComponent,
    LoginPageComponent,
    RedactorPageComponent,
    MakeOrderComponent,
    AdditionalInfoComponent
];
