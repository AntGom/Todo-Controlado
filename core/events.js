// Obtener todos los eventos
const getAllEvents = () => {
  return events;
};

// Añadir nuevo evento
const addEvent = (eventData) => {
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
};

// Actualizar evento existente
const updateEvent = (eventId, updatedData) => {
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
};

// Eliminar evento
const deleteEvent = (eventId) => {
  const initialLength = events.length;
  events = events.filter((event) => event.id !== eventId);

  if (initialLength === events.length) {
    return false;
  }

  saveEvents();
  return true;
};

// Obtener evento por ID
const getEventById = (eventId) => {
  return events.find((event) => event.id === eventId) || null;
};
