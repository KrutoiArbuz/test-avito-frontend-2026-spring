# AI-ассистент для улучшения объявлений (Авито)

Веб-приложение — личный кабинет продавца с интегрированным AI-ассистентом для анализа карточек товаров и генерации рекомендаций по улучшению текста.

## Запуск

Проект можно запустить локально или через Docker.

### Вариант 1: Локальный запуск

Убедитесь, что у вас установлены Node.js (v20+) и Ollama.

**1. Запуск Ollama**
Скачайте модель и запустите сервер (в отдельном терминале):

```bash
ollama pull llama3
ollama serve
```

**2. Запуск бэкенда**

```bash
cd backend
npm install
npm start
```

**3. Запуск фронтенда**

```bash
cd frontend
npm install
npm run dev
```

### Вариант 2: Docker Compose

Docker Compose автоматически запускает все сервисы. Убедитесь, что установлен Docker.

**1. Запуск контейнеров:**

```bash
docker-compose up
```

**2. Загрузка модели Ollama (один раз):**

```bash
docker-compose exec ollama ollama pull llama3
```

Доступ к приложению: http://localhost:5173

## Стек

- React 19.2.4 (Vite)
- TypeScript
- Material-UI (MUI)
- React Router v6
- TanStack Query + Axios
- Zustand
- React Hook Form + Zod

## Технические особенности

## Тестирование
