let contador = 1; // Inicia o contador das entradas e saídas

// Função para adicionar nova entrada e saída
function adicionarEntrada() {
  contador++;

  const entradasAdicionais = document.getElementById('entradasAdicionais');

  const novaEntradaSaida = document.createElement('div');
  novaEntradaSaida.classList.add('form-group', 'row');
  novaEntradaSaida.innerHTML = ` 
    <div class="col-md-4">
      <label for="entrada${contador}">Entrada ${contador}:</label>
      <input type="text" class="form-control" id="entrada${contador}" required onchange="calcularTotal(${contador})" oninput="converterHora(${contador})">
    </div>
    <div class="col-md-4">
      <label for="saida${contador}">Saída ${contador}:</label>
      <input type="text" class="form-control" id="saida${contador}" required onchange="calcularTotal(${contador})" oninput="converterHora(${contador})">
    </div>
    <div class="col-md-4">
      <label for="total${contador}">Total</label>
      <input type="text" class="form-control" id="total${contador}" readonly>
    </div>
  `;
  entradasAdicionais.appendChild(novaEntradaSaida);
}

// Função para converter a hora no formato 'HHMM' para 'HH:MM'
function converterHora(indice) {
  let hora = document.getElementById(`entrada${indice}`).value;
  if (hora.length === 4) {
    document.getElementById(`entrada${indice}`).value = `${hora.slice(0, 2)}:${hora.slice(2)}`;
  }

  hora = document.getElementById(`saida${indice}`).value;
  if (hora.length === 4) {
    document.getElementById(`saida${indice}`).value = `${hora.slice(0, 2)}:${hora.slice(2)}`;
  }
}

// Função para converter a carga obrigatória no formato 'HHMM' para 'HH:MM'
function converterHoraObrigatoria() {
  let hora = document.getElementById('carga_obrigatoria').value;
  if (hora.length === 4) {
    document.getElementById('carga_obrigatoria').value = `${hora.slice(0, 2)}:${hora.slice(2)}`;
  }
}

// Função para calcular o total de horas entre entrada e saída
function calcularTotal(indice) {
  const entrada = document.getElementById(`entrada${indice}`).value;
  const saida = document.getElementById(`saida${indice}`).value;

  if (entrada && saida) {
    const [horaEntrada, minutoEntrada] = entrada.split(':').map(num => parseInt(num));
    const [horaSaida, minutoSaida] = saida.split(':').map(num => parseInt(num));

    const totalEntrada = horaEntrada * 60 + minutoEntrada;
    const totalSaida = horaSaida * 60 + minutoSaida;

    let totalHoras = totalSaida - totalEntrada;
    if (totalHoras < 0) totalHoras += 24 * 60;

    const horas = Math.floor(totalHoras / 60);
    const minutos = totalHoras % 60;

    document.getElementById(`total${indice}`).value = `${horas}h ${minutos}m`;
  }
}

