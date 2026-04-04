const dados_props = {
    tipo: ["Arma de fogo pequena", "Arma de fogo média", "Arma de fogo grande", "Arma branca curta", "Arma branca longa", "Arma a combustão", "Arma explosiva", "Porção", "Arma de arremesso", "Arma improvisada", "Amuleto", "Máscara", "Cajados", "Furtas/Alimentos", "Troféus", "Acessórios", "Jóias", "Mobília", "Armadura", "Roupas", "Escudo", "Máquina", "Eletrônico"],
    elemento: ["Fogo", "Água", "Terra", "Ar", "Luz", "Trevas", "Raio/Enegia", "Gelo", "Natureza", "Cristal"],
    tema: ["Fantasia Medieval", "Cyberpunk", "Steampunk", "Dark Fantasy", "Sci-Fi Espacial", "Pirata", "Pós-Apocalíptico", "Solarpunk", "Infernal", "Angelical"]
};

function sortearIndividual(categoria) {
    const input = document.getElementById(categoria);
    const trava = document.getElementById(`trava-${categoria}`);

    if (trava && trava.checked) return;

    const lista = dados_props[categoria]; 
    if (lista && input) {
        let novoItem;

        do {
            novoItem = lista[Math.floor(Math.random() * lista.length)];
        } while (lista.length > 1 && novoItem === input.value);

        input.value = novoItem;
    }
}

function sortearTudo() {
    for (const categoria in dados_props) {
        sortearIndividual(categoria);
    }
}
