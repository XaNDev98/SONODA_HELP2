function downloadPDF_Printpoint2() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Ajusta o tamanho da fonte para o título maior e negrito
  doc.setFontSize(18); // Tamanho maior para o título
  doc.setFont('helvetica', 'bold'); // Fonte negrito

  // Título ajustado para "COMANDOS SMART POINT" e centralizado
  const title = "COMANDOS PRINTPOINT 2";
  const titleWidth = doc.getTextWidth(title); // Obtém a largura do título
  const titleX = (doc.internal.pageSize.width - titleWidth) / 2; // Centraliza o título
  doc.setTextColor(0, 0, 0); // Cor preta para o título
  doc.text(title, titleX, 10); // Ajustando a posição centralizada

  // Definindo o array de comandos
  const commands = [
    { firstPart: "E > 80 > E:", secondPart: "GERAR ESPELHO AFD NO PENDRIVE", firstColor: [15, 123, 222], secondColor: [0, 0, 0] },
    { firstPart: "E > 88 > E:", secondPart: "COMANDO DE TROCA DE BATERIA (SOMENTE COM REP EM MANUTENÇÃO)", firstColor: [15, 123, 222], secondColor: [0, 0, 0] },
    { firstPart: "E > 90 > E:", secondPart: "ENVIAR COMANDO DE CORTE PARA IMPRESSORA", firstColor: [15, 123, 222], secondColor: [0, 0, 0] },
    { firstPart: "E > 91 > E:", secondPart: "CADASTRAR NOVA DIGITAL", firstColor: [15, 123, 222], secondColor: [0, 0, 0] },
    { firstPart: "E > 92 > E:", secondPart: "EXCLUIR DIGITAL", firstColor: [15, 123, 222], secondColor: [0, 0, 0] },
    { firstPart: "E > 94 > E:", secondPart: "PROGRAMAÇÃO POR PENDRIVE", firstColor: [15, 123, 222], secondColor: [0, 0, 0] },
    { firstPart: "E > 95 > E:", secondPart: "COLETA POR PENDRIVE", firstColor: [15, 123, 222], secondColor: [0, 0, 0] },
    { firstPart: "E > 97 > E:", secondPart: "VERSÃO, DATA E HORA PROGRAMAÇÕES TÉCNICAS (REDE)", firstColor: [15, 123, 222], secondColor: [0, 0, 0] },
    { firstPart: "E > 98 > E:", secondPart: "TESTE DE PERIFÉRICOS (SOMENTE COM REP EM MANUTENÇÃO)", firstColor: [15, 123, 222], secondColor: [0, 0, 0] }
];


  // Ajuste de texto com quebra automática
  let yPosition = 20; // Posição inicial do texto
  const lineHeight = 6; // Espaço entre as linhas
  const maxWidth = 195; // Largura máxima para o texto
  const pageHeight = doc.internal.pageSize.height; // Altura da página

  // Ajuste do tamanho da fonte para os comandos
  doc.setFontSize(10); // Reduzindo a fonte para os comandos

  for (let i = 0; i < commands.length; i++) {
    // Primeiro texto (negrito) para a primeira parte (firstPart)
    doc.setTextColor(commands[i].firstColor[0], commands[i].firstColor[1], commands[i].firstColor[2]);
    doc.setFont('helvetica', 'bold'); // Fonte negrito para a primeira parte

    // Adiciona a primeira parte do comando ao PDF
    const firstPartLines = doc.splitTextToSize(commands[i].firstPart, maxWidth);
    doc.text(firstPartLines, 5, yPosition); // Ajustando a margem esquerda para 5

    // Atualiza a posição Y para a próxima linha com espaçamento pequeno
    yPosition += firstPartLines.length * lineHeight + 2; // Pequeno espaçamento entre firstPart e secondPart

    // Texto para a segunda parte (normal)
    doc.setTextColor(commands[i].secondColor[0], commands[i].secondColor[1], commands[i].secondColor[2]);
    doc.setFont('helvetica', 'normal'); // Fonte normal para a segunda parte

    // Adiciona a segunda parte do comando ao PDF
    const secondPartLines = doc.splitTextToSize(commands[i].secondPart, maxWidth);
    doc.text(secondPartLines, 5, yPosition); // Ajustando a margem esquerda para 5

    // Atualiza a posição Y para a próxima linha
    yPosition += secondPartLines.length * lineHeight;

    // Verifica se a posição Y ultrapassou a altura da página, se sim, cria uma nova página
    if (yPosition > pageHeight - 20) { // 20 é um pequeno buffer para o final da página
      doc.addPage(); // Cria uma nova página
      yPosition = 20; // Reinicia a posição Y na nova página
    }

    // Dois quebras de linha antes do próximo comando
    yPosition += 6; // Espaçamento maior entre os comandos
  }

  // Adiciona a imagem e a centraliza
  const imgWidth = 50;  // Largura da imagem
  const imgHeight = 50; // Altura da imagem
  const xPosition = (doc.internal.pageSize.width - imgWidth) / 2; // Centraliza a imagem
  doc.addImage("../adress/Rep/printpoint_2.png", "PNG", xPosition, yPosition, imgWidth, imgHeight);

  // Baixa o PDF
  doc.save("comandosPrintpoint2.pdf");
}

// Adiciona o ouvinte de evento ao botão "Gerar PDF"
document.getElementById("generate-pdf_Printpoint2").addEventListener("click", downloadPDF_smartpoint);
