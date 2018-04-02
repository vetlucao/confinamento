import { HttpConfig } from './../entity/httpConfig';
import { Raca } from './../entity/raca';
import { HttpUtil } from './../../service/httpUtil';
import { Injectable } from '@angular/core';

@Injectable()
export class RacaService {
    private racas: Array<Raca>;
    constructor(private httpUtil: HttpUtil) { }

    getRacas(callbackSucess, callbackError) {
        if (this.racas) {
            callbackSucess(this.racas);
        } else {
            this.racas = new Array<Raca>();
            // BUSCAR RAÇAS NO BANCO
            let url = HttpConfig.URL_PREFIX + "raca/find_all";
            this.httpUtil.get(url, {}, response => {
                let dados = JSON.parse(response.resposta);
                let lengthOfRacas = dados.length;

                for (let i = 0; i < lengthOfRacas; i++) {
                    let raca = new Raca(dados[i].id, dados[i].nome, dados[i].peso);
                    raca.$idEspecie = dados[i].especie.id;
                    this.racas.push(raca);
                }

                callbackSucess(this.racas);

            }, error => {
                callbackError(error);
            });
        }
    }

}