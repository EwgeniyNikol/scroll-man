# Task Manager - Менеджер задач

Современное React-приложение для управления задачами с виртуализированным списком, бэкендом на json-server и production-сборкой.

## 🚀 Быстрый старт

### Предварительные требования
- Node.js 18 или выше
- npm 9 или выше

### Установка зависимостей
\`\`\`bash
npm install
\`\`\`

### Запуск в development режиме (фронтенд + бэкенд)
\`\`\`bash
npm run dev:full
\`\`\`
**Приложение будет доступно:** http://localhost:5173  
**API бэкенда:** http://localhost:3003/tasks

### Production сборка и запуск (ОДНОЙ КОМАНДОЙ)
\`\`\`bash
npm start
\`\`\`
**Или:**
\`\`\`bash
./start-app.sh
\`\`\`

**Приложение будет доступно:** http://localhost:3000  
**API будет доступен по:** http://localhost:3003/tasks

## 📁 Структура проекта (Feature-Sliced Design)
\`\`\`
task-manager/
├── src/                         # Исходный код
│   ├── app/                     # Инициализация приложения
│   ├── entities/task/           # Сущность задачи
│   ├── features/               # Фичи (создание, редактирование задач)
│   ├── pages/                  # Страницы приложения
│   ├── widgets/                # Виджеты (списки задач)
│   ├── shared/                 # Общие компоненты
│   └── app/                   # Конфигурация приложения
├── db.json                     # База данных JSON-server
├── server.cjs                  # Express сервер для production
├── start-app.sh               # Скрипт запуска одной командой
├── package.json               # Зависимости и скрипты
└── README.md                  # Документация
\`\`\`

## 🛠 Технологии
- **React 19** с TypeScript
- **Vite** для сборки
- **React Query (TanStack Query)** для управления состоянием
- **json-server** для API
- **Express** для production сервера
- **@tanstack/react-virtual** для виртуализации списков
- **Feature-Sliced Design** архитектура

## 🔧 Доступные скрипты
- \`npm run dev\` - запуск фронтенда в dev режиме
- \`npm run build\` - production сборка фронтенда
- \`npm run preview\` - превью production сборки
- \`npm run backend\` - запуск json-server API
- \`npm run dev:full\` - запуск фронтенда и бэкенда вместе
- \`npm run preview:full\` - сборка + запуск preview с бэкендом
- \`npm start\` - **PRODUCTION: сборка и запуск всего приложения одной командой**

## 📡 API Endpoints
После запуска бэкенда доступны следующие endpoints:
- \`GET /tasks\` - список всех задач с пагинацией
- \`GET /tasks/:id\` - получение задачи по ID
- \`POST /tasks\` - создание новой задачи
- \`PATCH /tasks/:id\` - обновление задачи
- \`DELETE /tasks/:id\` - удаление задачи

## 🎯 Особенности реализации
1. **Виртуализированный список** - плавная работа с большим количеством задач через @tanstack/react-virtual
2. **Бесконечный скролл** - автоматическая подгрузка задач при прокрутке
3. **Real-time обновления** - мгновенное отображение изменений через React Query
4. **Production-ready** - единая команда для запуска всего приложения
5. **Типизированный код** - полная TypeScript поддержка
6. **Архитектура FSD** - четкое разделение по слоям
7. **Сохранение данных** - данные сохраняются в db.json между перезагрузками

## 🔒 Безопасность
Приложение не содержит уязвимостей (npm audit: 0 vulnerabilities)

## 📝 Лицензия
MIT
## 🛠️ Технологии

- **React 18** + **TypeScript** - основной стек
- **TanStack Query v5** - управление состоянием и кэширование
- **SASS/SCSS Modules** - модульные стили
- **Feature-Sliced Design** - архитектура проекта
- **JSON Server** - mock API бэкенд
## 📁 Архитектура (Feature-Sliced Design)
\`\`\`
src/
├── app/          # Инициализация приложения, провайдеры, роутинг
├── pages/        # Страницы (Главная, Детали задачи)
├── widgets/      # Сложные UI виджеты (Список задач)
├── features/     # Бизнес-фичи (создание, редактирование, удаление)
├── entities/     # Бизнес-сущности (Модель задачи, API)
└── shared/       # Общие компоненты, утилиты, стили
\`\`\`

## ✅ Функциональность

- **Полный CRUD** - Создание, чтение, обновление, удаление задач
- **Бесконечный скролл** с виртуализацией для производительности
- **Отдельные страницы задач** с React Router
- **Адаптивный дизайн** с поддержкой темной/светлой темы

## 📦 Доступные скрипты

- \`npm run dev:full\` - Запуск фронтенда и бэкенда вместе
- \`npm run dev\` - Только фронтенд (Vite)
- \`npm run backend\` - Только бэкенд (JSON Server)
- \`npm run build\` - Сборка для production
- \`npm run preview\` - Превью production сборки

## 🔧 Решение проблем

Если порты заняты:
\`\`\`bash
PORT=5174 API_PORT=3004 npm run dev:full
\`\`\`

## 🌐 Демо

- **Фронтенд**: http://localhost:5173
- **API**: http://localhost:3003/tasks

## 📄 Документация

- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [TanStack Query](https://tanstack.com/query/latest)
- [Feature-Sliced Design](https://feature-sliced.design)
