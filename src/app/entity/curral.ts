export class Curral {
    private id: number;
    private nome : String;
    private idFazenda : number;
    private ativo: number;

    constructor(){}

	public get $id(): number {
		return this.id;
	}

	public set $id(value: number) {
		this.id = value;
	}

	public get $nome(): String {
		return this.nome;
	}

	public set $nome(value: String) {
		this.nome = value;
	}

	public get $idFazenda(): number {
		return this.idFazenda;
	}

	public set $idFazenda(value: number) {
		this.idFazenda = value;
	}

	public get $ativo(): number {
		return this.ativo;
	}

	public set $ativo(value: number) {
		this.ativo = value;
	}
    

}