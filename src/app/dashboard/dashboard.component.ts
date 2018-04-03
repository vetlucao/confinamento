import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  numeroDeAnimais = 0;
  numeroDeLotes = 0;
  numeroDeAlertas = 0
  lucro = 3.657;

  constructor() { }

  ngOnInit() {
    this.buscarDados();
  }

  buscarDados(){
    // BUSCAR DADOS NO SERVIDOR
  }

}
