const dados_criatura = {
    aparencia: ["Fofa", "Tenebrosa", "Assutadora", "Infernal", "Grotesco", "Bonita"],
    forma: ["Inseto", "Aracnídeo", "Animal terrestre", "Animal voador", "Animal aquático", "Humana/Humanoide", "Alienígena", "Sem forma/Massa viva", "Planta", "Robótica"],
    elemento: ["Fogo", "Água", "Terra", "Ar", "Luz", "Trevas", "Raio/Enegia", "Gelo", "Natureza", "Cristal"],
    habitat: ["Terrestre", "Aquático", "Subsolo", "Cavernas", "Biomas gelados", "Biomas vulcânicos", "Céu", "Pântano", "Inferno/Submundo"],
    origem: ["Reprodução Natural", "Laboratório", "Sobrenatural", "Invocado/Conjurado", "Alienígena", "Mutação"],
    movimentacao: ["Bípede", "Quadrúpede", "Voador", "Rastejante", "Flutuante", "Teletransporte"],
    inteligencia: ["Racional", "Irracional", "Super Inteligente"],
    tamanho: ["Muito pequeno", "Pequeno", "Médio", "Tamanho humano", "Muito grande", "Colossal"],
    alimentacao: ["Herbívoro", "Carnívoro", "Onívoro", "Não necessita", "Fotossíntese", "Sangue", "Energia"],
    uso: ["Montaria/Carregador", "Caça", "Alimentação", "Iguaria", "Nenhum", "Criação de armas"]
};

function sortearIndividual(categoria) {
    const input = document.getElementById(categoria);
    const trava = document.getElementById(`trava-${categoria}`);

    if (trava && trava.checked) return;

    const lista = dados_criatura[categoria]; 
    if (lista && input) {
        let novoItem;

        do {
            novoItem = lista[Math.floor(Math.random() * lista.length)];
        } while (lista.length > 1 && novoItem === input.value);

        input.value = novoItem;
    }
}

function sortearTudo() {
    for (const categoria in dados_criatura) { // So vai alterar o "dados_personagem" quando for reutilizar
        sortearIndividual(categoria);
    }
}
