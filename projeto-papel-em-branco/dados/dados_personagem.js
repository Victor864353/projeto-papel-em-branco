const dados_personagem = {
    idade: ["Criança", "Adolescente", "Jovem Adulto", "Adulto", "Meia-idade", "Idoso", "Ancião", "Imortal"],
    cor: ["Vermelho", "Azul", "Verde", "Amarelo", "Roxo", "Ciano", "Magenta", "Preto", "Branco", "Dourado", "Prateado"],
    altura: ["Muito Baixo", "Baixo", "Estatura Média", "Alto", "Muito Alto", "Gigantesco"],
    cabelo: ["Curto e Liso", "Longo e Ondulado", "Cacheado", "Careca", "Moicano", "Tranças", "Colorido", "Bagunçado"],
    fisico: ["Esguio", "Atlético", "Musculoso", "Robusto", "Frágil", "Gordo", "Definido"],
    raca: ["Humano", "Elfo", "Anão", "Orc", "Gnomo", "Tiefling", "Draconato", "Meio-Orc", "Morto-Vivo"],
    classe: ["Guerreiro", "Mago", "Ladino", "Paladino", "Bardo", "Druida", "Clérigo", "Ranger", "Monge", "Bruxo"],
    arma: ["Espada Longa", "Arco e Flecha", "Cajado Mágico", "Adagas Duplas", "Machado de Batalha", "Lança", "Martelo", "Bestas"],
    elemento: ["Fogo", "Água", "Terra", "Ar", "Luz", "Trevas", "Raio", "Gelo", "Natureza", "Vácuo"],
    tema: ["Fantasia Medieval", "Cyberpunk", "Steampunk", "Fantasia Sombria", "Sci-Fi Espacial", "Pirata", "Pós-Apocalíptico", "Urbano"]
};

function sortearIndividual(categoria) {
    const lista = dados_personagem[categoria]; // So vai alterar o "dados_personagem" quando for reutilizar
    if (lista) {
        const itemAleatorio = lista[Math.floor(Math.random() * lista.length)];
        const input = document.getElementById(categoria);
        if (input) {
            input.value = itemAleatorio;
        }
    }
}

function sortearTudo() {
    for (const categoria in dados_personagem) { // So vai alterar o "dados_personagem" quando for reutilizar
        sortearIndividual(categoria);
    }
}
