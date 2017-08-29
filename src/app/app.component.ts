import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { Users } from '../pages/users/users';
import { Treatments } from '../pages/treatments/treatments';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Home} from "../pages/home/home";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage:any = 'Login';
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public users : Users,
    public treatments : Treatments
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'בית', component: Home },
      /*{ title: 'Hello Ionic', component: HelloIonicPage },*/
      { title: 'מטופלים', component: ListPage },
      /*{ title: 'כל הטיפולים', component: ListPage },*/
      { title: 'התנתק', component: ListPage },
      /*{ title: 'users', component: Users },
      { title: 'treatments', component: Treatments }*/
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
