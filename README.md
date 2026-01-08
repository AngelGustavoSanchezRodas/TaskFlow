# 🚀 TaskFlow

**Sistema Full Stack de Gestión de Equipos y Proyectos.**
TaskFlow es una aplicación web colaborativa que permite a los equipos organizar tareas, asignar roles y monitorear el progreso en tiempo real. Diseñado con una arquitectura moderna separando Backend y Frontend.

![Banner o Screenshot Principal](assets/dashboard.png)
*(Reemplaza esta línea con una captura real de tu Dashboard)*

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
<img width="1910" height="912" alt="Captura de pantalla 2026-01-08 131249" src="https://github.com/user-attachments/assets/2d423751-3f23-42b0-be9c-6717cea18f27" />



| Login | Edición de Tareas |
|:---:|:---:|
| ![Login](assets/login.png) | ![Modal](assets/modal.png) |

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
