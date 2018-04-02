import { Curral } from './../entity/curral';
import { CurralService } from './../services/curral.service';
import { EspecieService } from './../services/especie.service';
import { Categoria } from './../entity/categoria';
import { CategoriaService } from './../services/categoria.service';
import { FilePickerDirective } from 'ngx-file-helpers';
import { TemplateService } from './../services/template.service';
import { LoteService } from './../services/lote.service';
import { ErroTemplate } from './../entity/erro';
import { Especie } from './../entity/especie';
import { HttpUtil } from './../../service/httpUtil';
import { HttpConfig } from './../entity/httpConfig';
import { Raca } from './../entity/raca';
import { DateUtil } from './../services/date-util.service';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Animal } from '../entity/animal';
import { DialogComponent } from '../dialog/dialog.component';
import { Lote } from '../entity/lote';

@Component({
  selector: 'app-animal-row',
  templateUrl: './animal-row.component.html',
  styleUrls: ['./animal-row.component.css']
})
export class AnimalRowComponent implements OnInit {
  @ViewChild(FilePickerDirective)
  private filePicker;
  @ViewChild("tag") tag: any;
  @ViewChild("manejo") manejo: any;
  @ViewChild("sisbov") sisbov: any;
  @ViewChild("form") form: any;
  @ViewChild("pesoInicial") pesoInicial: any;
  @ViewChild("expPanel") expPanel: any;

  showUploadProgress: boolean = false;
  panelOpenState: boolean = false;
  step = 0;
  showError: boolean = false;
  mensagem: string;
  observacoes: string;
  pesagemObrigatoria: boolean;
  sisbovObrigatoria: boolean;
  erros: Array<ErroTemplate>;

  // ESPÉCIES
  especies: Array<Especie>;

  // LOTES
  lotes: Array<Lote>;

  // CATEGORIAS
  categorias: Array<Categoria>;

  // CURRAIS
  currais: Array<Curral>;

  // RAÇAS
  racas: Array<Raca>;

  showProgress: boolean = false;
  public racasSelecionadas: Array<Raca>;

  maxDate: Date = new Date();

  public mask = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  public maskPeso = [/[0-9]/, /[0-9]/, /[0-9]/];

  public maskDate = [/[0-3]/, /[0-9]/, '/', /[0-1]/, /[0-9]/, '/', /[1-2]/, /[0-9]/, /[0-9]/, /[0-9]/];
  constructor(public snackBar: MatSnackBar, public dialog: MatDialog,
    public httpUtil: HttpUtil, private loteService: LoteService,
    private categoriaService: CategoriaService, private especieService: EspecieService,
    private curralService: CurralService) { }

  eventoCadastroDeLote(event) {
    console.error("Cadastro de lote realizado");
  }

  ngOnInit() {

    this.racasSelecionadas = new Array<Raca>();
    this.racas = new Array<Raca>();
    this.erros = new Array<ErroTemplate>();

    // racas fakes
    this.montarRacasFake();

    setTimeout(() => {
      this.buscarLotes();
      this.buscarCategorias();
      this.buscarEspecies();
      this.buscarCurrais();
    }, 100);
  }

  buscarCurrais() {
    let idFazenda = 1;
    this.curralService.getCurrais(idFazenda, response=>{
      this.currais = response;
    }, error=>{
      console.error(error);
    });
  }

  buscarCategorias() {
    this.categoriaService.getCategorias(response => {
      this.categorias = response;
    }, error => {
      console.error(error);
    });
  }

  buscarLotes() {
    this.loteService.getLotes(1, response => {
      this.lotes = response;
    }, error => {
      console.error(error);
    });
  }

  ngAfterViewInit() {
    console.log("Apareceu");
  }

  montarRacasFake() {
    /*  this.racas.push({ id: 1, nome: "Senepol", peso: 0 });
     this.racas.push({ id: 2, nome: "Angus", peso: 0 });
     this.racas.push({ id: 3, nome: "Nelor", peso: 0 });
     this.racas.push({ id: 4, nome: "Gir", peso: 0 }); */
  }

  selecionarCurral(form){
    form.lote = undefined;
  }

  selecionarLote(form){
    let lote = this.lotes.filter(loteFilter => loteFilter.$id == form.lote)[0];
    form.curral = lote.$idCurral;
    console.log(lote);

  }

