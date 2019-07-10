import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {Publicacao} from '../publicacao.model'
import {BdService} from '../../bd.service'
import {Subscription, interval} from 'rxjs'
import {ProgressoService} from '../../progresso.service'
import * as firebase from 'firebase'

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css'],
  providers:[BdService]
})
export class IncluirPublicacaoComponent implements OnInit {
  public formPost:FormGroup = new FormGroup({
    'titulo': new FormControl(null, [Validators.required])
  });
  private email:string;
  private imagem:any = null;
  @Output() public atualizarTimeLine:EventEmitter<any> = new EventEmitter<any>();

  constructor(private bdService:BdService, public progressoService:ProgressoService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user:any)=>{
      this.email = user.email;
    })
  }

  publicar():void {
    if(this.formPost.valid && this.imagem != null && this.imagem.length > 0) {
      let acompanhamentoUpload = interval(500);
      let continua:Subscription = new Subscription();
  
      
      let publicacao:Publicacao = new Publicacao();
      publicacao.titulo = this.formPost.value.titulo;
      publicacao.email = this.email;
      publicacao.data = new Date().getTime();
      publicacao.imagem = this.imagem[0];

      this.bdService.publicar(publicacao);
      this.atualizarTimeLine.emit();
    } else {
      Object.keys(this.formPost.controls).forEach(key => {
        this.formPost.get(key).markAsTouched();
      })
    }
    
  }

  public preparaImagemUpload(evento:Event):void {
    this.imagem = (<HTMLInputElement>evento.target).files;
  }
}
