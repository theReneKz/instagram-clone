import { Component, OnInit, ViewChild } from '@angular/core';
import {AutenticacaoService} from '../autenticacao.service'
import {ProgressoService} from '../progresso.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('publicacoes') public publicacoes:any;

  constructor(private autenticacaoService:AutenticacaoService, private progressoService:ProgressoService) { }

  ngOnInit() {
  }

  public encerrarSessao():void {
    this.autenticacaoService.encerrarSessao();
  }

  public novaPublicacao():void {
    this.progressoService.restartProgresso()
  }

  public atualizarTimeLine():void {
    this.publicacoes.atualizarTimeLine();
  }
}
