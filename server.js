const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Читаем данные из db.json
let tasks = [];
try {
  const dbData = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8');
  const db = JSON.parse(dbData);
  tasks = db.tasks || [];
} catch (error) {
  tasks = [
    { id: 1, title: 'Изучить React', description: 'Освоить основные концепции', completed: false, createdAt: new Date().toISOString() },
    { id: 2, title: 'Создать проект', description: 'Завершить тестовое задание', completed: false, createdAt: new Date().toISOString() }
  ];
}

// API: Получить задачи с пагинацией
app.get('/api/tasks', (req, res) => {
  const page = parseInt(req.query._page) || 1;
  const limit = parseInt(req.query._limit) || 20;
  const start = (page - 1) * limit;
  const end = start + limit;
  
  // Сортировка по ID (новые сверху)
  const sortedTasks = [...tasks].sort((a, b) => b.id - a.id);
  const paginatedTasks = sortedTasks.slice(start, end);
  
  res.set('X-Total-Count', tasks.length.toString());
  res.json(paginatedTasks);
});

// API: Получить одну задачу
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Задача не найдена' });
  res.json(task);
});

// API: Создать задачу
app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    ...req.body,
    createdAt: new Date().toISOString(),
    completed: false
  };
  
  tasks.unshift(newTask); // Добавляем в начало
  res.status(201).json(newTask);
});

// API: Обновить задачу
app.put('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Задача не найдена' });
  
  tasks[index] = { ...tasks[index], ...req.body };
  res.json(tasks[index]);
});

// API: Удалить задачу
app.delete('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Задача не найдена' });
  
  const deleted = tasks.splice(index, 1)[0];
  res.json(deleted);
});

// Все остальные запросы → index.html (SPA роутинг)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api/tasks`);
  console.log(`📄 Фронтенд: http://localhost:${PORT}`);
});