  submit(form: any) {
    console.info("validar");
    if (form.tag.toString().length != 15) {
      this.snackBar.open("A TAG deve possuir 15 digítos", "", {
        duration: 3000
      });
      this.tag.nativeElement.focus();
      throw "Error";
    }

    if (!form.manejo) {
      this.snackBar.open("O manejo é obrigatório", "", {
        duration: 3000
      });
      this.manejo.nativeElement.focus();
      throw "Error";
    }

    if (form.sisbov != undefined && form.sisbov.toString().length != 15) {
      if (form.sisbov.toString().length != 0) {
        this.snackBar.open("O sisbov deve possuir 15 digítos", "", {
          duration: 3000
        });
        this.sisbov.nativeElement.focus();
        throw "Error";
      }
    }

    let lengthOfRacasSelecionadas = this.racasSelecionadas.length;
    let somaPesos = 0;
    for (let i = 0; i < lengthOfRacasSelecionadas; i++) {
      somaPesos += this.racasSelecionadas[i].$peso;
    }

    if (somaPesos != 100) {
      console.error("A soma dos pesos das raças devem ser igual à 100");
      this.snackBar.open("A soma dos pesos das raças devem ser igual à 100", "OK");
      throw "Error";
    }

    if (this.sisbovObrigatoria) {
      if (form.sisbov == undefined) {
        this.snackBar.open("Sisbov deve ser informado", "", {
          duration: 3000
        });
        this.sisbov.nativeElement.focus();
        throw "Error";
      }
    }

    if (this.pesagemObrigatoria) {
      if (form.pesoInicial == undefined) {
        this.snackBar.open("Peso deve ser informado", "", {
          duration: 3000
        });
        this.pesoInicial.nativeElement.focus();
        throw "Error";
      }
    }

    if (form.inicioAtividade == undefined) {
      this.snackBar.open("Ínicio de atividade deve ser informada", "", {
        duration: 3000
      });
      throw "Error";
    }

    let animal: Animal = new Animal();
    animal.$categoria = form.categoria;
    animal.$curral = form.curral;
    animal.$inicioDeAtividade = DateUtil.dateToStringSQL(form.inicioAtividade);
    animal.$dataNascimento = DateUtil.dateToStringSQL(form.dataNascimento);
    animal.$especie = form.especie;
    animal.$fazenda = form.fazenda;
    animal.$gta = form.gta;
    animal.$lote = form.lote;
    animal.$manejo = form.manejo;
    animal.$organizacao = form.organizacao;
    animal.$pesoInicial = form.pesoInicial;
    animal.$nome = form.nome;
    animal.$sexo = form.sexo;
    animal.$tag = form.tag;
    animal.$sisbov = form.sisbov;

    console.log(animal);
    // REGISTRAR ANIMAL

    this.showProgress = true;

    // SALVAR ANIMAL
    this.registrarAnimal(animal);

  }

  registrarAnimal(animal: Animal) {
    let url = HttpConfig.URL_PREFIX + "animal/save";
    let fazendaId = 1;
    let body: any = {
      "dataNascimento": animal.$dataNascimento,
      "gta": animal.$gta,
      "idCategoria": animal.$categoria,
      "idCurral": animal.$curral,
      "idEspecie": animal.$especie,
      "idFazenda": fazendaId,
      "idLote": animal.$lote,
      "inicioAtividade": animal.$inicioDeAtividade,
      "manejo": animal.$manejo,
      "nome": animal.$nome,
      "pesoInicial": animal.$pesoInicial,
      "sexo": animal.$sexo,
      "sisbov": animal.$sisbov,
      "tag": animal.$tag
    }

    body.racas = [];

    let lengthOfRacas = this.racasSelecionadas.length;
    let racas = [];
    console.log("montar raças");
    for (let i = 0; i < lengthOfRacas; i++) {
      racas.push([this.racasSelecionadas[i].$id, this.racasSelecionadas[i].$peso]);
      body.racas.push([this.racasSelecionadas[i].$id, this.racasSelecionadas[i].$peso]);
    }

    if (racas.length == 0) {
      this.snackBar.open("Raça deve ser informada", "OK");
      throw "Raça deve ser informada";
    }

    this.httpUtil.post(url, body, {}, response => {
      // ANIMAL REGISTRADO
      this.erros.length = 0;
      this.showProgress = false;
      this.openDialog();
      console.log(response);
    }, error => {
      this.erros.length = 0;
      this.showProgress = false;
      this.erros.push(new ErroTemplate("Erro cadastro", error.error.resposta));
      console.error(error);
    });
  }

  buscarEspecies() {
    this.especieService.getEspecies(response => {
      this.especies = response;
    }, error => {
      console.error(error);
    });
  }

  selecionarEspecie(form) {
    console.error("GOKU");
    this.buscarRacas(form.especie);
  }

  buscarRacas(especie: number) {
    let url = HttpConfig.URL_PREFIX + "raca/find_all_by_especie?idEspecie=" + especie;
    this.httpUtil.get(url, {}, response => {
      let dados = JSON.parse(response.resposta);
      let lengthOfRacas = dados.length;
      this.racas.length = 0;

      for (let i = 0; i < lengthOfRacas; i++) {
        this.racas.push(new Raca(dados[i].id, dados[i].nome, 0));
      }

    }, error => {
      console.error(error);
    });
  }

