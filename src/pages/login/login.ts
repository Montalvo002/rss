import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { MiservicioService } from '../../services/miservicio.service';
import { HomePage } from '../home/home';

//Clases
import {LS} from '../../clases/local_storage';

//Injectables
import {GlobalVars} from '../../clases/global';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage{
  form = {
    email:'',
    contrasena:'',
  };
  registrando = false;
  constructor(public toastCtrl:ToastController,public globalVars:GlobalVars,private servicio:MiservicioService,private navCtrl:NavController){}

  login()
  {
    if(this.form.email.length < 8)
    {
      this.mensaje('Ingrese su e-mail');
      return;
    }
    if(this.form.contrasena.length<8)
    {
      this.mensaje('Su contraseña debe llevar al menos 8 caracteres');
      return;
    }

    this.registrando = true;

    this.servicio.login(this.form).subscribe(
      data=>{
        if(data.status==200)
        {
          this.mensaje(data.message);
          LS.set('token',data.token);
          this.globalVars.log = true;
          this.navCtrl.setRoot(HomePage);
        }
        else
        {
          this.mensaje(data.message);
          this.registrando = false;
        }
      },
      error=>this.mensaje('Error de conexión')
    );

  }
  mensaje(texto:string)
  {
    let mensaje = this.toastCtrl.create({
      message:texto,
      duration:3000
    });
    mensaje.present();
  }
  irRegistro()
  {
      this.navCtrl.push(RegisterPage);
  }
}