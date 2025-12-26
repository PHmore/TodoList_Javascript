/**
 * Ponto de entrada da aplicação (Entry Point).
 *
 * Responsabilidades:
 * - Selecionar elementos do DOM
 * - Registrar listeners de eventos
 * - Encaminhar ações do usuário para a camada de regras de negócio
 * - Inicializar a aplicação
 *
 * Este arquivo NÃO:
 * - Manipula diretamente o state
 * - Contém regras de negócio
 * - Interage com localStorage
 */

import { adicionarTarefa, 
    filtrarTarefa, 
    toggleTarefa, 
    carregarMemoria, 
    solicitarLimpezaTotal 
} from "./actions.js";

/* ==========================================================================
   Seleção de Elementos do DOM
   ========================================================================== */

/**
 * Formulário de criação de tarefas.
 * @type {HTMLFormElement}
 */
const formulario = document.querySelector('#form-tarefa');

/**
 * Campo de texto para entrada da tarefa.
 * @type {HTMLInputElement}
 */
const input = document.querySelector('#input-tarefa');

/**
 * Select responsável pelo filtro de tarefas.
 * @type {HTMLSelectElement}
 */
const filtro = document.querySelector('#filtrar-lista');

/**
 * Lista (UL) que contém todas as tarefas renderizadas.
 * Utilizada para delegação de eventos.
 * @type {HTMLUListElement}
 */
const lista = document.querySelector('#lista-tarefas');

/**
 * Botão responsável por apagar todas as tarefas.
 * @type {HTMLButtonElement}
 */
const apagarButton = document.querySelector('#deleteBtn');



/* ==========================================================================
   Registro de Eventos
   ========================================================================== */

/**
 * Evento de envio do formulário.
 * 
 * Fluxo:
 * - Impede reload da página
 * - Captura o texto do input
 * - Encaminha para a camada de regras
 * - Limpa e foca o campo novamente
 */
formulario.addEventListener('submit', function(evento) {
    
    // 3. IMPEDIR o comportamento padrão (Recarregar a página)
    evento.preventDefault();
    
    // 4. Pegar o texto escrito (Captura)
    const textoDaTarefa = input.value;
    
    // Verifica se não está vazio (embora o 'required' no HTML já ajude)
    if (textoDaTarefa.trim() === '') {
        return; // Sai da função se estiver vazio
    }

    console.log("Salvei na variável:", textoDaTarefa);
    adicionarTarefa(textoDaTarefa);

    // 5. Limpar o campo
    input.value = '';
    
    // 6. (Opcional) Focar no input novamente para digitar a próxima
    input.focus();
});

/**
 * Evento de mudança no filtro de tarefas.
 * 
 * Encaminha o valor selecionado para a função de filtragem.
 */
filtro.addEventListener('change', (evento)=>{
    evento.preventDefault();
    console.log(evento.target.value);
    filtrarTarefa(evento.target.value);
});

/**
 * Evento de clique na lista de tarefas.
 * 
 * Utiliza delegação de eventos para capturar cliques
 * em botões dinâmicos (marcar / desmarcar).
 */
lista.addEventListener('click', (event) => {
    
    // 1. Onde foi o clique exatamente?
    const elementoClicado = event.target;

    // 2. Verifica se o clique foi num elemento que tem a classe do botão
    if (elementoClicado.classList.contains('task-button')) {
        
        // 3. Pega o ID que guardamos no dataset
        const idParaMarcar = elementoClicado.dataset.id;
        
        console.log("Clicou em marcar o ID:", idParaMarcar);

        toggleTarefa(idParaMarcar);
        // Chamar função para marcar, e podemos lidar desta mesma forma com o botão de deletar caso adicionarmos posteriormente
    }
});

/**
 * Evento de clique no botão de apagar todas as tarefas.
 * 
 * Solicita confirmação antes de executar a limpeza total.
 */
apagarButton.addEventListener('click',(event) =>{
    console.log("Será tudo apagado");
    solicitarLimpezaTotal();
    
});

/* ==========================================================================
   Inicialização da Aplicação
   ========================================================================== */

/**
 * Inicializa a aplicação.
 * 
 * Responsável por:
 * - Carregar dados persistidos
 * - Renderizar o estado inicial da interface
 *
 * @returns {void}
 */
function init() {
    console.log("Aplicação iniciada");
    // Carregar memória
    carregarMemoria();

};

// Executa a inicialização assim que o script é carregado
init();
