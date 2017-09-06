import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from './../providers/auth-service';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { Users } from '../pages/users/users';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Treatments} from "../pages/treatments/treatments";
import {ClientService} from "../providers/client-service";
import {TreatmentService} from "../providers/treatment-service";
import {AudioRecorder} from "../providers/AudioRecorder";
import {ClientsRepo} from "./clients/clients.repo";
import {UsersRepo} from "./users/users.repo";
import { HttpModule } from '@angular/http';
import {Home} from "../pages/home/home";
import {File} from '@ionic-native/file';
import {HomeModule} from "../pages/home/home.module";

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    Users,
    Treatments,

  ],
  imports: [
    BrowserModule,
    HomeModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    Users,
    Treatments
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AudioRecorder,
    AuthService,
    TreatmentService,
    Users,
    Treatments,
    ClientService,
    ClientsRepo,
    UsersRepo,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    File,
  ]
})
export class AppModule {}
