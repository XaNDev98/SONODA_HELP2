function DiferencaSistema() {
  const { jsPDF } = window.jspdf;
  
  const doc = new jsPDF();
  
  // Definir o tamanho da fonte para o título e aumentar para deixar mais proeminente
  doc.setFontSize(16); // Aumentando o tamanho da fonte para o título
  doc.setTextColor(15, 123, 222); // Cor azul mais forte para o título
  doc.setFont('helvetica', 'bold');
  
  // Centralizando o título "SISTEMAS DE PONTO:"
  const title = 'SISTEMAS DE PONTO:';
  const titleWidth = doc.getStringUnitWidth(title) * doc.getFontSize() / doc.internal.scaleFactor;
  const pageWidth = doc.internal.pageSize.width;
  doc.text(title, (pageWidth - titleWidth) / 2, 10); // Centralizado

  // Pular duas linhas antes de começar o conteúdo
  let currentY = 10 + 16 + 4; // Tamanho do título (16) + 2 linhas de espaçamento (4 cada)

  // Definir a fonte para o corpo do texto (fonte normal)
  doc.setFontSize(12); // Aumentando a fonte do corpo do texto para 12
  doc.setFont('helvetica', 'normal');
  
  // Texto normal para o conteúdo
  doc.setTextColor(0, 0, 0); // Cor preta
  const lines = [
    'Atualmente trabalhamos com dois sistemas de ponto: o sistema de ponto web PRO e o sistema de ponto web ULTIMATE.',
    'Ambos fazem a gestão de ponto e já são homologados à nova portaria 671, que utiliza somente o CPF.',
    'Porém eles possuem alguns diferenciais, como:',
    'WEB PRÓ POSSUI:',
    '- Backup automático em Nuvem, ou seja, sem chance das informações serem apagadas ou perdidas;',
    '- Sistema totalmente na Web;',
    '- Inclusão de ponto por QR Code;',
    '- Inclusão de ponto por aplicativo com Geolocalização e foto em tempo real;',
    '- Decomposição de cálculos em tela;',
    '- Comprovante de ponto por E-mail;',
    '- Feriados facultativos;',
    '- Inclusão de ponto sem Internet/por Perímetro;',
    '- Solicitar foto ao incluir ponto;',
    '- Envio de atestado pelo aplicativo;',
    '- Assinatura eletrônica do cartão ponto;',
    '- Múltiplos contratos por funcionário;',
    '- Feriados por cidades;',
    '- Dashboard de rotatividade;',
    '- Hierarquia de estruturas no aplicativo.',
    'WEB ULTIMATE POSSUI:',
    '- Todos os recursos do WEB PRÓ;',
    '- Gestão de Arquivos;',
    'DIFERENCIAIS DO ULTIMATE:', // Esta linha será movida para a segunda página
    '- Configurações de horário que passam da 00:00;',
    '- Gestão de Arquivos (pago à parte);',
    '- Reconhecimento facial online/offline (licença paga à parte);',
    '- Pesquisas de QVT;',
    '- Registro de atividades diárias (usado muito para motoristas);',
    '- Feriados por departamentos;',
    '- Logins separados por departamentos e empresas (caso a empresa possua mais de um CNPJ);',
    '- Separação de extras após a meia-noite;',
    '- Personalização de itens do sistema.'
  ];

  // Definir os títulos em negrito
  const boldTitles = ['WEB PRÓ POSSUI:', 'WEB ULTIMATE POSSUI:', 'DIFERENCIAIS DO ULTIMATE:'];

  // Função para verificar e adicionar nova página
  function addPageIfNeeded() {
    if (currentY > doc.internal.pageSize.height - 20) {
      doc.addPage();
      currentY = 10; // Reinicia a posição para o topo da nova página
    }
  }

  lines.forEach((line, index) => {
    // Verificar se é um título em negrito
    if (boldTitles.includes(line)) {
      doc.setTextColor(15, 123, 222); // Cor azul para o título
      doc.setFont('helvetica', 'bold');
    } else {
      doc.setTextColor(0, 0, 0); // Cor preta para o corpo do texto
      doc.setFont('helvetica', 'normal');
    }
    
    // Se chegarmos em "DIFERENCIAIS DO ULTIMATE", cria nova página e pula uma linha acima
    if (line === 'DIFERENCIAIS DO ULTIMATE:') {
      doc.addPage();
      currentY = 10; // Reinicia a posição para o topo da nova página
      currentY += 10; // Pule uma linha adicional antes de começar "DIFERENCIAIS DO ULTIMATE"
    }
    
    // Verifica se o conteúdo ultrapassou o limite da página antes de adicionar
    addPageIfNeeded();
    
    // Adiciona o texto
    doc.text(line, 10, currentY);
    currentY += 10; // Atualiza a posição Y para a próxima linha
  });

  // Adicionar a imagem centralizada no rodapé da última página com a margem de 3 dedos
  const img = new Image(); // Aqui você deve carregar sua imagem
  img.src = '../adress/me/Suporte E-Mail.png'; // Substitua com o caminho da sua imagem
  const imgWidth = 380 / 3; // Reduzindo a imagem para 200 de largura, por exemplo
  const imgHeight = 200 / 3; // Reduzindo a imagem para 100 de altura, por exemplo
  
  // Calcular a posição Y para colocar a imagem com a margem de 3 dedos acima do final da página
  const marginFromBottom = 1.5 * 25.4; // Aproximadamente 2,5 cm (convertido para pontos)
  const imgY = doc.internal.pageSize.height - marginFromBottom - imgHeight;
  
  // Centraliza a imagem no rodapé
  const imgX = (doc.internal.pageSize.width - imgWidth) / 2;
  doc.addImage(img, 'JPEG', imgX, imgY, imgWidth, imgHeight);

  // Salvar o PDF
  doc.save('Sistemas_de_Ponto.pdf');
}
