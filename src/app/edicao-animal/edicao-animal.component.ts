import { CurralService } from './../services/curral.service';
import { Curral } from './../entity/curral';
import { DialogComponent } from './../dialog/dialog.component';
import { Router, NavigationEnd } from '@angular/router';
import { Fazenda } from './../entity/fazenda';
import { Raca } from './../entity/raca';
import { RacaService } from './../services/raca.service';
import { Especie } from './../entity/especie';
import { EspecieService } from './../services/especie.service';
import { DateUtil } from './../services/date-util.service';
import { HttpConfig } from './../entity/httpConfig';
import { CategoriaService } from './../services/categoria.service';
import { LoteService } from './../services/lote.service';
import { HttpUtil } from './../../service/httpUtil';
import { PageEvent, MatSnackBar, MatDialog } from '@angular/material';
import { Categoria } from './../entity/categoria';
import { Lote } from './../entity/lote';
import { Animal } from './../entity/animal';
import { Inject } from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, Renderer } from '@angular/core';

@Component({
  selector: 'app-edicao-animal',
  templateUrl: './edicao-animal.component.html',
  styleUrls: ['./edicao-animal.component.css']
})
export class EdicaoAnimalComponent implements OnInit {
  infoLoading: string = "";
  @ViewChild("form") form: any;
  panelOpenState: boolean = false;
  termo: string = "";
  animais: Array<Animal>;
  especies: Array<Especie>;
  lengthOfAnimais = 0;
  limit = 10;
  offset = 0;
  showLoading: boolean = false;
  currais: Array<Curral>;

  racas: Array<Raca>;

  showProgress = false;
  lotes: Array<Lote>;
  categorias: Array<Categoria>;

  pageEvent: PageEvent;
  maxDate: Date = new Date();
  constructor(private httpUtil: HttpUtil, private loteService: LoteService, public snackBar: MatSnackBar,
    private categoriaService: CategoriaService, private especieService: EspecieService,
    private racaService: RacaService, private router: Router, @Inject(DOCUMENT) private document: Document,
    public dialog: MatDialog, private curralService: CurralService) {
    this.router.events.subscribe((path) => {
      setTimeout(() => {
        var elmnt = document.getElementById("edicao");
        elmnt.scrollIntoView();
      }, 10);
    });

  }



  ngOnInit() {

    /*    this.router.events.subscribe((path: any) => {
         if (path.url == "/edicao_animal") {
           console.log("Scroll top");
           window.scrollTo(0, angular.element(document.getElementById('div1')).offsetTop)
         } else {
           console.info("Teste Scroll");
         }
       });  */

    setTimeout(() => {
      this.buscarLotes();
      this.buscarCategorias();
      this.buscarEspecies();
      this.buscarCurrais();
      this.buscarRacas();
    }, 100);
  }

  buscarCurrais() {
    let idFazenda = 1;
    this.curralService.getCurrais(idFazenda, response => {
      this.currais = response;
    }, error => {
      console.error(error);
    });
  }

  buscarRacas() {
    this.racaService.getRacas(response => {
      this.racas = response;
    }, error => {
      console.error(error);
    });
  }

  buscarCategorias() {
    this.categoriaService.getCategorias(response => {
      this.categorias = response;
    }, error => {
      console.error();
    });
  }

  buscarEspecies() {
    this.especieService.getEspecies(response => {
      this.especies = response;
    }, error => {
      console.error(error);
    });
  }

  teste() {
    console.info("scrollllll");

  }

  scrollTo = function (id) {
    window.scroll(0, 0);
  }

  buscarAnimais(form, clear) {
    this.showProgress = true;
    if (clear) {
      this.offset = 0;
    }
    let termo = form.termo;
    let url = HttpConfig.URL_PREFIX + "animal/find_animals_by_fazenda?id_fazenda=" + 1 + "&termo=" + termo + "&limit=" + this.limit + "&offset=" + this.offset;
    this.httpUtil.get(url, {}, response => {
      console.log(response);
      this.lengthOfAnimais = response.complemento;
      let dados = JSON.parse(response.resposta);
      let lengthOfDados = dados.length;
      this.animais = new Array<Animal>();

      console.info("jiren");
      for (let i = 0; i < lengthOfDados; i++) {
        let dado = dados[i];
        let animal = new Animal();
        animal.$nome = dado.nome;
        animal.$id = dado.id;
        animal.$gta = dado.gta;
        animal.$tag = dado.tag;
        animal.$tagCompare = animal.$tag;
        animal.$manejo = dado.manejo;
        animal.$especie = dado.idEspecie;
        console.info("Curral");
        if (dado.idLote) { animal.$lote = new Lote(dado.idLote, ""); } else { animal.$lote = new Lote(undefined, ""); }
        if (dado.idCurral) {
          animal.$curral = dado.idCurral;
        } else {
          animal.$curral = undefined;
        }
        if (dado.idCategoria) { animal.$categoria = new Categoria(dado.idCategoria, "") } else { animal.$categoria = new Categoria(undefined, "") }
        if (dado.dataNascimento) { animal.$dataNascimentoDate = DateUtil.sqlToDate(dado.dataNascimento) } else { animal.$dataNascimentoDate = undefined }
        animal.$sexo = dado.sexo;
        animal.$pesoInicial = dado.pesoInicial;
        animal.$inicioDeAtividadeDate = DateUtil.sqlToDate(dado.inicioAtividade);
        animal.$fazenda = dado.idFazenda;
        animal.$racas = new Array<Raca>();

        for (let i = 0; i < dado.racas.length; i++) {
          let raca = new Raca(dado.racas[i][1], dado.racas[i][3], dado.racas[i][2]);
          animal.$racas.push(raca);
        }

        this.animais.push(animal);
      }

      this.showProgress = false;
      if (this.lengthOfAnimais == 0) {
        this.snackBar.open("Não foram encontrados registros com o termo informado", "", { duration: 3000 })
      }

    }, error => {
      this.showProgress = false;
      console.error(error);
    });
  }

