# Auth API

REST API для авторизации пользователей. Реализует регистрацию, вход, выход и обновление сессии через JWT access/refresh токены в httpOnly cookies. Архитектура разделена на роуты / контроллеры / сервисы / репозитории.

## Стек

- Node.js / TypeScript
- Express 5
- PostgreSQL
- Prisma (ORM)
- Docker

## Библиотеки

- `jsonwebtoken` — генерация и верификация JWT токенов
- `bcrypt` — хеширование паролей
- `cookie-parser` — чтение httpOnly cookies из запроса

## Эндпоинты

| Метод | Путь           | Доступ    | Описание                        |
| ----- | -------------- | --------- | ------------------------------- |
| POST  | /auth/register | Публичный | Регистрация нового пользователя |
| POST  | /auth/login    | Публичный | Вход в аккаунт                  |
| POST  | /auth/refresh  | Публичный | Обновление access токена        |
| POST  | /auth/logout   | Публичный | Выход — очистка cookies         |
| GET   | /auth/me       | Приватный | Получить данные текущего юзера  |

### POST /auth/register

```json
{
  "name": "Имя",
  "email": "user@example.com",
  "password": "secret"
}
```

### POST /auth/login

```json
{
  "email": "user@example.com",
  "password": "secret"
}
```

### POST /auth/refresh

Тело не нужно — refresh токен читается из httpOnly cookie.

## Структура проекта

```
src/
  controllers/   — обработка req/res, вызов сервисов
  services/      — бизнес-логика (хеширование, генерация токенов)
  repositories/  — запросы к БД через Prisma
  routes/        — регистрация эндпоинтов
  middleware/    — authMiddleware для приватных роутов
  types/         — TypeScript интерфейсы и расширение типа Request
  errors/        — кастомный класс AppError
  lib/           — инициализация Prisma клиента
  config.ts      — валидация переменных окружения при старте
  app.ts         — настройка Express
  server.ts      — запуск сервера
prisma/
  schema.prisma  — схема БД
```
