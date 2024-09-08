import connect from "./Connection.js";
import Evento from "../Model/events.js";
 
export default class EventoDAO {

    constructor() {
        this.init();
    }

    async init() {
        let conexao;
        try {
            conexao = await connect();
            const sql = `
            CREATE TABLE IF NOT EXISTS Evento (
                id INT PRIMARY KEY AUTO_INCREMENT,
                nome VARCHAR(255) NOT NULL,
                cidade VARCHAR(100),
                estado VARCHAR(2),
                data DATE NOT NULL,
                horario TIME NOT NULL,
                preco DECIMAL(10, 2),
                quantidade INT,
                descricao TEXT
            );
            `;
            await conexao.execute(sql);
            console.log("Banco de dados iniciado com sucesso!");
        } catch (erro) {
            console.log("O banco de dados não pode ser iniciado!", erro);
        } finally {
            if (conexao) {
                await conexao.release();
            }
        }
    }
    

    async gravar(evento) {
        if (!(evento instanceof Evento)) {
            console.error("O objeto fornecido não é uma instância de Evento.");
            return null; // Retorna null para indicar que a operação falhou
        }
    
        let conexao;
        try {
            conexao = await connect();
    
            if (!conexao) {
                throw new Error("Não foi possível estabelecer uma conexão com o banco de dados.");
            }
    
            const sql = `
                INSERT INTO Evento (nome, cidade, estado, data, horario, preco, quantidade, descricao)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            `;
            const parametros = [
                evento.nome,
                evento.cidade,
                evento.estado,
                evento.data,
                evento.horario,
                evento.preco,
                evento.quantidade,
                evento.descricao
            ];
    
            const [result] = await conexao.execute(sql, parametros);
    
            console.log("Evento inserido com sucesso!");
            return result.insertId;
        } catch (erro) {
            console.error("Erro ao gravar o evento:", erro);
            return null; // Retorna null em caso de erro para indicar que a operação falhou
        } finally {
            if (conexao) {
                await global.poolConexoes.releaseConnection(conexao);
            }
        }
    }
    

    async alterar(evento) {
        if (evento instanceof Evento && evento.id) {
            let conexao;
            try {
                conexao = await connect();
                const sql = `
                    UPDATE Evento 
                    SET nome = ?, cidade = ?, estado = ?, data = ?, horario = ?, preco = ?, quantidade = ?, descricao = ?
                    WHERE id = ?;
                `;
                const valores = [
                    evento.nome,
                    evento.cidade,
                    evento.estado,
                    evento.data,
                    evento.horario,
                    evento.preco,
                    evento.quantidade,
                    evento.descricao,
                    evento.id
                ];
    
                await conexao.execute(sql, valores);
                console.log("Evento atualizado com sucesso!");
            } catch (erro) {
                console.error("Erro ao atualizar o evento:", erro);
            } finally {
                if (conexao) {
                    await conexao.release();
                }
            }
        } else {
            console.error("Evento não encontrado para alteração ou ID não definido.");
        }
    }
    
    async excluir(evento) {
        if (!(evento instanceof Evento) || !evento.id) {
            console.error("Evento não encontrado para exclusão ou ID não definido.");
            return;
        }
    
        let conexao;
        try {
            conexao = await connect();
    
            if (!conexao) {
                throw new Error("Não foi possível estabelecer uma conexão com o banco de dados.");
            }
    
            const sql = `DELETE FROM Evento WHERE id = ?;`;
            const valores = [evento.id];
    
            const [resultado] = await conexao.execute(sql, valores);
    
            if (resultado.affectedRows === 0) {
                console.error("Nenhum evento encontrado com o ID fornecido.");
            } else {
                console.log("Evento excluído com sucesso!");
            }
        } catch (erro) {
            console.error("Erro ao excluir o evento:", erro);
        } finally {
            if (conexao) {
                await global.poolConexoes.releaseConnection(conexao);
            }
        }
    }
    
    
    async consultar(parametro) {
        let conexao;
        try {
            conexao = await connect();
    
            if (!conexao) {
                throw new Error("Não foi possível estabelecer uma conexão com o banco de dados.");
            }
    
            const sql = `SELECT * FROM Evento WHERE nome LIKE ?;`;
            const valores = [`%${parametro}%`];
    
            const [resultados] = await conexao.execute(sql, valores);
    
            const eventos = resultados.map(row => {
                const evento = new Evento(
                    row.nome,
                    row.cidade,
                    row.estado,
                    row.data,
                    row.horario,
                    row.preco,
                    row.descricao,
                );
                evento.id = row.id;
                return evento;
            });
    
            return eventos;
        } catch (erro) {
            console.error("Erro ao consultar o evento:", erro);
            return []; // Retorna uma lista vazia em caso de erro
        } finally {
            if (conexao) {
                await global.poolConexoes.releaseConnection(conexao);
            }
        }
    }    
}
