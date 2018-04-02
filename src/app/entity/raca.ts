export class Raca {

    public static RACAS: Array<Raca>;

    private id: number;
    private nome: string;
    private peso: number;
    private idEspecie : number;

    constructor(id: number, nome: string, peso: number) {
        this.id = id;
        this.nome = nome;
        this.peso = peso;
    }

    public clone(): any {
        var raca = new Raca(0, "", 0);
        raca.$id = this.id;
        raca.$nome = this.nome;
        raca.$peso = this.peso;
        return raca;
    }

	public get $idEspecie(): number {
		return this.idEspecie;
	}

	public set $idEspecie(value: number) {
		this.idEspecie = value;
	}

    public get $id(): number {
        return this.id;
    }

    public set $id(value: number) {
        this.id = value;
    }

    public get $nome(): string {
        return this.nome;
    }

    public set $nome(value: string) {
        this.nome = value;
    }

    public get $peso(): number {
        return this.peso;
    }

    public set $peso(value: number) {
        this.peso = value;
    }




}