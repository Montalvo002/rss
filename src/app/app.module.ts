import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

/*Componentes */
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RegisterPage } from '../pages/register/register';
import { LoginPage} from '../pages/login/login';
import { NoticiaPage} from '../pages/noticia/noticia';

/* Cosas que ya venían :v */
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

/* Servicios */
import {MiservicioService} from '../services/miservicio.service';

/*Injectables */
import {GlobalVars} from '../clases/global';

@NgModule({
  declarations: [
    MyApp,

    //Paginas
    HomePage,
    ListPage,
    RegisterPage,
    LoginPage,
    NoticiaPage,
    //Componentes
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    LoginPage,
    NoticiaPage
  ],
  providers: [
    MiservicioService,
    StatusBar,
    SplashScreen,
    GlobalVars,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
