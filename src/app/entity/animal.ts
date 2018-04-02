import { DateUtil } from './../services/date-util.service';
import { Raca } from './raca';
import { Lote } from './lote';
import { Categoria } from './categoria';
export class Animal {
	private id: number;
	private nome: string;
	private tag: string;
	private tagCompare: string;
	private manejo: string;
	private sisbov: string;
	private especie: number;
	private organizacao: number;
	private fazenda: number;
	private curral: number;
	private lote: Lote;
	private sexo: string;
	private dataNascimento: string;
	private dataNascimentoDate: Date;
	private inicioDeAtividade: string;
	private inicioDeAtividadeDate: Date;
	private pesoInicial: number;
	private categoria: Categoria;
	private gta: string;
	private racas: Array<Raca>;

	constructor() {
		this.racas = new Array<Raca>();
	}

	public get $id(): number {
		return this.id;
	}

	public get $tagCompare(): string {
		return this.tagCompare;
	}

	public set $tagCompare(value: string) {
		this.tagCompare = value;
	}
	
	public get $inicioDeAtividadeDate(): Date {
		return this.inicioDeAtividadeDate;
	}

	public set $inicioDeAtividadeDate(value: Date) {
		this.inicioDeAtividadeDate = value;
	}

	public set $id(value: number) {
		this.id = value;
	}

	public get $dataNascimentoDate(): Date {
		return this.dataNascimentoDate;
	}

	public set $dataNascimentoDate(value: Date) {
		this.dataNascimentoDate = value;
	}
	
	public get $sexo(): string {
		return this.sexo;
	}

	public set $sexo(value: string) {
		this.sexo = value;
	}

	public get $nome(): string {
		return this.nome;
	}

	public set $nome(value: string) {
		this.nome = value;
	}

	public get $tag(): string {
		return this.tag;
	}

	public set $tag(value: string) {
		this.tag = value;
	}

	public get $manejo(): string {
		return this.manejo;
	}

	public set $manejo(value: string) {
		this.manejo = value;
	}

	public get $sisbov(): string {
		return this.sisbov;
	}

	public set $sisbov(value: string) {
		this.sisbov = value;
	}

	public get $especie(): number {
		return this.especie;
	}

	public set $especie(value: number) {
		this.especie = value;
	}

	public get $organizacao(): number {
		return this.organizacao;
	}

	public set $organizacao(value: number) {
		this.organizacao = value;
	}

	public get $fazenda(): number {
		return this.fazenda;
	}

	public set $fazenda(value: number) {
		this.fazenda = value;
	}

	public get $curral(): number {
		return this.curral;
	}

	public set $curral(value: number) {
		this.curral = value;
	}

	public get $dataNascimento(): string {
		return this.dataNascimento;
	}

	public set $dataNascimento(value: string) {
		this.dataNascimento = value;
	}

	public get $inicioDeAtividade(): string {
		return this.inicioDeAtividade;
	}

	public set $inicioDeAtividade(value: string) {
		this.inicioDeAtividade = value;
	}

	public get $pesoInicial(): number {
		return this.pesoInicial;
	}

	public set $pesoInicial(value: number) {
		this.pesoInicial = value;
	}

	public get $gta(): string {
		return this.gta;
	}

	public set $gta(value: string) {
		this.gta = value;
	}


	public get $lote(): Lote {
		return this.lote;
	}

	public set $lote(value: Lote) {
		this.lote = value;
	}

	public get $categoria(): Categoria {
		return this.categoria;
	}

	public set $categoria(value: Categoria) {
		this.categoria = value;
	}

	public get $racas(): Array<Raca> {
		return this.racas;
	}

	public set $racas(value: Array<Raca>) {
		this.racas = value;
	}

}