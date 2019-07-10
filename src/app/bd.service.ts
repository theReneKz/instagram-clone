import {Injectable} from '@angular/core'
import {Publicacao} from './home/publicacao.model'
import {ProgressoService} from './progresso.service'
import * as firebase from 'firebase'
import { resolve } from 'dns';

@Injectable()
export class BdService {
    constructor(private progressoService:ProgressoService){}
    public publicar(publicacao:Publicacao):void {
        let nomeImagem = Date.now();
        publicacao.url = `imagens/${btoa(publicacao.email)}/${nomeImagem}`;
        this.progressoService.porcentagem = 0;
        firebase.storage().ref()
            .child(publicacao.url)
            .put(publicacao.imagem)
            .on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot:any)=>{
                    this.progressoService.progressoEmAndamento()
                    this.progressoService.porcentagem = Math.round((snapshot.bytesTransferred / snapshot.totalBytes ) * 100);
                },
                (erro:any)=>{this.progressoService.erroProcesso()},
                ()=>{
                    delete publicacao.imagem;
                    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
                        .push(publicacao);
                    this.progressoService.finalizarProgresso();
                }
            )
    }

    public consultaPublicacoes(email:string):Promise<Publicacao[]> {
        return firebase.database().ref(`publicacoes/${btoa(email)}`)
            .once('value')
            .then((snapshot:any)=>{
                let listPublicacao:Publicacao[] = [];
                snapshot.forEach((childSnapshot:any)=>{
                    //console.log("child: " + childSnapshot.val());
                    let publicacao:Publicacao = new Publicacao();
                    publicacao.titulo = childSnapshot.val().titulo;
                    publicacao.data = childSnapshot.val().data;
                    firebase.storage().ref()
                        .child(childSnapshot.val().url)
                        .getDownloadURL()
                        .then((url:string)=>{
                            //console.log(url);
                            publicacao.url = url;
                            firebase.database().ref(`usuario_detalhe/${btoa(email)}`)
                                .once('value')
                                .then((userSnapshot:any)=>{
                                    //console.log(userSnapshot.val());
                                    publicacao.usuario = userSnapshot.val().nome_usuario;
                                    listPublicacao[listPublicacao.length] = publicacao
                                    listPublicacao =  listPublicacao.sort((a:Publicacao, b:Publicacao) => {return b.data - a.data;});
                                })
                        })
                });
                return listPublicacao;
            })
    }
}