const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;
require('dotenv').config()

app.use(express.json());

// MySQL connection configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// User API endpoints
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);

    if (rows.length > 0) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    await connection.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
    await connection.end();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    await connection.end();

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Task API endpoints
app.post('/tasks', async (req, res) => {
  const { userId, content } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute('INSERT INTO tasks (userId, content) VALUES (?, ?)', [userId, content]);
    await connection.end();

    const newTask = {
      id: result.insertId,
      userId,
      content,
    };

    res.status(201).json(newTask);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM tasks');
    await connection.end();

    res.json(rows);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/tasks/:id', async (req, res) => {
  const taskId = parseInt(req.params.id);

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM tasks WHERE id = ?', [taskId]);
    await connection.end();

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/tasks/:id', async (req, res) => {
  const taskId = parseInt(req.params.id);
  const { userId, content } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM tasks WHERE id = ?', [taskId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const task = rows[0];

    if (task.userId !== userId) {
      return res.status(403).json({ error: 'Not authorized to update this task' });
    }

    await connection.execute('UPDATE tasks SET content = ? WHERE id = ?', [content, taskId]);
    await connection.end();

    const updatedTask = {
      ...task,
      content,
    };

    res.json(updatedTask);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const taskId = parseInt(req.params.id);
  const { userId } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM tasks WHERE id = ?', [taskId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const task = rows[0];

    if (task.userId !== userId) {
      return res.status(403).json({ error: 'Not authorized to delete this task' });
    }

    await connection.execute('DELETE FROM tasks WHERE id = ?', [taskId]);
    await connection.end();

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});