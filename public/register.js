document.addEventListener('DOMContentLoaded', () => {
    // Navbar öğelerini ayarla
    const userInfo = document.getElementById('user-info');
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const logoutLink = document.getElementById('logout-link');
    const dashboardLink = document.getElementById('dashboard-link');

    // Varsayılan olarak tüm bağlantıları gizle
    loginLink.style.display = 'none';
    registerLink.style.display = 'none';
    logoutLink.style.display = 'none';
    dashboardLink.style.display = 'none';

    // Kullanıcı oturum açmış mı kontrol et
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
        logoutLink.style.display = 'inline';
        userInfo.textContent = `Welcome, ${user.username}`;
        // Admin kullanıcıyı kontrol et
        if (user.username === 'admin') {
            dashboardLink.style.display = 'inline';
        }
    } else {
        loginLink.style.display = 'inline';
        registerLink.style.display = 'inline';
    }

    // Register formunu işle
    const form = document.getElementById('register-form');
    const errorElement = document.getElementById('register-error');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = form.username.value;
        const password = form.password.value;
        const email = form.email.value;

        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, email }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'login.html';
            } else {
                errorElement.textContent = data.message;
                errorElement.style.display = 'block';
            }
        })
        .catch(() => {
            errorElement.textContent = 'Registration failed. Please try again.';
            errorElement.style.display = 'block';
        });
    });
});
