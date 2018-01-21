import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { MiservicioService } from '../../services/miservicio.service';
import { HomePage } from '../home/home';

//Clases
import {LS} from '../../clases/local_storage';

//Injectables
import {GlobalVars} from '../../clases/global';
import { LoginPage } from '../login/login';

@Component({
  selector: 'register',
  templateUrl: 'register.html'
})
export class RegisterPage{
  form = {
    nombre:'',
    email:'',
    contrasena:'',
    ccontrasena:''
  };
  registrando = false;
  constructor(public toastCtrl:ToastController,public globalVars:GlobalVars,private servicio:MiservicioService,private navCtrl:NavController){}

  registrar()
  {
    if(this.form.nombre.split(' ').length<2)
    {
      this.mensaje('ingrese su nombre completo');
      return;
    }
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
    if(this.form.contrasena != this.form.ccontrasena)
    {
      this.mensaje('Las contraseñas no coinciden');
      return;
    }

    this.registrando = true;

    this.servicio.register(this.form).subscribe(
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
  irLogin()
  {
      this.navCtrl.push(LoginPage);
  }
}