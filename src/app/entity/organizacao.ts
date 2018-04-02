export class Organizacao {
    private id:number;
    private nome:string;

	constructor($id: number, $nome: string) {
		this.id = $id;
		this.nome = $nome;
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