# 📚 Online Library System

Full-stack web application for library management — allows managing books, users, loans, and reservations with JWT-based authentication.

> **Problem it solves:** Digitizes the operational workflow of a library, replacing manual records with a web system where users can search for books, request loans/reservations, and administrators can manage the entire catalog.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Angular 20 (standalone components) |
| **UI** | Angular Material · Bootstrap 5 |
| **Backend** | Node.js + Express 5 |
| **Database** | MySQL |
| **Authentication** | JWT (JSON Web Tokens) |
| **Languages** | TypeScript (frontend) · JavaScript (backend) |

---

## ✨ Features

- 🔐 **JWT Authentication** — Sign up and login with tokens
- 📖 **Book CRUD** — Create, read, update, and delete books from the catalog
- 🔍 **Search** — Search books by title or author
- 📋 **Loans** — Request loans, register returns
- 📌 **Reservations** — Reserve books with a limit of 5 active reservations per user
- 👤 **User Profile** — Profile view with history
- 🛡️ **Protected Routes** — Angular Guards for route protection
- 🔄 **HTTP Interceptor** — Automatic JWT token injection on every request

---

## 📁 Project Structure

```
BibliotecaOnline/
├── backend/
│   ├── server.js              ← Express server (port 3000)
│   ├── db.js                  ← MySQL connection (with dotenv)
│   └── routes/
│       ├── libros.js          ← Book CRUD
│       ├── usuarios.js        ← Registration & login
│       ├── prestamos.js       ← Loan management
│       └── reservas.js        ← Reservation management
├── src/app/
│   ├── auth/login/            ← Login component
│   ├── components/
│   │   ├── perfil/            ← User profile
│   │   └── register/          ← User registration
│   ├── guards/                ← Auth route guard
│   ├── Interceptors/          ← JWT interceptor
│   ├── libros/                ← Book search
│   ├── libros-list/           ← Book listing
│   ├── libros-detail/         ← Book detail
│   ├── libros-form/           ← Book CRUD form
│   ├── navbar/                ← Navigation bar
│   ├── prestamos/             ← User loans list
│   ├── reservas/              ← User reservations list
│   └── services/              ← HTTP services (books, users, loans, reservations)
├── .env.example               ← Environment variables template
├── package.json
└── angular.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Angular CLI](https://angular.dev/tools/cli) (v20+)
- [XAMPP](https://www.apachefriends.org/) or any MySQL server

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/SamuelOsp/BibliotecaOnline.git
cd BibliotecaOnline

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your MySQL credentials

# 4. Start MySQL from XAMPP and create the database
# Database name: biblioteca_online

# 5. Start the backend (in one terminal)
node backend/server.js

# 6. Start the frontend (in another terminal)
ng serve
```

| Service | URL |
|---------|-----|
| Frontend | `http://localhost:4200` |
| Backend API | `http://localhost:3000` |

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/libros` | List all books |
| `GET` | `/api/libros/:id` | Get a book by ID |
| `GET` | `/api/libros/buscar/:term` | Search books by title/author |
| `POST` | `/api/libros` | Create a book |
| `PUT` | `/api/libros/:id` | Update a book |
| `DELETE` | `/api/libros/:id` | Delete a book |
| `POST` | `/api/usuarios` | Register user |
| `POST` | `/api/usuarios/login` | Login |
| `POST` | `/api/prestamos` | Create loan |
| `PUT` | `/api/prestamos/devolver/:id` | Return loan |
| `GET` | `/api/prestamos/usuario/:id` | Loans by user |
| `POST` | `/api/reservas` | Create reservation |
| `PUT` | `/api/reservas/cancelar/:id` | Cancel reservation |
| `GET` | `/api/reservas/usuario/:id` | Reservations by user |

---

## 👨‍💻 Author

Developed as an academic project.

---

## 📄 License

This project is licensed under the ISC License.
