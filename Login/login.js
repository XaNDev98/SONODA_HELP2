function validarLogin(event) {
  event.preventDefault(); // Evita o envio do formulário
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Login padrão hardcoded
  if (username === "Administrador" && password === "Sonoda455b") {
    localStorage.setItem("isLoggedIn", "true"); // Salva no localStorage que o usuário está logado
    window.location.href = "../Sidebar/instaladores.html"; // Redireciona para a página inicial
  } else {
    alert("Usuário ou senha inválidos.");
  }
}

// Exemplo de login bem-sucedido
function login() {
  // Lógica de login aqui (exemplo)
  localStorage.setItem('isLoggedIn', 'true');  // Armazena que o usuário está logado
}
window.onload = function () {
  // Verifica se o usuário está logado
  if (!localStorage.getItem('isLoggedIn')) {
    // Se não estiver logado, redireciona para a tela de login
    // Usando sessionStorage para evitar múltiplos redirecionamentos
    if (!sessionStorage.getItem('redirected')) {
      sessionStorage.setItem('redirected', 'true'); // Marca que já foi redirecionado
      window.location.replace('login.html');  // Redireciona para a página de login
    }
  } else {
    sessionStorage.removeItem('redirected');  // Limpa a flag de redirecionamento se o usuário estiver logado
  }
};
function logout() {
  // Remove o item do localStorage que indica que o usuário está logado
  localStorage.removeItem('isLoggedIn');
  // Redireciona para a tela de login
  window.location.href = 'login.html';
}


