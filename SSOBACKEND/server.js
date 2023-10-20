require('dotenv').config();
const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const redis = require('redis');
const uuid = require('uuid');
const client = redis.createClient();
(async () => {
    await client.on("error", (error) => console.error(error));
    await client.connect();
    console.log("redis client connected");
})();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send('Working');
});

app.post('/login', async(req, res) => {
    const { data } = req.body;
    const token = jwt.sign({ data }, process.env.SECRET, { expiresIn: '20s' });
    const key = uuid.v4();
    const redisData=await client.setEx(key, 300000, token);
    console.log(redisData);
    res.status(200).json({ token:key, expiresIn: 1 / 24 });
});

app.post('/redirect',async (req, res) => {
    const { token, redirectUrl } = req.body;
    try {
        const key=await client.get(token);
        if(!key) throw new Error('unauthorized');
        const decoded = jwt.verify(key, process.env.SECRET);
        if (decoded) {
            res.redirect(301,`${redirectUrl}?token=${token}`);
        } else {
            await client.del(token);
            res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (err) {
        await client.del(token);
        if (err.message === 'jwt expired'||err.message === 'unauthorized') {
            res.status(401).json({ error: err.message });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
});

app.get('/logout', async (req, res) => {
    const { token } = req.params;
    try {
        await client.del(token);
        res.status(200).json({ message: 'Logged out successfully' }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/verify', async (req, res) => {
    const { token } = req.body;
    try {
        const key=await client.get(token);
        if(!key) throw new Error('unauthorized');
        const decoded = jwt.verify(key, process.env.SECRET);
        if (decoded) {
            res.status(200).json({ message: 'Authorized' });
        } else {
            await client.del(token);
            res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (error) {
        await client.del(token);
        if (error.message === 'jwt expired'||error.message === 'unauthorized') {
            res.status(401).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

// const checkToken = async (key, callback) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const data = await client.get(key);
//             if (data !== null) {
//                 resolve(JSON.parse(data));
//             } else {
//                 await callback();
//                 client.setEx(key, 30000, JSON.stringify(data));
//                 resolve(data);
//             }
//         } catch (err) {
//             reject(err);
//         }
//     })
// };

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});