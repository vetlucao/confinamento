import { Injectable } from '@angular/core';

@Injectable()
export class GraficoLotesService {

  constructor() { }

  getPossuiMeta(tipo){
    return true;
  }
  
  getUnidade(tipo){
    return 'kg';
  }
  
  getY1(tipo){
    var medianas: number[];
    if(tipo == 1){
      /* medianas = [446.9, 505.5, 496.2, 569, 550.4, 491.7, 470.4, 481.6, 407.9, 464.4, 446.9, 505.5, 496.2, 569, 550.4, 491.7, 470.4, 481.6, 407.9, 464.4, 503, 538,5]; */
      medianas = [4,1,2,3];
    } else {
      medianas = [1.93, 1.98, 2.02, 1.93, 1.92, 1.95, 1.89, 2.23, 2.01, 2, 1.93, 1.98, 2.02, 1.93, 1.92, 1.95, 1.89, 2.23, 2.01, 2, 1.99, 1.85];
    }
    return medianas;
  }

  getY2(tipo){
    var meta: string[];
    if(tipo == 1){
      /* meta = ["500", "500", "500", "600", "600", "500", "500", "450", "450", "450", "500", "500", "500", "600", "600", "500", "500", "450", "450", "450", "500", "550"]; */
      meta = ["5","5","1","2"];
    } else {
      meta = ["2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2"];
    }
    return meta;
  }
  
  getE1(tipo){
    var variacao: number[];
    if(tipo == 1){
      /* variacao = [62, 46, 49, 38, 52, 55, 47, 58, 37, 35, 62, 46, 49, 38, 52, 55, 47, 58, 37, 35, 45, 20]; */
      variacao = [2,2,3,3];
    } else {
      variacao = [0.2, 0.2, 0.3, 0.2, 0.2, 0.2, 0.2, 0.3, 0.3, 0.3, 0.2, 0.2, 0.3, 0.2, 0.2, 0.2, 0.2, 0.3, 0.3, 0.3, 0.2, 0.2];
    }
    return variacao;
  }

  getX1(tipo){
    /* return ["lote 1", "lote 2", "lote 3", "lote 4", "lote 5", "lote 6", "lote 7", "lote 8", "lote 9", "lote 10", "lote 11", "lote 12", "lote 13", "lote 14", "lote 15", "lote 16", "lote 17", "lote 18", "lote 19", "lote 20", "lote 21", "lote 22"]; */
    return ["lote 1", "lote 2", "lote 3", "lote 4"];
  }
  
}
