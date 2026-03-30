const dados_estudos = {
    gestual: ["1 pose", "2 poses", "3 poses", "4 poses", "5 poses"],
    tempo: ["30 seg", "1 min", "2 min", "3 min", "5 min", "10 min"],
    perspectiva: ["Pose em perspectiva", "Olho de peixe"],
    cores: ["Monocromático", "Análogas", "Triádicas", "Quadráticas", "Tons pastel", "Complementares" ],
    ds: ["Em desenvolvimento"],
};

function sortearIndividual(categoria) {
    const input = document.getElementById(categoria);
    const trava = document.getElementById(`trava-${categoria}`);

    if (trava && trava.checked) return;

    const lista = dados_estudos[categoria]; 
    if (lista && input) {
        let novoItem;

        do {
            novoItem = lista[Math.floor(Math.random() * lista.length)];
        } while (lista.length > 1 && novoItem === input.value);

        input.value = novoItem;
    }
}

function sortearTudo() {
    for (const categoria in dados_estudos) { // So vai alterar o "dados_personagem" quando for reutilizar
        sortearIndividual(categoria);
    }
}
