// Objetos para guardar los datos
let tasks = [];
let events = [];

let currentFilter = "all";

// Fuente de noticias actual y disponibles
let currentNewsSource = "elPais";
const newsSources = {
  elPais:
    "https://api.rss2json.com/v1/api.json?rss_url=https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada",
  elMundo:
    "https://api.rss2json.com/v1/api.json?rss_url=https://e00-elmundo.uecdn.es/elmundo/rss/portada.xml",
  marcaMotor:
    "https://api.rss2json.com/v1/api.json?rss_url=https://e00-marca.uecdn.es/rss/motor/formula1.xml",
  motoGP:
    "https://api.rss2json.com/v1/api.json?rss_url=https://e00-marca.uecdn.es/rss/motor/motogp.xml",
};

// Mapeo de filtros a nombres legibles
const filterNames = {
  all: "Todas las tareas",
  pending: "Pendientes",
  inProgress: "En Progreso",
  completed: "Completadas",
};

// Guardar tareas en localStorage
const saveTasks = () => {
  try {
    localStorage.setItem("todoControlado_tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error al guardar tareas en localStorage:", error);
  }
};

// Recuperar tareas desde localStorage
const loadTasks = () => {
  try {
    const tasksData = localStorage.getItem("todoControlado_tasks");
    tasks = tasksData ? JSON.parse(tasksData) : [];
  } catch (error) {
    console.error("Error al recuperar tareas de localStorage:", error);
    tasks = [];
  }
};

// Guardar eventos en localStorage
const saveEvents = () => {
  try {
    localStorage.setItem("todoControlado_events", JSON.stringify(events));
  } catch (error) {
    console.error("Error al guardar eventos en localStorage:", error);
  }
};

// Recuperar eventos desde localStorage
const loadEvents = () => {
  try {
    const eventsData = localStorage.getItem("todoControlado_events");
    events = eventsData ? JSON.parse(eventsData) : [];
  } catch (error) {
    console.error("Error al recuperar eventos de localStorage:", error);
    events = [];
  }
};

// Actualiza la fecha y hora en el header
const updateDateTime = () => {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const currentDateTime = document.getElementById("currentDateTime");
  if (currentDateTime) {
    currentDateTime.textContent = now.toLocaleDateString("es-ES", options);
    setTimeout(updateDateTime, 1000);
  }
};
