// Obtiene todos los eventos
function getAllEvents() {
  return events;
}

// Añade un nuevo evento
function addEvent(eventData) {
  const newEvent = {
    id: Date.now().toString(),
    title: eventData.title,
    details: eventData.details || "",
    date: eventData.date,
    location: eventData.location || "",
    createdAt: new Date().toISOString(),
  };

  events.push(newEvent);
  saveEvents();
  return newEvent;
}

// Actualiza un evento existente
function updateEvent(eventId, updatedData) {
  const eventIndex = events.findIndex((event) => event.id === eventId);

  if (eventIndex === -1) {
    return null;
  }

  events[eventIndex] = {
    ...events[eventIndex],
    ...updatedData,
    updatedAt: new Date().toISOString(),
  };

  saveEvents();
  return events[eventIndex];
}

// Elimina un evento
function deleteEvent(eventId) {
  const initialLength = events.length;
  events = events.filter((event) => event.id !== eventId);

  if (initialLength === events.length) {
    return false;
  }

  saveEvents();
  return true;
}

// Obtiene un evento por su ID
function getEventById(eventId) {
  return events.find((event) => event.id === eventId) || null;
}