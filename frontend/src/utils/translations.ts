export const translations = {
  es: {
    // Landing Page
    landing: {
      title: "Escaneo de Seguridad",
      subtitle: "de Nivel Empresarial",
      description:
        "Identifica vulnerabilidades antes de que se conviertan en brechas. SecureCheck proporciona análisis de seguridad integral para tus aplicaciones web en tiempo real.",
      cta: {
        startTrial: "Comenzar Prueba Gratuita",
        viewDemo: "Ver Demostración",
      },
      stats: {
        scansCompleted: "Escaneos Completados",
        accuracyRate: "Tasa de Precisión",
        avgScanTime: "Tiempo Promedio de Escaneo",
      },
      features: {
        title: "Análisis de Seguridad Integral",
        subtitle: "Todo lo que necesitas para asegurar tus aplicaciones web",
        ssl: {
          title: "Análisis SSL/TLS",
          description:
            "Verifica protocolos de encriptación y validez de certificados",
        },
        headers: {
          title: "Inspección de Encabezados",
          description: "Analiza encabezados de seguridad y mejores prácticas",
        },
        reports: {
          title: "Reportes en Tiempo Real",
          description: "Detección instantánea y reportes de vulnerabilidades",
        },
        compliance: {
          title: "Listo para Cumplimiento",
          description: "Cumple con estándares y regulaciones de la industria",
        },
      },
      cta2: {
        title: "¿Listo para Asegurar tus Aplicaciones?",
        subtitle:
          "Únete a cientos de empresas que confían en SecureCheck para sus necesidades de seguridad",
        button: "Comienza tu Prueba Gratuita",
      },
    },

    // Auth
    auth: {
      login: {
        title: "Bienvenido de Nuevo",
        subtitle: "Inicia sesión en tu cuenta de SecureCheck",
        email: "Correo Electrónico",
        password: "Contraseña",
        submit: "Iniciar Sesión",
        submitting: "Iniciando sesión...",
        noAccount: "¿No tienes una cuenta?",
        createOne: "Créala ahora",
        backHome: "Volver al inicio",
        success: "¡Bienvenido de nuevo! 🎉",
        error: "Credenciales inválidas",
      },
      register: {
        title: "Crear Cuenta",
        subtitle: "Comienza a asegurar tus aplicaciones hoy",
        fullName: "Nombre Completo",
        email: "Correo Electrónico",
        password: "Contraseña",
        passwordHint: "Mínimo 6 caracteres",
        submit: "Crear Cuenta",
        submitting: "Creando cuenta...",
        haveAccount: "¿Ya tienes una cuenta?",
        signIn: "Iniciar sesión",
        backHome: "Volver al inicio",
        success: "¡Cuenta creada exitosamente! 🎉",
        error: "Error al registrar",
      },
      logout: "Cerrar Sesión",
      logoutSuccess: "Sesión cerrada exitosamente",
    },

    // Dashboard
    dashboard: {
      title: "Panel de Seguridad",
      subtitle: "Monitorea y gestiona tus escaneos de seguridad",
      logout: "¡Sesión cerrada exitosamente!",
      logoutButton: "Cerrar Sesión",
      nav: {
        dashboard: "Panel",
        documentation: "Documentación",
      },
      stats: {
        totalScans: "Total de Escaneos",
        completed: "Completados",
        inProgress: "En Progreso",
        failed: "Fallidos",
      },
      actions: {
        searchPlaceholder: "Buscar por URL...",
        allStatus: "Todos los Estados",
        newScan: "Nuevo Escaneo",
      },
      table: {
        targetUrl: "URL Objetivo",
        scanType: "Tipo de Escaneo",
        status: "Estado",
        vulnerabilities: "Vulnerabilidades",
        created: "Creado",
      },
      status: {
        completed: "Completado",
        pending: "Pendiente",
        running: "Ejecutando",
        failed: "Fallido",
      },
      empty: {
        title: "No se encontraron escaneos",
        subtitle: "Comienza creando tu primer escaneo de seguridad",
        button: "Crear Primer Escaneo",
      },
    },

    // Documentation
    docs: {
      title: "Documentación y Centro de Ayuda",
      subtitle: "Todo lo que necesitas para dominar SecureCheck",
      search: "Buscar en la documentación...",
      quickLinks: {
        quickStart: {
          title: "Inicio Rápido",
          description: "Ponte en marcha en 5 minutos",
        },
        apiReference: {
          title: "Referencia API",
          description: "Documentación completa de la API",
        },
        videoTutorials: {
          title: "Tutoriales en Video",
          description: "Aprende viendo",
        },
        support: {
          title: "Obtener Soporte",
          description: "Contacta a nuestro equipo",
        },
      },
      sections: {
        gettingStarted: {
          title: "Comenzando",
          quickStart: "Guía de Inicio Rápido",
          firstScan: "Creando tu Primer Escaneo",
          understanding: "Entendiendo los Resultados",
        },
        api: {
          title: "Referencia API",
          auth: "Autenticación",
          scans: "Endpoints de Escaneo",
          reports: "Reportes y Análisis",
        },
        config: {
          title: "Configuración",
          scanTypes: "Tipos de Escaneo",
          webhooks: "Webhooks",
          integration: "Integración",
        },
        bestPractices: {
          title: "Mejores Prácticas",
          security: "Guías de Seguridad",
          performance: "Consejos de Rendimiento",
          compliance: "Cumplimiento",
        },
      },
      quickStartGuide: {
        title: "🚀 Guía de Inicio Rápido",
        step1: {
          title: "Paso 1: Crea tu Cuenta",
          description:
            "Regístrate con tu correo corporativo y verifica tu cuenta.",
        },
        step2: {
          title: "Paso 2: Ejecuta tu Primer Escaneo",
          description:
            "Navega a Panel → Nuevo Escaneo. Ingresa tu URL objetivo y selecciona el tipo de escaneo:",
          types: {
            basic: "Verificación rápida de seguridad (30 segundos)",
            headers: "Análisis de encabezados de seguridad (45 segundos)",
            ssl: "Verificación de certificados y encriptación (1 minuto)",
            full: "Auditoría de seguridad integral (2-3 minutos)",
          },
        },
        step3: {
          title: "Paso 3: Analiza los Resultados",
          description:
            "Revisa las vulnerabilidades categorizadas por severidad:",
        },
        step4: {
          title: "Paso 4: Exporta Reportes",
          description:
            "Descarga resultados en formato JSON o CSV para compartir con tu equipo y cumplimiento.",
        },
      },
      apiExample: {
        title: "Ejemplo de Integración API",
      },
      support: {
        title: "¿Necesitas Ayuda?",
        subtitle: "Nuestro equipo de soporte empresarial está disponible 24/7",
        email: "Correo",
        liveChat: "Chat en Vivo",
        available: "Disponible 24/7",
        phone: "Teléfono",
      },
    },

    // Settings
    settings: {
      title: "Configuración",
      appearance: {
        title: "Apariencia",
        theme: "Tema",
        light: "Claro",
        dark: "Oscuro",
        system: "Sistema",
      },
      language: {
        title: "Idioma",
        spanish: "Español",
        english: "English",
      },
    },

    // Common
    common: {
      search: "Buscar",
      filter: "Filtrar",
      loading: "Cargando...",
      save: "Guardar",
      cancel: "Cancelar",
      delete: "Eliminar",
      edit: "Editar",
      close: "Cerrar",
      back: "Volver",
      next: "Siguiente",
      previous: "Anterior",
      settings: "Configuración",
    },
  },

  en: {
    // English translations (already have them in the original code)
    landing: {
      title: "Enterprise-Grade",
      subtitle: "Security Scanning",
      // ... etc
    },
    // ... rest of English translations
  },
};