  pageEvento(form, event) {
    console.log(event);
    console.log(this.pageEvent);
    this.limit = event.pageSize;
    this.offset = this.limit * event.pageIndex;
    console.log(this.offset);
    this.buscarAnimais(form, false);
  }

  buscarLotes() {
    let idFazenda = 1;
    this.loteService.getLotes(idFazenda, response => {
      this.lotes = response;
    }, error => {
      console.error(error);
    });
  }

  removerAnimal(animal) {
    // PERGUNTAR E REMOVER ANIMAL
    this.openDialogRemove(animal);

  }

  onActivate(event) {
    console.info("Scroll to Top please");
    document.body.scrollTop = 0;
    window.scroll(0, 0);
  }

  verificarTag(animal) {
    console.info("verificar tag");
    if (animal.$tag && animal.$tag != animal.$tagCompare) {
      let url = HttpConfig.URL_PREFIX + "animal/tag_is_valid?tag=" + animal.$tag;
      this.httpUtil.get(url, {}, response => {

        console.log(response.resposta);
      }, error => {
        this.snackBar.open(error.error.resposta, "OK");
        // alert(error.error.resposta);
      });
    }
  }

  openDialog(animal: Animal): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        titulo: "Edição de Animais",
        texto: "Deseja realmente trocar a tag deste animal?",
        disagree: "Não",
        agree: "Sim",
        callbackDisagree: (disagree) => {
          animal.$tag = animal.$tagCompare;
        },
        callbackAgree: (agree) => {
          // LIMPAR ALGUNS REGISTROS
          console.info("trocar tag");
          animal.$tagCompare = animal.$tag;
          this.atualizarAnimal(animal);
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogRemove(animal: Animal): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        titulo: "Edição de Animais",
        texto: "Deseja realmente trocar a tag deste animal?",
        disagree: "Não",
        agree: "Sim",
        callbackDisagree: (disagree) => {

        },
        callbackAgree: (agree) => {
          // LIMPAR ALGUNS REGISTROS
          let url = HttpConfig + "animal/remove?id=" + animal.$id;
          this.httpUtil.get(url, {}, response => {
            let index = this.animais.indexOf(animal);
            if (index! - 1) {
              this.animais.splice(index, 1);
            }
          }, error => {
            console.error(error);
          });


        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  atualizarAnimal(animal: Animal) {

    if (animal.$tag.toString().length != 15) {
      console.info("Tag deve possuir 15 dígitos");
      this.snackBar.open("Tag deve possuir 15 dígitos", "Ok");
      throw "tag incompleta";
    }
    // TROCA TAG
    if (animal.$tag != animal.$tagCompare) {
      this.openDialog(animal);
      throw "tag incompleta";
    }

    if (animal.$sisbov) {
      if (animal.$sisbov.toString().length != 15) {
        this.snackBar.open("Sisbov deve possuir 15 dígitos", "Ok");
        throw "sisbov incompleta";
      }
    }

    //throw "tag incompleta";

    // ATUALIZAR    

    this.showLoading = true;
    this.infoLoading = "Aguarde. Atualizando o animal...";

    let dados: any = {
      "dataNascimento": animal.$dataNascimentoDate != undefined ? DateUtil.dateToStringSQL(animal.$dataNascimentoDate) : undefined,
      "gta": animal.$gta,
      "id": animal.$id,
      "idCategoria": animal.$categoria,
      "idEspecie": animal.$especie,
      "idFazenda": animal.$fazenda,
      "idLote": animal.$lote,
      "manejo": animal.$manejo,
      "nome": animal.$nome,
      "pesoInicial": animal.$pesoInicial,
      "sexo": animal.$sexo,
      "sisbov": animal.$sisbov,
      "tag": animal.$tag
    }

    // TRATAMENTO DADOS
    dados.idCategoria = dados.idCategoria != undefined ? dados.idCategoria.id : undefined;
    dados.idLote = dados.idLote != undefined ? dados.idLote.id : undefined;


    dados.racas = [];

    let lengthOfRacas = animal.$racas.length;
    for (let i = 0; i < lengthOfRacas; i++) {
      dados.racas.push([animal.$racas[i].$id, animal.$racas[i].$peso]);
    }

    console.log(dados);

    let url = HttpConfig.URL_PREFIX + "animal/update";
    this.httpUtil.put(url, dados, {}, response => {
      this.showLoading = false;
      this.snackBar.open("Animal atualizado com sucesso", "", { duration: 3000 });
      this.infoLoading = "";
    }, error => {
      console.error(error);
      this.showLoading = false;
      this.snackBar.open(error.error.resposta, "", { duration: 3000 });
      this.infoLoading = "";
    });

  }

  selecionarRacas(animal: Animal, racas) {
    console.clear();
    console.log(racas);
    console.log(animal);
    animal.$racas.length = 0;

    for (let i = 0; i < racas.length; i++) {
      let raca: Raca = this.racas.filter(raca => raca.$id == racas[i])[0];
      raca.$peso = 100 / racas.length;
      animal.$racas.push(raca);
    }

    this.form.racas = undefined;
  }

}
