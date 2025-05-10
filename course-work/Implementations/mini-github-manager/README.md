# фак.номер 2301321008

# 📦 Mini-GitHub-Manager

Този проект представлява приложение, което симулира опростена платформа, подобна на GitHub, с възможност за управление на **users**, **repositories** и **commits**.

## ✅ Project Features & Requirements

| Изискване                   | Покритие в проекта                                            |
| --------------------------- | ------------------------------------------------------------- |
| ✅ 3 свързани таблици       | `users`, `repositories`, `commits`                            |
| ✅ CRUD операции            | Пълни Create, Read, Update, Delete за трите таблици           |
| ✅ Различни типове колони   | `INT`, `VARCHAR`, `TIMESTAMP`                                 |
| ✅ Ограничения за дължина   | `VARCHAR(50/100/255)` на `username`, `title`, `message` и др. |
| ✅ Задължителни полета      | `username`, `email`, `name`, `title`, `message`               |
| ✅ Защитен достъп           | JWT токен базиран достъп за API                               |
| ✅ Търсене по 2 критерия    | Търсене на комити по `title` и `timestamp`                    |
| ✅ Сортиране и странициране | Възможно в списъци с комити или репозиторита                  |

---

## 📜 API Documentation

Swagger документацията за API е налична в следния файл:  
[`swagger.yaml`](./swagger.yaml)

---

## 🔧 Tech Stack

| Компонент    | Технология                    |
| ------------ | ----------------------------- |
| Back-end     | Java + Spring Boot (REST API) |
| База данни   | H2 Database                   |
| Security     | JWT Token                     |
| Front-end    | Nuxt 3 (Vue 3 + Axios)        |
| Документация | Swagger/OpenAPI               |

---

## 🗃️ Database Structure

### Таблица: `users`

| Име      | Тип          | Описание              |
| -------- | ------------ | --------------------- |
| id       | INT, PK      | Автоматично генериран |
| username | VARCHAR(50)  | Уникален, NOT NULL    |
| email    | VARCHAR(100) | NOT NULL              |

### Таблица: `repositories`

| Име         | Тип          | Описание               |
| ----------- | ------------ | ---------------------- |
| id          | INT, PK      | Автоматично генериран  |
| name        | VARCHAR(100) | NOT NULL               |
| description | VARCHAR(255) | NULL                   |
| user_id     | INT, FK      | Връзка към `users(id)` |

### Таблица: `commits`

| Име           | Тип          | Описание                      |
| ------------- | ------------ | ----------------------------- |
| id            | INT, PK      | Автоматично генериран         |
| title         | VARCHAR(100) | NOT NULL                      |
| message       | VARCHAR(255) | NOT NULL                      |
| timestamp     | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP     |
| repository_id | INT, FK      | Връзка към `repositories(id)` |

---

## 📄 Additional Features

- ✅ API за login/register с JWT токени
- ✅ API за търсене:
  - Комити по `title` и `timestamp`
  - Хранилища по `name` и `user`
- ✅ Pagination и сортиране в списъци (`GET /commits?page=1&sort=title`)
- ✅ Валидации чрез анотации (или Java логика):
  - `title.length ≤ 100`
  - `username != null`
