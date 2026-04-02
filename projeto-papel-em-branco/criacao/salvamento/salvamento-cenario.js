document.getElementById('btn-txt').addEventListener('click', salvarTXT);
document.getElementById('btn-jpeg').addEventListener('click', salvarJPEG);
document.getElementById('btn-pdf').addEventListener('click', salvarPDF);

function obterDados() {
    return {
        local: document.getElementById('local').value,
        horario: document.getElementById('horario').value,
        regiao: document.getElementById('regiao').value,
        civilizacao: document.getElementById('civilizacao').value,
        clima: document.getElementById('clima').value,
        vegetacao: document.getElementById('vegetacao').value,
        fauna: document.getElementById('fauna').value,
        terreno: document.getElementById('terreno').value,
        composicao: document.getElementById('composicao').value,
        estruturas: document.getElementById('estruturas').value
    };
}

function salvarTXT() {
    const d = obterDados();
    const conteudo = `CENÁRIO\n\n` +
        `Local: ${d.local}\nHorário: ${d.horario}\nRegião: ${d.regiao}\nCivilizacao: ${d.civilizacao}\n\n` +
        `BIOMA>>> \n` +
        `Clima: ${d.clima}\nVegetação: ${d.vegetacao}\nFauna: ${d.fauna}\nTerreno: ${d.terreno}\n\n` +
        `HISTÓRIA/COMPOSIÇÃO:\n${d.composicao}\n\n` +
        `ESTRUTURAS:\n${d.estruturas}`;

    const blob = new Blob([conteudo], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${d.local || 'cenário'}.txt`;
    link.click();
}

async function salvarJPEG() {
    const container = document.getElementById('conteudo-para-salvar');
    const canvas = await html2canvas(container, {
        backgroundColor: '#1a1a1a', 
        scale: 2 
    });
    
    const link = document.createElement('a');
    link.download = `${document.getElementById('local').value || 'cenário'}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.9);
    link.click();
}

async function salvarPDF() {
    const { jsPDF } = window.jspdf;
    const d = obterDados();
    const pdf = new jsPDF();
    
    const margem = 15;
    const larguraUtil = pdf.internal.pageSize.getWidth() - (margem * 2);
    let y = 20;

    // Configuração de conteúdo formatado
    const secoes = [
        { texto: "CENÁRIO", estilo: "bold", tamanho: 18 },
        { texto: "", estilo: "normal", tamanho: 12 }, // Espaçador
        { texto: `Local: ${d.local}`, estilo: "normal", tamanho: 12 },
        { texto: `Horário: ${d.horario}`, estilo: "normal", tamanho: 12 },
        { texto: `Região: ${d.regiao}`, estilo: "normal", tamanho: 12 },
        { texto: `Civilização: ${d.civilizacao}`, estilo: "normal", tamanho: 12 },
        { texto: "", estilo: "normal", tamanho: 12 },
        { texto: "Bioma >>>", estilo: "bold", tamanho: 12 },
        { texto: `Clima: ${d.clima}`, estilo: "normal", tamanho: 12 },
        { texto: `Vegetação: ${d.vegetacao}`, estilo: "normal", tamanho: 12 },
        { texto: `Fauna: ${d.fauna}`, estilo: "normal", tamanho: 12 },
        { texto: `Terreno: ${d.terreno}`, estilo: "normal", tamanho: 12 },
        { texto: "", estilo: "normal", tamanho: 12 },
        { texto: "HISTÓRIA / COMPOSIÇÃO:", estilo: "bold", tamanho: 12 },
        { texto: d.composicao, estilo: "normal", tamanho: 11 },
        { texto: "", estilo: "normal", tamanho: 12 },
        { texto: "ESTRUTURAS:", estilo: "bold", tamanho: 12 },
        { texto: d.estruturas, estilo: "normal", tamanho: 11 }
    ];

    secoes.forEach(secao => {
        pdf.setFont("helvetica", secao.estilo);
        pdf.setFontSize(secao.tamanho);
        
        // splitTextToSize divide o texto automaticamente se ele for maior que a largura da página
        const linhas = pdf.splitTextToSize(secao.texto || "", larguraUtil);
        
        // Verifica se precisa de uma nova página antes de escrever
        if (y + (linhas.length * 7) > 280) {
            pdf.addPage();
            y = 20;
        }

        pdf.text(linhas, margem, y);
        y += (linhas.length * 7) + 2; // Incrementa a posição Y para a próxima seção
    });

    pdf.save(`${d.local || 'cenário'}.pdf`);
}