export class GraficoLotes {
    private valor: number;
    private meta: number;
    private variacao: number;
    private lote: string;
    private isMeta: boolean;
    private unidade: string;

    constructor() { }

    getHoverInfo() {
        /* [" Meta: 30 kg ", " Meta: 15 kg ", " Meta: 20 kg "] */
        let info = [];
        info.push("Mediana:<br> " + this.valor + " " + this.unidade + " ± " + this.variacao + " " + this.unidade);
        info.push("Meta: "+this.meta+" "+this.unidade);
        return info;
    }

    /**n
     * Getter $valor
     * @return {number}
     */
    public get $valor(): number {
        return this.valor;
    }

    /**
     * Getter $meta
     * @return {number}
     */
    public get $meta(): number {
        return this.meta;
    }

    /**
     * Getter $variacao
     * @return {number}
     */
    public get $variacao(): number {
        return this.variacao;
    }

    /**
     * Getter $lote
     * @return {string}
     */
    public get $lote(): string {
        return this.lote;
    }

    /**
     * Getter $isMeta
     * @return {boolean}
     */
    public get $isMeta(): boolean {
        return this.isMeta;
    }

    /**
     * Getter $unidade
     * @return {string}
     */
    public get $unidade(): string {
        return this.unidade;
    }

    /**
     * Setter $valor
     * @param {number} value
     */
    public set $valor(value: number) {
        this.valor = value;
    }

    /**
     * Setter $meta
     * @param {number} value
     */
    public set $meta(value: number) {
        this.meta = value;
    }

    /**
     * Setter $variacao
     * @param {number} value
     */
    public set $variacao(value: number) {
        this.variacao = value;
    }

    /**
     * Setter $lote
     * @param {string} value
     */
    public set $lote(value: string) {
        this.lote = value;
    }

    /**
     * Setter $isMeta
     * @param {boolean} value
     */
    public set $isMeta(value: boolean) {
        this.isMeta = value;
    }

    /**
     * Setter $unidade
     * @param {string} value
     */
    public set $unidade(value: string) {
        this.unidade = value;
    }

}   
