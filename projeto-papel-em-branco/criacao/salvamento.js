document.getElementById('btn-txt').addEventListener('click', salvarTXT);
document.getElementById('btn-jpeg').addEventListener('click', salvarJPEG);
document.getElementById('btn-pdf').addEventListener('click', salvarPDF);

function obterDados() {
    return {
        nome: document.getElementById('nome').value,
        idade: document.getElementById('idade').value,
        raca: document.getElementById('raca').value,
        classe: document.getElementById('classe').value,
        social: document.getElementById('social').value,
        historia: document.getElementById('historia').value,
        armas: document.getElementById('armas').value,
        aparencia: document.getElementById('aparencia').value,
        habilidades: document.getElementById('habilidades').value
    };
}

function salvarTXT() {
    const d = obterDados();
    const conteudo = `FICHA DE PERSONAGEM\n\n` +
        `Nome: ${d.nome}\nIdade: ${d.idade}\nRaça: ${d.raca}\nClasse: ${d.classe}\n` +
        `Classe Social: ${d.social}\n\n` +
        `HISTÓRIA:\n${d.historia}\n\n` +
        `ARMAS E EQUIPAMENTOS:\n${d.armas}\n\n` +
        `APARÊNCIA E PERSONALIDADE:\n${d.aparencia}\n\n` +
        `ATRIBUTOS E HABILIDADES:\n${d.habilidades}`;

    const blob = new Blob([conteudo], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${d.nome || 'personagem'}.txt`;
    link.click();
}

async function salvarJPEG() {
    const container = document.getElementById('conteudo-para-salvar');
    const canvas = await html2canvas(container, {
        backgroundColor: '#1a1a1a', 
        scale: 2 
    });
    
    const link = document.createElement('a');
    link.download = `${document.getElementById('nome').value || 'personagem'}.jpg`;
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
        { texto: "FICHA DE PERSONAGEM", estilo: "bold", tamanho: 18 },
        { texto: "", estilo: "normal", tamanho: 12 }, // Espaçador
        { texto: `Nome: ${d.nome}`, estilo: "normal", tamanho: 12 },
        { texto: `Idade: ${d.idade}`, estilo: "normal", tamanho: 12 },
        { texto: `Raça: ${d.raca}`, estilo: "normal", tamanho: 12 },
        { texto: `Classe: ${d.classe}`, estilo: "normal", tamanho: 12 },
        { texto: `Classe Social: ${d.social}`, estilo: "normal", tamanho: 12 },
        { texto: "", estilo: "normal", tamanho: 12 },
        { texto: "HISTÓRIA:", estilo: "bold", tamanho: 12 },
        { texto: d.historia, estilo: "normal", tamanho: 11 },
        { texto: "", estilo: "normal", tamanho: 12 },
        { texto: "ARMAS E EQUIPAMENTOS:", estilo: "bold", tamanho: 12 },
        { texto: d.armas, estilo: "normal", tamanho: 11 },
        { texto: "", estilo: "normal", tamanho: 12 },
        { texto: "APARÊNCIA E PERSONALIDADE:", estilo: "bold", tamanho: 12 },
        { texto: d.aparencia, estilo: "normal", tamanho: 11 },
        { texto: "", estilo: "normal", tamanho: 12 },
        { texto: "ATRIBUTOS E HABILIDADES:", estilo: "bold", tamanho: 12 },
        { texto: d.habilidades, estilo: "normal", tamanho: 11 }
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

    pdf.save(`${d.nome || 'personagem'}.pdf`);
}