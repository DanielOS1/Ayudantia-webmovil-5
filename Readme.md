# Proyecto Full Stack: Autenticación y Perfil de Usuario

Este proyecto es una aplicación full stack con **backend en NestJS** y **frontend en React + Chakra UI + Zustand**, que permite a un usuario iniciar sesión y ver su perfil autenticado.

---

## 🚀 Backend (NestJS + PostgreSQL)

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del backend con el siguiente contenido:

```env
APP_PORT=3000
DATABASE_TYPE="postgres"
DATABASE_HOST="localhost"
DATABASE_PORT="5432"
DATABASE_USERNAME="postgres"
DATABASE_PASSWORD="pass"
DATABASE_NAME="dbpostgres"
JWT_SECRET="QJ0g6Jv4dJ2Ek5VBlG0jMCQpcsuBUc4XGLsMBTYoT1IR3VmsOi"
JWT_ALG="HS256"
JWT_EXP="1d"

SECRET_SALT="N2z3W6K3xxD0FqQblFAJBsNVHSpl4HQfZESG14lH7HUoaGPp61"
SALT_ROUNDS="10"
```

Asegúrate de que las variables coincidan con tu entorno de base de datos.

---

### 2. Base de Datos con Docker

Ejecuta el siguiente comando para levantar PostgreSQL usando Docker Compose:

```bash
docker-compose up -d
```

Esto levantará la base de datos PostgreSQL con los credenciales necesarios. Asegúrate de tener Docker instalado.

---

### 3. Instalación de dependencias

Desde el directorio del backend:

```bash
npm install
```

---

### 4. Ejecución del backend

```bash
npm run start:dev
```

---

### 5. Registro de Usuario con Thunder Client o Postman

#### Endpoint:

```
POST http://localhost:3000/auth/register
```

#### Cuerpo (Body JSON):

```json
{
  "name": "Felipe",
  "rut": "12345679-9",
  "password": "123456"
}
```

Esto registrará al usuario y podrás luego iniciar sesión con esos datos.

---

## 📄 Frontend (React + Chakra UI + Zustand)

### 1. Instalación de dependencias

```bash
npm install
```

Esto instalará todas las dependencias necesarias, incluyendo:

* Vite (React + TS)
* Chakra UI
* Zustand (manejo de estado)
* Axios (cliente HTTP)

---

### 2. Ejecución del frontend

```bash
npm run dev
```

Esto iniciará la aplicación en `http://localhost:5173` (o el puerto indicado por Vite).

---

### 3. Flujo del usuario

1. Inicia sesión con el rut y contraseña registrados.
2. Al autenticarse correctamente, el usuario es redirigido a la vista `/profile`.
3. La sesión se mantiene en memoria (Zustand) mientras el navegador esté abierto.
4. Puedes cerrar sesión desde el botón correspondiente.

---

## 🛠️ Extras y configuraciones

* Se utiliza `Zustand` para manejo de estado global y compatible con Redux DevTools.
* Los `toast` de Chakra UI se usan para notificaciones en login y errores.
* Axios está configurado con un cliente personalizado (`axiosClient.ts`) que incluye el `baseURL`.

---

## 📈 Estado actual

* [x] Registro de usuario
* [x] Inicio de sesión con token JWT
* [x] Visualización de perfil
* [x] Logout
* [x] Notificaciones toast
* [x] Almacenamiento de token y perfil con Zustand

---

Para dudas técnicas o mejoras, puedes revisar la estructura de carpetas en el backend (`auth`, `users`, `profile`) y en el frontend (`views`, `stores`, `api`).
