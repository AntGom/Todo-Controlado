// Referencias elementos del DOM
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
const dropdownContainer = document.querySelector(".dropdown-container");
const taskBtns = document.querySelector(".task-btns");

// Ciudad predeterminada para el clima
const defaultCity = "Sevilla";

// Marca un filtro como activo y desactiva los demás
const setActiveFilter = (filter) => {
  currentFilter = filter;
  currentFilterText.textContent = filterNames[filter];

  filterItems.forEach((item) => {
    if (item.dataset.filter === filter) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

// Establece pestañas activas
const setupTabs = () => {
  showTasksTab.addEventListener("click", () => {
    tasksList.classList.remove("hidden");
    eventsList.classList.add("hidden");
    calendarViewElement.classList.add("hidden");
    showTasksTab.classList.add("active");
    showEventsTab.classList.remove("active");
    showCalendarTab.classList.remove("active");

    // Mostrar filtro desplegable en pestaña tareas
    if (dropdownContainer) {
      dropdownContainer.style.display = "block";
    }

    // Restaurar dirección de los botones (columna en tlf)
    if (taskBtns) {
      taskBtns.style.flexDirection = "";
      taskBtns.style.width = "";
    }
  });

  showEventsTab.addEventListener("click", () => {
    tasksList.classList.add("hidden");
    eventsList.classList.remove("hidden");
    calendarViewElement.classList.add("hidden");
    showTasksTab.classList.remove("active");
    showEventsTab.classList.add("active");
    showCalendarTab.classList.remove("active");

    // Ocultar filtro desplegable si no estamos en pestaña de tareas
    if (dropdownContainer) {
      dropdownContainer.style.display = "none";
    }

    // Poner botones row cuando filtro es oculto
    if (taskBtns) {
      taskBtns.style.flexDirection = "row";
      taskBtns.style.width = "100%";
    }
  });

  showCalendarTab.addEventListener("click", () => {
    tasksList.classList.add("hidden");
    eventsList.classList.add("hidden");
    calendarViewElement.classList.remove("hidden");
    showTasksTab.classList.remove("active");
    showEventsTab.classList.remove("active");
    showCalendarTab.classList.add("active");
    renderCalendar();

    // Ocultar filtro cuando no estamos en pestaña tareas
    if (dropdownContainer) {
      dropdownContainer.style.display = "none";
    }

    // Poner botones en fila si filtro está oculto
    if (taskBtns) {
      taskBtns.style.flexDirection = "row";
      taskBtns.style.width = "100%";
    }
  });

  // Filtro se muestre ok al cargar la página según pestaña activa
  setTimeout(() => {
    if (!showTasksTab.classList.contains("active")) {
      if (dropdownContainer) {
        dropdownContainer.style.display = "none";
      }

      // Poner botones en fila si no estamos en la pestaña de tareas al inicio
      if (taskBtns) {
        taskBtns.style.flexDirection = "row";
        taskBtns.style.width = "100%";
      }
    }
  }, 0);
};

// Variable para valor original de la ciudad
let lastSearchedCity = defaultCity;

// Busca info del clima para una ciudad
const searchWeather = async (city) => {
  try {
    weatherInfo.innerHTML = "<p>Cargando información del clima...</p>";
    lastSearchedCity = city;

    // Obtener y mostrar info del clima
    const weatherHtml = await getWeather(city);
    weatherInfo.innerHTML = `<div class="weather-display">${weatherHtml}</div>`;

    // Mostrar resultado en input y aplicar estilo
    cityInput.value = weatherHtml;
    cityInput.classList.add("weather-result");
  } catch (error) {
    weatherInfo.innerHTML = "<p>Error al obtener el clima.</p>";
    console.error("Error al buscar el clima:", error);
  }
};

// Restaurar el input a su estado de búsqueda
const resetWeatherInput = () => {
  cityInput.value = lastSearchedCity;
  cityInput.classList.remove("weather-result");
};

// Carga y muestra noticias
const loadNews = async (source = null) => {
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
};

// Crea opciones para noticias
const createNewsSourceOptions = () => {
  const sources = getAvailableNewsSources();
  return Object.values(sources)
    .map((source) => `<option value="${source.id}">${source.name}</option>`)
    .join("");
};

// Lista de fuentes de noticias disponibles
const getAvailableNewsSources = () => {
  return Object.keys(newsSources).reduce((acc, key) => {
    acc[key] = {
      id: key,
      name: formatSourceName(key),
    };
    return acc;
  }, {});
};
