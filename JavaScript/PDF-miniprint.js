function downloadPDF_Miniprint() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Ajusta o tamanho da fonte para o título maior e negrito
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');

  // Título ajustado para "COMANDOS MINIPRINT" e centralizado
  const title = "COMANDOS MINIPRINT";
  const titleWidth = doc.getTextWidth(title);
  const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
  doc.setTextColor(0, 0, 0);
  doc.text(title, titleX, 10);

  // Definindo o array de comandos
  const commands = [
    { firstPart: "E > 45 > E:", secondPart: "EXPORTAR RSA NO PENDRIVE", firstColor: [15, 123, 222], secondColor: [0, 0, 0] },
    { firstPart: "E > 46 > E:", secondPart: "GERAR NOVA CHAVE RSA", firstColor: [15, 123, 222], secondColor: [0, 0, 0] },
    { firstPart: "E > 80 > E:", secondPart: "GERAR ESPELHO AFD NO PENDRIVE", firstColor: [15, 123, 222], secondColor: [0, 0, 0] },
    { firstPart: "E > 88 > E:", secondPart: "COMANDO DE TROCA DE BATERIA (SOMENTE COM REP EM MANUTENÇÃO)", firstColor: [15, 123, 222], secondColor: [0, 0, 0] },
    { firstPart: "E > 89 > E:", secondPart: "COMANDO DE TROCA DE BATERIA", firstColor: [15, 123, 222], secondColor: [0, 0, 0] },
    { firstPart: "E > 90 > E:", secondPart: "ENVIAR COMANDO DE IMPRESSÃO TESTE PARA IMPRESSORA", firstColor: [15, 123, 222], secondColor: [0, 0, 0] },
    { firstPart: "E > 91 > E:", secondPart: "CADASTRAR NOVA DIGITAL", firstColor: [15, 123, 222], secondColor: [0, 0, 0] },
    { firstPart: "E > 92 > E:", secondPart: "EXCLUIR DIGITAL", firstColor: [15, 123, 222], secondColor: [0, 0, 0] },
    { firstPart: "E > 94 > E:", secondPart: "PROGRAMAÇÃO POR PENDRIVE", firstColor: [15, 123, 222], secondColor: [0, 0, 0] },
    { firstPart: "E > 95 > E:", secondPart: "COLETA POR PENDRIVE", firstColor: [15, 123, 222], secondColor: [0, 0, 0] },
    { firstPart: "E > 97 > E:", secondPart: "VERSÃO, DATA E HORA E PROGRAMAÇÕES TÉCNICAS (REDE)", firstColor: [15, 123, 222], secondColor: [0, 0, 0] },
    { firstPart: "E > 98 > E:", secondPart: "TESTE DE PERIFÉRICOS (SOMENTE COM REP EM MANUTENÇÃO)", firstColor: [15, 123, 222], secondColor: [0, 0, 0] }
  ];

  // Ajuste de texto com quebra automática
  let yPosition = 20; // Posição inicial do texto
  const lineHeight = 6;
  const maxWidth = 195;
  const pageHeight = doc.internal.pageSize.height;

  // Ajuste do tamanho da fonte para os comandos
  doc.setFontSize(10);

  for (let i = 0; i < commands.length; i++) {
    doc.setTextColor(commands[i].firstColor[0], commands[i].firstColor[1], commands[i].firstColor[2]);
    doc.setFont('helvetica', 'bold');
    const firstPartLines = doc.splitTextToSize(commands[i].firstPart, maxWidth);
    doc.text(firstPartLines, 5, yPosition);
    yPosition += firstPartLines.length * lineHeight + 2;

    doc.setTextColor(commands[i].secondColor[0], commands[i].secondColor[1], commands[i].secondColor[2]);
    doc.setFont('helvetica', 'normal');
    const secondPartLines = doc.splitTextToSize(commands[i].secondPart, maxWidth);
    doc.text(secondPartLines, 5, yPosition);
    yPosition += secondPartLines.length * lineHeight;

    if (commands[i].firstPart === "E > 97 > E:") {
      // Finaliza a primeira página ao terminar os comandos E > 97 > E e E > 98 > E
      if (commands[i + 1]?.firstPart === "E > 98 > E:") {
        yPosition += 6; // Adiciona espaço extra
        continue;
      } else {
        doc.addPage();
        yPosition = 20;
      }
    }
  }

  // Adiciona a imagem na segunda página
  const imgWidth = 50;
  const imgHeight = 50;
  const xPosition = (doc.internal.pageSize.width - imgWidth) / 2;

  if (yPosition + imgHeight > pageHeight) {
    doc.addPage();
    yPosition = 20;
  }

  doc.addImage("../adress/Rep/miniprint.png", "PNG", xPosition, yPosition, imgWidth, imgHeight);

  // Baixa o PDF
  doc.save("comandosMiniprint.pdf");
}

// Adiciona o ouvinte de evento ao botão "Gerar PDF"
document.getElementById("generate-pdf_Miniprint").addEventListener("click", downloadPDF_Miniprint);
