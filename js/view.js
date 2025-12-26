// DOM e renderização
// Deve apenas manipular o HTML para exibir informações e respostas a requisições para o usuário


/**
 * Exibe uma notificação visual de erro para o usuário.
 * 
 * Responsabilidade exclusiva da camada de View (DOM).
 * Cria um aviso flutuante no canto superior direito da tela
 * e o remove automaticamente após alguns segundos.
 *
 * @param {string} mensagem - Mensagem de erro a ser exibida ao usuário.
 * @returns {void}
 */
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

/**
 * Renderiza a lista de tarefas na interface.
 * 
 * Responsável apenas por manipular o DOM com base no estado recebido,
 * sem alterar dados ou regras de negócio.
 * - Limpa a lista atual
 * - Ordena tarefas (pendentes primeiro, mais recentes primeiro)
 * - Cria elementos HTML (li, botões)
 * - Atualiza o contador de tarefas pendentes
 *
 * @param {Array<Object>} tarefas - Lista de tarefas a serem renderizadas.
 * @param {number} tarefas[].id - Identificador único da tarefa.
 * @param {string} tarefas[].text - Texto descritivo da tarefa.
 * @param {boolean} tarefas[].completed - Indica se a tarefa está concluída.
 * 
 * @returns {void}
 */
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

/**
 * Exibe um modal de confirmação para ações críticas do usuário.
 * 
 * A função cria dinamicamente um modal no DOM e retorna uma Promise
 * que resolve para `true` ou `false` conforme a escolha do usuário.
 *
 * @param {string} mensagem - Texto exibido no modal de confirmação.
 * @returns {Promise<boolean>} 
 * - `true` se o usuário confirmar a ação
 * - `false` se o usuário cancelar
 */
export function confirmarAcao(mensagem) {
    try {
            
        return new Promise((resolve) => {
            const body = document.querySelector('body');
            
            const modal = document.createElement('div');
            modal.classList.add('modal-overlay');
            modal.innerHTML = `
                <div class="modal-box">
                    <p>${mensagem}</p>
                    <div class="modal-botoes">
                        <button id="btn-nao" class="btn-cancelar">Cancelar</button>
                        <button id="btn-sim" class="btn-confirmar">Sim</button>
                    </div>
                </div>
            `;
            
            body.appendChild(modal);

            const btnSim = modal.querySelector('#btn-sim');
            const btnNao = modal.querySelector('#btn-nao');

            // Função para limpar e responder
            const fechar = (resposta) => {
                modal.remove();
                resolve(resposta); // <--- AQUI é o retorno para o app.js
            };

            btnSim.addEventListener('click', () => fechar(true));
            btnNao.addEventListener('click', () => fechar(false));
        });
    
    } catch (error) {
     mostrarErro(error);   
    }
};