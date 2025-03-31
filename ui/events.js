// Renderiza los eventos en la interfaz
function renderEvents() {
  const allEvents = getAllEvents();
  eventsList.innerHTML = "";

  if (allEvents.length === 0) {
    eventsList.innerHTML = `
      <div class="empty-events">
        <p>No hay eventos para mostrar.</p>
      </div>
    `;
    return;
  }

  const sortedEvents = [...allEvents].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  sortedEvents.forEach((event) => {
    eventsList.appendChild(createEventElement(event));
  });
}

// Crea un elemento DOM para un evento
function createEventElement(event) {
  const eventEl = document.createElement("div");
  eventEl.className = "event-item";
  eventEl.dataset.id = event.id;

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  eventEl.innerHTML = `
    <div class="event-header">
      <h3 class="event-title">${event.title}</h3>
    </div>
    <div class="event-date">
      <i class="far fa-calendar-alt"></i> ${formattedDate}
    </div>
    ${
      event.location
        ? `<div class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</div>`
        : ""
    }
    <p class="event-details">${event.details || "Sin detalles"}</p>
    <div class="event-actions">
      <button class="btn-edit" data-id="${event.id}">
        <i class="fas fa-edit"></i> Editar
      </button>
      <button class="btn-delete" data-id="${event.id}">
        <i class="fas fa-trash-alt"></i> Eliminar
      </button>
    </div>
  `;

  eventEl.querySelector(".btn-edit").addEventListener("click", (e) => {
    e.stopPropagation();
    openEventModal(event.id);
  });

  eventEl.querySelector(".btn-delete").addEventListener("click", (e) => {
    e.stopPropagation();
    confirmDeleteEvent(event.id);
  });

  return eventEl;
}

// Abre el modal para crear o editar un evento
function openEventModal(eventId = null) {
  eventForm.reset();

  const titleInput = document.getElementById("eventTitle");
  const detailsInput = document.getElementById("eventDetails");
  const ubicationInput = document.getElementById("eventLocation");

  // Evento para borrar el contenido al hacer clic en el campo
  titleInput.addEventListener("focus", function () {
    if (this.value === "Título del evento") {
      this.value = "";
    }
  });

  detailsInput.addEventListener("focus", function () {
    if (this.value === "Detalles del evento") {
      this.value = "";
    }
  });

  ubicationInput.addEventListener("focus", function () {
    if (this.value === "Ubicación:") {
      this.value = "";
    }
  });

  if (eventId) {
    const event = getEventById(eventId);
    if (!event) return;

    eventModalTitle.textContent = "Editar Evento";
    document.getElementById("eventId").value = event.id;
    titleInput.value = event.title;
    detailsInput.value = event.details || "";
    document.getElementById("eventLocation").value = event.location || "";

    const eventDate = new Date(event.date);
    const year = eventDate.getFullYear();
    const month = String(eventDate.getMonth() + 1).padStart(2, "0");
    const day = String(eventDate.getDate()).padStart(2, "0");
    const hours = String(eventDate.getHours()).padStart(2, "0");
    const minutes = String(eventDate.getMinutes()).padStart(2, "0");

    document.getElementById(
      "eventDate"
    ).value = `${year}-${month}-${day}T${hours}:${minutes}`;
  } else {
    eventModalTitle.textContent = "Nuevo Evento";
    document.getElementById("eventId").value = "";
    titleInput.value = "Título del evento";
    detailsInput.value = "Detalles del evento";

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    document.getElementById(
      "eventDate"
    ).value = `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  eventModal.style.display = "block";
}

// Cierra el modal de eventos
function closeEventModal() {
  eventModal.style.display = "none";
}

// Maneja el envío del formulario de evento
function handleEventFormSubmit(e) {
  e.preventDefault();

  const eventId = document.getElementById("eventId").value;
  const title = document.getElementById("eventTitle").value.trim();
  const details = document.getElementById("eventDetails").value.trim();
  const date = document.getElementById("eventDate").value;
  const location = document.getElementById("eventLocation").value.trim();

  if (!title || !date) {
    alert("Por favor, complete los campos requeridos.");
    return;
  }

  const eventData = {
    title,
    details,
    date: new Date(date).toISOString(),
    location,
  };

  if (eventId) {
    updateEvent(eventId, eventData);
  } else {
    addEvent(eventData);
  }

  renderEvents();
  renderCalendar(); // Actualizar el calendario con los nuevos eventos
  closeEventModal();
}

// Confirma y elimina un evento
function confirmDeleteEvent(eventId) {
  const event = getEventById(eventId);
  if (
    confirm(`¿Estás seguro de que deseas eliminar el evento "${event.title}"?`)
  ) {
    deleteEvent(eventId);
    renderEvents();
    renderCalendar(); // Actualizar el calendario
  }
}
