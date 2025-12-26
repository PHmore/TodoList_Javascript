/**
 * Camada de regras de negócio e orquestração da aplicação.
 * 
 * Este módulo atua como o "Hub de controle":
 * - Coordena interações entre State, Storage e View
 * - Aplica validações e regras de negócio
 * - Nunca manipula diretamente o DOM
 */

import { salvar, carregar } from "./storage.js";
import state from "./state.js";
import renderizarLista, { mostrarErro, confirmarAcao } from "./view.js";

console.log(state.tarefas);


/**
 * Valida e sanitiza o texto de entrada de uma tarefa.
 * 
 * Regras aplicadas:
 * - Deve ser string
 * - Remove espaços extras
 * - Não pode ser vazio
 * - Tamanho mínimo e máximo
 *
 * @param {string} texto - Texto bruto informado pelo usuário.
 * @returns {string} Texto validado e sanitizado.
 * @throws {Error} Caso a entrada viole alguma regra.
 */
function validaEntrada(texto) {
    // 1. Segurança básica: verifica se é string
    if (typeof texto !== 'string') {
        throw new Error("Formato de entrada inválido.");
    }

    // 2. Sanitização: Remove espaços do começo e fim
    // Ex: "  Comprar pão   " vira "Comprar pão"
    const textoLimpo = texto.trim();

    // 3. Validação de Vazio
    if (textoLimpo.length === 0) {
        throw new Error("Você precisa escrever o nome da tarefa!");
    }

    // 4. Validação de Tamanho Mínimo
    if (textoLimpo.length < 3) {
        throw new Error("A tarefa precisa ter pelo menos 3 letras.");
    }

    // 5. Validação de Tamanho Máximo (Opcional, mas bom para UI)
    if (textoLimpo.length > 60) {
        throw new Error("Texto muito longo! Abrevie para até 60 letras.");
    }

    // SE PASSAR POR TUDO: Retorna o texto já limpo para ser salvo
    return textoLimpo;
}

/**
 * Apaga todas as tarefas da memória, storage e tela.
 * 
 * Função interna de negócio, utilizada após confirmação explícita
 * do usuário.
 *
 * @returns {void}
 */
function apagarDadosInterno() {
    state.tarefas = [];
    salvar(state.tarefas);
    renderizarLista(state.tarefas);
    console.log("Memória limpa com sucesso.");
}

/**
 * Solicita confirmação do usuário para apagar todas as tarefas.
 * 
 * Orquestra a interação entre View (modal de confirmação)
 * e regras de negócio (limpeza total).
 *
 * @returns {Promise<void>}
 */
export async function solicitarLimpezaTotal() {
    // 1. A action pede para a view perguntar (pausa a execução aqui)
    const confirmou = await confirmarAcao("Deseja apagar tudo permanentemente?");

    // 2. Decide o fluxo baseado na resposta
    if (confirmou) {
        apagarDadosInterno();
        console.log("Lixeira esvaziada!"); // Feedback extra opcional
    } else {
        console.log("Operação cancelada pelo usuário.");
    }
}

/**
 * Cria uma nova tarefa e atualiza todo o fluxo da aplicação.
 * 
 * Etapas:
 * - Validação e sanitização
 * - Verificação de duplicidade
 * - Atualização do state
 * - Persistência no storage
 * - Re-renderização com base no filtro atual
 *
 * @param {string} texto - Texto informado pelo usuário.
 * @returns {void}
 */
export function adicionarTarefa(texto) {
    try {
        // PASSO 1: A Validação (O porteiro)
        // Se der erro, ele pula direto para o catch lá embaixo.
        // Se passar, ele nos devolve o texto sem espaços inúteis.
        const textoTratado = validaEntrada(texto); 

        // PASSO 2: Verificação de Duplicatas (Opcional mas Recomendado)
        // Precisamos verificar no state se já existe algo igual
        const jaExiste = state.tarefas.some(t => t.text.toLowerCase() === textoTratado.toLowerCase());
        if (jaExiste) {
            throw new Error("Essa tarefa já existe na sua lista!");
        }
        
    const novaTarefa = {
        // O Date.now() gera algo como 1703273849123
        // É quase impossível você clicar duas vezes no mesmo milissegundo.
        id: Date.now(), 
        text: textoTratado,
        completed: false
    };

    // 1. Atualiza State
    state.tarefas.push(novaTarefa);
    
    // 2. Atualiza Storage (Persistência)
    // Como o ID já foi gerado e está DENTRO do objeto, ele foi salvo "para sempre".
    salvar(state.tarefas);
    
    // 3. Atualiza Tela será feita pela filtragem para evitar bugs como criar uma task e aparecer no filtro errado
    filtrarTarefa(state.filtroAtual);

    } catch (error) {
        console.log('Ocorreu um erro na Criação da tarefa');
        
        mostrarErro(error);
    }

};

