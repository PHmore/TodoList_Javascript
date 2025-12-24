// regras de negócio

// Criará a task e a salvará no armazenamento, e também estará aplicada a lógica de riscar tasks
// Deve a cada alteração atualizar e pedir para a view renderizar

// Ao abrir deve se carregar o storage e fazer todo o esquema do state com storage

// GERA ID

//Exemplo
// Em actions.js

import { salvar, carregar } from "./storage.js";
import state from "./state.js";
import renderizarLista from "./view.js";

console.log(state.tarefas);

export function adicionarTarefa(texto) {
    const novaTarefa = {
        // O Date.now() gera algo como 1703273849123
        // É quase impossível você clicar duas vezes no mesmo milissegundo.
        id: Date.now(), 
        text: texto,
        completed: false
    };

    // 1. Atualiza State
    state.tarefas.push(novaTarefa);
    
    // 2. Atualiza Storage (Persistência)
    // Como o ID já foi gerado e está DENTRO do objeto, ele foi salvo "para sempre".
    salvar(state.tarefas);
    
    // 3. Atualiza Tela será feita pela filtragem para evitar bugs como criar uma task e aparecer no filtro errado
    filtrarTarefa(state.filtroAtual);

};

export function filtrarTarefa(filtro) {
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
};

export function toggleTarefa(id) {
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

    renderizarLista(state.tarefas);
};

export function carregarMemoria(){
    state.tarefas = carregar();
    console.log("Carregado: "+state.tarefas);
    renderizarLista(state.tarefas);
};



// Função auxiliar interna (não precisa de export)
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