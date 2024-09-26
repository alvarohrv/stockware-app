document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('./api/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Login exitoso") {
            window.location.href = './board.html'; // Redireccionar si el login es exitoso // JS maneja la redireccion no PHP!!!!!!!1
        } else {
            document.getElementById('idmessage').textContent = data.message; // Mostrar mensaje de error
        }
    })
    
});