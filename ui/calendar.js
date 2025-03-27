// Variables para el calendario
let currentCalendarDate = new Date();
let selectedDate = null;

// Elementos del DOM para el calendario
const calendarMonthView = document.getElementById('calendarMonthView');
const calendarDaysGrid = document.getElementById('calendarDaysGrid');
const currentMonthYear = document.getElementById('currentMonthYear');
const prevMonth = document.getElementById('prevMonth');
const nextMonth = document.getElementById('nextMonth');
const dayDetailsModal = document.getElementById('dayDetailsModal');
const dayDetailsTitle = document.getElementById('dayDetailsTitle');
const dayTasksList = document.getElementById('dayTasksList');
const dayEventsList = document.getElementById('dayEventsList');
const addTaskFromDay = document.getElementById('addTaskFromDay');
const addEventFromDay = document.getElementById('addEventFromDay');

// Nombres de los meses en español
const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// Nombres de los días en español (comenzando por lunes)
const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

/**
 * Configura los eventos del calendario
 */
function setupCalendarEvents() {
  // Navegación entre meses
  prevMonth.addEventListener('click', () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    renderCalendar();
  });

  nextMonth.addEventListener('click', () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    renderCalendar();
  });

  // Cerrar modal de detalles del día
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      dayDetailsModal.style.display = 'none';
    });
  });

  // Agregar tarea desde modal de día
  addTaskFromDay.addEventListener('click', () => {
    dayDetailsModal.style.display = 'none';
    
    // Configurar la fecha en el formulario de tarea
    const taskDateInput = document.getElementById('dueDate');
    if (selectedDate && taskDateInput) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const hours = String(new Date().getHours()).padStart(2, '0');
      const minutes = String(new Date().getMinutes()).padStart(2, '0');
      
      taskDateInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
    }
    
    openTaskModal();
  });

  // Agregar evento desde modal de día
  addEventFromDay.addEventListener('click', () => {
    dayDetailsModal.style.display = 'none';
    
    // Configurar la fecha en el formulario de evento
    const eventDateInput = document.getElementById('eventDate');
    if (selectedDate && eventDateInput) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const hours = String(new Date().getHours()).padStart(2, '0');
      const minutes = String(new Date().getMinutes()).padStart(2, '0');
      
      eventDateInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
    }
    
    openEventModal();
  });

  // Cerrar modal al hacer clic fuera del contenido
  window.addEventListener('click', (e) => {
    if (e.target === dayDetailsModal) {
      dayDetailsModal.style.display = 'none';
    }
  });
}

/**
 * Renderiza el calendario
 */
function renderCalendar() {
  renderMonthView();
}

/**
 * Renderiza la vista de mes del calendario
 */
