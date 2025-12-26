/**
 * Camada de estado da aplicação (State).
 * 
 * Responsável por manter a memória volátil da aplicação
 * durante a execução no navegador.
 *
 * Características:
 * - Armazena dados "vivos", prontos para uso
 * - Não persiste dados (isso é papel do Storage)
 * - Não possui regras de negócio
 * - Não interage com o DOM
 *
 * O conteúdo deste módulo é perdido ao recarregar a página,
 * sendo restaurado posteriormente a partir do localStorage.
 */

/**
 * Estrutura do estado global da aplicação.
 *
 * @typedef {Object} AppState
 * @property {Array<Task>} tarefas - Lista de tarefas ativas na aplicação.
 * @property {string} filtroAtual - Filtro atualmente aplicado na interface.
 */

/**
 * Estrutura de uma tarefa.
 *
 * @typedef {Object} Task
 * @property {number} id - Identificador único da tarefa.
 * @property {string} text - Descrição da tarefa.
 * @property {boolean} completed - Indica se a tarefa foi concluída.
 */

/**
 * Estado global da aplicação.
 *
 * @type {AppState}
 */
const state = {
    /**
     * Lista de tarefas mantidas em memória.
     * Inicialmente vazia e preenchida após o carregamento do storage.
     *
     * @type {Array<Task>}
     */
    tarefas: [
        // { id: 1, text: 'Tarefa Teste', completed: false }
    ],

    /**
     * Filtro atualmente selecionado na interface.
     *
     * Valores esperados:
     * - 'todos'
     * - 'a fazer'
     * - 'concluídas'
     *
     * @type {string}
     */
    filtroAtual: 'todos'
};

export default state;