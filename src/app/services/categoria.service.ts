import { HttpConfig } from './../entity/httpConfig';
import { Categoria } from './../entity/categoria';
import { HttpUtil } from './../../service/httpUtil';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoriaService {
    private categorias : Array<Categoria>;
    constructor(private httpUtil: HttpUtil) { }

    public getCategorias(callbackSucess, callbackError){
        if(this.categorias){
            callbackSucess(this.categorias);
        } else {
            // BUSCAR CATEGORIAS NO BANCO
            let url = HttpConfig.URL_PREFIX+"categoria/find_all";
            this.httpUtil.get(url, {}, response=>{
                let dados = JSON.parse(response.resposta);
                let lengthOfCategorias = dados.length;
                this.categorias = new Array<Categoria>();
                for(let i = 0 ; i < lengthOfCategorias ; i++){
                    this.categorias.push(new Categoria(dados[i].id, dados[i].nome));
                }

                callbackSucess(this.categorias);

            }, error=>{
                callbackError(error);
            });
        }
    }
    
}