function renderMonthView() {
  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();
  
  // Actualizar título
  currentMonthYear.textContent = `${monthNames[month]} ${year}`;
  
  calendarDaysGrid.innerHTML = '';
  
  // Obtener el primer día del mes
  const firstDay = new Date(year, month, 1);
  // Ajustar para que la semana comience en lunes (0 = lunes, 6 = domingo)
  let dayOfWeek = firstDay.getDay() - 1;
  if (dayOfWeek < 0) dayOfWeek = 6; // Si es domingo (0), ajustar a 6
  
  // Obtener el último día del mes
  const lastDay = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();
  
  // Obtener días del mes anterior
  const prevMonthDays = new Date(year, month, 0).getDate();
  
  // Días del mes anterior (para completar primera semana)
  for (let i = dayOfWeek - 1; i >= 0; i--) {
    const dayNumber = prevMonthDays - i;
    const dayDate = new Date(year, month - 1, dayNumber);
    const dayElement = createDayElement(dayDate, true);
    calendarDaysGrid.appendChild(dayElement);
  }
  
  // Días del mes actual
  const today = new Date();
  for (let day = 1; day <= totalDays; day++) {
    const dayDate = new Date(year, month, day);
    const isToday = (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
    
    const dayElement = createDayElement(dayDate, false, isToday);
    calendarDaysGrid.appendChild(dayElement);
  }
  
  // Calcular cuántas celdas tenemos hasta ahora
  const cellsCount = dayOfWeek + totalDays;
  // Calcular cuántas celdas necesitamos añadir del mes siguiente
  const nextMonthDays = 42 - cellsCount; // 42 = 6 filas x 7 días
  
  // Días del mes siguiente (para completar última semana)
  for (let day = 1; day <= nextMonthDays; day++) {
    const dayDate = new Date(year, month + 1, day);
    const dayElement = createDayElement(dayDate, true);
    calendarDaysGrid.appendChild(dayElement);
  }
}

/**
 * Crea un elemento para un día en la vista de mes
 */
function createDayElement(date, isOtherMonth = false, isToday = false) {
  const dayElement = document.createElement('div');
  dayElement.className = 'calendar-day';
  if (isOtherMonth) {
    dayElement.classList.add('day-other-month');
  }
  
  const day = date.getDate();
  
  // Obtener tareas y eventos para este día
  const dayTasks = getTasksForDate(date);
  const dayEvents = getEventsForDate(date);
  
  // Crear número del día
  const dayNumberElement = document.createElement('div');
  dayNumberElement.className = 'day-number';
  if (isToday) {
    dayNumberElement.classList.add('day-current');
  }
  dayNumberElement.textContent = day;
  
  dayElement.appendChild(dayNumberElement);
  
  // Si hay tareas o eventos, mostrarlos
  if (dayTasks.length > 0 || dayEvents.length > 0) {
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'calendar-day-items';
    
    // Mostrar hasta 3 elementos (combinando tareas y eventos)
    const allItems = [...dayTasks, ...dayEvents];
    const visibleItems = allItems.slice(0, 3);
    const remainingItems = allItems.length - 3;
    
    visibleItems.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'calendar-day-item';
      
      if ('dueDate' in item) { // Es una tarea
        itemElement.classList.add('day-item-task');
        itemElement.innerHTML = `<i class="fas fa-tasks"></i> ${item.title}`;
      } else { // Es un evento
        itemElement.classList.add('day-item-event');
        itemElement.innerHTML = `<i class="fas fa-calendar-alt"></i> ${item.title}`;
      }
      
      itemsContainer.appendChild(itemElement);
    });
    
    // Si hay más de 3 elementos, mostrar indicador
    if (remainingItems > 0) {
      const moreItemsElement = document.createElement('div');
      moreItemsElement.className = 'more-items';
      moreItemsElement.textContent = `+ ${remainingItems} más`;
      itemsContainer.appendChild(moreItemsElement);
    }
    
    dayElement.appendChild(itemsContainer);
  }
  
  // Agregar evento click para mostrar detalles del día
  dayElement.addEventListener('click', () => showDayDetails(date));
  
  return dayElement;
}

/**
 * Muestra el modal con los detalles de las tareas y eventos para un día específico
 */
function showDayDetails(date) {
  selectedDate = date;
  
  // Formatear fecha para el título
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('es-ES', options);
  
  dayDetailsTitle.textContent = `Actividades para el ${formattedDate}`;
  
  // Obtener tareas y eventos para este día
  const dayTasks = getTasksForDate(date);
  const dayEvents = getEventsForDate(date);
  
  // Mostrar tareas
  dayTasksList.innerHTML = '';
  if (dayTasks.length > 0) {
    dayTasks.forEach(task => {
      const taskEl = createTaskElement(task);
      dayTasksList.appendChild(taskEl);
    });
  } else {
    dayTasksList.innerHTML = '<p>No hay tareas para este día</p>';
  }
  
  // Mostrar eventos
  dayEventsList.innerHTML = '';
  if (dayEvents.length > 0) {
    dayEvents.forEach(event => {
      const eventEl = createEventElement(event);
      dayEventsList.appendChild(eventEl);
    });
  } else {
    dayEventsList.innerHTML = '<p>No hay eventos para este día</p>';
  }
  
  // Mostrar modal
  dayDetailsModal.style.display = 'block';
}

/**
 * Obtiene las tareas para una fecha específica
 */
function getTasksForDate(date) {
  const allTasks = getAllTasks();
  return allTasks.filter(task => isSameDay(new Date(task.dueDate), date));
}

/**
 * Obtiene los eventos para una fecha específica
 */
function getEventsForDate(date) {
  const allEvents = getAllEvents();
  return allEvents.filter(event => isSameDay(new Date(event.date), date));
}

/**
 * Verifica si dos fechas corresponden al mismo día
 */
function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Obtiene el día de la semana (0 = lunes, 6 = domingo)
 */
function getDayOfWeek(date) {
  let day = date.getDay() - 1;
  if (day < 0) day = 6;
  return day;
}