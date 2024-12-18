// node auth-server.js
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
	  (db) => db.username === username && db.password === password);

  if (user) {
    const token = jwt.sign(
	    { username },
	    'secretkey',
	    { expiresIn: '1h' }
	  ); 
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.get('/protected', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send('Token is required');
  }
  try {
    const decoded = jwt.verify(token, 'secretkey');
    res.json({ message: 'Protected data accessed!', user: decoded });
  } catch (err) {
    res.status(401).send('Invalid or expired token');
  }
});

app.listen(3000, () => {
  console.log('Auth server running at http://localhost:3000');
});