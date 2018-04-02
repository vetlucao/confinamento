import { HttpConfig } from './../entity/httpConfig';
import { HttpUtil } from './../../service/httpUtil';
import { Lote } from './../entity/lote';
import { Injectable } from "@angular/core";

@Injectable()
export class LoteService {
    private lotes: Array<Lote>;
    constructor(private httpUtil: HttpUtil) { }


    public getLotes(idFazenda: number, callbackSucess, callbackError) {
        if (this.lotes) {
            callbackSucess(this.lotes);
        } else {
            // BUSCAR LOTES NO BANCO            
            let url = HttpConfig.URL_PREFIX + "lote/find_by_fazenda?idFazenda=" + idFazenda;
            this.httpUtil.get(url, {}, response => {
                let dados = JSON.parse(response.resposta);
                let lengthOfLotes = dados.length;
                this.lotes = new Array<Lote>();
                for (let i = 0; i < lengthOfLotes; i++) {
                    let lote = new Lote(dados[i].id, dados[i].nome);
                    lote.$idCurral = dados[i].idCurral;
                    this.lotes.push(lote);
                }
                console.log(response);
                callbackSucess(this.lotes);
            }, error => {
                console.error(error);
                callbackError(error);
            });

        }

    }
}