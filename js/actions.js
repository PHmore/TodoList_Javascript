// regras de negócio

// Criará a task e a salvará no armazenamento, e também estará aplicada a lógica de riscar tasks
// Deve a cada alteração atualizar e pedir para a view renderizar

// Ao abrir deve se carregar o storage e fazer todo o esquema do state com storage



//Exemplo
// Em actions.js

export function adicionarTarefa(texto) {
    const novaTarefa = {
        // O Date.now() gera algo como 1703273849123
        // É quase impossível você clicar duas vezes no mesmo milissegundo.
        id: Date.now(), 
        text: texto,
        completed: false
    };

    // 1. Atualiza State
    state.todos.push(novaTarefa);
    
    // 2. Atualiza Storage (Persistência)
    // Como o ID já foi gerado e está DENTRO do objeto, ele foi salvo "para sempre".
    storage.save(state.todos);
    
    // 3. Atualiza Tela
    render(state.todos);
}