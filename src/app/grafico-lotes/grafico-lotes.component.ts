import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as _ from 'lodash';
import * as Plotly from 'plotly.js';
import { GraficoLotesService } from './grafico-lotes.service';
import { GraficoLotes } from './grafico-lotes';

@Component({
  selector: 'app-grafico-lotes',
  templateUrl: './grafico-lotes.component.html',
  styleUrls: ['./grafico-lotes.component.css'],
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class GraficoLotesComponent implements OnInit {

  @ViewChild('chartLotes') graficoLotes: ElementRef;
  @Input() tipo: number;
  @Input() titulo: string;
  @Input() lotePlotlyId : string;

  data: any;
  layout: any;

  possuiMeta: boolean;
  unidade: string;
  y1;
  x1;
  e1;
  l1;
  y2;
  l2;
  infoMediana;
  infoMeta;

  dadosGrafico: Array<GraficoLotes> = new Array<GraficoLotes>();

  ordemSelecionada: string;

  ordem = [
    { value: 'lote', viewValue: 'Lote' },
    { value: 'peso', viewValue: 'Peso' },
    { value: 'meta', viewValue: 'Meta' }
  ];

  constructor(private graficoLotesService: GraficoLotesService) { }

  ngOnInit() {
    this.possuiMeta = this.graficoLotesService.getPossuiMeta(this.tipo);
    this.unidade = this.graficoLotesService.getUnidade(this.tipo);
    this.y1 = this.graficoLotesService.getY1(this.tipo);
    this.y2 = this.graficoLotesService.getY2(this.tipo);
    this.e1 = this.graficoLotesService.getE1(this.tipo);
    this.x1 = this.graficoLotesService.getX1(this.tipo);

    this.l1 = this.y1.map((y1i, i) => ` Mediana:<br> ${y1i} ${this.unidade} ± ${this.e1[i]} ${this.unidade} `);
    this.l2 = this.y2.map((y2i, i) => ` Meta: ${y2i} ${this.unidade} `);

    this.armazenarDados();

    this.geraGrafico();
  }

  armazenarDados() {
    console.info("Armazenar dados");
    let lenghtOfDados = this.x1.length;
    this.dadosGrafico.length = 0;

    for (let i = 0; i < lenghtOfDados; i++) {

      let dadoGrafico = new GraficoLotes();

      dadoGrafico.$valor = this.y1[i];
      dadoGrafico.$meta = this.y2[i];
      dadoGrafico.$variacao = this.e1[i];
      dadoGrafico.$lote = this.x1[i];
      dadoGrafico.$isMeta = this.possuiMeta;
      dadoGrafico.$unidade = this.unidade;

      this.dadosGrafico.push(dadoGrafico);
    }
  }

  ordenarPorValor() {
    this.dadosGrafico.sort();
  }

  montarArrays() {
    console.info("kuririn");
    let lenghtOfDados = this.dadosGrafico.length;
    this.y1 = new Array<any>();
    this.x1 = new Array<any>();
    this.y2 = new Array<any>();
    this.e1 = new Array<any>();   
    
    this.infoMediana = [];
    this.infoMeta = [];

    for (let i = 0; i < lenghtOfDados; i++) {
      let dadoGrafico = this.dadosGrafico[i];
      this.y1.push(dadoGrafico.$valor);
      this.x1.push(dadoGrafico.$lote);
      this.y2.push(dadoGrafico.$meta);
      this.e1.push(dadoGrafico.$variacao);
      this.infoMediana.push(dadoGrafico.getHoverInfo()[0]);
      this.infoMeta.push(dadoGrafico.getHoverInfo()[1]);
    }
  }

  geraGrafico() {
    this.data = [{
      y: this.y1,
      x: this.x1,
      error_y: {
        type: "data",
        array: this.e1,
        width: 0,
        thickness: 2.5
      },
      uid: "654dee",
      mode: "markers",
      marker: {
        size: 8
      },
      type: "scatter",
      text: this.l1,
      hoverinfo: "text"
    }
    ];

    if (this.possuiMeta) {
      this.data.push({
        mode: "markers",
        y: this.y2,
        x: this.x1,
        marker: {
          size: 9,
          symbol: "x",
          opacity: 1,
          color: "red",
          line: {
            color: "white",
            width: 1
          }
        },
        text: this.l2,
        hoverinfo: "text"
      });
    }

    this.layout = {
      height: 150,
      width: "100%",
      margin: {
        l: 30,
        r: 20,
        t: 0,
        b: 30,
        pad: 0
      },
      autosize: false,
      colorway: {
        0: "#1f77b4",
        1: "#FF0000"
      },
      showlegend: false,
      xaxis: {
        tickfont: {
          family: "Arial"
        },
        zeroline: false,
        domain: [
          "0",
          "1"
        ]
      },
      yaxis: {
        zeroline: false,
        domain: [
          "0",
          "1"
        ]
      }
    };

    var d3 = Plotly.d3;
    var gd3 = d3.select(this.graficoLotes.nativeElement);
    var gd = gd3.node();

    Plotly.react(gd, this.data, this.layout, { displayModeBar: false });

    var largura = this.graficoLotes.nativeElement.offsetWidth;
    var update = {
      width: largura
    };
    Plotly.relayout(gd, update);

  }

  onResize() {
    var d3 = Plotly.d3;
    var gd3 = d3.select(this.graficoLotes.nativeElement);
    var gd = gd3.node();

    Plotly.react(gd, this.data, this.layout, { displayModeBar: false });

    var largura = this.graficoLotes.nativeElement.offsetWidth;
    var update = {
      width: largura
    };
    Plotly.relayout(gd, update);
  } 

  onChangeViwer(valor) {
    /* alert(this.ordemSelecionada + this.tipo); */
    if (this.ordemSelecionada == 'peso') {

      this.dadosGrafico.sort(function (a, b) {
        if (a.$valor > b.$valor) {
          return 1;
        }
        if (a.$valor < b.$valor) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });

    } else if (this.ordemSelecionada == 'meta') {
      this.dadosGrafico.sort(function (a, b) {
        if (a.$meta > b.$meta) {
          return 1;
        }
        if (a.$meta < b.$meta) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    } else if (this.ordemSelecionada == 'lote') {
      this.dadosGrafico.sort(function (a, b) {
        if (a.$lote > b.$lote) {
          return 1;
        }
        if (a.$lote < b.$lote) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    }

    console.info("montar array");
    this.montarArrays();  

    var update = {
      x: [this.x1],
      y: [this.y1, this.y2],
      'error_y.array': [this.e1, undefined],
      text: [this.infoMediana,this.infoMeta]
    };
    Plotly.restyle(this.lotePlotlyId, update)
  }
}