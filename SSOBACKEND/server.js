require('dotenv').config();
const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send('Working');
});

app.post('/login', (req, res) => {
    const { data } = req.body;
    const token = jwt.sign({ data }, process.env.SECRET, { expiresIn: '30s' });
    res.status(200).json({ token, expiresIn: 1 / 24 });
});

app.post('/redirectdashboard', (req, res) => {
    const { token } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        if (decoded) {
            res.redirect(301, process.env.HOMEPAGE_URL);
        } else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (err) {
        if (err.message === 'jwt expired') {
            res.status(401).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

app.post('/redirecthomepage', (req, res) => {
    const { token } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        if (decoded) {
            res.redirect(301, process.env.DASHBOARD_URL);
        } else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (err) {
        if (err.message === 'jwt expired') {
            res.status(401).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

app.post('/redirect', (req, res) => {
    const { token, redirectUrl } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        if (decoded) {
            res.redirect(301, redirectUrl);
        } else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (err) {
        if (err.message === 'jwt expired') {
            res.status(401).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});