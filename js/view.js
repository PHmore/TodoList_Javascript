// DOM e renderização
// Deve apenas manipular o HTML para renderizar a lista, exibindo texto : data e caso estiver feita o texto deve estar riscado
// Criar uma função de render o qual faz um loop (map ou forEach) no array recebido e renderiza cada item criando os elementos com create Element e adicionar a lista appendChild

// views.js

// views.js

// Cria um elemento temporário de aviso
export function mostrarErro(mensagem) {
    const container = document.querySelector('main'); // ou body
    
    const aviso = document.createElement('div');
    aviso.style.cssText = `
        background-color: #ff4444;
        color: white;
        padding: 10px 20px;
        position: fixed;
        top: 20px;
        right: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: fadeIn 0.3s;
    `;
    aviso.textContent = mensagem;

    container.appendChild(aviso);

    // Remove o aviso automaticamente após 3 segundos
    setTimeout(() => {
        aviso.remove();
    }, 3000);
};

export default function renderizarLista(tarefas) {

    try {
            
        // Seleciona o ul para servir como palco da interação
        const lista = document.querySelector('#lista-tarefas');
        

        // Apaga tudo dentro da ul
        lista.innerHTML = '';

        let pendentesCont = 0;

        // Ordenação com lógica dupla
        const tarefasOrdenadas = [...tarefas].sort((a, b) => {
            // 1º Critério: Status (Pendentes primeiro)
            if (a.completed !== b.completed) {
                // Se 'a' está completa e 'b' não, 'a' vai pro fundo (retorna 1)
                
                return a.completed ? 1 : -1;
            }
            
            // 2º Critério: ID/Tempo (Mais novas primeiro)
            // Se o status for igual, desempata pelo ID.
            // ID maior (mais novo) vem antes de ID menor (mais velho)
            return b.id - a.id;
        });

        tarefasOrdenadas.forEach(tarefa => {
        // Para cada tarefa será criado um li
            const li = document.createElement('li');
            li.textContent = tarefa.text;

            // AQUI ESTÁ O SEGREDO:
            // A View verifica a propriedade APENAS para estilizar
            if (tarefa.completed) {
                li.classList.add('completed'); // Adiciona classe CSS
                const butMarcar = document.createElement('button');
                butMarcar.classList.add('completed')
                butMarcar.textContent = 'Desmarcar';
                butMarcar.classList.add('task-button')
                li.appendChild(butMarcar);

                // O SEGREDO: Guardar o ID dentro do botão HTML
                butMarcar.dataset.id=tarefa.id;
            } else {
                pendentesCont ++;
                console.log(pendentesCont);
                
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

            // Adiciona contador
            const contador = document.querySelector('#contador');
            contador.innerHTML = pendentesCont + ' Tarefas Pendentes';
        });
    
    } catch (error) {
        console.log("Ocorreu um erro na renderização");
        
        mostrarErro(error)
    }
};