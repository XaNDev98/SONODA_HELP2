  // Função para gerar a pré-visualização 
   
  //  CONTROL ID
  // Função para gerar a pré-visualização 
function previewPDF() {
  const previewContainer = document.getElementById("previewContainer");
  const previewContent = document.getElementById("previewContent");

  // Monta o conteúdo
  const commands = [
      "1. ALTERAR IP: MENU > CONFIGURAÇÃO > CONFIGURAÇÃO DE REDE.",
      "2. CADASTRAR DIGITAL: MENU > USUÁRIOS > ESCOLHA O USUÁRIO 1000 > BIOMETRIA > SALVAR.",
      "3. AJUSTAR DATA E HORA: MENU > CONFIGURAÇÕES > DATA E HORA > SALVAR.",
      "4. EXCLUIR FUNCIONÁRIO: MENU > USUÁRIOS > EXCLUIR.",
      "5. CADASTRAR CRACHÁ: MENU > USUÁRIOS > ESCOLHA O USUÁRIO 1000 > CARTÃO > APROXIMA O CARTÃO + SALVAR.",
      "6. AFD COMPLETO: PEN DRIVE PORTA VERMELHA > AGUARDAR EXPORTAÇÃO > RETIRAR PEN DRIVE.",
      "7. AFD POR DATA: MENU > USB > ENVIAR MARCAÇÕES > SELECIONA O PERÍODO NA DATA > EXPORTAR > MENU > USB > REMOVER O PENDRIVE > COLETA FEITA."
  ];

  previewContent.innerHTML = ""; // Limpa o conteúdo da pré-visualização

  // Adiciona os itens de comando à pré-visualização
  commands.forEach(command => {
      const commandItem = document.createElement("div");
      commandItem.classList.add("command-item");
      commandItem.textContent = command;
      previewContent.appendChild(commandItem);
  });

  // Exibe a pré-visualização
  previewContainer.style.display = "block";
}

// Função para gerar o PDF
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Ajusta o tamanho da fonte
  doc.setFontSize(10); // Fonte menor

  // Título
  doc.text("Comandos do Relógio", 10, 10);

  // Texto com quebras de linha automáticas
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
  const lineHeight = 10; // Espaço entre as linhas
  const maxWidth = 180; // Largura máxima para o texto

  for (let i = 0; i < commands.length; i++) {
      // Primeiro texto em azul (ALTERAR IP)
      doc.setTextColor(commands[i].firstColor[0], commands[i].firstColor[1], commands[i].firstColor[2]);
      doc.text(commands[i].firstPart, 10, yPosition);

      // Segundo texto em preto (restante da linha)
      doc.setTextColor(commands[i].secondColor[0], commands[i].secondColor[1], commands[i].secondColor[2]);
      doc.text(commands[i].secondPart, 10 + doc.getTextWidth(commands[i].firstPart), yPosition); // Posição ajustada

      // Atualiza a posição Y para a próxima linha
      yPosition += lineHeight;
  }

  // Adiciona a imagem (verifique o caminho da imagem)
  doc.addImage("../adress/Rep/control id.png", "PNG", 10, yPosition, 50, 50);

  // Baixa o PDF
  doc.save("comandos_relogio.pdf");
}

// Adiciona o ouvinte de evento ao botão "Gerar PDF"
document.getElementById("generate-pdf").addEventListener("click", downloadPDF);
