// main.js
document.addEventListener('DOMContentLoaded', function() {
    async function makeApiRequest(url, method, data, token = '') {
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (err) {
            console.error('Error:', err);
        }
    }

    async function loadUsers() {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login.html'; // Redirect to login if no token
            return;
        }

        const response = await makeApiRequest('/users', 'GET', null, token);
        const usersSelect = document.getElementById('toUser');
        usersSelect.innerHTML = response.users.map(user => 
            `<option value="${user.username}">${user.username}</option>` // Populate dropdown
        ).join('');
    }

    document.getElementById('newMessageForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const toUser = document.getElementById('toUser').value;
        const messageBody = document.getElementById('messageBody').value;
        const token = localStorage.getItem('token');

        await makeApiRequest('/messages', 'POST', { toUser, body: messageBody }, token);

        alert('Message sent!'); // Simple confirmation
        window.location.href = '/messages.html'; // Redirect to messages page
    });

    loadUsers();

    async function handleNewMessageSubmission() {
        const newMessageForm = document.getElementById('newMessageForm');
        if (newMessageForm) {
            newMessageForm.addEventListener('submit', async function(e) {
                e.preventDefault();

                const toUser = document.getElementById('toUser').value;
                const messageBody = document.getElementById('messageBody').value;
                const token = localStorage.getItem('token');

                const response = await makeApiRequest('/messages', 'POST', { toUser, body: messageBody }, token);

                if (response.message) {
                    alert('Message sent!');
                    window.location.href = '/messages.html'; // Redirect after successful submission
                } else {
                    alert('Failed to send message');
                }
            });
        }
    }

    if (document.getElementById('newMessageForm')) {
        loadUsers();
        handleNewMessageSubmission();
    }


    // Event listener for registration form
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Make API request to register
            const data = await makeApiRequest('http://localhost:3000/register', 'POST', {
                username: username,
                password: password
            });

            if (data && data.token) {
                localStorage.setItem('token', data.token);
                window.location.href = '/login.html';
            } else {
                alert("Registration failed");
            }
        });
    } else {
        console.log('Registration form not found on this page.');
    }

    // Event listener for login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Make API request to login
            const data = await makeApiRequest('http://localhost:3000/login', 'POST', {
                username: username,
                password: password
            });

            if (data && data.token) {
                localStorage.setItem('token', data.token);
                window.location.href = '/messages.html';
            } else {
                alert("Login failed");
            }
        });
    } else {
        console.log('Login form not found on this page.');
    }



});
