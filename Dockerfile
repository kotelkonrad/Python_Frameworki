# Stage 1: Budowanie statycznych plików przy użyciu Node
FROM node:18-alpine as node_builder
WORKDIR /app

# Kopiowanie plików konfiguracyjnych dla npm
COPY package.json package-lock.json ./
RUN npm install

# Kopiowanie całego projektu i budowanie frontendu
COPY . .
RUN npm run build

# Stage 2: Konfiguracja środowiska Python/Django
FROM python:3.11-slim
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /app

# Instalacja zależności systemowych (np. gcc oraz biblioteki do obsługi PostgreSQL)
RUN apt-get update && apt-get install -y gcc libpq-dev && rm -rf /var/lib/apt/lists/*

# Kopiowanie zależności Pythona oraz instalacja
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Kopiowanie całego projektu
COPY . .

# Kopiowanie zbudowanych plików statycznych z etapu Node
COPY --from=node_builder /app/build ./frontend/static

# Uruchomienie aplikacji korzystającej ze zmiennej PORT ustawionej w Railway
CMD gunicorn Portal_Game.wsgi:application --bind 0.0.0.0:${PORT}