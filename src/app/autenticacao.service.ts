import {Injectable} from '@angular/core'
import {Router} from '@angular/router'
import {Usuario} from './acesso/usuario.model'
import * as firebase from 'firebase'

const ID_TOKEN:string = 'idToken';

@Injectable()
export class AutenticacaoService {

    public token_id:string = null;
    public codigoErro:string = null;

    constructor(private router:Router) {}

    public cadastrarUsuario(usuario:Usuario):Promise<any> {
        this.codigoErro = null;
        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
        .then((resposta:any) => {
            
            delete usuario.senha;
            firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                .set(usuario).then((resp:any)=> {return resp});
        })
        .catch((erro:any)=>{this.codigoErro = erro.code});
    }

    public autenticar(email:string, senha:string):void {

        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta:any)=> {
                firebase.auth().currentUser.getIdToken()
                    .then((idToken:string)=>{
                        this.token_id = idToken;
                        localStorage.setItem(ID_TOKEN, idToken);
                        this.router.navigate(['/home'])
                    })
            }).catch((erro:any)=>{
                this.codigoErro = erro.code;
            });
    }

    public encerrarSessao():void {
        firebase.auth().signOut()
            .then((resposta:any)=>{
                this.token_id = null;
                localStorage.removeItem(ID_TOKEN);
                this.router.navigate(['/'])
            });
    }

    public autenticado():boolean {
        let token:string = localStorage.getItem(ID_TOKEN);
        if(token != null) {
            this.token_id = localStorage.getItem(ID_TOKEN)
        }
        if(this.token_id == null) {
            this.router.navigate(['/']);
        }
        return this.token_id != null;
    }
}