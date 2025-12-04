# 💬 AI Chat

> Веб-приложение для общения с локальными LLM моделями

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?logo=typescript)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109.0-green?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.9+-green?logo=python)](https://www.python.org/)

## 🚀 Быстрый старт

### 1️⃣ Установка локальной LLM

```bash
# Скачайте Ollama
# https://ollama.com/download

# Установите модель (например, llama2)
ollama pull llama2

# Проверьте работу
ollama run llama2
# Для выхода введите: /bye
```

### 2️⃣ Запуск Backend

```bash
# Перейдите в папку backend
cd backend

# Создайте виртуальное окружение
python -m venv venv

# Активируйте его
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Установите зависимости
pip install -r requirements.txt

# Создайте .env файл
cp .env.example .env

# Запустите сервер
python run.py
```

Backend будет доступен по адресу: `http://localhost:8000`
API документация: `http://localhost:8000/docs`

### 3️⃣ Запуск Frontend

```bash
# Перейдите в папку frontend
cd frontend

# Установите зависимости
npm install

# Запустите dev сервер
npm run dev
```

Приложение откроется по адресу: `http://localhost:3000`

## ⚙️ Конфигурация

### Backend (.env)

```env
LLM_API_URL=http://localhost:11434/api/generate
LLM_MODEL=llama2
API_HOST=0.0.0.0
API_PORT=8000
```

### Frontend (.env)

```env
VITE_API_BASE_URL=/api
```

## 📁 Структура проекта

```
ai-chat/
├── frontend/                # React приложение
│   ├── src/
│   │   ├── components/     # UI компоненты
│   │   │   ├── Chat/       # Основной чат
│   │   │   ├── Message/    # Компонент сообщения
│   │   │   └── Input/      # Поле ввода
│   │   ├── hooks/          # React хуки
│   │   ├── services/       # API сервисы
│   │   ├── types/          # TypeScript типы
│   │   └── styles/         # SCSS стили
│   └── package.json
│
└── backend/                # FastAPI сервер
    ├── app/
    │   ├── api/            # API эндпоинты
    │   ├── services/       # Бизнес логика
    │   ├── models/         # Pydantic модели
    │   └── config/         # Конфигурация
    └── requirements.txt
```
