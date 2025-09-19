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
let proximoId = 1;

// --- FUNÇÕES PRINCIPAIS ---

function adicionarLivro() {
    const tituloDigitado = prompt("Qual livro deseja adicionar? ");
    if (tituloDigitado === null) return; 

    const autorDigitado = prompt("Qual é o(a) autor(a) deste livro? ");
     if (autorDigitado === null) return;

    if(!tituloDigitado.trim() || !autorDigitado.trim()) {
        console.log("\nTítulo ou autor inválidos! Tente novamente.");
        return;
    } else {
        const novoLivro = {
            id: proximoId,
            titulo: tituloDigitado.trim(),
            autor: autorDigitado.trim(),
            disponivel: true
        };

        biblioteca.push(novoLivro);
        proximoId++;

        console.log(`\n ✅ Livro "${novoLivro.titulo}" cadastrado com sucesso!`);
    }
}

function listarLivros() {
    if(biblioteca.length === 0) {
        console.log("\nNenhum livro encontrado.");
    } else {
        console.log("\n--- LISTA DE LIVROS ---");

        biblioteca.forEach((livro) => {
            const status = livro.disponivel ? "Sim" : "Não";

            console.log(`
                \n#${livro.id}
                Livro: ${livro.titulo}
                Autor(a): ${livro.autor}
                Disponível: ${status}`)
        })
    }
}

function emprestarLivro() {
    console.log("\n--- Emprestar Livro ---");
    listarLivros();

    if(biblioteca.length === 0) {
        return;
    }
        
    const idDigitado = Number(prompt("\nDigite o número (ID) do livro a ser emprestado: "));

    if(isNaN(idDigitado) || !Number.isInteger(idDigitado) || idDigitado < 1) {
        console.log("\nErro: Por favor, digite um número válido dentro das opções listadas");
        return;
    }
        
    const livroEncontrado = biblioteca.find(livro => livro.id === idDigitado);

    if(!livroEncontrado) {
        console.log("\nLivro com o ID informado não foi encontrado.");
        return;
    } else {
        if(livroEncontrado.disponivel) {
            livroEncontrado.disponivel = false;

        console.log(`\nLivro emprestado com sucesso!`);
        } else {
            // Se não estiver disponível, informamos o usuário.
            console.log(`\nAviso: O livro "${livroEncontrado.titulo}" já está emprestado.`);
        }
    }
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