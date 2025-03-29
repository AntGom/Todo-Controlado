# ¡TODO CONTROLADO! - Organizador Personal

[![HTML5](https://img.shields.io/badge/HTML5-blue)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-purple)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)](https://developer.mozilla.org/es/docs/Web/JavaScript)

Una aplicación web moderna para la organización personal que permite gestionar tareas, eventos, consultar el clima y leer noticias deportivas y generalistas, todo en un único lugar.

## 🚀 Características

- **Gestión de tareas**: Crea, edita y elimina tareas con diferentes estados (pendiente, en progreso, completada)
- **Gestión de eventos**: Organiza tus eventos con detalles como ubicación y fecha
- **Calendario mensual**: Visualiza tus tareas y eventos para tener una perspectiva clara de tu agenda
- **Información meteorológica**: Consulta el clima de cualquier ciudad directamente desde la cabecera
- **Lector de noticias**: Mantente informado con noticias de diferentes fuentes (El País, El Mundo, Fórmula 1, MotoGP)
- **Interfaz adaptable**: Diseño que se ajusta a cualquier dispositivo, desde móviles hasta pantallas de escritorio
- **Almacenamiento local**: Tus datos se guardan en tu navegador gracias a localStorage

## 🛠️ Tecnologías utilizadas

- **HTML5**: Estructura semántica con etiquetas modernas
- **CSS3**: Sistema de estilos personalizado con variables CSS
- **JavaScript (ES6+)**: Programación modular orientada a objetos
- **LocalStorage API**: Para la persistencia de datos en el navegador
- **Fetch API**: Consumo de servicios externos (clima y noticias)
- **Font Awesome**: Iconografía vectorial

## 📁 Estructura del proyecto

```
/
├── app.js                # Punto de entrada principal
├── index.html            # Estructura HTML
│
├── css/                  # Estilos de la aplicación
│   ├── base.css          # Estilos básicos, variables y layout
│   ├── components.css    # Estilos para componentes como tareas y modales
│   └── calendar.css      # Estilos específicos del calendario
│
├── core/                 # Lógica central de la aplicación
│   ├── data.js           # Gestión de datos y almacenamiento
│   ├── tasks.js          # Operaciones CRUD para tareas
│   └── events.js         # Operaciones CRUD para eventos
│
├── services/             # Servicios externos
│   └── apiService.js     # Conexión con APIs (clima, noticias)
│
├── ui/                   # Componentes de interfaz de usuario
│   ├── core.js           # Funciones básicas de UI y gestión de pestañas
│   ├── tasks.js          # UI para gestión de tareas
│   ├── events.js         # UI para gestión de eventos
│   └── calendar.js       # Funcionalidad del calendario
│
└── img/                  # Imágenes e iconos
    ├── agenda.png        # Favicon
    └── noticias.png      # Iconos para secciones
```

## 🧩 Arquitectura

La aplicación está estructurada siguiendo un patrón modular por responsabilidades:

### 1. Capa de datos (core/)
- **data.js**: Define las estructuras de datos principales y gestiona localStorage
- **tasks.js**: Implementa operaciones CRUD para tareas
- **events.js**: Implementa operaciones CRUD para eventos

### 2. Capa de servicios (services/)
- **apiService.js**: Proporciona funciones para obtener datos meteorológicos y noticias

### 3. Capa de UI (ui/)
- **core.js**: Inicializa elementos DOM y controla la navegación entre pestañas
- **tasks.js**: Renderiza y gestiona interacciones con tareas
- **events.js**: Renderiza y gestiona interacciones con eventos
- **calendar.js**: Implementa el calendario mensual

### 4. Punto de entrada (app.js)
Inicializa la aplicación y conecta todas las capas.



## 📋 Funcionalidades detalladas

### Panel del Clima
- Visualización en tiempo real del clima para cualquier ciudad
- Búsqueda intuitiva con actualización instantánea
- Muestra temperatura y condición meteorológica
- El resultado se muestra directamente en el campo de búsqueda

### Gestión de tareas
- Crear nuevas tareas con título, descripción, fecha límite y estado
- Filtrar tareas por estado (todas, pendientes, en progreso, completadas)
- Editar y eliminar tareas existentes
- Filtros accesibles solo desde la pestaña de tareas

### Gestión de eventos
- Crear eventos con título, detalles, fecha/hora y ubicación
- Ver lista de eventos ordenados cronológicamente
- Editar y eliminar eventos existentes

### Calendario
- Vista mensual con indicadores visuales de tareas y eventos
- Navegación intuitiva entre meses
- Modal detallado al hacer clic en un día específico
- Creación rápida de tareas y eventos desde la vista de calendario

### Noticias
- Acceso a múltiples fuentes de noticias (El País, El Mundo, deportivas)
- Selección rápida entre fuentes
- Visualización de titulares y resúmenes
- Enlaces directos a las noticias completas

## 🔄 Flujo de datos

1. Al iniciar, la aplicación carga datos desde localStorage
2. Las acciones del usuario se capturan en la capa UI
3. Estas acciones se procesan en la capa de datos
4. Los cambios se guardan automáticamente en localStorage
5. La UI se actualiza para reflejar los cambios

## 📱 Responsive Design

La aplicación se adapta a diferentes tamaños de pantalla:
- **Escritorio**: Vista completa con sidebar de noticias a la derecha
- **Tablet**: Reorganización de elementos para aprovechar el espacio
- **Móvil**: 
  - Interfaz compacta con elementos apilados
  - Botones de acción en línea cuando no se muestra el filtro de tareas
  - Diseño optimizado para interacción táctil

## 🌐 APIs utilizadas

- **Clima**: API de wttr.in para obtener información meteorológica en formato compacto
- **Noticias**: APIs RSS de El País, El Mundo, y contenido deportivo de Marca (convertidas a JSON mediante api.rss2json.com)

## 🔗 Enlaces útiles

- [Servicio wttr.in](https://github.com/chubin/wttr.in)

---

Desarrollado por Antonio Gómez © 2025. Desde Andalucía, con ❤.