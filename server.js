
const express = require('express');
const app = express();
const port = 3001;


app.use(express.json());


let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];


app.get('/', (req, res) => {
    res.send('Hello, world!');
});


app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});


app.get('/api/users', (req, res) => {
    res.json(users);
});


app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = users.find(u => u.id === parseInt(id));
    if (!user) {
        return res.status(404).send('User not found');
    }
    user.name = name;
    user.email = email;
    res.json(user);
});


app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users = users.filter(u => u.id !== parseInt(id));
    res.status(204).send();
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


