import { Router } from '@angular/router';
import { DateUtil } from './../services/date-util.service';
import { Fazenda } from './../entity/fazenda';
import { HttpConfig } from './../entity/httpConfig';
import { HttpUtil } from './../../service/httpUtil';
import { ErroTemplate } from './../entity/erro';
import { TemplateService } from './../services/template.service';
import { Animal } from './../entity/animal';
import { FilePickerDirective } from 'ngx-file-helpers';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { } from '';
import { Organizacao } from '../entity/organizacao';

enum ReadMode {
  arrayBuffer,
  binaryString,
  dataURL,
  text
}

@Component({
  selector: 'app-cadastro-animal',
  templateUrl: './cadastro-animal.component.html',
  styleUrls: ['./cadastro-animal.component.css']
})
export class CadastroAnimalComponent implements OnInit {
  @ViewChild(FilePickerDirective)
  private filePicker;
  showUploadProgress: boolean = false;
  panelOpenState: boolean = false;

  erros: Array<ErroTemplate>;

  // ORGANIZAÇÔES
  organizacoes: Array<Organizacao>;
  organizacaoSelecionada: number;

  // FAZENDAS
  fazendas: Array<Fazenda>;
  fazendaSelecionada: number;

  constructor(public snackBar: MatSnackBar, public dialog: MatDialog, public httpUtil: HttpUtil,
    private router: Router) { 
    this.router.events.subscribe((path) => {
      setTimeout(() => {
        var elmnt = document.getElementById("cadastro");
        elmnt.scrollIntoView();
      }, 10);
    });
  }

  ngOnInit() {
    console.log(this.filePicker);
    this.organizacoes = new Array<Organizacao>();
    this.fazendas = new Array<Fazenda>();
    this.erros = new Array<ErroTemplate>();

    setTimeout(() => {
      this.buscarOrganizacoes();
    }, 100);
  }

  buscarOrganizacoes() {
    let url = HttpConfig.URL_PREFIX + "organizacao/find_all";
    this.httpUtil.get(url, {}, response => {
      this.organizacoes.length = 0;
      let dados = JSON.parse(response.resposta);
      for (let i = 0; i < dados.length; i++) {
        this.organizacoes.push(new Organizacao(dados[i].id, dados[i].nome));
      }
    }, error => {
      console.error(error);
    });
  }  

  selecionarOrganizacao() {
    localStorage.removeItem("fazenda");
    this.buscarFazendaPorOrganizacao(this.organizacaoSelecionada);
  }

  buscarFazendaPorOrganizacao(id: number) {
    this.fazendaSelecionada = undefined;
    let url = HttpConfig.URL_PREFIX + "fazenda/find_all_by_organizacao?idOrganizacao=" + id;
    this.httpUtil.get(url, {}, response => {
      this.fazendas.length = 0;
      let dados = JSON.parse(response.resposta);
      for (let i = 0; i < dados.length; i++) {
        this.fazendas.push(new Fazenda(dados[i].id, dados[i].nome));
      }
    }, error => {
      console.error(error);
    });
  }

  selecionarFazenda() {
    let data = { id: this.fazendaSelecionada };
    localStorage.setItem("fazenda", JSON.stringify(data));
  }

 

}




