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
<img width="1919" height="913" alt="Captura de pantalla 2026-01-08 131020" src="https://github.com/user-attachments/assets/0bae426f-edb9-4540-aab2-d47fcc95861d" />
<img width="1882" height="893" alt="Captura de pantalla 2026-01-08 131037" src="https://github.com/user-attachments/assets/1b8e7ec7-8bdd-4051-a98c-8730877d25ea" />
<img width="1906" height="913" alt="Captura de pantalla 2026-01-08 131109" src="https://github.com/user-attachments/assets/c175fb9d-ea63-4c67-af77-2058257bfbf4" />
<img width="1905" height="907" alt="Captura de pantalla 2026-01-08 131122" src="https://github.com/user-attachments/assets/b32ff907-b074-4468-811b-94f649c284c2" />
<img width="1908" height="908" alt="Captura de pantalla 2026-01-08 131205" src="https://github.com/user-attachments/assets/579e9869-bf1d-474e-9de4-a0f08dc879c1" />
<img width="531" height="578" alt="Captura de pantalla 2026-01-08 131215" src="https://github.com/user-attachments/assets/e53bf1ac-494b-4f71-afcf-4e65cdd0bb00" />
<img width="1910" height="912" alt="Captura de pantalla 2026-01-08 131249" src="https://github.com/user-attachments/assets/f9bb49aa-d56d-47ea-865d-60705c1bd85b" />

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
