import { MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-animal-registro',
  templateUrl: './animal-registro.component.html',
  styleUrls: ['./animal-registro.component.css']
})
export class AnimalRegistroComponent implements OnInit {
  @ViewChild("tag") tag: any;
  @ViewChild("sisbov") sisbov: any;

  public mask = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  public maskPeso = [/[0-9]/, /[0-9]/, /[0-9]/];
  constructor(public snackBar: MatSnackBar) { }


  ngOnInit() {
  }

  submit(form){

  }

}
