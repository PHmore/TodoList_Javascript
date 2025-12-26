/**
 * Camada de persistência da aplicação (Storage).
 * 
 * Responsável por salvar e recuperar dados no localStorage
 * do navegador, garantindo persistência entre sessões.
 *
 * Características:
 * - Armazena apenas dados serializados em JSON
 * - Vida útil persistente (enquanto não for apagado)
 * - Não possui regras de negócio
 * - Não interage com o DOM
 */

/**
 * Chave utilizada para armazenar os dados no localStorage.
 * Deve ser única para evitar conflitos com outras aplicações.
 *
 * @constant {string}
 */
const CHAVE = 'meu_todo_app';

/**
 * Salva os dados fornecidos no localStorage do navegador.
 *
 * Processo:
 * - Serializa os dados em JSON
 * - Persiste no disco do usuário
 *
 * Em caso de falha:
 * - Loga o erro no console
 * - Informa o usuário sobre o problema
 * - Mantém os dados antigos intactos
 *
 * @param {Array<Object>} dados - Estado atual da aplicação a ser persistido.
 * @returns {void}
 */
export function salvar(dados) {
    try {
        const dadosEmTexto = JSON.stringify(dados);
        localStorage.setItem(CHAVE, dadosEmTexto);
    } catch (error) {
        // 1. Loga o erro
        console.error("Falha ao salvar:", error);
        
        // 2. Feedback ao usuário (Opcional mas recomendado)
        // Avisa que o que ele acabou de fazer NÃO foi salvo
        alert("Atenção: Não foi possível salvar as alterações. O armazenamento pode estar cheio.");

        // 3. O que NÃO fazer:
        // NÃO execute removeItem() aqui. Mantenha o que já estava salvo seguro.
        // NÃO precisa de return.
    }
};

/**
 * Carrega os dados persistidos no localStorage.
 *
 * Processo:
 * - Recupera a string armazenada
 * - Converte o JSON para objeto JavaScript
 *
 * Tratamento de erros:
 * - Detecta dados corrompidos
 * - Remove o conteúdo inválido do storage
 * - Retorna um estado seguro (fallback)
 *
 * @returns {Array<Object>} Lista de dados persistidos ou lista vazia.
 */
export const carregar = () => {
    try {
        const dadosEmTexto = localStorage.getItem(CHAVE);
        if (dadosEmTexto) {
            // Transforma a STRING de volta em OBJETO JS (Deserialização)
            return JSON.parse(dadosEmTexto);
        }
        return []; // Retorna vazio se não tiver nada salvo
        
    } catch (error) {
        // 1. Loga o erro para o desenvolvedor (Silent Logging)
        console.warn("Storage corrompido detectado. Resetando base de dados.", error);
        
        // 2. Limpa o dado podre para evitar loops de erro futuros
        localStorage.removeItem(CHAVE);
        
        // 3. Retorna o valor "seguro" (Fallback)
        return [];
    }
    
};