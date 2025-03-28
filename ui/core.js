// Referencias a elementos del DOM comunes
const tasksList = document.getElementById("tasksList");
const eventsList = document.getElementById("eventsList");
const calendarViewElement = document.getElementById("calendarView");
const taskModal = document.getElementById("taskModal");
const eventModal = document.getElementById("eventModal");
const taskForm = document.getElementById("taskForm");
const eventForm = document.getElementById("eventForm");
const modalTitle = document.getElementById("modalTitle");
const eventModalTitle = document.getElementById("eventModalTitle");
const closeModalBtns = document.querySelectorAll(".close-modal");
const addTaskBtn = document.getElementById("addTaskBtn");
const addEventBtn = document.getElementById("addEventBtn");
const currentDateTime = document.getElementById("currentDateTime");
const showTasksTab = document.getElementById("showTasksTab");
const showEventsTab = document.getElementById("showEventsTab");
const showCalendarTab = document.getElementById("showCalendarTab");
const filterDropdown = document.getElementById("filterDropdown");
const filterMenu = document.getElementById("filterMenu");
const filterItems = document.querySelectorAll(".dropdown-item");
const currentFilterText = document.getElementById("currentFilterText");
const weatherInfo = document.getElementById("weatherInfo");
const cityInput = document.getElementById("cityInput");
const searchWeatherBtn = document.getElementById("searchWeather");
const newsList = document.getElementById("newsList");

// Ciudad predeterminada para el clima
const defaultCity = "Sevilla";

// Marca un filtro como activo y desactiva los demás
function setActiveFilter(filter) {
  currentFilter = filter;
  currentFilterText.textContent = filterNames[filter];

  filterItems.forEach((item) => {
    if (item.dataset.filter === filter) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// Establece las pestañas activas
function setupTabs() {
  showTasksTab.addEventListener("click", () => {
    tasksList.classList.remove("hidden");
    eventsList.classList.add("hidden");
    calendarViewElement.classList.add("hidden");
    showTasksTab.classList.add("active");
    showEventsTab.classList.remove("active");
    showCalendarTab.classList.remove("active");
  });

  showEventsTab.addEventListener("click", () => {
    tasksList.classList.add("hidden");
    eventsList.classList.remove("hidden");
    calendarViewElement.classList.add("hidden");
    showTasksTab.classList.remove("active");
    showEventsTab.classList.add("active");
    showCalendarTab.classList.remove("active");
  });

  showCalendarTab.addEventListener("click", () => {
    tasksList.classList.add("hidden");
    eventsList.classList.add("hidden");
    calendarViewElement.classList.remove("hidden");
    showTasksTab.classList.remove("active");
    showEventsTab.classList.remove("active");
    showCalendarTab.classList.add("active");
    renderCalendar(); // Renderizar el calendario cuando se activa la pestaña
  });
}

// Busca información del clima para una ciudad
async function searchWeather(city) {
  try {
    weatherInfo.innerHTML = "<p>Cargando información del clima...</p>";

    const weatherHtml = await getWeather(city);
    weatherInfo.innerHTML = `<div class="weather-display">${weatherHtml}</div>`;
  } catch (error) {
    weatherInfo.innerHTML = "<p>Error al obtener el clima.</p>";
    console.error("Error al buscar el clima:", error);
  }
}

// Carga y muestra noticias
async function loadNews(source = null) {
  try {
    newsList.innerHTML = "<p>Cargando noticias...</p>";

    if (source) {
      currentNewsSource = source;
    }

    const newsData = await getNews(currentNewsSource);
    const articles = newsData.items || [];

    if (articles.length === 0) {
      newsList.innerHTML = "<p>No hay noticias disponibles.</p>";
      return;
    }

    newsList.innerHTML = "";

    const sourceSelector = document.createElement("div");
    sourceSelector.className = "news-source-selector";
    sourceSelector.innerHTML = `
      <select id="newsSource">
        ${createNewsSourceOptions()}
      </select>
    `;

    newsList.appendChild(sourceSelector);

    const sourceSelect = document.getElementById("newsSource");
    sourceSelect.value = currentNewsSource;
    sourceSelect.addEventListener("change", (e) => {
      loadNews(e.target.value);
    });

    articles.slice(0, 5).forEach((article) => {
      const newsItem = document.createElement("div");
      newsItem.className = "news-item";

      let description = "";
      if (article.description) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = article.description;
        description = tempDiv.textContent || tempDiv.innerText;
        description = description.substring(0, 100) + "...";
      }

      newsItem.innerHTML = `
        <h3>${article.title}</h3>
        <p>${description || "Sin descripción"}</p>
        <a href="${article.link}" target="_blank">Leer más</a>
      `;

      newsList.appendChild(newsItem);
    });
  } catch (error) {
    newsList.innerHTML = "<p>Error al cargar las noticias.</p>";
    console.error("Error al cargar noticias:", error);
  }
}

// Crea las opciones para el selector de fuentes de noticias
function createNewsSourceOptions() {
  const sources = getAvailableNewsSources();
  return Object.values(sources)
    .map((source) => `<option value="${source.id}">${source.name}</option>`)
    .join("");
}

// Obtiene la lista de fuentes de noticias disponibles
function getAvailableNewsSources() {
  return Object.keys(newsSources).reduce((acc, key) => {
    acc[key] = {
      id: key,
      name: formatSourceName(key),
    };
    return acc;
  }, {});
}