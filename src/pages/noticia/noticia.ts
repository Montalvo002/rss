import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { MiservicioService } from '../../services/miservicio.service';

//Clases
import {Noticia} from '../../clases/noticia';
import {LS} from '../../clases/local_storage';

import { Text } from '@angular/compiler';
import { RegisterPage } from '../register/register';

import {GlobalVars} from '../../clases/global';
import { LoginPage } from '../login/login';
import { NavParams } from 'ionic-angular/navigation/nav-params';

@Component({
  selector: 'noticia',
  templateUrl: 'noticia.html'
})
export class NoticiaPage {
    noticia:Noticia;
    form = {
        comentario:'',
        id_usuario:LS.get('token')['id'],
        link:''
    };
  constructor(public navCtrl: NavController,public navParams:NavParams,public globalVars:GlobalVars, private miservicio: MiservicioService, public alertCtrl: AlertController) {
    this.noticia = this.navParams.get('noticia');
    this.form.link = this.noticia.link;
  }


  like(noticia:Noticia)
  {
    if(LS.get('token') == null)
    {
      /*No logueado*/
      let confirm = this.alertCtrl.create({
        title:'Ups.',
        message:'Inicia sesión para poder indicar que te gusta',
        buttons:[
          {
            text:'Mas tarde',
            handler:()=>{}
          },
          {
            text:'Iniciar Sesión',
            handler:()=>{
              this.navCtrl.setRoot(LoginPage);
            }
          }
        ]
      });
      confirm.present();
    }
    else
    {
      let usuario = LS.get('token');
      this.miservicio.post('auth/like',{id_usuario:usuario['id'],link:noticia.link}).subscribe(
        data=>{
          noticia.likes.push({usuario:usuario['nombre']});
          noticia.like = true;
        },
        error=>{
          console.log('Error D:');
        }
      );
    }
  }

  dislike(noticia:Noticia)
  {
    let usuario = LS.get('token');
    this.miservicio.post('auth/dislike',{id_usuario:usuario['id'],link:noticia.link}).subscribe(
      data=>{
        noticia.likes.pop();
        noticia.like = false;
        console.log(data);
      },
      error=>{
        console.log('Error D:');
      }
    );
  }

  comentar(noticia:Noticia)
  {
    if(this.form.comentario.length == 0){return;}
    this.noticia.comentary.unshift({comentario:this.form.comentario,usuario:LS.get('token')['nombre']});
    this.miservicio.post('auth/comentario',this.form).subscribe(
      data=>{
        console.log(data);
      },
      error=>console.log('Error D:')
    );
    this.form.comentario = '';
  }
}
