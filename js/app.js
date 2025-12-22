// ponto de entradas

// 1. Selecionar os elementos (DOM)
const formulario = document.querySelector('#form-tarefa');
const input = document.querySelector('#input-tarefa');

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
    // AQUI entraria a chamada para o seu arquivo actions.js:
    // actions.addTodo(textoDaTarefa);

    // 5. Limpar o campo
    input.value = '';
    
    // 6. (Opcional) Focar no input novamente para digitar a próxima
    input.focus();
});


