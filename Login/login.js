function validarLogin(event) {
  event.preventDefault(); // Evita o envio do formulário
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Login padrão hardcoded
  if (username === "Administrador" && password === "Sonoda455b") {
      localStorage.setItem("isLoggedIn", "true"); // Salva no localStorage que o usuário está logado
      window.location.href = "../index.html"; // Redireciona para a página inicial
  } else {
      alert("Usuário ou senha inválidos.");
  }
}