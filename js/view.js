// DOM e renderização
// Deve apenas manipular o HTML para renderizar a lista, exibindo texto : data e caso estiver feita o texto deve estar riscado
// Criar uma função de render o qual faz um loop (map ou forEach) no array recebido e renderiza cada item criando os elementos com create Element e adicionar a lista appendChild

// views.js
export default function renderizarLista(tarefas) {

    // Seleciona o ul para servir como palco da interação
    const lista = document.querySelector('#lista-tarefas');

    // Apaga tudo dentro da ul
    lista.innerHTML = '';

    // Para cada tarefa será criado um li
    tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        li.textContent = tarefa.text;

        // AQUI ESTÁ O SEGREDO:
        // A View verifica a propriedade APENAS para estilizar
        if (tarefa.completed) {
            li.classList.add('completed'); // Adiciona classe CSS
        } else {
            const butMarcar = document.createElement('button');
            butMarcar.textContent = 'Marcar';
            butMarcar.classList.add('task-button')
            li.appendChild(butMarcar);

            // O SEGREDO: Guardar o ID dentro do botão HTML
            butMarcar.dataset.id=tarefa.id;
            // Adicionar botão para marcar tarefa
        }
        
        // Adiciona botão de delete, checkbox, etc...
        lista.appendChild(li);
    });
}