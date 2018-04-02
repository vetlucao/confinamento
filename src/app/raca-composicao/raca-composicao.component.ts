import { Raca } from './../entity/raca';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-raca-composicao',
  templateUrl: './raca-composicao.component.html',
  styleUrls: ['./raca-composicao.component.css']
})
export class RacaComposicaoComponent implements OnInit {
  @Input() public raca: Raca;

  constructor() { }

  ngOnInit() {
  }

}
