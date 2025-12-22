// localStorage

// Banco de dados local do navegador salva os dados no disco do usuário
// Salva apenas JSON e a vida útil é persistente

// Guarda o estado atual para que possa ser recuperado futuramente

// storage.js
const CHAVE = 'meu_todo_app_v1';

export const saveState = (dados) => {
    // Transforma o Objeto JS em STRING (Serialização)
    const dadosEmTexto = JSON.stringify(dados);
    localStorage.setItem(CHAVE, dadosEmTexto);
};

export const loadState = () => {
    const dadosEmTexto = localStorage.getItem(CHAVE);
    if (dadosEmTexto) {
        // Transforma a STRING de volta em OBJETO JS (Deserialização)
        return JSON.parse(dadosEmTexto);
    }
    return []; // Retorna vazio se não tiver nada salvo
};