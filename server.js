const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

const usersFilePath = path.join(__dirname, 'users.json');

// Kullanıcı verilerini JSON dosyasından yükle
const loadUsers = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(usersFilePath, 'utf8', (err, data) => {
            if (err) return reject(err);
            try {
                resolve(JSON.parse(data));
            } catch (e) {
                reject(e);
            }
        });
    });
};

// Kullanıcı verilerini JSON dosyasına yaz
const saveUsers = (users) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};

// Route'lar

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/register.html'));
});

app.get('/youtube-downloader.html', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'public/youtube-downloader.html'));
    } else {
        res.redirect('/login.html');
    }
});

app.get('/dashboard.html', (req, res) => {
    if (req.session.user && (req.session.user.username === 'admin' || req.session.user.username === 'nefrius')) {
        res.sendFile(path.join(__dirname, 'public/dashboard.html'));
    } else {
        res.redirect('/index.html');
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const users = await loadUsers();
        const user = users[username];
        if (user && user.password === password) {
            req.session.user = { username };
            res.json({ success: true, user: req.session.user });
        } else {
            res.json({ success: false, message: 'Invalid username or password' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const users = await loadUsers();
        if (users[username]) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        users[username] = { password, email };
        await saveUsers(users);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destroy error:', err);
            return res.status(500).json({ success: false, message: 'Logout failed' });
        }
        res.json({ success: true });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
