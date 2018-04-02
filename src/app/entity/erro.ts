export class ErroTemplate {
    private mensagem: string;
    private observacoes: string;

    constructor($mensagem: string, $observacoes: string) {
        this.mensagem = $mensagem;
        this.observacoes = $observacoes;
    }

    public get $mensagem(): string {
        return this.mensagem;
    }

    public set $mensagem(value: string) {
        this.mensagem = value;
    }

    public get $observacoes(): string {
        return this.observacoes;
    }

    public set $observacoes(value: string) {
        this.observacoes = value;
    }

}