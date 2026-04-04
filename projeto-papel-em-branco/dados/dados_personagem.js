const dados_personagem = {
    idade: ["Adolescente (14-18)", "Jovem (19-30)", "Adulto (30-50)", "Idoso (60-80)", "Ancião (80-100)", "Imortal"],
    cor: ["Palido/Albino", "Branco", "Pardo", "Negro", "Bronzeado", "Colorido(sua escolha)", "Vitiligo", "Melanismo"],
    altura: ["Muito Baixo", "Baixo", "Estatura Média", "Alto", "Muito Alto", "Gigantesco", "Colossal"],
    cabelotipo: ["Curto e liso", "Longo e liso", "Curto e ondulado", "Longo e ondulado", "Cacheado", "Careca ou raspado", "Crespo Longo", "Crespo Curto"],
    cabelocorte: ["Corte Punk", "Trançado", "Bagunçado", "Ponpons", "Genérico", "Amarrado/Preso", "Cabelo Maluco"],
    fisico: ["Magro", "Atlético", "Musculoso", "Gordo"],
    raca: ["Humano", "Elfo", "Anão", "Orc", "Gnomo", "Tiefling", "Draconato", "Morto-Vivo", "Antropomorfo", "demi-humanos", "Halfling", "Aasimar", "Centauro", "Fada", "Genasi", "Goblin", "Grung", "Harengon", "Hobgoblin", "Kenku", "Kobold", "Lizardfolk", "Lokathah", "Loxodon", "Minotauro", "Owlin", "Sátiro", "Tabaxi", "Tortle", "Tritão", "Vedalken", "Warforged", "Yuan-ti", "Vampiro", "Miconídeos", "insetoides", "Metamorfos"],
    classe: ["Guerreiro", "Mago", "Ladino", "Paladino", "Bardo", "Druida", "Clérigo", "Ranger", "Bruxo", "Feiticeiro", "Monge", "Necromante"],
    arma: ["Espada longa", "Espada curta", "Arco e Flecha", "Cajado mágico", "Adagas duplas", "Machado de batalha", "Lança", "Martelo", "Bestas", "Pistola", "Rifle", "Submetralhadora", "Metralhadora", "Escopeta", "Armas de arremesso", "Adaga", "Maça", "Foice curta", "Foice longa", "Besta", "Glaive", "Machadinha", "Florete", "Cimitarra", "Tridente", "Chicote"],
    elemento: ["Fogo", "Água", "Terra", "Ar", "Luz", "Trevas", "Raio/Enegia", "Gelo", "Natureza", "Cristal"],
    tema: ["Fantasia Medieval", "Cyberpunk", "Steampunk", "Dark Fantasy", "Sci-Fi Espacial", "Pirata", "Pós-Apocalíptico", "Solarpunk"]
};

function sortearIndividual(categoria) {
    const input = document.getElementById(categoria);
    const trava = document.getElementById(`trava-${categoria}`);

    // 2° - Bloqueador: Se a trava estiver acionada, não faz nada
    if (trava && trava.checked) return;

    const lista = dados_personagem[categoria]; // So vai alterar o "dados_personagem" quando for reutilizar
    if (lista && input) {
        let novoItem;
        // 1° - Sorteia novamente até que o item seja diferente do atual
        do {
            novoItem = lista[Math.floor(Math.random() * lista.length)];
        } while (lista.length > 1 && novoItem === input.value);

        input.value = novoItem;
    }
}

function sortearTudo() {
    for (const categoria in dados_personagem) { // So vai alterar o "dados_personagem" quando for reutilizar
        sortearIndividual(categoria);
    }
}
