<?php
session_start();

// Verificar se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Verificar login padrão
    if ($username === "alexandre" && $password === "123") {
        $_SESSION['username'] = $username;
        header("Location: instaladores.html"); // Redirecionar para a página inicial
        exit();
    }

    // Conectar ao banco de dados
    $conn = new mysqli("localhost", "root", "", "sonoda");
    if ($conn->connect_error) {
        die("Erro de conexão: " . $conn->connect_error);
    }

    // Verificar login no banco
    $stmt = $conn->prepare("SELECT password FROM usuarios WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($hashed_password);
        $stmt->fetch();

        if (md5($password) === $hashed_password) { // Comparar senha
            $_SESSION['username'] = $username;
            header("Location: instaladores.html");
            exit();
        } else {
            echo "Senha incorreta.";
        }
    } else {
        echo "Usuário não encontrado.";
    }

    $stmt->close();
    $conn->close();
}
?>
