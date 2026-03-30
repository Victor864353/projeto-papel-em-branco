const dados_cenario = {
    local: ["Praia", "Oceano", "Caverna", "Deserto", "Ilha", "Montanhas", "Floresta", "Rio", "Cidade", "Vila", "Fotaleza", "Zona de gerra", "Zona tóxica/radioativa", "Praça", "Feira", "Mercado negro", "Jardim", "Campo de flores", "Caichoeira", "Planícies", "Outro planeta", "Espaço"],
    clima: ["Quente", "Frio", "Nublado", "Chuvoso", "Tempestade", "Enevoado", "Nevado"],
    horario: ["Dia", "Noite", "Meio-dia", "Nascer do sol", "Por do sol"],
    visao: ["Perspectiva aérea", "Isométrica", "Perspectiva de baixo", "Olho de peixe", "Perspectiva humana"],
    vegetacao: ["Vegetação rasteira", "Pouca vegetação", "Vegetação densa", "Vegetação alienígena", "Árvores gigantes", "Fungos", "Vegetação morta", "Vegetação elementar"],
    epoca: ["Medieval", "Moderna", "Futuristica", "Pré-História", "Idade da pedra", "I ou II guerra"],
};

function sortearIndividual(categoria) {
    const input = document.getElementById(categoria);
    const trava = document.getElementById(`trava-${categoria}`);

    if (trava && trava.checked) return;

    const lista = dados_cenario[categoria]; 
    if (lista && input) {
        let novoItem;

        do {
            novoItem = lista[Math.floor(Math.random() * lista.length)];
        } while (lista.length > 1 && novoItem === input.value);

        input.value = novoItem;
    }
}

function sortearTudo() {
    for (const categoria in dados_cenario) { 
        sortearIndividual(categoria);
    }
}
