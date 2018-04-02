import { CurralService } from './services/curral.service';
import { RacaService } from './services/raca.service';
import { EspecieService } from './services/especie.service';
import { CategoriaService } from './services/categoria.service';
import { LoteService } from './services/lote.service';
import { HttpUtil } from './../service/httpUtil';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { TextMaskModule } from 'angular2-text-mask';
import { Routes, RouterModule } from '@angular/router';
import { FileHelpersModule } from 'ngx-file-helpers';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { CadastroComponent } from './cadastro/cadastro.component';
import { SobreComponent } from './sobre/sobre.component';
import { CadastroAnimalComponent } from './cadastro-animal/cadastro-animal.component';
import { AnimalRowComponent } from './animal-row/animal-row.component';
import { AnimalRegistroComponent } from './animal-registro/animal-registro.component';
import { TituloComponent } from './titulo/titulo.component';
import { ErroTemplateComponent } from './erro-template/erro-template.component';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import { RacaComposicaoComponent } from './raca-composicao/raca-composicao.component';
import { MAT_DATE_LOCALE } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { CadastroLoteComponent } from './cadastro-lote/cadastro-lote.component';
import { EdicaoAnimalComponent } from './edicao-animal/edicao-animal.component';
import { GraficoLotesComponent } from './grafico-lotes/grafico-lotes.component';
import { GraficoDinamicaComponent } from './grafico-dinamica/grafico-dinamica.component';
import { GraficoDesempenhoComponent } from './grafico-desempenho/grafico-desempenho.component';
import { GraficoDesempenhoService } from './grafico-desempenho/grafico-desempenho.service';
import { GraficoDinamicaService } from './grafico-dinamica/grafico-dinamica.service';
import { GraficoLotesService } from './grafico-lotes/grafico-lotes.service';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    SobreComponent,
    CadastroAnimalComponent,
    AnimalRowComponent,
    AnimalRegistroComponent,
    TituloComponent,
    ErroTemplateComponent,
    RacaComposicaoComponent,
    DialogComponent,
    CadastroLoteComponent,
    EdicaoAnimalComponent,
    GraficoLotesComponent,
    GraficoDinamicaComponent,
    GraficoDesempenhoComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FileHelpersModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    TextMaskModule,
    AppRoutingModule,
    Ng2DeviceDetectorModule.forRoot()
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    HttpUtil, LoteService, CategoriaService, EspecieService, RacaService, CurralService, 
    GraficoDesempenhoService, GraficoDinamicaService, GraficoLotesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
