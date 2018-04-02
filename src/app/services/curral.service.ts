import { HttpUtil } from './../../service/httpUtil';
import { HttpConfig } from './../entity/httpConfig';
import { Curral } from './../entity/curral';
import { Injectable } from '@angular/core';
@Injectable()
export class CurralService {
    private currais: Array<Curral>;

    constructor(private httpUtil: HttpUtil) { }

    public getCurrais(idFazenda: number, callbackSucess, callbackError) {
        if (this.currais) {
            callbackSucess(this.currais);
        } else {
            // BUSCAR CURRAIS NO SERVIDOR
            let idFazenda = 1;
            let url = HttpConfig.URL_PREFIX + "curral/find_all_by_fazenda?idFazenda=" + idFazenda;

            this.httpUtil.get(url, {}, response => {
                let dados = JSON.parse(response.resposta);
                let lengthOfDados = dados.length;
                this.currais = new Array<Curral>();

                for(let i = 0 ; i < lengthOfDados ; i++){
                    let curral = new Curral();
                    curral.$id = dados[i].id;
                    curral.$nome = dados[i].nome;
                    curral.$idFazenda = dados[i].idFazenda;
                    curral.$ativo = dados[i].ativo;

                    this.currais.push(curral);
                }

                callbackSucess(this.currais);

            }, error => {
                callbackError(error);
            });
        }
    }
}