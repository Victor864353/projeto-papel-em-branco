const dados_props = {
    tipo: ["Arma de fogo pequena", "Arma de fogo média", "Arma de fogo grande", "Arma branca curta", "Arma branca longa", "Arma a combustão", "Arma explosiva", "Porção", "Arma de arremesso", "Arma improvisada", "Amuleto", "Máscara", "Cajados", "Furtas/Alimentos", "Troféus", "Acessórios", "Jóias"],
    elemento: ["Fogo", "Água", "Terra", "Ar", "Luz", "Trevas", "Raio/Enegia", "Gelo", "Natureza", "Cristal"],
    tema: ["Fantasia Medieval", "Cyberpunk", "Steampunk", "Dark Fantasy", "Sci-Fi Espacial", "Pirata", "Pós-Apocalíptico", "Solarpunk", "Infernal", "Angelical"]
};

function sortearIndividual(categoria) {
    const lista = dados_props[categoria]; // So vai alterar o "dados_personagem" quando for reutilizar
    if (lista) {
        const itemAleatorio = lista[Math.floor(Math.random() * lista.length)];
        const input = document.getElementById(categoria);
        if (input) {
            input.value = itemAleatorio;
        }
    }
}

function sortearTudo() {
    for (const categoria in dados_props) { // So vai alterar o "dados_personagem" quando for reutilizar
        sortearIndividual(categoria);
    }
}
