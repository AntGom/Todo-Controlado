// Cargar datos almacenados
loadTasks();
loadEvents();

// Iniciar el reloj
updateDateTime();

// Cargar clima de Sevilla por defecto
searchWeather(defaultCity);

// Cargar noticias
loadNews();

// Configurar pestañas
setupTabs();

// Configurar eventos del calendario
setupCalendarEvents();

// Renderizar calendario inicial
renderCalendar();

// Evento para abrir el modal de nueva tarea
addTaskBtn.addEventListener("click", () => openTaskModal());

// Evento para abrir el modal de nuevo evento
addEventBtn.addEventListener("click", () => openEventModal());

// Eventos para cerrar modales
closeModalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    closeTaskModal();
    closeEventModal();
  });
});

// Evento para enviar el formulario de tarea
taskForm.addEventListener("submit", (e) => handleTaskFormSubmit(e));

// Evento para enviar el formulario de evento
eventForm.addEventListener("submit", (e) => handleEventFormSubmit(e));

// Configurar dropdown de filtros
filterDropdown.addEventListener("click", () => {
  filterMenu.classList.toggle("show");
});

// Cerrar dropdown al hacer clic fuera de él
document.addEventListener("click", (e) => {
  if (!filterDropdown.contains(e.target) && !filterMenu.contains(e.target)) {
    filterMenu.classList.remove("show");
  }
});

// Configurar items de filtro
filterItems.forEach((item) => {
  item.addEventListener("click", () => {
    const filter = item.dataset.filter;
    setActiveFilter(filter);
    renderTasks(filter);
    filterMenu.classList.remove("show");
  });
});

// Evento para buscar clima
searchWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    searchWeather(city);
  }
});

// También buscar clima al presionar Enter
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) {
      searchWeather(city);
    }
  }
});

// Cerrar modales si clic fuera del contenido
window.addEventListener("click", (e) => {
  if (e.target === taskModal) {
    closeTaskModal();
  }
  if (e.target === eventModal) {
    closeEventModal();
  }
});

// Pintamos las tareas y eventos
renderTasks();
renderEvents();