// Função para calcular a jornada total, horas extras, faltas e adicional noturno
function calcularJornada() {
  let jornadaTrabalhada = 0;
  let jornadaObrigatoria = document.getElementById('carga_obrigatoria').value;
  let jornadaExtras = '';
  let jornadaFaltas = '';
  let adicionalNoturno = 0;

  // Definir os minutos correspondentes às 22h e 05h
  const inicioNoturno = 22 * 60; // 22:00 em minutos
  const fimNoturno = (5 * 60) + (24 * 60); // 05:00 do dia seguinte

  for (let i = 1; i <= contador; i++) {
    const entrada = document.getElementById(`entrada${i}`).value;
    const saida = document.getElementById(`saida${i}`).value;

    if (entrada && saida) {
      let [horaEntrada, minutoEntrada] = entrada.split(':').map(num => parseInt(num));
      let [horaSaida, minutoSaida] = saida.split(':').map(num => parseInt(num));

      let totalEntrada = horaEntrada * 60 + minutoEntrada;
      let totalSaida = horaSaida * 60 + minutoSaida;

      // Se a saída for menor que a entrada, significa que virou o dia
      if (totalSaida < totalEntrada) totalSaida += 24 * 60;

      jornadaTrabalhada += totalSaida - totalEntrada;

      // Cálculo do adicional noturno
      for (let t = totalEntrada; t < totalSaida; t++) {
        let horaAtual = t % (24 * 60); // Ajusta para o ciclo de 24h
        if ((horaAtual >= inicioNoturno) || (horaAtual < fimNoturno - (24 * 60))) {
          adicionalNoturno++;
        }
      }
    }
  }

  // Calcular extras ou faltas
  if (jornadaObrigatoria) {
    const [horaObrigatoria, minutoObrigatoria] = jornadaObrigatoria.split(':').map(num => parseInt(num));
    const jornadaObrigatoriaMinutos = horaObrigatoria * 60 + minutoObrigatoria;
    const diferenca = jornadaTrabalhada - jornadaObrigatoriaMinutos;

    if (diferenca > 0) {
      jornadaExtras = `Horas Extras: ${Math.floor(diferenca / 60)}h ${diferenca % 60}m`;
    } else if (diferenca < 0) {
      jornadaFaltas = `Horas Faltas: ${Math.abs(Math.floor(diferenca / 60))}h ${Math.abs(diferenca % 60)}m`;
    }
  }

  // Exibir resultados
  document.getElementById('jornadaTrabalhada').innerText = `${Math.floor(jornadaTrabalhada / 60)}h ${jornadaTrabalhada % 60}m`;

  // Exibir ou ocultar os resultados dependendo dos valores
  document.getElementById('extras').innerText = jornadaExtras ? jornadaExtras : '';
  document.getElementById('faltas').innerText = jornadaFaltas ? jornadaFaltas : '';
  document.getElementById('adicionalNoturno').innerText = adicionalNoturno ? `${Math.floor(adicionalNoturno / 60)}h ${adicionalNoturno % 60}m` : '';
  document.getElementById('cargaObrigatoria').innerText = jornadaObrigatoria ? jornadaObrigatoria : '';

  // Ocultar elementos se os valores estiverem vazios
  document.getElementById('extras').parentElement.style.display = jornadaExtras ? 'block' : 'none';
  document.getElementById('faltas').parentElement.style.display = jornadaFaltas ? 'block' : 'none';
  document.getElementById('adicionalNoturno').parentElement.style.display = adicionalNoturno ? 'block' : 'none';
  document.getElementById('cargaObrigatoria').parentElement.style.display = jornadaObrigatoria ? 'block' : 'none';

  // Mostrar ou esconder a seção de resultados
  document.getElementById('resultados').style.display = jornadaTrabalhada > 0 ? 'block' : 'none';
}

// Função para limpar os cálculos
function limparCalculo() {
  // Limpa as entradas e saídas iniciais
  for (let i = 1; i <= contador; i++) {
    document.getElementById(`entrada${i}`).value = '';
    document.getElementById(`saida${i}`).value = '';
    document.getElementById(`total${i}`).value = '';
  }

  // Limpa a carga obrigatória
  document.getElementById('carga_obrigatoria').value = '';

  // Limpa as entradas e saídas adicionais
  document.getElementById('entradasAdicionais').innerHTML = '';

  // Limpa os resultados
  document.getElementById('jornadaTrabalhada').innerText = '';
  document.getElementById('extras').innerText = '';
  document.getElementById('faltas').innerText = '';
  document.getElementById('adicionalNoturno').innerText = '';
  document.getElementById('cargaObrigatoria').innerText = '';

  // Oculta a seção de resultados
  document.getElementById('resultados').style.display = 'none';

  // Reinicia o contador para o próximo ciclo de adições
  contador = 1; // Volta para a primeira entrada
}
