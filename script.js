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

// --- Importação de Módulos ---
const prompt = require('prompt-sync')();

// --- "Banco de Dados" (em memória) ---
// O array 'biblioteca' armazenará todos os objetos de livro.
let biblioteca = [];
// A variável 'proximoId' garante que cada novo livro tenha um ID único.
let proximoId = 1;

// --- FUNÇÕES DA APLICAÇÃO ---

/**
 * Adiciona um novo livro à biblioteca.
 * Pede título e autor, valida as entradas e cria um novo objeto de livro.
 */
function adicionarLivro() {
    console.log("\n--- Adicionar Novo Livro ---");
    const tituloDigitado = prompt("Qual livro deseja adicionar? ");
    if (tituloDigitado === null) return; // Permite cancelar com Ctrl+C

    const autorDigitado = prompt("Qual é o(a) autor(a) deste livro? ");
    if (autorDigitado === null) return;

    // Valida se os campos não são nulos ou vazios (após remover espaços).
    if (!tituloDigitado.trim() || !autorDigitado.trim()) {
        console.log("\nErro: Título e autor são obrigatórios. Tente novamente.");
        return;
    }
    
    const novoLivro = {
        id: proximoId,
        titulo: tituloDigitado.trim(),
        autor: autorDigitado.trim(),
        disponivel: true // Um livro novo sempre começa como disponível.
    };

    biblioteca.push(novoLivro);
    proximoId++; // Incrementa o ID para o próximo livro.
    console.log(`\n✅ Livro "${novoLivro.titulo}" cadastrado com sucesso!`);
}

/**
 * Lista todos os livros cadastrados na biblioteca.
 */
function listarLivros() {
    console.log("\n--- LISTA DE LIVROS ---");

    // Verifica se a biblioteca está vazia.
    if (biblioteca.length === 0) {
        console.log("Nenhum livro encontrado no catálogo.");
        return; // Sai da função se não houver livros.
    }

    // Usa o forEach para percorrer e exibir cada livro.
    biblioteca.forEach((livro) => {
        // Usa um operador ternário para exibir um status amigável.
        const status = livro.disponivel ? "Disponível" : "Emprestado";
        // Imprime os detalhes de cada livro em um formato claro.
        console.log(`[${livro.id}] ${livro.titulo} - ${livro.autor} (Status: ${status})`);
    });
}

/**
 * Busca livros no catálogo por título ou autor.
 */
function buscarLivros() {
    console.log("\n--- Buscar Livros ---");
    const termoDigitado = prompt("Digite o título ou autor(a) que deseja encontrar: ");
    if (termoDigitado === null) return;

    const termoBusca = termoDigitado.trim().toLowerCase();
    if (!termoBusca) {
        console.log("Erro: O termo de busca não pode ser vazio.");
        return;
    }

    // .filter() cria um novo array com os livros que correspondem ao critério de busca.
    // A busca é case-insensitive (.toLowerCase()) e parcial (.includes()).
    const livrosEncontrados = biblioteca.filter(livro =>
        livro.titulo.toLowerCase().includes(termoBusca) ||
        livro.autor.toLowerCase().includes(termoBusca)
    );

    // Exibe os resultados da busca.
    if (livrosEncontrados.length > 0) {
        console.log(`\n--- Resultados para "${termoDigitado}" ---`);
        console.table(livrosEncontrados);
    } else {
        console.log(`\nNenhum livro encontrado com o termo "${termoDigitado}".`);
    }
}

/**
 * Empresta um ou mais livros, alterando seu status para indisponível.
 */
function emprestarLivro() {
    console.log("\n--- Emprestar Livro(s) ---");
    listarLivros();
    if (biblioteca.length === 0) return;

    const idsDigitados = prompt("\nDigite o(s) ID(s) do(s) livro(s) a emprestar (separados por vírgula): ");
    if (idsDigitados === null) return;

    // Converte a string de IDs "1, 2, 3" em um array de números [1, 2, 3].
    const idsParaEmprestar = idsDigitados.split(',').map(id => Number(id.trim()));

    // Valida se todas as entradas na string são números válidos.
    if (idsParaEmprestar.some(isNaN)) {
        console.log("\nErro: Por favor, digite apenas números de ID válidos, separados por vírgula.");
        return;
    }

    console.log("");
    // Processa cada ID individualmente.
    idsParaEmprestar.forEach(id => {
        const livroEncontrado = biblioteca.find(livro => livro.id === id);
        if (!livroEncontrado) {
            console.log(`- Aviso: Livro com ID ${id} não encontrado.`);
        } else {
            if (livroEncontrado.disponivel) {
                livroEncontrado.disponivel = false;
                console.log(`- ✅ Livro "${livroEncontrado.titulo}" (ID: ${id}) emprestado com sucesso!`);
            } else {
                console.log(`- Aviso: O livro "${livroEncontrado.titulo}" (ID: ${id}) já está emprestado.`);
            }
        }
    });
}

/**
 * Devolve um ou mais livros, alterando seu status para disponível.
 */
function devolverLivro() {
    console.log("\n--- Devolver Livro(s) ---");
    listarLivros();
    if (biblioteca.length === 0) return;

    const idsDigitados = prompt("\nDigite o(s) ID(s) do(s) livro(s) a devolver (separados por vírgula): ");
    if (idsDigitados === null) return;

    const idsParaDevolver = idsDigitados.split(',').map(id => Number(id.trim()));

    if (idsParaDevolver.some(isNaN)) {
        console.log("\nErro: Por favor, digite apenas números de ID válidos, separados por vírgula.");
        return;
    }

    console.log("");
    idsParaDevolver.forEach(id => {
        const livroEncontrado = biblioteca.find(livro => livro.id === id);
        if (!livroEncontrado) {
            console.log(`- Aviso: Livro com ID ${id} não encontrado no catálogo.`);
        } else {
            // A lógica aqui é invertida em relação a emprestar.
            if (!livroEncontrado.disponivel) { // Verifica se está de fato emprestado
                livroEncontrado.disponivel = true;
                console.log(`- ✅ Livro "${livroEncontrado.titulo}" (ID: ${id}) devolvido com sucesso!`);
            } else {
                console.log(`- Aviso: O livro "${livroEncontrado.titulo}" (ID: ${id}) já estava disponível.`);
            }
        }
    });
}


// --- LÓGICA PRINCIPAL (MENU) ---
/**
 * Função principal que executa o menu e o loop da aplicação.
 */
function menu() {
    let opcao;
    do {
        console.log(`
=== MENU DA BIBLIOTECA ===
1 - Adicionar Livro
2 - Listar Todos os Livros
3 - Buscar Livro por Título ou Autor
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
            default: console.log("\nErro: Por favor, escolha uma opção válida.");
        }
    } while (opcao !== "6");
}

// Inicia a aplicação.
menu();