document.addEventListener('DOMContentLoaded', () => {
    fetch('/users.json')
        .then(response => response.json())
        .then(users => {
            const userTableBody = document.getElementById('user-table-body');
            userTableBody.innerHTML = ''; // Clear the table first
            for (const [username, user] of Object.entries(users)) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${username}</td>
                    <td>${user.password}</td>
                    <td>${user.email}</td>
                `;
                userTableBody.appendChild(row);
            }
        })
        .catch(error => console.error('Error loading user data:', error));
});
