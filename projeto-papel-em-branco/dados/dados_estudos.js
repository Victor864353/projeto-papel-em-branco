const dados_estudos = {
    gestual: ["1 pose", "2 poses", "3 poses", "4 poses", "5 poses"],
    tempo: ["30 seg", "1 min", "2 min", "3 min", "5 min", "10 min"],
    perspectiva: ["Pose em perspectiva", "Olho de peixe"],
    cores: ["Monocromático", "Análogas", "Triádicas", "Quadráticas", "Tons pastel", "Complementares" ],
    ds: ["Em desenvolvimento"],
};

function sortearIndividual(categoria) {
    const lista = dados_estudos[categoria]; // So vai alterar o "dados_personagem" quando for reutilizar
    if (lista) {
        const itemAleatorio = lista[Math.floor(Math.random() * lista.length)];
        const input = document.getElementById(categoria);
        if (input) {
            input.value = itemAleatorio;
        }
    }
}

function sortearTudo() {
    for (const categoria in dados_estudos) { // So vai alterar o "dados_personagem" quando for reutilizar
        sortearIndividual(categoria);
    }
}
