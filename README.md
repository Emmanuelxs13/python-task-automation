# 🔒 SecureCheck

> **Plataforma web profesional para análisis de seguridad básica de sistemas**

SecureCheck es una solución SaaS diseñada para pequeñas empresas, freelancers y startups que necesitan evaluar la seguridad de sus sistemas de forma clara, rápida y accionable, sin requerir conocimientos técnicos avanzados.

---

## 🎯 Problema que Resuelve

La ciberseguridad puede ser intimidante y costosa para negocios pequeños. SecureCheck democratiza el acceso a análisis de seguridad básicos, proporcionando:

- **Escaneos automáticos** de configuraciones inseguras comunes
- **Reportes entendibles** sin jerga técnica
- **Recomendaciones accionables** priorizadas por riesgo
- **Historial de mejoras** para seguimiento continuo

## 👥 Público Objetivo

- Pequeñas empresas sin equipo de IT
- Freelancers que gestionan sus propios servicios
- Startups en etapa temprana
- Consultores que necesitan herramientas rápidas de auditoría

---

## 🚀 Funcionalidades (MVP)

✅ **Autenticación segura** (JWT)  
✅ **Dashboard intuitivo** estilo SaaS moderno  
✅ **Escaneo de seguridad básico:**

- Validación de HTTPS
- Análisis de headers HTTP
- Detección de puertos abiertos comunes
- Identificación de configuraciones inseguras frecuentes

✅ **Reportes accionables:**

- Resumen ejecutivo
- Clasificación de riesgos (Bajo / Medio / Alto)
- Recomendaciones claras paso a paso

✅ **Historial de escaneos** por usuario

---

## 🛠️ Stack Tecnológico

### Backend

- **Python 3.11+**
- **FastAPI** - Framework web moderno y rápido
- **SQLAlchemy** - ORM para gestión de base de datos
- **PostgreSQL** (producción) / **SQLite** (desarrollo)
- **JWT** - Autenticación segura
- **Pydantic** - Validación de datos
- **python-dotenv** - Gestión de variables de entorno

### Frontend

- **React 18+** - UI moderna con hooks
- **JavaScript/JSX** - Componentes funcionales
- **React Router** - Navegación SPA
- **Axios** - Cliente HTTP
- **CSS Modules / Styled Components** - Estilos modernos
- **Vite** - Build tool rápido

### Infraestructura

- **Docker** (futuro)
- **GitHub Actions** (CI/CD futuro)

---

## 📂 Arquitectura del Proyecto

```
securecheck/
│
├── backend/
│   ├── app/
│   │   ├── api/          # Endpoints REST
│   │   ├── core/         # Configuración y utilidades
│   │   ├── models/       # Modelos SQLAlchemy
│   │   ├── schemas/      # Validación Pydantic
│   │   ├── services/     # Lógica de negocio
│   │   └── security/     # Autenticación y autorización
│   ├── main.py           # Punto de entrada FastAPI
│   └── requirements.txt  # Dependencias Python
│
├── frontend/
│   ├── src/
│   │   ├── components/   # Componentes reutilizables
│   │   ├── pages/        # Páginas principales
│   │   ├── services/     # API client
│   │   ├── hooks/        # Custom hooks
│   │   ├── context/      # Estado global
│   │   ├── assets/       # Imágenes, iconos
│   │   └── styles/       # CSS global
│   ├── App.jsx
│   ├── main.jsx
│   └── package.json
│
├── docs/                 # Documentación técnica
├── .env.example          # Variables de entorno ejemplo
├── .gitignore
└── README.md
```

---

## 🔄 Flujo de Usuario

1. **Registro/Login** → Acceso seguro a la plataforma
2. **Dashboard** → Vista general de escaneos anteriores
3. **Nuevo Escaneo** → Ingresar URL/dominio a analizar
4. **Procesamiento** → Análisis automático en segundo plano
5. **Reporte Visual** → Resultados claros con nivel de riesgo
6. **Acciones Recomendadas** → Pasos específicos para mejorar
7. **Historial** → Seguimiento de mejoras en el tiempo

---

## 💻 Cómo Ejecutar Localmente

### Requisitos Previos

- Python 3.11+
- Node.js 18+
- npm o yarn
- PostgreSQL (opcional, usa SQLite por defecto)

### Backend

```bash
# Navegar al directorio backend
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno (Windows)
venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
copy .env.example .env
# Editar .env con tus valores

# Ejecutar servidor de desarrollo
uvicorn main:app --reload
```

El backend estará disponible en: `http://localhost:8000`  
Documentación API: `http://localhost:8000/docs`

### Frontend

```bash
# Navegar al directorio frontend
cd frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
copy .env.example .env
# Editar .env con la URL del backend

# Ejecutar servidor de desarrollo
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

---

## 🗺️ Roadmap Futuro

### Versión 1.1

- [ ] Exportar reportes en PDF
- [ ] Escaneos programados automáticos
- [ ] Notificaciones por email

### Versión 2.0

- [ ] Sistema de pagos (planes Premium)
- [ ] Escaneos más profundos (vulnerabilidades conocidas)
- [ ] Integración con AWS/Azure

### Versión 3.0

- [ ] API pública para integraciones
- [ ] Escaneo de código estático
- [ ] Generación de certificados de cumplimiento

---

## 🔐 Principios de Desarrollo

- ✅ **SOLID principles** aplicados en todo el código
- ✅ **Separación de responsabilidades** clara
- ✅ **Validación de datos** en backend y frontend
- ✅ **Manejo robusto de errores**
- ✅ **UX sobre complejidad técnica**
- ✅ **Código documentado y mantenible**
- ✅ **Seguridad desde el diseño**

---

## 📚 Documentación Técnica

- [Arquitectura Backend](./docs/backend-architecture.md)
- [Guía de API](./docs/api-guide.md)
- [Componentes Frontend](./docs/frontend-components.md)
- [Guía de Contribución](./docs/contributing.md)

---

## 👤 Autor

**Emmanuel** - Full Stack Developer  
Python | React | FastAPI | Ciberseguridad

🔗 [GitHub](https://github.com/Emmanuelxs13)  
💼 [LinkedIn](#)  
📧 [Email](#)

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

**⚡ Built with passion to solve real-world problems**
# Python Task Automation

Automatizador de tareas administrativas desarrollado en Python.
Permite procesar archivos CSV/Excel y generar reportes automáticos,
ahorrando tiempo en tareas repetitivas.

## Features
- Lectura de archivos CSV y Excel
- Limpieza y procesamiento de datos
- Generación automática de reportes
- Estructura modular y extensible

## Tech Stack
- Python 3
- pandas
- openpyxl

## Project Structure
(pones el árbol del proyecto)

## How to Run
1. Clone the repository
2. Create virtual environment
3. Install dependencies
4. Run main.py

## Use Cases
- Negocios pequeños
- Freelancers
- Reportes administrativos
- Automatización básica

## Author
Emmanuel Berrio — FullStack Developer
