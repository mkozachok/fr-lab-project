import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule, routingComponents } from './app.routing.module';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgModel } from '@angular/forms';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { Ng2FilterPipeModule } from 'ng2-filter-pipe';

// firebase
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// App modules goes here
import { ProfilePageModule } from './profile-page/profile-page.module';

// App guards goes here
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

// App components goes here
import { HomepageComponent } from './homepage/homepage.component';
import { RedactorPageComponent } from './redactor-page/redactor-page.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component'
import { AddDesignComponent } from './components/admin-page/add-design/add-design.component';
import { AddProductComponent } from './components/admin-page/add-product/add-product.component';

// Materials modules goes here
import { MdCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdToolbarModule } from '@angular/material';
import { MdIconModule, MdIconRegistry } from '@angular/material';
import { MdGridListModule } from '@angular/material';
import { MdSidenavModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';
import { MdCardModule } from '@angular/material';
import { MdListModule } from '@angular/material';


import { MdExpansionModule } from '@angular/material';
import { MdTabsModule } from '@angular/material';
import { MdInputModule } from '@angular/material';

// Services goes here
import { UserService } from './services/user.service';
import { ProductsListService } from './services/products-list.service';
import { DesignService } from './services/design.service';
import { PosterComponent } from './homepage/poster/poster.component';

//pagination
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RedactorPageComponent,
    routingComponents,
    HeaderComponent,
    FooterComponent,
    PosterComponent,
    AddDesignComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    [MdButtonModule, MdCheckboxModule],
    AppRoutingModule,
    ProfilePageModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    MdIconModule,
    MdGridListModule,
    MdSidenavModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdExpansionModule,
    MdTabsModule,
    BrowserAnimationsModule,
    MdCardModule,
    MdListModule,
    HttpModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'kolibri'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    Ng2FilterPipeModule,
    HttpModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [UserService, ProductsListService, MdIconRegistry, DesignService, AuthGuard, AdminGuard],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
