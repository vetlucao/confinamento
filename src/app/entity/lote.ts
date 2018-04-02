export class Lote {
    public static LOTES: Array<Lote>;
    private id: number;
    private nome: string;
    private idCurral: number;

    constructor(id: number, nome: string) {
        this.id = id;
        this.nome = nome;
    }

	public get $idCurral(): number {
		return this.idCurral;
	}

	public set $idCurral(value: number) {
		this.idCurral = value;
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

}