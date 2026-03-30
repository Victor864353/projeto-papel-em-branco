const dados_criatura = {
    aparencia: ["Fofa", "Tenebrosa", "Assutadora", "Infernal", "Grotesco", "Bonita"],
    forma: ["Inceto", "Aracnídeo", "Animal terrestre", "Animal voador", "Animal aquático", "Humana/Humanoide", "Alienígena", "Sem forma/Massa viva", "Planta"],
    elemento: ["Fogo", "Água", "Terra", "Ar", "Luz", "Trevas", "Raio/Enegia", "Gelo", "Natureza", "Cristal"],
    habitat: ["Terrestre", "Aquático", "Subsolo", "Cavernas", "Biomas gelados", "Biomas vulcânicos", "Céu", "Pântano", "Inferno/Submundo"],
    origem: ["Natural(reprodução)", "Laboratório", "Sobrenatural", "Invocação", "Alienígena", "Mutação"],
    movimentacao: ["Bípede", "Quadrúpede", "Voar/Levitação", "Rastejante"],
    tamanho: ["Muito pequena", "Pequena", "1 metro", "Tamanho humano", "2-3 metros", "Muito grande", "Colossal"],
    alimentacao: ["Herbívoro", "Carnívoro", "Onívoro"],
    uso: ["Montaria/Carregador", "Caça", "Alimentação", "Iguaria", "Recursos (Ex:pele)", "Nenhum"],
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
