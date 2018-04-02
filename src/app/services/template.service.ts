import { Especie } from './../entity/especie';
import { DateUtil } from './date-util.service';
import { ErroTemplate } from './../entity/erro';
import { LocalStorageService } from './local-storage.service';
import { Animal } from './../entity/animal';
import { Raca } from '../entity/raca';

export class TemplateService {

    private static readonly ESPECIES = ["ave", "bovina", "bubalina", "caprina", "equina", "ovina", "suína", "suina"];

    private static readonly TEMPLATE_NOME: number = 0;
    private static readonly TEMPLATE_TAG: number = 1;
    private static readonly TEMPLATE_MANEJO: number = 2;
    private static readonly TEMPLATE_SISBOV: number = 3;
    private static readonly TEMPLATE_ESPECIE: number = 4;
    private static readonly TEMPLATE_CURRAL: number = 5;
    private static readonly TEMPLATE_LOTE: number = 6;
    private static readonly TEMPLATE_SEXO: number = 7;
    private static readonly TEMPLATE_DATA_NASCIMENTO: number = 8;
    private static readonly TEMPLATE_INICIO_ATIVIDADE: number = 9;
    private static readonly TEMPLATE_PESO_INICIAL: number = 10;
    private static readonly TEMPLATE_CATEGORIA: number = 11;
    private static readonly TEMPLATE_GTA: number = 12;
    private static readonly TEMPLATE_RACAS: number = 13;
    private static readonly TEMPLATE_RACAS_PESOS: number = 14;

    public static erros: Array<any>;
    private static listaTags: Array<string>;
    private static listaSisbov: Array<string>;

    private static LINHA: number;

    static lerTemplate(conteudo: string): Array<Animal> {
        this.LINHA = 0;
        this.erros = new Array<string>();
        this.listaTags = new Array<string>();
        this.listaSisbov = new Array<string>();

        var animais = new Array<Animal>();

        console.log(conteudo);

        try {
            var registros = conteudo.split("\n");
            var array;
            for (let i = 0; i < registros.length; i++) {
                this.LINHA++;

                // SALTAR CABEÇALHO
                array = registros[i].split(";");

                if (i != 0 && this.verificarLinhaVazia(array)) {
                    let animal = new Animal();
                    // SÂO ASSOCIADOS 
                    animal.$organizacao = 1;
                    animal.$fazenda = 1;

                    animal.$nome = array[this.TEMPLATE_NOME];
                    if (this.validarTag(array[this.TEMPLATE_TAG])) { animal.$tag = array[this.TEMPLATE_TAG]; }
                    if (this.validarSisbov(array[this.TEMPLATE_SISBOV])) { animal.$sisbov = array[this.TEMPLATE_SISBOV]; }
                    if (this.validarManejo(array[this.TEMPLATE_MANEJO])) { animal.$manejo = array[this.TEMPLATE_MANEJO]; }

                    animal.$curral = array[this.TEMPLATE_CURRAL];
                    animal.$lote = array[this.TEMPLATE_LOTE];

                    if (this.validarSexo(array[this.TEMPLATE_SEXO])) {
                        let sexo: string = array[this.TEMPLATE_SEXO].toLowerCase();
                        switch (sexo) {
                            case "macho":
                                animal.$sexo = "M";
                                break;
                            case "fêmea":
                                animal.$sexo = "F";
                                break;
                            case "femea":
                                animal.$sexo = "F";
                                break;
                            case "castrado":
                                animal.$sexo = "C";
                                break;
                            default:
                                animal.$sexo = undefined;
                                break;
                        }
                    }
                    if (this.validarDataNascimento(array[this.TEMPLATE_DATA_NASCIMENTO])) { animal.$dataNascimento = array[this.TEMPLATE_DATA_NASCIMENTO]; }
                    if (this.validarDataInicio(array[this.TEMPLATE_INICIO_ATIVIDADE])) { animal.$inicioDeAtividade = array[this.TEMPLATE_INICIO_ATIVIDADE]; }
                    if (this.validarPesoInicial(array[this.TEMPLATE_PESO_INICIAL])) { animal.$pesoInicial = parseInt(array[this.TEMPLATE_PESO_INICIAL]); }
                    if (this.validarCategoria(array[this.TEMPLATE_CATEGORIA])) { animal.$categoria = array[this.TEMPLATE_CATEGORIA]; }
                    if (this.validarGta(array[this.TEMPLATE_GTA])) { animal.$gta = array[this.TEMPLATE_GTA]; }

                    if (this.validarEspecie(array[this.TEMPLATE_ESPECIE])) {
                        let index = Especie.ESPECIES_SERVIDOR.findIndex(especieLista => especieLista.$nome.toLowerCase() == array[this.TEMPLATE_ESPECIE].toLowerCase())
                        if (index != -1) {
                            animal.$especie = Especie.ESPECIES_SERVIDOR[index].$id;
                        }
                    }
                    if (this.validarRacas(array[this.TEMPLATE_RACAS], array[this.TEMPLATE_RACAS_PESOS])) {
                        let controleRacas = array[this.TEMPLATE_RACAS].split("/");
                        let controlePesos = array[this.TEMPLATE_RACAS_PESOS].split("/");
                        let lengthOfRacas = controleRacas.length;

                        for (let i = 0; i < lengthOfRacas; i++) {
                            let racaPeso = controlePesos[i];
                            let racaNome = controleRacas[i];
                            let racaIndex = Raca.RACAS.findIndex(racaLista => racaLista.$nome.toLowerCase() == racaNome.toLowerCase());
                            let raca = Raca.RACAS[racaIndex].clone();
                            raca.$peso = parseInt(racaPeso);
                            animal.$racas.push(raca);
                        }
                    }

                    animais.push(animal);
                }
            }

            if (this.erros.length == 0) {
                console.log("Cadastrar");
            } else {
                console.error(this.erros);
            }

        } catch (error) {
            console.error(error);
            return null;
        }

        return animais;
    }

