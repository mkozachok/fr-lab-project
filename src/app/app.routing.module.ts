import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdditionalInfoComponent } from './additional-info/additional-info.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { RedactorPageComponent } from './redactor-page/redactor-page.component';
import { MakeOrderComponent } from './order-page/make-order/make-order.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { AboutMeComponent } from './profile-page/about-me/about-me.component';

const routes: Routes = [
    {
        path: '',
        component: HomepageComponent
    },
    {
        path: 'admin-page',
        component: AdminPageComponent,
        //canActivate: [AdminGuard]
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
        component: RegistrationPageComponent
    },
    {
        path: 'login-page',
        component: LoginPageComponent
    },
    {
        path: 'order-page',
        component: OrderPageComponent
    },
    {
        path: 'make-order',
        component: MakeOrderComponent
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
];
