import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AlertController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';

import {GlobalVars} from '../clases/global';

import {LS} from '../clases/local_storage';
import { global } from '@angular/core/src/util';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,public alertCtrl:AlertController, public statusBar: StatusBar, public splashScreen: SplashScreen,public globalVars:GlobalVars) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Noticias', component: HomePage }
    ];

    if(LS.get('token'))
    {
      globalVars.log = true;
    }

  }

  cerrarSesion()
  {
    let confirm = this.alertCtrl.create({
      title:'Cerrar sesión',
      message:'Realmente desea cerrar sesión?',
      buttons:[
        {
          text:'Cancelar',
          handler:()=>{}
        },
        {
          text:'Salir',
          handler:()=>{
            LS.remove('token');
            this.globalVars.log = false;
            this.nav.setRoot(HomePage);
          }
        }
      ]
    });
    confirm.present();
  }
  entrada(tipo:number)
  {
    (tipo==1?this.nav.push(LoginPage):this.nav.push(RegisterPage));
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
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


}
