
    function showTab(tabId) {
            const tabs = document.querySelectorAll('.tab-pane');
            tabs.forEach(tab => {
                tab.style.display = 'none';
            });

            const activeTab = document.getElementById(tabId);
            if (activeTab) {
                activeTab.style.display = 'block';
            }

            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector(`[onclick="showTab('${tabId}')"]`).classList.add('active');
        }
        

          // Função para alternar as abas
          function showTab(tabId) {
            const tabs = document.querySelectorAll('.tab-pane');
            tabs.forEach(tab => tab.classList.remove('active'));

            const tabLinks = document.querySelectorAll('.nav-link');
            tabLinks.forEach(link => link.classList.remove('active'));

            document.getElementById(tabId).classList.add('active');
            document.getElementById(tabId + '-tab').classList.add('active');
        }

        // Função para alternar os menus de subitens
        function toggleMenu(menu) {
            const submenu = document.getElementById(menu + '-submenu');
            const menuItem = document.getElementById(menu + '-link');
            submenu.style.display = submenu.style.display === 'none' || submenu.style.display === '' ? 'block' : 'none';
            menuItem.classList.toggle('submenu-open');
        }
        function showTab(tabId) {
    // Remove a classe active de todas as abas
    $('.nav-link').removeClass('active');
    
    // Adiciona a classe active à aba clicada
    $('#' + tabId + '-tab').addClass('active');
    
    // Remove a classe active de todos os conteúdos de abas
    $('.tab-pane').removeClass('active');
    
    // Exibe o conteúdo da aba clicada
    $('#' + tabId).addClass('active');
} 
 
function toggleVideoMenu() {
    var submenu = document.getElementById('video-submenu');
    // Alterna a visibilidade do submenu
    if (submenu.style.display === 'none' || submenu.style.display === '') {
        submenu.style.display = 'block';
    } else {
        submenu.style.display = 'none';
    }
} 
 
function toggleMenu(menu) {
    // Encontra o submenu do item que foi clicado
    const submenu = document.getElementById(menu + '-submenu');
    
    // Alterna a visibilidade do submenu
    if (submenu.style.display === 'none' || submenu.style.display === '') {
        submenu.style.display = 'block'; // Mostra o submenu
    } else {
        submenu.style.display = 'none'; // Oculta o submenu
    }
}  

// SINALIZA A ONDE O USUARIO ESTÁ   
document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname;

    // Função para adicionar o ícone de status ativo
    const addActiveDot = (linkElement) => {
        const dot = document.createElement('span');
        dot.classList.add('active-dot');
        const icon = document.createElement('i');  // Cria o ícone
        icon.classList.add('fas', 'fa-circle');  // Usa o ícone de círculo preenchido do Font Awesome
        dot.appendChild(icon);  // Adiciona o ícone à bolinha
        linkElement.appendChild(dot);  // Adiciona a bolinha (com ícone) ao link
    };

    // Submenu de Vídeo
    const videoSubmenu = document.getElementById("video-submenu");
    const videoLinks = videoSubmenu.querySelectorAll('a');
    if (currentPath.includes("Videos")) {
        videoSubmenu.style.display = "block";
        videoLinks.forEach(link => {
            if (currentPath.includes(link.getAttribute("href").split('/').pop())) {
                addActiveDot(link); // Adiciona a bolinha com ícone ao link correspondente
            }
        });
    }

    // Submenu de Relógios
    const relogiosSubmenu = document.getElementById("relogios-submenu");
    const relogiosLinks = relogiosSubmenu.querySelectorAll('a');
    if (currentPath.includes("Rep")) {
        relogiosSubmenu.style.display = "block";
        relogiosLinks.forEach(link => {
            if (currentPath.includes(link.getAttribute("href").split('/').pop())) {
                addActiveDot(link); // Adiciona a bolinha com ícone ao link correspondente
            }
        });
    } 
     // Submenu de checklist