    private static validarRacas(racas: string, peso: string): boolean {
        console.log(racas);
        let listaDeRacas = racas.split("/");
        let listaDePesos = peso.split("/");

        if (racas != "") {
            if (listaDeRacas.length != listaDePesos.length) {
                this.erros.push(new ErroTemplate("A quantidade de peso não é igual a quantidade de raças", "Linha:" + this.LINHA));
                return false;
            }

            for (let j = 0; j < listaDeRacas.length; j++) {
                let raca = listaDeRacas[j];
                let racaIndex = Raca.RACAS.findIndex(racaLista => racaLista.$nome.toLowerCase() == raca.toLowerCase());
                if (racaIndex == -1) {
                    this.erros.push(new ErroTemplate("Raça [" + raca + "] inválida", "Linha:" + this.LINHA));
                    return false;
                }
            }

            let totalPorcentagem = 0;
            for (let i = 0; i < listaDePesos.length; i++) {
                let valor = parseInt(listaDePesos[i]);
                if (isNaN(valor)) {
                    this.erros.push(new ErroTemplate("Porcentagem de raça inválida", "Linha:" + this.LINHA));
                    return false;
                } else {
                    totalPorcentagem += valor;
                }
            }

            if (totalPorcentagem != 100) {
                this.erros.push(new ErroTemplate("O somatório das raças deve ser igual à 100", "Linha:" + this.LINHA));
                return false;
            }

        } else {
            this.erros.push(new ErroTemplate("Raça(s) e peso(s) deve(m) ser informado(s)", "Linha:" + this.LINHA));
            return false;
        }

        return true;
    }

    private static validarDataInicio(dataInicio: string): boolean {
        if (dataInicio != null) {
            if (dataInicio.length == 0) {
                this.erros.push(new ErroTemplate("Data de início de atividade deve ser informada", "Linha:" + this.LINHA));
                return false;
            } else {
                if (DateUtil.validationDateDDMMYYYY(dataInicio)) {
                    return true;
                } else {
                    this.erros.push(new ErroTemplate("Data de início de atividade inválida", "Linha:" + this.LINHA));
                    return false;
                }
            }
        }
    }

    private static validarDataNascimento(dataNascimento: string): boolean {
        if (dataNascimento != null) {
            if (dataNascimento.length == 0) {
                return false;
            } else {
                if (DateUtil.validationDateDDMMYYYY(dataNascimento)) {
                    return true;
                } else {
                    this.erros.push(new ErroTemplate("Data de Nascimento inválida", "Linha:" + this.LINHA));
                    return false;
                }
            }
        }

        return false;
    }

