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
    const container = document.getElementById('conteudo-para-salvar');
    
   
    const canvas = await html2canvas(container, {
        backgroundColor: '#1a1a1a',
        scale: 2
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${document.getElementById('nome').value || 'personagem'}.pdf`);
}