import { HttpConfig } from './../entity/httpConfig';
import { HttpUtil } from './../../service/httpUtil';
import { Especie } from './../entity/especie';
import { Injectable } from '@angular/core';
@Injectable()
export class EspecieService {
    private especies: Array<Especie>;

    constructor(private httpUtil: HttpUtil) { }

    public getEspecies(callbackSucess, callbackError) {
        if (this.especies) {
            callbackSucess(this.especies);
        } else {
            // BUSCAR ESPECIES NO SERVIDOR
            let url = HttpConfig.URL_PREFIX + "especie/find_all";
            this.httpUtil.get(url, {}, response => {
                let dados = JSON.parse(response.resposta);
                let lengthOfEspecies = dados.length;
                this.especies = new Array<Especie>();

                for(let i = 0 ; i < lengthOfEspecies ; i++){
                    let especie = new Especie(dados[i].id, dados[i].nome);
                    this.especies.push(especie);
                }

                callbackSucess(this.especies);

            }, error => {
                callbackError(error);
            });

        }
    }

}