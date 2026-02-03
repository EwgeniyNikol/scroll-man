# Task Manager - Менеджер задач

Современное React-приложение для управления задачами с виртуализированным списком и production-сборкой.

## Быстрый старт

### Предварительные требования
- Node.js 18 или выше
- npm 9 или выше

### Установка и запуск
\`\`\`bash
# Установка зависимостей
npm install

# Запуск приложения (production сборка)
npm start
\`\`\`

Приложение будет доступно по адресу: http://localhost:3000

## Структура проекта
Проект использует Feature-Sliced Design архитектуру:
\`\`\`
task-manager/
├── src/                    # Исходный код
│   ├── app/               # Инициализация приложения
│   ├── entities/task/     # Сущность задачи
│   ├── features/          # Фичи (создание, редактирование)
│   ├── pages/            # Страницы приложения
│   ├── widgets/          # Виджеты (списки задач)
│   └── shared/           # Общие компоненты и утилиты
├── db.json               # База данных
├── server.js            # Express сервер
└── package.json         # Зависимости и скрипты
\`\`\`

## Технологии
- **Frontend**: React 18, TypeScript, Vite
- **State Management**: TanStack Query (React Query)
- **Virtualization**: TanStack React Virtual
- **Backend**: Express.js с REST API
- **Styling**: SASS/SCSS Modules
- **Architecture**: Feature-Sliced Design

## Доступные скрипты
- \`npm start\` - Сборка и запуск production версии
- \`npm run build\` - Production сборка фронтенда
- \`npm run dev\` - Запуск в development режиме

## API Endpoints
- \`GET    /api/tasks\` - Список задач с пагинацией
- \`GET    /api/tasks/:id\` - Получение задачи по ID
- \`POST   /api/tasks\` - Создание новой задачи
- \`PUT    /api/tasks/:id\` - Обновление задачи
- \`DELETE /api/tasks/:id\` - Удаление задачи

## Особенности реализации
- **Виртуализированный список** - Плавная работа с большим количеством задач
- **Бесконечный скролл** - Автоматическая подгрузка при прокрутке
- **Real-time обновления** - Мгновенное отображение изменений
- **Типизированный код** - Полная TypeScript поддержка
- **Сохранение данных** - Данные сохраняются между перезагрузками

## Лицензия
MIT
