// index.js
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const logoutLink = document.getElementById('logout-link');
    const youtubeLink = document.getElementById('youtube-link');
    const dashboardLink = document.getElementById('dashboard-link');
    const userInfo = document.getElementById('user-info');

    if (user) {
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
        logoutLink.style.display = 'block';
        youtubeLink.style.display = 'block';
        dashboardLink.style.display = user.username === 'admin' ? 'block' : 'none';
        userInfo.textContent = `Logged in as ${user.username}`;
    } else {
        loginLink.style.display = 'block';
        registerLink.style.display = 'block';
        logoutLink.style.display = 'none';
        youtubeLink.style.display = 'none';
        dashboardLink.style.display = 'none';
        userInfo.textContent = 'Not logged in';
    }
});
