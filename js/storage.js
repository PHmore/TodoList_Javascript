// localStorage

// Banco de dados local do navegador salva os dados no disco do usuário
// Salva apenas JSON e a vida útil é persistente

// Guarda o estado atual para que possa ser recuperado futuramente

// storage.js
// Chave para salvar no storage do navegador
const CHAVE = 'meu_todo_app';

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