    private static validarSexo(sexo: string): boolean {
        if (sexo != null) {
            if (sexo.length == 0) {
                this.erros.push(new ErroTemplate("Sexo é obrigatório. Sexos válidos (macho, fêmea, castrado)", "Linha:" + this.LINHA));
                return false;
            } else if (sexo.toLowerCase() === "macho" || sexo.toLowerCase() === "fêmea" || sexo.toLowerCase() === "femea" || sexo.toLowerCase() === "castrado") {
                return true;
            } else {
                this.erros.push(new ErroTemplate("Sexo [" + sexo + "] inválido. Sexos válidos (macho, fêmea, castrado)", "Linha:" + this.LINHA));
                return false;
            }
        }

        return false;
    }

    private static validarTag(tag: string): boolean {
        if (tag != null) {
            if (tag.length == 15) {
                if (this.listaTags.indexOf(tag) == -1) {
                    this.listaTags.push(tag);
                    return true;
                } else {
                    this.erros.push(new ErroTemplate("Foi encontrada TAG repetida no arquivo", "TAG: " + tag + " Linha:" + this.LINHA));
                    return false;
                }

            } else if (tag.length == 0) {
                this.erros.push(new ErroTemplate("TAG não foi encontrada", "Linha:" + this.LINHA));
                return false;
            } else {
                this.erros.push(new ErroTemplate("TAG Incompleta", "TAG: " + tag + " Linha:" + this.LINHA));
                return false;
            }
        }

        return false;
    }

    private static validarSisbov(sisbov: string): boolean {
        if (sisbov != null) {
            if (sisbov.length == 15) {
                if (this.listaSisbov.indexOf(sisbov) == -1) {
                    this.listaSisbov.push(sisbov);
                    return true;
                } else {
                    this.erros.push(new ErroTemplate("Foi encontrada SISBOV repetido no arquivo", "SISBOV: " + sisbov + " Linha:" + this.LINHA));
                    return false;
                }

            } else if (sisbov.length != 0) {
                this.erros.push(new ErroTemplate("SISBOV Incompleto", "SISBOV: " + sisbov + " Linha:" + this.LINHA));
                return false;
            }
        }

        return false;
    }

    private static validarManejo(manejo: string): boolean {
        if (manejo != null) {
            if (manejo.length > 1) {
                return true;
            } else {
                this.erros.push(new ErroTemplate("Manejo não foi informado", "Linha:" + this.LINHA));
            }
        }

        return false;
    }

    static validarEspecie(especie: string): boolean {
        if (especie != null) {
            let index = this.ESPECIES.indexOf(especie.toLowerCase());
            if (index != -1) {
                return true;
            } else if (especie.length == 0) {
                this.erros.push(new ErroTemplate("Espécie é obrigatória. Espécies válidas (ave, bovino, bubalino, caprino, equino, ovino, suíno)", "Linha:" + this.LINHA));
                return false;
            } else {
                this.erros.push(new ErroTemplate("Espécie [" + especie + "] inválida. Espécies válidas (ave, bovina, bubalina, caprina, equina, ovina, suína)", "Linha:" + this.LINHA));
                return false;
            }
        }
        return false;
    }

    static validarPesoInicial(pesoInicial: string): boolean {
        if (pesoInicial != null) {
            if (pesoInicial.length == 0) {
                return false;
            } else {
                var peso = parseInt(pesoInicial);
                if (!isNaN(peso)) {
                    return true;
                } else {
                    this.erros.push(new ErroTemplate("Peso inicial inválido", "Linha:" + this.LINHA));
                    return false;
                }
            }
        }

        return false;
    }

    static validarCategoria(categoria: string): boolean {
        if (categoria != null) {
            if (categoria.length == 0) {
                return false;
            } else {
                // IMPLEMENTAR REGRA DE CATEGORIA
                return true;
            }
        }

        return false;
    }

    static validarGta(gta: string): boolean {
        if (gta != null) {
            if (gta.length == 0) {
                return false;
            } else {
                // IMPLEMENTAR REGRA DE GTA
                return true;
            }
        }

        return false;
    }

    private static verificarLinhaVazia(linha: Array<String>) {
        let valid = false;
        for (let i = 0; i < 12; i++) {
            if (linha[i] != "") {
                valid = true;
                i = 12
            }
        }

        if(linha.length == 1)
        valid = false;

        return valid;
    }


}