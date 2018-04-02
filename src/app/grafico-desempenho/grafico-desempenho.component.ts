import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as _ from 'lodash';
import * as Plotly from 'plotly.js';
import { GraficoDesempenhoService } from './grafico-desempenho.service';

@Component({
  selector: 'app-grafico-desempenho',
  templateUrl: './grafico-desempenho.component.html',
  styleUrls: ['./grafico-desempenho.component.css'],
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class GraficoDesempenhoComponent implements OnInit {

  @ViewChild('chartDesempenho') graficoDesempenho: ElementRef;
  
  constructor(private graficoDesempenhoService: GraficoDesempenhoService) {}

  data:any;
  layout:any;

  y1;
  x1;
  l1;
  y2;
  l2;
  y3;
  x2;
  l3;

  ngOnInit() {
    this.y1 = this.graficoDesempenhoService.getY1();
    this.y2 = this.graficoDesempenhoService.getY2();
    this.y3 = this.graficoDesempenhoService.getY3();
    this.x1 = this.graficoDesempenhoService.getX1();
    this.x2 = this.graficoDesempenhoService.getX2();

    this.l1 = this.y1.map((y1i, i) => ` ${y1i}kg<br> ${this.x1[i]} `);
    this.l2 = this.y2.map((y2i, i) => ` ${y2i}kg<br> ${this.x1[i]} `);
    this.l3 = this.y3.map((y3i, i) => ` ${y3i}kg<br> ${this.x2[i]} `);

    this.geraGrafico();
  }

  geraGrafico() {
    this.data = [{
      y: this.y1,
      x: this.x1,
      yaxis	: "y",
      mode: "markers",
      line:{
        color: "#ff7f0e",
      },
      marker: {
        opacity	: 0.7
      },
      type: "scatter",
      text: this.l1,
      hoverinfo: "text",
      name: "Mediana"
    },
    {
      y: this.y2,
      x: this.x1,
      yaxis	: "y",
      mode: "lines",
      line:{
        color: "#2E8B57",
        width: 3
      },
      marker: {
        opacity	: 0.8
      },
      type: "scatter",
      text: this.l2,
      hoverinfo: "text"
    },
    {
      y: this.y3,
      x: this.x2,
      yaxis	: "y2",
      mode: "lines",
      line:{
        color: "#4682B4",
        width:3
      },
      type: "scatter",
      text: this.l3,
      hoverinfo: "text"      
    }
    ];
  
    this.layout = {
      height: 350,
      margin:{
        l: 55,
        r: 20,
        t: 5,
        b: 25,
        pad: 0 
      },
      autosize: false,
      colorway: {
        0:	"#1f77b4",
        1:	"#FF0000"
      }, 
      showlegend: false,
      hovermode:'closest',
      xaxis:{
        showticklabels: true,
        tickfont:{
          family: "Arial"
        },
        zeroline: false,
        nticks: 6,
        domain:[
          "0",
          "1"
        ]
      },
      yaxis2:{
        zeroline: false,
        domain:[
          "0.8",
          "1"
        ],
        title: "<b>GPD, kg/d</b>",
        titlefont:{
          family	:	"\"Open Sans\", verdana, arial, sans-serif",
          size	:	11
        },
        tickfont:{
          size: 11
        }
      },
      yaxis:{
        zeroline: false,
        domain:[
          "0",
          "0.75"
        ],
        title: "<b>Peso Vivo, kg</b>",
        titlefont:{
          family	:	"\"Open Sans\", verdana, arial, sans-serif",
          size	:	11
        },
        tickfont:{
          size: 11
        }
      }
    };

    var d3 = Plotly.d3;
    var gd3 = d3.select(this.graficoDesempenho.nativeElement);
    var gd = gd3.node();

    Plotly.plot(gd, this.data, this.layout, { displayModeBar: false });

    var largura = this.graficoDesempenho.nativeElement.offsetWidth;
      var update = {
        width: largura
      };
      Plotly.relayout(gd, update);
  }

  onResize(){
    var d3 = Plotly.d3;
    var gd3 = d3.select(this.graficoDesempenho.nativeElement);
    var gd = gd3.node();

    Plotly.plot(gd, this.data, this.layout, { displayModeBar: false });

    var largura = this.graficoDesempenho.nativeElement.offsetWidth;
      var update = {
        width: largura
      };
      Plotly.relayout(gd, update);
  }

}