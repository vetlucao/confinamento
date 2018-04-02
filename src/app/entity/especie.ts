export class Especie {
    private id: number;
    private nome: String;

    public static ESPECIES_SERVIDOR: Array<Especie>;

    constructor($id: number, $nome: String) {
        this.id = $id;
        this.nome = $nome;
    }

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


}