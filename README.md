# 🚀 TaskFlow

**Sistema Full Stack de Gestión de Equipos y Proyectos.**
TaskFlow es una aplicación web colaborativa que permite a los equipos organizar tareas, asignar roles y monitorear el progreso en tiempo real. Diseñado con una arquitectura moderna separando Backend y Frontend.

<img width="1379" height="75" alt="Captura de pantalla 2026-01-08 131708" src="https://github.com/user-attachments/assets/c12c92b8-f293-4ab7-b308-22a783154478" />

## 🛠 Tecnologías Utilizadas

### Backend (API REST)
* ☕ **Java 21** - Lógica de negocio robusta.
* 🍃 **Spring Boot 3** - Framework principal.
* 🔐 **Spring Security** - Encriptación de contraseñas y seguridad.
* 🗄️ **JPA / Hibernate** - Mapeo Objeto-Relacional (ORM).
* 🐬 **MySQL / PostgreSQL** - Base de Datos Relacional.
* 🐘 **Maven** - Gestión de dependencias.

### Frontend (SPA)
* ⚛️ **React + Vite** - Interfaz de usuario rápida y reactiva.
* 🎨 **CSS Modules & Bootstrap** - Diseño responsivo y profesional.
* 📡 **Axios** - Comunicación HTTP con el Backend.
* 🛣️ **React Router** - Navegación SPA (Single Page Application).

---

## ⚙️ Funcionalidades Clave

### 🔐 Seguridad y Accesos
* **Autenticación:** Sistema de Login y Registro seguro.
* **Roles:** Diferenciación entre **Líder** (Admin) y **Colaborador**.

### 🏢 Gestión de Espacios de Trabajo
* **Multi-equipo:** Un usuario puede pertenecer a varios equipos o crear los suyos propios.
* **Dashboard Interactivo:** Vista general de tareas pendientes y miembros del equipo.

### ✅ Gestión Inteligente de Tareas
* **CRUD Completo:** Crear, Leer, Editar y Eliminar tareas.
* **Permisos Jerárquicos:**
    * 👑 **Líder:** Puede editar y borrar cualquier tarea del equipo.
    * 👷 **Colaborador:** Solo puede marcar como "Completada" sus propias tareas.
* **Flujo Dinámico:** Las tareas completadas se filtran automáticamente de la vista principal para mantener el área de trabajo limpia.

---

## 📸 Capturas de Pantalla

| Login |
| <img width="1919" height="913" alt="Captura de pantalla 2026-01-08 131020" src="https://github.com/user-attachments/assets/f724bc7e-f811-49cb-8c9a-0fb760274790" /> 
| Creacion de Tareas |
|  <img width="531" height="578" alt="Captura de pantalla 2026-01-08 131215" src="https://github.com/user-attachments/assets/637bfaad-af0f-4a04-8ddd-b6326d0db4c8" />
|

---

## 🚀 Instalación y Despliegue Local

Sigue estos pasos para correr el proyecto en tu máquina:

### 1. Backend (Spring Boot)
```bash
# Clonar el repositorio
git clone [https://github.com/TU_USUARIO/TaskFlow.git](https://github.com/TU_USUARIO/TaskFlow.git)

# Navegar a la carpeta del backend
cd TaskFlow/backend

# Configurar base de datos en application.properties
# Ejecutar el proyecto
mvn spring-boot:run
