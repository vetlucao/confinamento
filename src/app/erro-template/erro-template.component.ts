import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-erro-template',
  templateUrl: './erro-template.component.html',
  styleUrls: ['./erro-template.component.css']
})
export class ErroTemplateComponent implements OnInit {
  @Input() mensagem: string;
  @Input() observacoes: string;

  constructor() { }

  ngOnInit() {
  }

}