  selecionarRacas(racas) {
    // limpar selecionados
    this.racasSelecionadas.length = 0;
    let lengthRacas = racas.length;
    let grau = 100 / lengthRacas;

    for (let i = 0; i < lengthRacas; i++) {
      let raca: any = this.racas.filter(raca => raca.$id == racas[i]);
      if (raca.length > 0) {
        raca[0].peso = grau;
        this.racasSelecionadas.push(raca[0]);
      }
    }
    console.log(this.racasSelecionadas);
  }

  verificarTag(form) {
    if (form.tag) {
      let url = HttpConfig.URL_PREFIX + "animal/tag_is_valid?tag=" + form.tag;
      this.httpUtil.get(url, {}, response => {

        console.log(response.resposta);
      }, error => {
        this.snackBar.open(error.error.resposta, "OK");
        // alert(error.error.resposta);
      });
    }
  }

  verificarSisbov(form) {
    if (form.sisbov) {
      let url = HttpConfig.URL_PREFIX + "animal/is_valid_sisbov?sisbov=" + form.sisbov;
      this.httpUtil.get(url, {}, response => {

        console.log(response.resposta);
      }, error => {
        //alert(error.error.resposta);
        this.snackBar.open(error.error.resposta, "OK");
      });
    }
  }


  openDialog(): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        titulo: "Cadastro de Animais",
        texto: "Animal cadastrado com sucesso. Deseja cadastrar outro animal?",
        disagree: "Não",
        agree: "Sim",
        callbackDisagree: (disagree) => {
          // LIMPAR FORMULÁRIO
          this.form.reset();
          this.racasSelecionadas.length = 0;
          this.step = 0;
          console.info(this.expPanel);
          this.expPanel.close();
        },
        callbackAgree: (agree) => {
          // LIMPAR ALGUNS REGISTROS
          console.log(this.form);
          let campos = this.form.form.value;

          this.form.tag = parseInt(this.form.tag.toString().substr(0, 12));
          this.form.sisbov = undefined;
          this.form.manejo = undefined;
          this.form.nome = undefined;
          this.form.pesoInicial = undefined;
          setTimeout(() => {
            this.tag.nativeElement.focus();
          }, 500);
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // VIA TEMPLATE

  uploadFile(file) {
    let conteudo: string = file._content;
    let animais = TemplateService.lerTemplate(conteudo);
    this.erros = TemplateService.erros;

    if (this.erros.length > 0) {
      console.error("Erro no template");
    } else { // REALIZAR O PROCESSAMENTO
      this.registrarAnimais(animais);
    }

    this.filePicker.reset();
    console.log("sistema de upload resetado");
  }

  registrarAnimais(animais: Array<Animal>) {
    console.log("adidas");
    console.log(animais);
    let url = HttpConfig.URL_PREFIX + "animal/save_animais";
    let fazendaId = JSON.parse(localStorage.getItem("fazenda")).id;
    let body = [];

    let lengthOfAnimais = animais.length;

    for (let i = 0; i < lengthOfAnimais; i++) {
      let animal = animais[i];
      let dadosAnimal: any = {
        "dataNascimento": animal.$dataNascimento != undefined ? DateUtil.dateBrToStringSQL(animal.$dataNascimento) : undefined,
        "gta": animal.$gta,
        "idCategoria": animal.$categoria,
        "idCurral": animal.$curral,
        "idEspecie": animal.$especie,
        "idFazenda": fazendaId,
        "idLote": animal.$lote,
        "inicioAtividade": animal.$inicioDeAtividade != undefined ? DateUtil.dateBrToStringSQL(animal.$inicioDeAtividade) : undefined,
        "manejo": animal.$manejo,
        "nome": animal.$nome,
        "pesoInicial": animal.$pesoInicial,
        "sexo": animal.$sexo,
        "sisbov": animal.$sisbov,
        "tag": animal.$tag
      };

      // BUSCAR RAÇAS NO SERVIDOR PELO NOME
      dadosAnimal.racas = [];

      for (let i = 0; i < animal.$racas.length; i++) {
        dadosAnimal.racas.push([animal.$racas[i].$id, animal.$racas[i].$peso]);
      }

      body.push(dadosAnimal);
    }

    console.log(body);
    this.showUploadProgress = true;

    this.httpUtil.post(url, body, {}, response => {
      this.showUploadProgress = false;
      this.snackBar.open("Os animais foram registrados com sucesso", "OK");
      // ANIMAL REGISTRADO
      this.erros.length = 0;
      console.log(response);
    }, error => {
      this.showUploadProgress = false;
      this.erros.length = 0;
      this.erros.push(new ErroTemplate("Erro cadastro", error.error.resposta));
      console.error(error);
    });
  }



}


