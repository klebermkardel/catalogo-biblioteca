# 📚 Catálogo de Biblioteca Simples

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

## 📖 Sobre o Projeto

Este projeto simula um sistema de gerenciamento para uma pequena biblioteca, rodando inteiramente no terminal. Ele foi desenvolvido para aprofundar os conhecimentos em manipulação de arrays de objetos e na implementação de uma lógica de negócio mais complexa, como o controle de estado (disponível/emprestado).

A aplicação é um CRUD (Create, Read, Update, Delete) completo, com funcionalidades extras como busca e operações em lote (emprestar/devolver múltiplos livros).

---

## ✅ Funcionalidades

* **Adicionar Livros:** Permite ao usuário cadastrar novos livros com título e autor.
* **Listar Livros:** Exibe todos os livros do catálogo, mostrando seu ID, título, autor e status (Disponível ou Emprestado).
* **Buscar Livros:** Permite uma busca flexível por título ou autor (parcial e não sensível a maiúsculas/minúsculas).
* **Emprestar Livro(s):** Permite ao usuário emprestar um ou múltiplos livros de uma vez, alterando seu status para "Emprestado". O sistema valida se o livro já não está emprestado.
* **Devolver Livro(s):** Permite ao usuário devolver um ou múltiplos livros, alterando seu status para "Disponível". O sistema valida se o livro de fato pertencia à biblioteca e estava emprestado.
* **Validação Robusta:** Todas as entradas do usuário são validadas para prevenir erros e garantir uma experiência de uso fluida.

---

## 🛠️ Tecnologias e Conceitos Aplicados

* **JavaScript (ES6+):** Linguagem principal do projeto.
* **Node.js:** Ambiente de execução do código.
* **Lógica de Programação:**
    * **Estruturas de Dados:** Uso de `Arrays` para a coleção e `Objetos` para representar cada livro.
    * **Funções:** Separação de responsabilidades para cada funcionalidade (CRUD, busca).
    * **Laços e Métodos de Alta Ordem:** `do...while` para o loop principal do menu e `.forEach()`, `.filter()`, `.find()`, `.map()` para a manipulação dos dados.
    * **Estruturas Condicionais:** `switch` para o roteamento do menu e `if/else if/else` para as regras de negócio.
* **Tratamento de Entrada:** Uso do módulo `prompt-sync` e normalização de strings (`trim`, `toLowerCase`, `split`).

---

## 🚀 Como Executar o Projeto

Para executar este projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/klebermkardel/catalogo-biblioteca]
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd nome-da-pasta-do-projeto
    ```

3.  **Instale as dependências:**
    (É necessário ter o Node.js e o NPM instalados)
    ```bash
    npm install
    ```

4.  **Execute o programa:**
    ```bash
    node script.js
    npm install prompt-sync
    ```

---

## 👨‍💻 Autor

* **[Kleber Molina Kardel]**
* **LinkedIn:** [https://www.linkedin.com/in/klebermkardel/]
* **GitHub:** [L[INK PARA O SEU PERFIL DO GITHUB](https://www.linkedin.com/in/klebermkardel/)]

---

## 📄 Licença

Este projeto está sob a licença MIT.