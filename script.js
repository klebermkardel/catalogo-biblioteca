/*

Um programa para gerenciar uma pequena coleção de livros, permitindo adicionar, listar e controlar o empréstimo.

Estrutura de Dados: Um array de objetos, onde cada objeto é um livro com propriedades como titulo, autor e disponivel (booleano true/false).

Funcionalidades:

Um menu principal para o usuário navegar.

Uma função adicionarLivro().

Uma função listarLivros() (que deve mostrar se o livro está disponível ou emprestado).

Uma função emprestarLivro() (muda disponivel para false).

Uma função devolverLivro() (muda disponivel para true).

*/

const prompt = require('prompt-sync')();

// --- BANCO DE DADOS ---

let biblioteca = [];

// --- FUNÇÕES PRINCIPAIS ---

function adicionarLivro() {
    // ,,,
}

function listarLivros() {
    // ...
}

function emprestarLivro() {
    // ...
}

function devolverLivro() {
    // ...
}

// --- LÓGICA PRINCIPAL ---

function menu() {
    let opcao;
    do {
        console.log(`
=== MENU ===
1 - Adicionar Livro
2 - Listar Livros
3 - Emprestar Livro
4 - Devolver Livro
5 - Sair            
        `);
        opcao = prompt("O que deseja fazer? ");
        switch (opcao) {
            case '1': adicionarLivro(); break;
            case '2': listarLivros(); break;
            case '3': emprestarLivro(); break;
            case '4': devolverLivro(); break;
            case '5': console.log("\nSaindo do programa..."); break;
            default: console.log("\nErro: ´Por favor, escolha uma opção válida.");
        }    
    } while (opcao !== "5");
}

// Inicia o programa
menu();