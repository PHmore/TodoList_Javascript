# 📝 Todo App — JavaScript Vanilla

![Badge Desenvolvido](https://img.shields.io/static/v1?label=STATUS&message=DESENVOLVIDO&color=GREEN&style=for-the-badge)

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://phmore.github.io/TodoList_Javascript/)

[![Desenvolvido por](https://img.shields.io/badge/Desenvolvido%20por-PHmore-blue)](https://github.com/PHmore/)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-Markup-orange?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Style-blue?logo=css3&logoColor=white)
![SPA](https://img.shields.io/badge/SPA-Single%20Page%20Application-success)
![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-yellow?logo=javascript)
![Frontend](https://img.shields.io/badge/Frontend-Web-informational)
![Arquitetura](https://img.shields.io/badge/Arquitetura-Modular-purple)

Aplicação **SPA (Single Page Application)** de lista de tarefas (*Todo App*),
desenvolvida em **JavaScript puro**, com foco em **arquitetura limpa**,
**separação de responsabilidades** e **boas práticas de desenvolvimento frontend**.

O projeto foi estruturado para ser simples de entender, fácil de manter e escalável, simulando um cenário real de aplicação web.

## 🧩 Arquitetura SPA

Este projeto segue o conceito de **Single Page Application (SPA)**,
onde toda a interação acontece em uma única página HTML,
com atualização dinâmica do conteúdo via JavaScript,
sem recarregamento completo da página.

## 🚀 Demonstração

A aplicação está publicada via **GitHub Pages** e pode ser acessada em:

🔗 https://phmore.github.io/TodoList_Javascript/


---

## 📌 Funcionalidades

- ✅ Criar tarefas  
- 🔁 Marcar e desmarcar tarefas como concluídas  
- 🔍 Filtrar tarefas:
  - Todas
  - A fazer
  - Concluídas
- 🗑️ Apagar todas as tarefas (com confirmação)  
- 💾 Persistência de dados com `localStorage`  
- ⚠️ Feedback visual para erros e ações críticas  

---

## 🛠️ Tecnologias Utilizadas

- **JavaScript (ES6+)**
  - Modules (`import / export`)
  - Arrow Functions
  - Async / Await
- **HTML5**
- **CSS3**
- **Web Storage API (`localStorage`)**
- **JSDoc**
  - Documentação de funções
  - Tipagem implícita
  - Melhor suporte de IDE (VS Code)

> ⚠️ O projeto **não utiliza frameworks ou bibliotecas externas**, com o objetivo de reforçar os fundamentos do JavaScript.

---

## 🧠 Conceitos Aplicados

- Separação de responsabilidades  
- Arquitetura em camadas  
- Programação modular  
- Delegação de eventos  
- Tratamento de erros  
- Código documentado e legível  
- Persistência de estado  
- Hidratação de estados

---

## 🗂️ Estrutura do Projeto

```txt
src/
│
├── index.js        # Ponto de entrada da aplicação (eventos e bootstrap)
├── actions.js     # Regras de negócio e orquestração
├── view.js        # Manipulação do DOM (interface)
├── state.js       # Estado volátil da aplicação
├── storage.js     # Persistência com localStorage
│
├── index.html
├── style.css
```
---

## 🚀 Considerações Finais

Este projeto foi desenvolvido com foco em aprendizado,
boas práticas e organização de código,
servindo como base para aplicações frontend maiores e mais complexas.
