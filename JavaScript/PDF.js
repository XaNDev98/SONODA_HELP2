function downloadPDF_Control_ID() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Ajusta o tamanho da fonte para o título maior e negrito
  doc.setFontSize(18); // Tamanho maior para o título
  doc.setFont('helvetica', 'bold'); // Fonte negrito

  // Título ajustado para "COMANDOS CONTROL ID" e centralizado
  const title = "COMANDOS CONTROL ID";
  const titleWidth = doc.getTextWidth(title); // Obtém a largura do título
  const titleX = (doc.internal.pageSize.width - titleWidth) / 2; // Centraliza o título
  doc.setTextColor(0, 0, 0); // Cor preta para o título
  doc.text(title, titleX, 10); // Ajustando a posição centralizada

  // Definindo o array de comandos
  const commands = [
    { firstPart: "ALTERAR IP:", secondPart: " MENU > CONFIGURAÇÃO > CONFIGURAÇÃO DE REDE.", firstColor: [15, 123, 222], secondColor: [0, 0, 0] },
    { firstPart: "CADASTRAR DIGITAL:", secondPart: " MENU > USUÁRIOS > ESCOLHA O USUÁRIO 1000 > BIOMETRIA > SALVAR.", firstColor: [15, 123, 222], secondColor: [0, 0, 0] },
    { firstPart: "AJUSTAR DATA E HORA:", secondPart: " MENU > CONFIGURAÇÕES > DATA E HORA > SALVAR.", firstColor:[15, 123, 222], secondColor: [0, 0, 0] },
    { firstPart: "EXCLUIR FUNCIONÁRIO:", secondPart: " MENU > USUÁRIOS > EXCLUIR.", firstColor: [15, 123, 222], secondColor: [0, 0, 0] },
    { firstPart: "CADASTRAR CRACHÁ:", secondPart: " MENU > USUÁRIOS > ESCOLHA O USUÁRIO 1000 > CARTÃO > APROXIMA O CARTÃO + SALVAR.", firstColor: [15, 123, 222], secondColor: [0, 0, 0] },
    { firstPart: "AFD COMPLETO:", secondPart: " PEN DRIVE PORTA VERMELHA > AGUARDAR EXPORTAÇÃO > RETIRAR PEN DRIVE.", firstColor:[15, 123, 222], secondColor: [0, 0, 0] },
    { firstPart: "AFD POR DATA:", secondPart: " MENU > USB > ENVIAR MARCAÇÕES > SELECIONA O PERÍODO NA DATA > EXPORTAR > MENU > USB > REMOVER O PENDRIVE > COLETA FEITA.", firstColor: [15, 123, 222], secondColor: [0, 0, 0] }
  ];

  // Ajuste de texto com quebra automática
  let yPosition = 20; // Posição inicial do texto
  const lineHeight = 6; // Espaço entre as linhas
  const maxWidth = 195; // Largura máxima para o texto

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

    // Dois quebras de linha antes do próximo comando
    yPosition += 6; // Espaçamento maior entre os comandos
  }

  // Adiciona a imagem e a centraliza
  const imgWidth = 50;  // Largura da imagem
  const imgHeight = 50; // Altura da imagem
  const xPosition = (doc.internal.pageSize.width - imgWidth) / 2; // Centraliza a imagem
  doc.addImage("../adress/Rep/control id.png", "PNG", xPosition, yPosition, imgWidth, imgHeight);

  // Baixa o PDF
  doc.save("comandosControl_ID.pdf");
}

// Adiciona o ouvinte de evento ao botão "Gerar PDF"
document.getElementById("generate-pdf_ControlID").addEventListener("click", downloadPDF_Control_ID);
