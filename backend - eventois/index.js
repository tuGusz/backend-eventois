import Evento from './Model/events.js';

const evento = new Evento(
    'Gil', // Nome do evento
    'São Paulo', // Cidade
    'SP', // Estado
    '2024-09-08', // Data no formato correto
    '14:00', // Hora do evento
    75.00, // Preço em Decimal
    25, // Quantidade ingressos
    'Teste descrição', // Descrição
);

/**
 * Função para testar o salvamento de um evento no banco de dados.
 */
async function testSaveEvent() {
    try {
        const eventId = await evento.gravar();
        if (eventId) {
            console.log('Okay | --> Evento REGISTADO com Sucesso!');
            console.log(`Okay | --> ID do Evento: ${eventId}`);
        } else {
            console.log('AVISO | --> Evento foi gravado');
        }
    } catch (error) {
        console.log(`ERROR | --> Erro ao REGISTRAR o evento: ${error}`);
    }
}

/**
 * Função para testar a atualização de um evento existente no banco de dados.
 * @param {number} eventId - O ID do evento a ser atualizado.
 */
async function testUpdateEvent(eventId) {
    try {
        if (!eventId) {
            console.log("AVISO | --> ID do evento não fornecido. Certifique-se de que o evento foi salvo com sucesso.");
            return;
        }
        evento.id = eventId;
        evento.nome = 'GIL ATUALIZADO COM SUCESSO!!!!'; // Nome atualizado
        await evento.alterar(eventId);
        console.log('Okay | --> Evento atualizado com sucesso.');
    } catch (error) {
        console.log(`ERROR | --> Erro ao atualizar o evento: ${error}`);
    }
}

/**
 * Função para testar a exclusão de um evento do banco de dados.
 * @param {number} eventId - O ID do evento a ser excluído.
 */
async function testDeleteEvent(eventId) {
    try {
        if (!eventId) {
            console.log("AVISO | --> ID do evento não fornecido. Certifique-se de que o evento foi salvo com sucesso.");
            return;
        }
        await evento.deletar(eventId);
        console.log('Okay | --> Evento excluído com sucesso.');
    } catch (error) {
        console.log(`ERROR | --> Erro ao excluir o evento: ${error}`);
    }
}

/**
 * Função para testar a consulta de eventos no banco de dados.
 */
async function testQueryEvents() {
    try {
        const events = await evento.consultar("");
        if (events.length > 0) {
            events.forEach(event => {
                console.log(event.toString());
            });
        } else {
            console.log('AVISO | --> Nenhum evento encontrado.');
        }
    } catch (error) {
        console.log(`ERROR | --> Erro ao consultar eventos: ${error}`);
    }
}

/**
 * Executa todos os testes
 */
async function RunBitchRunnnn() {
    //await testSaveEvent();  //Registrar evento
    //await testUpdateEvent(10); //Atualizar o evento do Gil
    //Vamos deletar o evento agora 
    //testDeleteEvent(10); //Tchau gil
    testQueryEvents();
}

RunBitchRunnnn();