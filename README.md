# FILESTORRAGE

Файлове сховище

## Передумови

- Docker - [Завантажте та встановіть Docker](https://docs.docker.com/engine/install/).

## Конфігураційний файл для Docker Compose `compose.yaml`

```bash
services:
  filestorage:
    image: baklai/filestorage
    container_name: filestorage
    ports:
      - '80:80'
      - '443:443'
    volumes:
      - FILES_PATH:/var/www/files
    restart: unless-stopped
```

### Запустіть додаток

```bash
docker compose up -d
```

### Логи додатку

```bash
docker logs --tail 50 -f filestorage
```

### Перезапустити додаток

```bash
docker compose down && docker rmi baklai/filestorage && docker compose up -d && docker logs -f filestorage
```

### Видалити додаток

```bash
docker compose down
```

Після запуску програми на порту (80, 443 за замовчуванням) ви можете відкрити
у службу підтримки, ввівши http://localhost:80/.

## Створюйте образи Docker

### Використовуйте реєстр Docker

```bash
docker login
```

### Створення образу Docker

```bash
docker compose build
```

### Створюйте мультиплатформенні образи докерів і надсилайте зображення до репозиторію

```bash
docker compose build --builder multibuilder --no-cache --push
```

Якщо ваша середовище використовує іншу архітектуру ЦП, ніж ваша розробка
(наприклад, ви використовуєте Mac M1, а ваш хмарний постачальник amd64),
ви захочете створити образ для цієї платформи, наприклад:

```bash
# Переконайтеся, що у вас встановлено buildx. Якщо він не встановлений, встановіть його наступним чином
docker buildx install

# Збірка та перехід на buildx builder
docker buildx create --platform linux/amd64,linux/i386,linux/arm/v5,linux/arm/v6,linux/arm/v7,linux/arm64,linux/ppc64le,linux/s390x --name multibuilder --use

# Запустіть екземпляр конструктора
docker buildx inspect --bootstrap
```
