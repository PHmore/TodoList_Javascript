import { adicionarTarefa, filtrarTarefa, toggleTarefa, carregarMemoria, solicitarLimpezaTotal } from "./actions.js";

// ponto de entradas

// 1. Selecionar os elementos (DOM)
const formulario = document.querySelector('#form-tarefa');
const input = document.querySelector('#input-tarefa');
const filtro = document.querySelector('#filtrar-lista');

// Invés de lidar com cada botão individualmente iremos lidar com o elemento pai
const lista = document.querySelector('#lista-tarefas');

const apagarButton = document.querySelector('#deleteBtn')

//const selectedIndex = filtro.selectedIndex;

// 2. Adicionar o "Ouvinte" (Event Listener) no FORMULÁRIO
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

filtro.addEventListener('change', (evento)=>{
    evento.preventDefault();
    console.log(evento.target.value);
    filtrarTarefa(evento.target.value);
});

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

apagarButton.addEventListener('click',(event) =>{
    console.log("Será tudo apagado");
    solicitarLimpezaTotal();
    
});

function init() {
    console.log("Aplicação iniciada");
    // Carregar memória
    carregarMemoria();

};

// init não roda automaticamente rsrs tem que chamar ao final para rodar assim que o script carregar
init();
