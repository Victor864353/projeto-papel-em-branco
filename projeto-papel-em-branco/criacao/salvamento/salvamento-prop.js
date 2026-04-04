document.getElementById('btn-txt').addEventListener('click', salvarTXT);
document.getElementById('btn-jpeg').addEventListener('click', salvarJPEG);
document.getElementById('btn-pdf').addEventListener('click', salvarPDF);

function obterDados() {
    return {
        nomeprop: document.getElementById('nomeprop').value,
        classificacao: document.getElementById('classificacao').value,
        origemprop: document.getElementById('origemprop').value,
        funcao: document.getElementById('funcao').value,
        descricao: document.getElementById('descricao').value,
        habilidadeprop: document.getElementById('habilidadeprop').value
    };
}

function salvarTXT() {
    const d = obterDados();
    const conteudo = `PROPS\n\n` +
        `Nome: ${d.nomeprop}\nClassificação: ${d.classificacao}\nOrigem: ${d.origemprop}\n\n` +
        `FUNÇÃO: ${d.funcao}\n\n` +
        `DESCRIÇÃO: ${d.descricao}\n\n` +
        `HABILIDADES:\n${d.habilidadeprop}\n\n`;

    const blob = new Blob([conteudo], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${d.nomeprop || 'props'}.txt`;
    link.click();
}

async function salvarJPEG() {
    const container = document.getElementById('conteudo-para-salvar');
    const canvas = await html2canvas(container, {
        backgroundColor: '#1a1a1a', 
        scale: 2 
    });
    
    const link = document.createElement('a');
    link.download = `${document.getElementById('nomeprop').value || 'props'}.jpg`;
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
        { texto: "PROPS", estilo: "bold", tamanho: 18 },
        { texto: "", estilo: "normal", tamanho: 12 }, // Espaçador
        { texto: `Nome: ${d.nomeprop}`, estilo: "normal", tamanho: 12 },
        { texto: `Classificação: ${d.classificacao}`, estilo: "normal", tamanho: 12 },
        { texto: `Origem: ${d.origemprop}`, estilo: "normal", tamanho: 12 },
        { texto: "", estilo: "normal", tamanho: 12 },
        { texto: `Função: ${d.funcao}`, estilo: "normal", tamanho: 12 },
        { texto: "", estilo: "normal", tamanho: 12 },
        { texto: `Descrição: ${d.descricao}`, estilo: "normal", tamanho: 12 },
        { texto: "", estilo: "normal", tamanho: 12 },
        { texto: `Habilidades: ${d.habilidadeprop}`, estilo: "normal", tamanho: 12 }
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

    pdf.save(`${d.nomeprop || 'props'}.pdf`);
}