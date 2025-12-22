// estado da aplicação
// Aqui estará a memória que será utilizada no caso um array de objetos task, os quais possuem texto, data, e bool feito ou não
// Criar está unidade de memória e criar getters para ela
// Está representa a memória volátil mantida na memória do navegador se o usuário reabrir a página está é apagada


// state.js
// Note que são dados vivos, prontos para uso
export default {
    todos: [
        { id: 1, text: 'Tarefa Teste', completed: false }
    ],
    filtroAtual: 'todos' // Outra coisa que fica no state
};