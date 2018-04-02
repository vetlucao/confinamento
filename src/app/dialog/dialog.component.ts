import { MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Input, Inject } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  @Input() mensagem: string;
  @Input() titulo:string;
  @Input() texto:string;
  @Input() agree:string;
  @Input() disagree:string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.titulo = data.titulo;
    this.texto = data.texto;
    this.agree = data.agree;
    this.disagree = data.disagree;
  }

  ngOnInit() {
  }

  actionAgree(){
    this.data.callbackAgree("Agree");
  }

  actionDisagree(){
    this.data.callbackDisagree("Disagree");
  }

}
