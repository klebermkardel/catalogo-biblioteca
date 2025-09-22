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

function buscarLivros() {
    console.log("\n--- Buscar Livros ---");
    const termoDigitado = prompt("Digite o título ou autor(a) que deseja encontrar: ");
    
    if (termoDigitado === null) {
        console.log("Busca cancelada.");
        return;
    }

    const termoBusca = termoDigitado.trim().toLowerCase();
    if (!termoBusca) {
        console.log("Erro: O termo de busca não pode ser vazio.");
        return;
    }

    const livrosEncontrados = biblioteca.filter(livro =>
        livro.titulo.toLowerCase().includes(termoBusca) ||
        livro.autor.toLowerCase().includes(termoBusca)
    );

    if (livrosEncontrados.length > 0) {
        console.log(`\n--- Resultados para "${termoDigitado}" ---`);
        console.table(livrosEncontrados);
    } else {
        console.log(`\nNenhum livro encontrado com o termo "${termoDigitado}".`);
    }
}

function emprestarLivro() {
    console.log("\n--- Emprestar Livro ---");
    listarLivros();

    if(biblioteca.length === 0) {
        return;
    }
        
    const idsDigitados = prompt("\nDigite o(s) ID(s) do(s) livro(s) a emprestar: ");
    if (idsDigitados === null) return;

    const idsParaEmprestar = idsDigitados.split(',').map(id => Number(id.trim()));

    if(idsParaEmprestar.some(isNaN)) {
        console.log("\nErro: Por favor, digite apenas números de ID válidos, separados por vírgula.");
        return;
    }
        
    console.log("");
    idsParaEmprestar.forEach(id => {
        const livroEncontrado = biblioteca.find(livro => livro.id === id);
        
        if(!livroEncontrado) {
            console.log(`- Aviso: Livro com ID ${id} não encontrado.`);
        } else {
            if(livroEncontrado.disponivel) {
                livroEncontrado.disponivel = false;
                console.log(`- ✅ Livro "${livroEncontrado.titulo}" (ID: ${id}) emprestado com sucesso!`);
            } else {
                console.log(`- Aviso: O livro "${livroEncontrado.titulo}" (ID: ${id}) já está emprestado.`);
            }
        }
    });
}

function devolverLivro() {
    console.log("\nDevolução de Livros ---");
    listarLivros();

    if (biblioteca.length === 0) {
        return;
    }

    const idDigitado = Number(prompt("\nDigite o número (ID) do livro a ser devolvido: "));

    if(isNaN(idDigitado) || !Number.isInteger(idDigitado) || idDigitado < 1) {
        console.log("\nErro: Por favor, digite um número válido dentro das opções listadas");
        return;
    }

    const livroEncontrado = biblioteca.find(livro => livro.id === idDigitado);

    if(!livroEncontrado.disponivel) {
        console.log("\nErro: Livrocom o ID informado não foi encontrado.");
    } else {
        if(livroEncontrado.disponivel === false) {
            livroEncontrado.disponivel = true;
            console.log(`\n✅ Livro "${livroEncontrado.titulo}" devolvido com sucesso!`);
        } else {
            console.log(`\nAviso: O livro "${livroEncontrado.titulo}" já está disponível na biblioteca.`);
        }
    }
}

// --- LÓGICA PRINCIPAL ---

function menu() {
    let opcao;
    do {
        console.log(`
=== MENU ===
1 - Adicionar Livro
2 - Listar Livros
3 - Buscar Livro por Título ou Autor(a)
4 - Emprestar Livro(s)
5 - Devolver Livro(s)
6 - Sair            
        `);
        opcao = prompt("O que deseja fazer? ");
        switch (opcao) {
            case '1': adicionarLivro(); break;
            case '2': listarLivros(); break;
            case '3': buscarLivros(); break;
            case '4': emprestarLivro(); break;
            case '5': devolverLivro(); break;
            case '6': console.log("\nSaindo do programa..."); break;
            default: console.log("\nErro: ´Por favor, escolha uma opção válida.");
        }    
    } while (opcao !== "6");
}

// Inicia o programa
menu();