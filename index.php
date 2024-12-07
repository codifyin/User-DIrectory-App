<?php
session_start();

// Функция для работы с JSON файлом
function getUsers() {
    $json = file_get_contents('data/users.json');
    return json_decode($json, true);
}

function saveUsers($users) {
    file_put_contents('data/users.json', json_encode($users, JSON_PRETTY_PRINT));
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>User Directory</title>
    <link rel="stylesheet" href="https://cdn.webix.com/edge/webix.css">
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.webix.com/edge/webix.js"></script>
</head>
<body>
    <nav>
        <div class="nav-container">
            <a href="index.php">Home</a>
            <?php if (!isset($_SESSION['user'])): ?>
                <a href="#" onclick="showRegisterForm()">Register</a>
                <a href="#" onclick="showLoginForm()">Login</a>
            <?php else: ?>
                <a href="logout.php">Logout</a>
            <?php endif; ?>
        </div>
    </nav>

    <div id="app"></div>

    <script src="script.js"></script>
</body>
</html>