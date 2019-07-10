import { Component, OnInit} from '@angular/core';
import {BdService} from '../../bd.service'
import {Publicacao} from '../publicacao.model'
import * as firebase from 'firebase'

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css'],
  providers:[BdService]
})
export class PublicacoesComponent implements OnInit {
  public email:string;
  public publicacoes:Publicacao[] = [];

  constructor(private bdService:BdService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user:any)=>{
      this.email = user.email;
      this.atualizarTimeLine();
    })
   
  }

  public atualizarTimeLine():void {
    this.bdService.consultaPublicacoes(this.email)
      .then((publicacoes:Publicacao[])=> {
        this.publicacoes = publicacoes;
      })
  }

}
