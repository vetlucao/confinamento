import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as _ from 'lodash';
import * as Plotly from 'plotly.js';
import { GraficoLotesService } from './grafico-lotes.service';

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

    this.geraGrafico();
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

    Plotly.plot(gd, this.data, this.layout, { displayModeBar: false });

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

    Plotly.plot(gd, this.data, this.layout, { displayModeBar: false });

    var largura = this.graficoLotes.nativeElement.offsetWidth;
    var update = {
      width: largura
    };
    Plotly.relayout(gd, update);
  }

  ordenar() {
    var update = {
      y: [[10,20,30], [30,15,20]],
      'error_y.array': [[20,12,10], undefined],
      text: [" Mediana:<br> 10 kg ± 20 kg ", " Mediana:<br> 20 kg ± 12 kg ", " Mediana:<br> 30 kg ± 10 kg ", " Meta: 30 kg ", " Meta: 15 kg ", " Meta: 20 kg "]
    };
    Plotly.restyle('lotePlotly', update)
  }
}