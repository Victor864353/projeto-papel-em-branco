document.getElementById('btn-txt').addEventListener('click', salvarTXT);
document.getElementById('btn-jpeg').addEventListener('click', salvarJPEG);
document.getElementById('btn-pdf').addEventListener('click', salvarPDF);

function obterDados() {
    return {
        nomecriatura: document.getElementById('nomecriatura').value,
        idadecriatura: document.getElementById('idadecriatura').value,
        movimentacao: document.getElementById('movimentacao').value,
        inteligencia: document.getElementById('inteligencia').value,
        origem: document.getElementById('origem').value,
        perigo: document.getElementById('perigo').value,
        alimentacao: document.getElementById('alimentacao').value,
        domesticavel: document.getElementById('domesticavel').value,
        grupo: document.getElementById('grupo').value,
        habitat: document.getElementById('habitat').value,
        habitos: document.getElementById('habitos').value,
        aparenciacriatura: document.getElementById('aparenciacriatura').value,
        habilidadescriatura: document.getElementById('habilidadescriatura').value,
        uso: document.getElementById('uso').value
    };
}

function salvarTXT() {
    const d = obterDados();
    const conteudo = `CRIATURA\n\n` +
        `Nome: ${d.nomecriatura}\nIdade: ${d.idadecriatura}\nMovimentação: ${d.movimentacao}\nInteligência: ${d.inteligencia}\nOrigem: ${d.origem}\nNível de perigo: ${d.perigo}\nAlimentação: ${d.alimentacao}\nDomesticável: ${d.domesticavel}\nAnda em grupos: ${d.grupo}\n\n` +
        `HABITAT:\n${d.habitat}\n\n` +
        `HABITOS E COMPORTAMENTO:\n${d.habitos}\n\n` +
        `APARÊNCIA:\n${d.aparenciacriatura}\n\n` +
        `HABILIDADES E ATRIBUTOS:\n${d.habilidadescriatura}\n\n` +
        `USO:\n${d.uso}`;

    const blob = new Blob([conteudo], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${d.nomecriatura || 'criatura'}.txt`;
    link.click();
}

async function salvarJPEG() {
    const container = document.getElementById('conteudo-para-salvar');
    const canvas = await html2canvas(container, {
        backgroundColor: '#1a1a1a', 
        scale: 2 
    });
    
    const link = document.createElement('a');
    link.download = `${document.getElementById('nomecriatura').value || 'criatura'}.jpg`;
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
        { texto: "CRIATURA", estilo: "bold", tamanho: 18 },
        { texto: "", estilo: "normal", tamanho: 12 }, // Espaçador
        { texto: `Nome: ${d.nomecriatura}`, estilo: "normal", tamanho: 12 },
        { texto: `Idade: ${d.idadecriatura}`, estilo: "normal", tamanho: 12 },
        { texto: `Movimentação: ${d.movimentacao}`, estilo: "normal", tamanho: 12 },
        { texto: `Inteligência: ${d.inteligencia}`, estilo: "normal", tamanho: 12 },
        { texto: `Origem: ${d.origem}`, estilo: "normal", tamanho: 12 },
        { texto: `Nível de perigo: ${d.perigo}`, estilo: "normal", tamanho: 12 },
        { texto: `Alimentação: ${d.alimentacao}`, estilo: "normal", tamanho: 12 },
        { texto: `Domesticável: ${d.domesticavel}`, estilo: "normal", tamanho: 12 },
        { texto: `Anda em grupos: ${d.grupo}`, estilo: "normal", tamanho: 12 },
        { texto: "", estilo: "normal", tamanho: 12 },
        { texto: "HABITAT:", estilo: "bold", tamanho: 12 },
        { texto: d.habitat, estilo: "normal", tamanho: 11 },
        { texto: "", estilo: "normal", tamanho: 12 },
        { texto: "HABITOS E COMPORTAMENTO:", estilo: "bold", tamanho: 12 },
        { texto: d.habitos, estilo: "normal", tamanho: 11 },
        { texto: "", estilo: "normal", tamanho: 12 },
        { texto: "APARÊNCIA:", estilo: "bold", tamanho: 12 },
        { texto: d.aparenciacriatura, estilo: "normal", tamanho: 11 },
        { texto: "", estilo: "normal", tamanho: 12 },
        { texto: "HABILIDADES E ATRIBUTOS:", estilo: "bold", tamanho: 12 },
        { texto: d.habilidadescriatura, estilo: "normal", tamanho: 11 },
        { texto: "", estilo: "normal", tamanho: 12 },
        { texto: "USO:", estilo: "bold", tamanho: 12 },
        { texto: d.uso, estilo: "normal", tamanho: 11 }
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

    pdf.save(`${d.nomecriatura || 'criatura'}.pdf`);
}