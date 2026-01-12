# 🚀 TaskFlow

![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.0-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

**Sistema Full Stack de Gestión de Equipos y Proyectos.**

TaskFlow es una aplicación web colaborativa que permite a los equipos organizar tareas, asignar roles y monitorear el progreso en tiempo real. Diseñado con una arquitectura moderna separando Backend y Frontend, enfocado en la escalabilidad y la experiencia de usuario.

### 🔗 [Ver Demo en Vivo (Deploy)](https://TU_LINK_DE_RENDER_AQUI)

---

## 🛠 Tecnologías Utilizadas

### Backend (API REST)
* ☕ **Java 21** - Lógica de negocio robusta y moderna.
* 🍃 **Spring Boot 3** - Framework principal.
* 🔐 **Spring Security (JWT)** - Autenticación y protección de rutas.
* 🗄️ **JPA / Hibernate** - Mapeo Objeto-Relacional (ORM).
* 🐘 **PostgreSQL (NeonDB)** - Base de Datos en la nube.
* 📦 **Maven** - Gestión de dependencias.

### Frontend (SPA)
* ⚛️ **React + Vite** - Interfaz de usuario ultrarrápida.
* 🎨 **CSS Modules & Bootstrap** - Diseño responsivo y limpio.
* 📡 **Axios** - Comunicación HTTP optimizada.
* 🔔 **SweetAlert2** - Notificaciones y modales interactivos.
* 🛣️ **React Router** - Navegación fluida SPA.

---

## ⚙️ Funcionalidades Clave

### 🔐 Seguridad y Usuarios
* **Autenticación Robusta:** Login y Registro validados.
* **Gestión de Perfil:** El usuario puede editar sus datos personales (Nombre, Correo).
* **Roles:** Diferenciación clara entre **Líder** y **Colaborador**.

### 🏢 Gestión de Espacios de Trabajo
* **Multi-equipo:** Creación ilimitada de equipos.
* **Unirse/Salir:** Los usuarios pueden unirse a equipos mediante ID o abandonarlos cuando deseen.
* **Dashboard Interactivo:** Vista general de tareas y miembros en tiempo real.

### ✅ Gestión Inteligente de Tareas
* **CRUD Completo:** Crear, Leer, Editar y Eliminar tareas.
* **Permisos Jerárquicos:**
    * 👑 **Líder:** Control total sobre las tareas y el equipo.
    * 👷 **Colaborador:** Gestión de estado de sus propias tareas.
* **Feedback Visual:** Alertas modernas para confirmaciones destructivas (eliminar, salir).

---

## 📸 Capturas de Pantalla

| Panel Principal (Dashboard) | Gestión de Tareas |
|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/c12c92b8-f293-4ab7-b308-22a783154478" width="400" /> | <img src="https://github.com/user-attachments/assets/f724bc7e-f811-49cb-8c9a-0fb760274790" width="400" /> |

| Creación de Equipos | 
|:---:|
| <img src="https://github.com/user-attachments/assets/637bfaad-af0f-4a04-8ddd-b6326d0db4c8" width="400" /> |

---

## 🚀 Instalación y Despliegue Local

Sigue estos pasos para correr el proyecto en tu máquina:

### 1. Clonar el repositorio
```bash
git clone [https://github.com/AngelGustavoSanchezRodas/TaskFlow.git](https://github.com/AngelGustavoSanchezRodas/TaskFlow.git)
cd TaskFlow

cd backend
# Asegúrate de configurar tu application.properties con tu BD local
mvn spring-boot:run

cd frontend
npm install
npm run dev

