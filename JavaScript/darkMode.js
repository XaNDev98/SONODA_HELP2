document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // Verifica o estado do tema no localStorage e aplica
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
      body.classList.add('dark-mode'); // Aplica o tema escuro
      themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon'); // Altera o ícone para lua
  }

  // Alternar tema e atualizar ícone
  themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const icon = themeToggle.querySelector('i');
      if (body.classList.contains('dark-mode')) {
          icon.classList.replace('fa-sun', 'fa-moon');
          localStorage.setItem('theme', 'dark'); // Salva o tema escuro no localStorage
      } else {
          icon.classList.replace('fa-moon', 'fa-sun');
          localStorage.setItem('theme', 'light'); // Salva o tema claro no localStorage
      }
  });

  // Adiciona animação de clique ao botão
  document.querySelector('.theme-toggle').addEventListener('click', function () {
      this.classList.add('clicked'); // Adiciona a classe para ativar a animação
      setTimeout(() => this.classList.remove('clicked'), 800); // Remove a classe após a animação
  });
});
