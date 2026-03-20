# 📚 Sistema de Biblioteca Online

Aplicación web full-stack para la gestión integral de una biblioteca — permite administrar libros, usuarios, préstamos y reservas con autenticación basada en JWT.

> **Problema que resuelve:** Digitaliza el flujo operativo de una biblioteca, reemplazando registros manuales con un sistema web donde los usuarios pueden buscar libros, solicitar préstamos/reservas y los administradores pueden gestionar todo el catálogo.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| **Frontend** | Angular 20 (standalone components) |
| **UI** | Angular Material · Bootstrap 5 |
| **Backend** | Node.js + Express 5 |
| **Base de datos** | MySQL |
| **Autenticación** | JWT (JSON Web Tokens) |
| **Lenguajes** | TypeScript (frontend) · JavaScript (backend) |

---

## ✨ Funcionalidades

- 🔐 **Autenticación JWT** — Registro e inicio de sesión con tokens
- 📖 **CRUD de Libros** — Crear, leer, actualizar y eliminar libros del catálogo
- 🔍 **Búsqueda** — Buscar libros por título o autor
- 📋 **Préstamos** — Solicitar préstamos, registrar devoluciones
- 📌 **Reservas** — Reservar libros con límite de 5 reservas activas por usuario
- 👤 **Perfil de usuario** — Vista del perfil con historial
- 🛡️ **Rutas protegidas** — Angular Guards para protección de rutas
- 🔄 **Interceptor HTTP** — Envío automático del token JWT en cada petición

---

## 📁 Estructura del Proyecto

```
BibliotecaOnline/
├── backend/
│   ├── server.js              ← Servidor Express (puerto 3000)
│   ├── db.js                  ← Conexión a MySQL (con dotenv)
│   └── routes/
│       ├── libros.js          ← CRUD de libros
│       ├── usuarios.js        ← Registro y login
│       ├── prestamos.js       ← Gestión de préstamos
│       └── reservas.js        ← Gestión de reservas
├── src/app/
│   ├── auth/login/            ← Componente de login
│   ├── components/
│   │   ├── perfil/            ← Perfil de usuario
│   │   └── register/          ← Registro de usuario
│   ├── guards/                ← Auth guard de rutas
│   ├── Interceptors/          ← JWT interceptor
│   ├── libros/                ← Búsqueda de libros
│   ├── libros-list/           ← Listado de libros
│   ├── libros-detail/         ← Detalle de libro
│   ├── libros-form/           ← Formulario CRUD de libros
│   ├── navbar/                ← Barra de navegación
│   ├── prestamos/             ← Lista de préstamos del usuario
│   ├── reservas/              ← Lista de reservas del usuario
│   └── services/              ← Servicios HTTP (libros, usuarios, préstamos, reservas)
├── .env.example               ← Plantilla de variables de entorno
├── package.json
└── angular.json
```

---

## 🚀 Instalación y Ejecución Local

### Requisitos previos

- [Node.js](https://nodejs.org/) (v18+)
- [Angular CLI](https://angular.dev/tools/cli) (v20+)
- [XAMPP](https://www.apachefriends.org/) u otro servidor MySQL

### Pasos

```bash
# 1. Clona el repositorio
git clone https://github.com/SamuelOsp/BibliotecaOnline.git
cd BibliotecaOnline

# 2. Instala las dependencias
npm install

# 3. Configura las variables de entorno
cp .env.example .env
# Edita .env con tus credenciales de MySQL

# 4. Inicia MySQL desde XAMPP y crea la base de datos
# Nombre: biblioteca_online

# 5. Inicia el backend (en una terminal)
node backend/server.js

# 6. Inicia el frontend (en otra terminal)
ng serve
```

| Servicio | URL |
|----------|-----|
| Frontend | `http://localhost:4200` |
| Backend API | `http://localhost:3000` |

---

## 📡 Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/libros` | Listar todos los libros |
| `GET` | `/api/libros/:id` | Obtener un libro por ID |
| `GET` | `/api/libros/buscar/:termino` | Buscar libros por título/autor |
| `POST` | `/api/libros` | Crear un libro |
| `PUT` | `/api/libros/:id` | Actualizar un libro |
| `DELETE` | `/api/libros/:id` | Eliminar un libro |
| `POST` | `/api/usuarios` | Registrar usuario |
| `POST` | `/api/usuarios/login` | Iniciar sesión |
| `POST` | `/api/prestamos` | Crear préstamo |
| `PUT` | `/api/prestamos/devolver/:id` | Devolver préstamo |
| `GET` | `/api/prestamos/usuario/:id` | Préstamos por usuario |
| `POST` | `/api/reservas` | Crear reserva |
| `PUT` | `/api/reservas/cancelar/:id` | Cancelar reserva |
| `GET` | `/api/reservas/usuario/:id` | Reservas por usuario |

---

## 👨‍💻 Autor

Desarrollado como proyecto académico — **Análisis de Datos II, Semestre 6**.

---

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.
