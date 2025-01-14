
     // Adiciona evento de cópia para mostrar o ícone depois da cópia
     document.addEventListener('copy', (event) => {
         // Verifica se o texto copiado contém o ícone '✔️' ou o símbolo 'feito'
         const copiedText = window.getSelection().toString();
         if (copiedText.includes('✔️')) {
             // Torna o ícone visível após a cópia
             document.querySelectorAll('.to-copy').forEach((icon) => {
                 icon.style.visibility = 'visible';  // Mostra o ícone
             });
         }
     });
 // Função para alternar entre as abas
 function showTab(tabId) {
     // Recarregar a página e desmarcar os checkboxes
     reloadPage();
 
     // Alterar para a aba selecionada
     document.querySelectorAll('.tab-pane').forEach(tab => {
         tab.classList.remove('active');
     });
     document.getElementById(tabId).classList.add('active');
 }
 // Função para copiar o texto das tarefas concluídas
     window.copyText = function () {
         const completedTasks = [];
         document.querySelectorAll('.checklist-checkbox:checked').forEach((checkbox) => {
             const label = checkbox.nextElementSibling; // Captura o label associado ao checkbox
             if (label) { 
                 const taskText = label.textContent.trim();
                 completedTasks.push(`${taskText}`);
             } else {
                 console.error('Erro ao encontrar o texto da tarefa para o checkbox:', checkbox);
             }
         });
 
         if (completedTasks.length > 0) {
             const textToCopy = completedTasks.join('\n');
             navigator.clipboard.writeText(textToCopy)
                 .then(() => {
                     // Aplica a animação apenas ao botão de copiar
                     const copyButton = document.querySelector('.btn-copy');
                     copyButton.classList.add('blink');
                     // Remove a animação após a conclusão
                     setTimeout(() => {
                         copyButton.classList.remove('blink');
                     }, 1000); // Tempo da animação
                 })
                 .catch((err) => console.error('Erro ao copiar checklist:', err));
         }
     }; 

 // Função para alternar entre as abas
 function showTab(tabId) {
     // Remove a classe 'active' de todas as abas
     document.querySelectorAll('.tab-pane').forEach(tab => {
         tab.classList.remove('active');
     });
 
     // Adiciona a classe 'active' à aba que deve ser exibida
     document.getElementById(tabId).classList.add('active');
 
     // Atualiza a classe 'active' nos links de navegação para refletir a aba ativa
     document.querySelectorAll('.nav-link').forEach(link => {
         link.classList.remove('active');
     });
 
     // Marca o link correspondente à aba ativa como 'active'
     document.querySelector(`#checklist_off_${tabId}`).classList.add('active');
 }
 
 function reloadPage(tabId) {
     showTab(tabId);  // Chama a função showTab para alternar entre as abas
 } 
 // Função para alternar entre as abas e recarregar a página
function reloadPage(tabId) {
  // Recarregar a página e resetar o estado dos checkboxes
  resetCheckboxes();

  // Alterar para a aba selecionada
  document.querySelectorAll('.tab-pane').forEach(tab => {
      tab.classList.remove('active');
  });
  document.getElementById(tabId).classList.add('active');

  // Atualizar a classe 'active' nos links de navegação para refletir a aba ativa
  document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
  });
  document.querySelector(`#checklist_off_${tabId}`).classList.add('active');
}

// Função para resetar os checkboxes
function resetCheckboxes() {
  document.querySelectorAll('.checklist-checkbox').forEach((checkbox) => {
      checkbox.checked = false;  // Desmarcar todos os checkboxes
      const label = checkbox.nextElementSibling;
      if (label) {
          // Remove qualquer ícone ou texto 'feito' ao desmarcar
          label.innerHTML = label.textContent.trim();
      }
  });
}

document.addEventListener('DOMContentLoaded', () => {
    // Adiciona eventos aos checkboxes
    document.querySelectorAll('.checklist-checkbox').forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            const label = checkbox.nextElementSibling; // Captura o label associado ao checkbox
            if (label) {
                if (checkbox.checked) {
                    // Marca a tarefa como concluída
                    label.innerHTML = `${label.textContent.trim()} <span class="to-copy">( Feito )</span> <i class="fas fa-check-circle custom-check-icon"></i>`;
                } else {
                    // Remove o ícone e "( Feito )" ao desmarcar
                    label.innerHTML = label.textContent
                        .replace(/ \( Feito \)/, '') // Remove "( Feito )"
                        .replace(/<span class="to-copy">\( Feito \)<\/span>/, '') // Remove span
                        .replace(/<i class="fas fa-check-circle custom-check-icon"><\/i>/, '') // Remove ícone
                        .trim();
                }
            } else {
                console.error('Label não encontrado para o checkbox:', checkbox);
            }
        });
    });

    // Adiciona evento de cópia para mostrar o texto copiado
    document.addEventListener('copy', () => {
        const completedTasks = [];
        document.querySelectorAll('.checklist-checkbox:checked').forEach((checkbox) => {
            const label = checkbox.nextElementSibling; // Captura o label associado ao checkbox
            if (label) {
                const taskText = label.textContent.replace(/ \( Feito \)/, '').trim();
                completedTasks.push(taskText); // Adiciona o texto da tarefa
            }
        });

        if (completedTasks.length > 0) {
            const textToCopy = completedTasks.join('\n');
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    console.log('Texto copiado:', textToCopy);
                })
                .catch((err) => console.error('Erro ao copiar checklist:', err));
        }
    });
});