const checklistSubmenu = document.getElementById("checklist-submenu");
const checklistLinks = checklistSubmenu.querySelectorAll('a'); // Corrigido para checklistSubmenu
if (currentPath.includes("Treinamento")) {
    checklistSubmenu.style.display = "block";
    checklistLinks.forEach(link => {
        if (currentPath.includes(link.getAttribute("href").split('/').pop())) {
            addActiveDot(link); // Adiciona a bolinha com ícone ao link correspondente
        }
    });
}
}); 
function showTab(tabId) {
 // Oculta todas as abas
 const tabs = document.querySelectorAll('.tab-content > .tab-pane');
 tabs.forEach(tab => {
     tab.classList.remove('active');
     tab.style.display = 'none'; // Oculta a aba
 });

 // Mostra a aba selecionada
 const activeTab = document.getElementById(tabId);
 if (activeTab) {
     activeTab.classList.add('active');
     activeTab.style.display = 'block'; // Exibe a aba
 }

 // Atualiza a classe ativa das abas de navegação
 const navLinks = document.querySelectorAll('.nav-link');
 navLinks.forEach(link => {
     link.classList.remove('active');
 });
 document.querySelector(`[onclick="showTab('${tabId}')"]`).classList.add('active');
}

function copyText(link, button) {
    // Usando a API Clipboard moderna
    navigator.clipboard.writeText(link)
        .then(() => {
            // Adiciona a classe de piscar no botão
            button.classList.add('blink');
            
            // Remove a classe após 1 segundo para restaurar o estado original
            setTimeout(() => {
                button.classList.remove('blink');
            }, 1000);
        })
        .catch(err => {
            console.error('Erro ao copiar o link:', err);
        });
}

     function searchContent() {
         const query = document.getElementById('search-input').value.toLowerCase();
         const problemas = document.querySelectorAll('.problema');
         let found = false;
         problemas.forEach(problema => {
             if (problema.dataset.problema.toLowerCase().includes(query)) {
                 problema.style.display = 'block';
                 found = true;
             } else {
                 problema.style.display = 'none';
             }
         });
         document.getElementById('search-result').innerHTML = found ? '' : '<p class="text-danger">Nenhum resultado encontrado.</p>';
     } 
     function toggleMenu(menu) {
 // Encontra todos os submenus
 const submenus = document.querySelectorAll('.nav .nav-item ul');
 
 // Encontra o submenu do item que foi clicado
 const submenu = document.getElementById(menu + '-submenu');
 
 // Se o submenu não estiver visível, abre-o e fecha os outros
 if (submenu.style.display === 'none' || submenu.style.display === '') {
     // Fecha todos os outros submenus
     submenus.forEach(sub => {
         if (sub !== submenu) {
             sub.style.display = 'none';
         }
     });
     
     // Abre o submenu clicado
     submenu.style.display = 'block';
 } else {
     // Se o submenu já estiver visível, fecha-o
     submenu.style.display = 'none';
 }
} 
document.getElementById('search-input').addEventListener('input', function () {
 const query = this.value.toLowerCase();
 const items = document.querySelectorAll('.command-item');
 let found = false;

 items.forEach(item => {
     const text = item.textContent.toLowerCase();
     if (text.includes(query)) {
         item.style.display = 'flex'; // Mostra o item
         found = true;
     } else {
         item.style.display = 'none'; // Oculta o item
     }
 });

 const searchResult = document.getElementById('search-result');
 if (!found) {
     searchResult.innerHTML = '<p class="text-danger">Nenhum resultado encontrado.</p>';
 } else {
     searchResult.innerHTML = ''; // Limpa a mensagem se houver resultados
 }
});
  
// APENAS UMA SOLUÇÃO POR VEZ 
 
function toggleErrorDescription(targetId) {
    // Obtém todos os elementos de descrição de erro
    const allDescriptions = document.querySelectorAll('.erro-descricao-banco-de-dados');
    
    // Para cada descrição, a oculta
    allDescriptions.forEach(function(description) {
        if (description.id !== targetId) {
            description.style.display = 'none';
        }
    });

    // Exibe ou oculta a descrição do erro clicado
    const targetDescription = document.getElementById(targetId);
    if (targetDescription.style.display === 'none' || targetDescription.style.display === '') {
        targetDescription.style.display = 'block';
    } else {
        targetDescription.style.display = 'none';
    }
};  


