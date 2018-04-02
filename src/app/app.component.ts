import { Lote } from './entity/lote';
import { Especie } from './entity/especie';
import { Raca } from './entity/raca';
import { HttpConfig } from './entity/httpConfig';
import { HttpUtil } from './../service/httpUtil';
import { Component, ViewChild, Renderer } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { FilePickerDirective } from 'ngx-file-helpers';
import { Router } from '@angular/router';
import { Ng2DeviceService } from 'ng2-device-detector';
import { Inject} from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';

enum ReadMode {
  arrayBuffer,
  binaryString,
  dataURL,
  text
}

interface ReadFile {
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  readMode: ReadMode;
  content: any;
}

declare var utf8: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tiles = [
    { text: 'One', cols: 2, rows: 5, color: 'lightblue', image: '../assets/images/messi.jpg' },
    { text: 'Two', cols: 2, rows: 5, color: 'lightgreen', image: '../assets/images/messi.jpg' }
  ];

  @ViewChild(FilePickerDirective)
  private filePicker: FilePickerDirective;

  @ViewChild("drawer") drawer: any;

  public file;
  modeSide: string;

  organizacaoSelecionada: number;
  organizacoes: any = [{ "value": 1, "label": "Senepol" }, { "value": 2, "label": "Intergado" }];
  fazendas: any = [{ "value": 1, "orgId": 1, "label": "Senepol" }, { "value": 2, "orgId": 1, "label": "Senepol 2" }, { "value": 3, "orgId": 1, "label": "Senepol 3" }, { "value": 4, "orgId": 2, "label": "Senepol" }];
  fazendasByOrganizacao: any = [];

  errorCep: boolean = false;
  public mask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  // public mask = [/[1-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  color = 'accent';
  checked = false;
  disabled = false;
  cep: string = '';
  cepValido: boolean = false;

  rua: string = "";
  bairro: string = "";
  cidade: string = "";
  uf: string = "";

  // tslint:disable-next-line:no-inferrable-types
  public answer: string = '';
  // tslint:disable-next-line:no-inferrable-types
  public answerDisplay: string = '';
  // tslint:disable-next-line:no-inferrable-types
  public showSpinner: boolean = false;

  public showSpinnerCep: boolean = false;


  events = [];
  opened: boolean = true;

  shouldRun = true;

  constructor(public snackBar: MatSnackBar, private router: Router, private deviceService: Ng2DeviceService,
    public httpUtil: HttpUtil, @Inject(DOCUMENT) private document: Document) {

  }
  
  onClose() {
    window.dispatchEvent(new Event('resize'));
  }

  onOpen() {
    window.dispatchEvent(new Event('resize'));
  }

  showAnswer() {
    this.showSpinner = true;
    setTimeout(() => {
      this.openSnackBar('Your answer', this.answer);

      this.showSpinner = false;
    }, 5000);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  redirect(pagename: string) {
    this.router.navigate(['/' + pagename]);
  }

  ngOnInit() {
    
    localStorage.setItem("fazenda", "{id:1}");

    let deviceInfo = this.deviceService.getDeviceInfo();
    console.log(deviceInfo);
    if (deviceInfo.device === "android" || deviceInfo.device === "iphone" || deviceInfo.device === "windows-phone") {
      this.modeSide = "over";
      this.drawer.toggle(false);
    } else {
      this.modeSide = "side";
      this.drawer.toggle(true);
    }

    setTimeout(() => {
      this.buscarRacasServidor();
      this.buscarEspecies();
    }, 100);
  }

  buscarEspecies() {
    let url = HttpConfig.URL_PREFIX + "especie/find_all";
    this.httpUtil.get(url, {}, response => {
      console.log("BUSCAR ESPECIES SERVIDOR");
      let dados = JSON.parse(response.resposta);
      let especies = new Array<Especie>();

      for (let i = 0; i < dados.length; i++) {
        especies.push(new Especie(dados[i].id, dados[i].nome));
      }

      Especie.ESPECIES_SERVIDOR = especies;
    }, error => {
      console.error(error);
    });
  }

  onActivate(event) {
    console.info("Scroll to Top please");
    this.document.body.scrollTop = 0;
}

  buscarRacasServidor() {
    let url = HttpConfig.URL_PREFIX + "raca/find_all";
    this.httpUtil.get(url, {}, response => {
      console.log("BUSCAR RAÇAS SERVIDOR");
      let dados = JSON.parse(response.resposta);
      let racas = new Array<Raca>();

      for (let i = 0; i < dados.length; i++) {
        racas.push(new Raca(dados[i].id, dados[i].nome, 0));
      }

      Raca.RACAS = racas;

      console.log(Raca.RACAS);

    }, error => {
      console.error(error);
    });
  }

}
