import { CurralService } from './../services/curral.service';
import { Curral } from './../entity/curral';
import { Lote } from './../entity/lote';
import { LoteService } from './../services/lote.service';
import { MatSnackBar } from '@angular/material';
import { HttpConfig } from './../entity/httpConfig';
import { HttpUtil } from './../../service/httpUtil';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-cadastro-lote',
  templateUrl: './cadastro-lote.component.html',
  styleUrls: ['./cadastro-lote.component.css']
})
export class CadastroLoteComponent implements OnInit {
  @ViewChild('map') m;
  private isVisible: boolean = false;
  @Output() cadastroLote: EventEmitter = new EventEmitter();
  @ViewChild("form") form: any;
  step = 0;
  buscarLoteEnabled: boolean = true;;
  lotes: Array<Lote>;
  currais: Array<Curral>;
  panelOpenState: boolean = true;
  expandedPanel: boolean = false;

  constructor(private httpUtil: HttpUtil, public snackBar: MatSnackBar,
    private loteService: LoteService, private curralService: CurralService) { }

  ngOnInit() {
    setTimeout(() => {
      this.buscarLotes();
      this.buscarCurrais();
    }, 3000);
  }

  buscarCurrais() {
    this.curralService.getCurrais(1, response => {
      this.currais = response;
    }, error => {
      console.error(error);
    });
  }

  buscarLotes() {
    let idFazenda = 1;
    this.loteService.getLotes(idFazenda, response => {
      this.lotes = response;
    }, error => {
      console.error(error);
    });
  }

  atualizarLote(lote) {

    let url = HttpConfig.URL_PREFIX + "lote/update";
    let body = {
      "ativo": 1,
      "id": lote.$id,
      "idFazenda": 1,
      "nome": lote.$nome
    };

    this.httpUtil.put(url, body, {}, response => {
      this.snackBar.open("Lote atualizado com sucesso", "", { duration: 4000 });
    }, error => {
      console.error(error);
    });
  }

  removerLote(lote) {
    console.log("remover lote");
    let url = HttpConfig.URL_PREFIX + "lote/remove?id=" + lote.id;
    this.httpUtil.delete(url, {}, {}, response => {
      this.snackBar.open("Lote removido com sucesso", "", { duration: 4000 });
      let index = this.lotes.indexOf(lote);
      if (index != -1) {
        this.lotes.splice(index, 1);
      }
    }, error => {
      console.error(error);
    });

  }

  submit(form: any) {
    form = form.form.value;

    if (!form.nome || form.nome === "") {
      this.snackBar.open("Nome do lote é obrigatório", "", {
        duration: 3000
      });
      throw "Nome é obrigatório";
    }

    if(!form.curral){
      this.snackBar.open("Curral é obrigatório", "", {
        duration: 3000
      });
      throw "Curral é obrigatório";
    }

    let url = HttpConfig.URL_PREFIX + "lote/save";
    let data = {
      "ativo": 1,
      "idFazenda": 1,
      "nome": form.nome, 
      "idCurral": form.curral
    }

    this.httpUtil.post(url, data, {}, response => {
      console.log("kuririn");
      let dado = JSON.parse(response.resposta)
      this.snackBar.open("Lote cadastrado com sucesso", "ok");
      this.cadastroLote.emit("update");
      let lote = new Lote(dado.id, dado.nome);
      lote.$idCurral = form.curral;

      this.loteService.getLotes(1, response => {
        response.push(lote);
        this.buscarLoteEnabled = true;
      }, error => {
        console.error(error);
      })

      this.form.reset();

    }, error => {
      this.snackBar.open("Erro", "ok");
    });
  }

}
