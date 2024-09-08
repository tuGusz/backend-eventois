import EventoDAO from "../DAO/eventDAO.js";

export default class Evento {
    #id;
    #nome;
    #cidade;
    #estado;
    #data;
    #horario;
    #preco;
    #quantidade;
    #descricao;

    constructor(nome, cidade, estado, data, horario, preco, quantidade, descricao) {
        this.#nome = nome;
        this.#cidade = cidade;
        this.#estado = estado;
        this.#data = data;
        this.#horario = horario;
        this.#preco = preco;
        this.#quantidade = quantidade;
        this.#descricao = descricao;
    }

    get id() {
        return this.#id;
    }

    set id(novoId) {
        this.#id = novoId;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }
 
    get cidade() {
        return this.#cidade;
    }

    set cidade(novaCidade) {
        this.#cidade = novaCidade;
    }

    get estado() {
        return this.#estado;
    }

    set estado(novoEstado) {
        this.#estado = novoEstado;
    }

    get data() {
        return this.#data;
    }

    set data(novaData) {
        const [ano, mes, dia] = novaData.split('-').map(Number);
        const data = new Date(ano, mes - 1, dia);
    
        if (data.getFullYear() !== ano || data.getMonth() !== mes - 1 || data.getDate() !== dia) {
            throw new Error("Formato [DATA] inválido. Use o formato");
        }
        this.#data = novaData;
    }

    get horario() {
        return this.#horario;
    }

    set horario(novoHorario) {
        this.#horario = novoHorario;
    }

    get preco() {
        return this.#preco;
    }

    set preco(novoPrice) {
        this.#preco = novoPrice;
    }

    get quantidade() {
        return this.#quantidade;
    }

    set quantidade(newquantidade) {
        this.#quantidade = newquantidade;
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(novaDescricao) {
        this.#descricao = novaDescricao;
    }

    toString() {
        const dateI = Data(this.#data);
        const fromData = Hora(this.#horario);

        return `Evento: ${this.#nome}\n` +
            `Local: ${this.#cidade} & ${this.#estado}\n` +
            `Data: ${dateI} e as ${fromData}\n` +
            `Preço: ${this.#preco}\n` +
            `Descrição: ${this.#descricao}\n`;
    }

    async gravar() {
        const e = new EventoDAO();
        const id = await e.gravar(this);
        this.#id = id;  
    }

    async consultar(parametro) {
        const e = new EventoDAO();
        return await e.consultar(parametro);
    }

    async deletar(id) {
        if (!id) {
            throw new Error("ERROR | --> O ID informado não é valido.");
        }
        this.#id = id;  
        const e = new EventoDAO();
        await e.deletar(this);
    }

    //Altere
    async alterar(id) {
        if (!id) {
            throw new Error("ERROR | --> O ID informado não é valido.");
        }
        this.#id = id; 
        const e = new EventoDAO();
        await e.alterar(this);
    }
}

function Data(data) {
    if (!data) return '';
    const dateObj = new Date(data);
    const ano = dateObj.getFullYear();
    const mes = String(dateObj.getMonth() + 1).padStart(2, '0'); 
    const dia = String(dateObj.getDate()).padStart(2, '0');
    return `${dia}/${mes}/${ano}`;
}

function Hora(hora) {
    if (!hora) return '';
    if (typeof hora !== 'string' || !hora.includes(':')) {
        return '';
    }

    const [horas, minutos] = hora.split(':');
    const horaFormatada = horas.padStart(2, '0');
    const minutosFormatados = minutos.padStart(2, '0');

    return `${horaFormatada}:${minutosFormatados}`;
}
