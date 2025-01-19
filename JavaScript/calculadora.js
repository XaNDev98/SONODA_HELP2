
    let contadorEntradas = 1;

    // Função para adicionar novas entradas e saídas
    function adicionarEntrada() {
        contadorEntradas++;

        const entradasAdicionais = document.getElementById("entradasAdicionais");
        const novaEntrada = document.createElement("div");
        novaEntrada.classList.add("form-group", "row");
        novaEntrada.innerHTML = `
            <div class="col-md-5">
                <label for="entrada${contadorEntradas}">Entrada ${contadorEntradas}:</label>
                <input type="time" class="form-control" id="entrada${contadorEntradas}">
            </div>
            
            <div class="col-md-5">
                <label for="saida${contadorEntradas}">Saída ${contadorEntradas}:</label>
                <input type="time" class="form-control" id="saida${contadorEntradas}">
            </div>
        `;
        entradasAdicionais.appendChild(novaEntrada);
    }

    // Evento ao submeter o formulário
    document.getElementById("calcForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const cargaObrigatoria = document.getElementById("carga_obrigatoria").value;
        const entradas = [];
        const saídas = [];

        // Pega os valores das entradas e saídas
        for (let i = 1; i <= contadorEntradas; i++) {
            const entrada = document.getElementById(`entrada${i}`).value;
            const saída = document.getElementById(`saida${i}`).value;
            if (entrada && saída) {
                entradas.push(entrada);
                saídas.push(saída);
            }
        }

        if (entradas.length === 0 || saídas.length === 0) {
            document.getElementById("resultado").innerHTML = "Por favor, preencha todas as entradas e saídas.";
            return;
        }

        calcularJornada(entradas, saídas, cargaObrigatoria);
    });

    // Função para calcular a jornada
    function calcularJornada(entradas, saídas, cargaObrigatoria) {
        let totalJornadaMinutos = 0;
        let totalAdicionalNoturnoMinutos = 0;

        // Calcula o total de jornada somando os intervalos de entrada e saída
        for (let i = 0; i < entradas.length; i++) {
            const entradaMinutos = converteParaMinutos(entradas[i]);
            const saídaMinutos = converteParaMinutos(saídas[i]);

            // Ajusta a jornada para o caso de atravessar a meia-noite
            let minutosJornada = saídaMinutos - entradaMinutos;
            if (minutosJornada < 0) {
                minutosJornada += 24 * 60; // Se a jornada atravessar a meia-noite, soma 24 horas (1440 minutos)
            }
            totalJornadaMinutos += minutosJornada;

            // Calcula o adicional noturno
            totalAdicionalNoturnoMinutos += calcularAdicionalNoturno(entradaMinutos, saídaMinutos);
        }

        // Função para calcular o adicional noturno
        function calcularAdicionalNoturno(entrada, saída) {
            let adicional = 0;
            // Definindo o horário das 22h às 5h
            const inicioAdicional = converteParaMinutos("22:00");
            const fimAdicional = converteParaMinutos("05:00");

            if (entrada < inicioAdicional && saída > inicioAdicional) {
                // Parte do período de trabalho após as 22h
                adicional += Math.min(saída, fimAdicional + 1440) - inicioAdicional;
            }

            if (entrada < fimAdicional + 1440 && saída > fimAdicional + 1440) {
                // Parte do período de trabalho antes das 5h
                adicional += Math.min(saída, fimAdicional + 1440) - entrada;
            }

            return adicional;
        }

        // Função para converter minutos em horas e minutos
        function converteEmHorasEMinutos(minutos) {
            const horas = Math.abs(Math.floor(minutos / 60));
            const minutosRestantes = Math.abs(minutos % 60);
            return `${horas < 10 ? '0' : ''}${horas}:${minutosRestantes < 10 ? '0' : ''}${minutosRestantes}`;
        }

        let cargaFormatada = '';
        let horasExtras = 0;
        let cargaEmMinutos = 0;

        if (cargaObrigatoria) {
            const [cargaHora, cargaMinuto] = cargaObrigatoria.split(":").map(Number);
            if (!isNaN(cargaHora) && !isNaN(cargaMinuto)) {
                cargaEmMinutos = (cargaHora * 60) + cargaMinuto;
                cargaFormatada = converteEmHorasEMinutos(cargaEmMinutos);
                horasExtras = totalJornadaMinutos - cargaEmMinutos;
            }
        }

        const jornadaFormatada = converteEmHorasEMinutos(totalJornadaMinutos);
        const resultadoFormatado = converteEmHorasEMinutos(horasExtras);
        const adicionalNoturnoFormatado = converteEmHorasEMinutos(totalAdicionalNoturnoMinutos);

        let resultadoHTML = `Jornada: ${jornadaFormatada}<br>`;

        if (cargaFormatada) {
            if (horasExtras > 0) {
                resultadoHTML += `Carga obrigatória: ${cargaFormatada}<br>Colaborador fez ${resultadoFormatado} de hora extra.`;
            } else if (horasExtras < 0) {
                resultadoHTML += `Carga obrigatória: ${cargaFormatada}<br>Colaborador faltou ${resultadoFormatado} para cumprir a jornada.`;
            } else {
                resultadoHTML += `Carga obrigatória: ${cargaFormatada}<br>Colaborador fez o horário exato.`;
            }
        } else {
            resultadoHTML += `Colaborador fez ${jornadaFormatada}.`;
        }

        // Exibe o adicional noturno somente se houver
        if (totalAdicionalNoturnoMinutos > 0) {
            resultadoHTML += `<br>Adicional Noturno: ${adicionalNoturnoFormatado}`;
        }

        document.getElementById("resultado").innerHTML = resultadoHTML;
    }

    // Função para converter a hora em minutos
    function converteParaMinutos(time) {
        const [hora, minuto] = time.split(":").map(Number);
        return (hora * 60) + minuto;
    }

    // Função para limpar os cálculos
    function limparCalculo() {
        // Limpa os campos de entrada e saída
        for (let i = 1; i <= contadorEntradas; i++) {
            document.getElementById(`entrada${i}`).value = '';
            document.getElementById(`saida${i}`).value = '';
        }
        document.getElementById("carga_obrigatoria").value = '';

        // Limpa o resultado da jornada
        document.getElementById("resultado").innerHTML = '';

        // Limpa as entradas adicionais
        document.getElementById("entradasAdicionais").innerHTML = '';
        contadorEntradas = 1;  // Reseta o contador
    }
