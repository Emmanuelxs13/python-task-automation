# Backend - SecureCheck

## Estructura

```
backend/
├── app/
│   ├── api/           # Endpoints REST
│   │   └── auth.py    # Autenticación
│   ├── core/          # Configuración
│   │   ├── config.py  # Settings
│   │   └── database.py # SQLAlchemy
│   ├── models/        # Modelos de BD
│   │   └── user.py    # Modelo User
│   ├── schemas/       # Validación Pydantic
│   │   ├── user.py
│   │   └── auth.py
│   └── security/      # Autenticación
│       ├── password.py # Hashing
│       ├── jwt.py      # Tokens
│       └── deps.py     # Dependencies
├── main.py            # FastAPI app
└── requirements.txt   # Dependencias
```

## Instalación

```bash
# Crear entorno virtual
python -m venv venv

# Activar (Windows)
venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Copiar .env
copy .env.example .env
```

## Ejecutar

```bash
# Desarrollo
python main.py

# O con uvicorn
uvicorn main:app --reload
```

## Endpoints Disponibles

### Autenticación

**POST** `/api/v1/auth/register` - Registrar usuario  
**POST** `/api/v1/auth/login` - Iniciar sesión  
**GET** `/api/v1/auth/me` - Obtener usuario actual (requiere auth)

### Documentación

**GET** `/docs` - Swagger UI  
**GET** `/redoc` - ReDoc  
**GET** `/health` - Health check

## Base de Datos

SQLite en desarrollo (archivo `securecheck.db` se crea automáticamente).

## Tests

```bash
pytest tests/ -v
```

