import { Injectable } from '@angular/core';

@Injectable()
export class GraficoDinamicaService {

  constructor() { }

  getY1(){
    return [1.9, 2.2, 2.1, 2.2];
  }

  getX1(){
    return ["23/Jul", "06/Aug", "20/Aug", "03/Set"];
  }

  getY2(){
    return [2.5, 2.6, 2.5, 2.6];
  }

  getY3(){
    return [2.2, 2.4, 2.3, 2.4];
  }

  getY4(){
    return [40, 42, 41, 42];
  }

  getY5(){
    return [44, 46, 45, 46];
  }

  getY6(){
    return [42, 44, 43, 44];
  }

  getY7(){
    return [38000, 42000, 46000, 50000];
  }

  getY8(){
    return [0, 2500, 5000, 7500];
  }
}
