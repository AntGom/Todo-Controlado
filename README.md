# ¡¡ORGANÍZATE!! - Gestor de Tareas y Eventos

Una aplicación web para la organización personal que permite gestionar tareas, eventos, consultar el clima y leer noticias, todo en un solo lugar.

## 🚀 Características

- **Gestión de tareas**: Crea, edita y elimina tareas con diferentes estados (pendiente, en progreso, completada)
- **Gestión de eventos**: Organiza tus eventos con detalles como ubicación y fecha
- **Calendario interactivo**: Visualiza tus tareas y eventos en formato de mes o semana
- **Información meteorológica**: Consulta el clima de cualquier ciudad
- **Lector de noticias**: Lee las últimas noticias de fuentes como El País, El Mundo y ABC
- **Almacenamiento local**: Tus datos se guardan en el navegador gracias a localStorage
- **Diseño responsive**: Adaptado a dispositivos móviles y de escritorio

## 🛠️ Tecnologías utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos personalizados con variables CSS
- **JavaScript (ES6+)**: Programación orientada a objetos
- **LocalStorage API**: Persistencia de datos en el navegador
- **Fetch API**: Consumo de servicios externos (clima y noticias)
- **Font Awesome**: Iconos vectoriales

## 📁 Estructura del proyecto

```
/
├── app.js                # Punto de entrada principal
├── index.html            # Estructura HTML
│
├── css/                  # Estilos de la aplicación
│   ├── base.css          # Estilos básicos y layout
│   ├── components.css    # Componentes reutilizables
│   └── calendar.css      # Estilos específicos del calendario
│
├── core/                 # Lógica central y manejo de datos
│   ├── data.js           # Gestión de datos y almacenamiento
│   ├── tasks.js          # Operaciones CRUD para tareas
│   └── events.js         # Operaciones CRUD para eventos
│
├── services/             # Servicios externos
│   └── apiService.js     # Conexión con APIs (clima, noticias)
│
└── ui/                   # Componentes de interfaz de usuario
    ├── core.js           # Funciones básicas de UI
    ├── tasks.js          # UI de tareas
    ├── events.js         # UI de eventos
    └── calendar.js       # Funcionalidad del calendario
```

## 🧩 Arquitectura

La aplicación está estructurada siguiendo un patrón de arquitectura por responsabilidades:

### 1. Capa de datos (core/)
Gestiona el almacenamiento, recuperación y manipulación de los datos:
- **data.js**: Define las estructuras de datos principales y las funciones para guardar/cargar datos de localStorage
- **tasks.js**: Implementa operaciones CRUD específicas para tareas
- **events.js**: Implementa operaciones CRUD específicas para eventos

### 2. Capa de servicios (services/)
Encapsula la comunicación con servicios externos:
- **apiService.js**: Proporciona funciones para obtener datos meteorológicos y noticias

### 3. Capa de UI (ui/)
Contiene todos los componentes visuales y la lógica de interacción:
- **core.js**: Inicializa elementos DOM, controla pestañas y componentes comunes
- **tasks.js**: Renderiza y gestiona interacciones con tareas
- **events.js**: Renderiza y gestiona interacciones con eventos
- **calendar.js**: Implementa el calendario con vistas de mes y semana

### 4. Punto de entrada (app.js)
Inicializa la aplicación y conecta todas las capas.


## 📋 Funcionalidades detalladas

### Gestión de tareas
- Crear nuevas tareas con título, descripción, fecha límite y estado
- Filtrar tareas por estado (todas, pendientes, en progreso, completadas)
- Editar y eliminar tareas existentes

### Gestión de eventos
- Crear eventos con título, detalles, fecha/hora y ubicación
- Ver lista de eventos ordenados por fecha
- Editar y eliminar eventos

### Calendario
- Vista mensual con días del mes actual y parciales del anterior/siguiente
- Vista semanal con eventos y tareas por día
- Modal de detalles al hacer clic en un día específico
- Navegación entre meses/semanas con botones de anterior/siguiente

### Clima
- Visualización del clima para una ciudad predeterminada (Sevilla por defecto)
- Búsqueda de clima para cualquier ciudad
- Muestra temperatura y condición meteorológica

### Noticias
- Selector de fuentes de noticias (El País, El Mundo, Marca Motor)
- Visualización de los titulares más recientes
- Enlaces para leer las noticias completas

## 🔄 Flujo de datos

1. Al iniciar, la aplicación carga los datos guardados en localStorage
2. Las acciones del usuario se capturan en la capa UI
3. Estas acciones se procesan en la capa de datos
4. Los cambios se guardan en localStorage
5. La UI se actualiza para reflejar los cambios

## 📱 Diseño Responsivo

La aplicación se adapta a diferentes tamaños de pantalla:
- **Escritorio**: Vista completa con sidebar y panel principal
- **Tablet**: Reorganización de elementos para adaptarse a pantallas medianas
- **Móvil**: Vista apilada para mejor usabilidad en pantallas pequeñas

## 🌐 APIs utilizadas

- **Clima**: API de wttr.in para obtener información meteorológica
- **Noticias**: APIs RSS de El País, El Mundo y Marca Motor convertidas a JSON mediante api.rss2json.com

## 🔗 Enlaces útiles

- [API de localStorage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage)
- [Servicio wttr.in](https://github.com/chubin/wttr.in)

---

Desarrollado como proyecto de demostración por [Tu Nombre] © 2025