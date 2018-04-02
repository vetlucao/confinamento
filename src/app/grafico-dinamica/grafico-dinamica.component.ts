import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as _ from 'lodash';
import * as Plotly from 'plotly.js';
import { GraficoDinamicaService } from './grafico-dinamica.service';

@Component({
  selector: 'app-grafico-dinamica',
  templateUrl: './grafico-dinamica.component.html',
  styleUrls: ['./grafico-dinamica.component.css'],
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class GraficoDinamicaComponent implements OnInit {

  @ViewChild('chartDinamica') graficoDinamica: ElementRef;
  
  data:any;
  layout:any;

  y1;
  x1;
  l1;
  y2;
  l2;
  y3;
  l3;
  y4;
  l4;
  y5;
  l5;
  y6;
  l6;
  y7;
  l7;
  y8;
  l8;

  constructor(private graficoDinamicaService: GraficoDinamicaService) { }

  ngOnInit() {
    this.y1 = this.graficoDinamicaService.getY1();
    this.y2 = this.graficoDinamicaService.getY2();
    this.y3 = this.graficoDinamicaService.getY3();
    this.y4 = this.graficoDinamicaService.getY4();
    this.y5 = this.graficoDinamicaService.getY5();
    this.y6 = this.graficoDinamicaService.getY6();
    this.y7 = this.graficoDinamicaService.getY7();
    this.y8 = this.graficoDinamicaService.getY8();
    this.x1 = this.graficoDinamicaService.getX1();

    this.geraGrafico();
  }

  geraGrafico() {
    this.l1 = this.y1.map((y1i, i) => ` ${y1i}kg<br> ${this.x1[i]} `);
    this.l2 = this.y2.map((y2i, i) => ` ${y2i}kg<br> ${this.x1[i]} `);
    this.l3 = this.y3.map((y3i, i) => ` ${y3i}kg<br> ${this.x1[i]} `);
    this.l4 = this.y4.map((y4i, i) => ` ${y4i}kg/d<br> ${this.x1[i]} `);
    this.l5 = this.y5.map((y5i, i) => ` ${y5i}kg/d<br> ${this.x1[i]} `);
    this.l6 = this.y6.map((y6i, i) => ` ${y6i}kg/d<br> ${this.x1[i]} `);
    this.l7 = this.y7.map((y7i, i) => ` ${y7i}kg<br> ${this.x1[i]} `);
    this.l8 = this.y8.map((y8i, i) => ` ${y8i}kg<br> ${this.x1[i]} `);

    this.data = [{
      y: this.y1,
      x: this.x1,
      yaxis	: "y4",
      mode: "lines",
      line:{
        color: "#b3e6b3",
        width:0
      },
      type: "scatter",
      text: this.l1,
      hoverinfo: "text"
    },
    {
      y: this.y2,
      x: this.x1,
      yaxis	: "y4",
      mode: "lines",
      fillcolor	: "rgba(55, 170, 105, 0.2)",
      line:{
        color: "#b3e6b3",
        width:0
      },
      fill: "tonexty",
      type: "scatter",
      text: this.l2,
      hoverinfo: "text"
    },
    {
      y: this.y3,
      x: this.x1,
      yaxis	: "y4",
      mode: "lines",
      line:{
        color: "#2E8B57",
        width:3
      },
      type: "scatter",
      text: this.l3,
      hoverinfo: "text"
    },
    {
      y: this.y4,
      x: this.x1,
      yaxis	: "y3",
      mode: "lines",
      line:{
        color: "#b3d1ff",
        width:0
      },
      type: "scatter",
      text: this.l4,
      hoverinfo: "text"
    },
    {
      y: this.y5,
      x: ["23/Jul", "06/Aug", "20/Aug", "03/Set"],
      yaxis	: "y3",
      mode: "lines",
      fillcolor	: "rgba(0, 115, 235, 0.2)",
      line:{
        color: "#b3d1ff",
        width:0
      },
      fill: "tonexty",
      type: "scatter",
      text: this.l5,
      hoverinfo: "text"
    },
    {
      y: this.y6,
      x: ["23/Jul", "06/Aug", "20/Aug", "03/Set"],
      yaxis	: "y3",
      mode: "lines",
      line:{
        color: "#4682B4",
        width:3
      },
      type: "scatter",
      text: this.l6,
      hoverinfo: "text"
    },
    {
      y: this.y7,
      x: ["23/Jul", "06/Aug", "20/Aug", "03/Set"],
      yaxis	: "y2",
      mode: "lines",
      line:{
        color: "#2E8B57",
        width:3
      },
      type: "scatter",
      text: this.l7,
      hoverinfo: "text"
    },
    {
      y: this.y8,
      x: this.x1,
      yaxis	: "y",
      mode: "lines",
      line:{
        color: "#4682B4",
        width:3
      },
      type: "scatter",
      text: this.l8,
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
        domain:[
          "0",
          "1"
        ]
      },
      yaxis4:{
        zeroline: false,
        domain:[
          "0.795",
          "1"
        ],
        title: "<b>PV, kg</b>",
        titlefont:{
          family	:	"\"Open Sans\", verdana, arial, sans-serif",
          size	:	11
        },
        tickfont:{
          size: 11
        }
      },
      yaxis3:{
        zeroline: false,
        domain:[
          "0.53",
          "0.735"
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
      yaxis2:{
        zeroline: false,
        domain:[
          "0.265",
          "0.47"
        ],
        title: "<b>PV TOT, kg</b>",
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
          "0.205"
        ],
        title: "<b>GP TOT, kg</b>",
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
    var gd3 = d3.select(this.graficoDinamica.nativeElement);
    var gd = gd3.node();

    Plotly.plot(gd, this.data, this.layout, { displayModeBar: false });

    var largura = this.graficoDinamica.nativeElement.offsetWidth;
      var update = {
        width: largura
      };
      Plotly.relayout(gd, update);
  }

  onResize(){
    var d3 = Plotly.d3;
    var gd3 = d3.select(this.graficoDinamica.nativeElement);
    var gd = gd3.node();

    Plotly.plot(gd, this.data, this.layout, { displayModeBar: false });

    var largura = this.graficoDinamica.nativeElement.offsetWidth;
      var update = {
        width: largura
      };
      Plotly.relayout(gd, update);
  }
}