/**
 * Filtra as tarefas conforme o critério selecionado
 * e atualiza a interface.
 *
 * @param {string} filtro - Critério de filtro ("todas", "a fazer", "concluídas").
 * @returns {void}
 */
export function filtrarTarefa(filtro) {
    try {
            
        state.filtroAtual = filtro;
        const tarefas = state.tarefas; // Use const para referência local
        let tarefasFiltradas; // Declare fora para ter escopo em toda a função

        const filtroLimpo = filtro.trim().toLowerCase();
        console.log(filtroLimpo)

        if (filtroLimpo === 'a fazer') {
            // Filtra onde completed é false
            tarefasFiltradas = tarefas.filter(item => !item.completed);
        } else if (filtroLimpo === 'concluídas' || filtroLimpo === 'concluidas') {
            // Filtra onde completed é true
            tarefasFiltradas = tarefas.filter(item => item.completed);
        } else {
            // Caso seja 'todas' ou qualquer outro valor
            tarefasFiltradas = tarefas;
        }

        // Você deve retornar o valor ou chamar a função que renderiza a tela
        renderizarLista(tarefasFiltradas); 

    
    } catch (error) {
        console.log('Ocorreu um erro na filtragem');
        
        mostrarErro(error);
    }
};

/**
 * Alterna o status de conclusão de uma tarefa.
 *
 * @param {number|string} id - Identificador da tarefa.
 * @returns {void}
 */
export function toggleTarefa(id) {
    try {
        
        // CONVERTA O ID PARA NÚMERO AQUI PARA GARANTIR
        const idNumero = Number(id); 

        state.tarefas = state.tarefas.map(tarefa => {
            // Agora compara Número com Número
            if (tarefa.id === idNumero) {
                return { ...tarefa, completed: !tarefa.completed }; 
            }
            return tarefa;
        });

        salvar(state.tarefas);

        filtrarTarefa(state.filtroAtual);


    } catch (error) {
        console.log('Ocorreu um erro no toggle');
        
        mostrarErro(error);
    }
};

/**
 * Carrega as tarefas persistidas em memória
 * e atualiza a interface inicial.
 *
 * @returns {void}
 */
export function carregarMemoria(){
    state.tarefas = carregar();
    console.log("Carregado: "+state.tarefas);
    renderizarLista(state.tarefas);
};

/**
 * Aplica limites máximos de tarefas pendentes e concluídas.
 * 
 * Função auxiliar interna para controle de memória.
 *
 * @param {Array<Object>} todasAsTarefas - Lista completa de tarefas.
 * @returns {Array<Object>} Lista limitada e ordenada.
 */
function aplicarLimitesDeMemoria(todasAsTarefas) {
    const LIMITE_PENDENTES = 10;
    const LIMITE_CONCLUIDAS = 5;

    // 1. Separa os dois grupos
    let pendentes = todasAsTarefas.filter(t => !t.completed);
    let concluidas = todasAsTarefas.filter(t => t.completed);

    // 2. Aplica a "tesoura" se passar do limite
    // .slice(-N) pega apenas os ÚLTIMOS N itens (os mais novos)
    if (pendentes.length > LIMITE_PENDENTES) {
        pendentes = pendentes.slice(-LIMITE_PENDENTES);
    }

    if (concluidas.length > LIMITE_CONCLUIDAS) {
        concluidas = concluidas.slice(-LIMITE_CONCLUIDAS);
    }

    // 3. Junta tudo de novo e garante que esteja ordenado (opcional)
    // Se quiser manter a ordem de criação, ordenamos pelo ID
    const listaLimpa = [...pendentes, ...concluidas].sort((a, b) => a.id - b.id);

    return listaLimpa;
}