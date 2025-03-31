// Renderiza las tareas en la interfaz
function renderTasks(filter = currentFilter) {
  const filteredTasks = getFilteredTasks(filter);
  tasksList.innerHTML = "";

  if (filteredTasks.length === 0) {
    tasksList.innerHTML = `
      <div class="empty-tasks">
        <p>No hay tareas para mostrar.</p>
      </div>
    `;
    return;
  }

  const sortedTasks = [...filteredTasks].sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );

  sortedTasks.forEach((task) => {
    tasksList.appendChild(createTaskElement(task));
  });
}

// Crea un elemento DOM para una tarea
function createTaskElement(task) {
  const taskEl = document.createElement("div");
  taskEl.className = "task-item";
  taskEl.dataset.id = task.id;

  const dueDate = new Date(task.dueDate);
  const formattedDate = dueDate.toLocaleString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const statusText = {
    pending: "Pendiente",
    inProgress: "En Progreso",
    completed: "Completada",
  };

  taskEl.innerHTML = `
    <div class="task-header">
      <h3 class="task-title">${task.title}</h3>
      <span class="task-status status-${task.status}">${
    statusText[task.status]
  }</span>
    </div>
    <div class="task-date">
      <i class="far fa-calendar-alt"></i> ${formattedDate}
    </div>
    <p class="task-description">${task.description || "Sin descripción"}</p>
    <div class="task-actions">
      <button class="btn-edit" data-id="${task.id}">
        <i class="fas fa-edit"></i> Editar
      </button>
      <button class="btn-delete" data-id="${task.id}">
        <i class="fas fa-trash-alt"></i> Eliminar
      </button>
    </div>
  `;

  taskEl.querySelector(".btn-edit").addEventListener("click", (e) => {
    e.stopPropagation();
    openTaskModal(task.id);
  });

  taskEl.querySelector(".btn-delete").addEventListener("click", (e) => {
    e.stopPropagation();
    confirmDeleteTask(task.id);
  });

  return taskEl;
}

// Abre el modal para crear o editar una tarea
function openTaskModal(taskId = null) {
  taskForm.reset();

  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");

  // Evento para borrar el contenido al hacer clic en el campo
  titleInput.addEventListener("focus", function () {
    if (this.value === "Título:") {
      this.value = "";
    }
  });

  descriptionInput.addEventListener("focus", function () {
    if (this.value === "Descripción:") {
      this.value = "";
    }
  });

  if (taskId) {
    const task = getTaskById(taskId);
    if (!task) return;

    modalTitle.textContent = "Editar Tarea";
    document.getElementById("taskId").value = task.id;
    titleInput.value = task.title;
    descriptionInput.value = task.description || "";

    const dueDate = new Date(task.dueDate);
    const year = dueDate.getFullYear();
    const month = String(dueDate.getMonth() + 1).padStart(2, "0");
    const day = String(dueDate.getDate()).padStart(2, "0");
    const hours = String(dueDate.getHours()).padStart(2, "0");
    const minutes = String(dueDate.getMinutes()).padStart(2, "0");

    document.getElementById(
      "dueDate"
    ).value = `${year}-${month}-${day}T${hours}:${minutes}`;
    document.getElementById("status").value = task.status;
  } else {
    modalTitle.textContent = "Nueva Tarea";
    document.getElementById("taskId").value = "";
    titleInput.value = "Título:";
    descriptionInput.value = "Descripción:";

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    document.getElementById(
      "dueDate"
    ).value = `${year}-${month}-${day}T${hours}:${minutes}`;
    document.getElementById("status").value = "pending";
  }

  taskModal.style.display = "block";
}

// Cierra el modal de tareas
function closeTaskModal() {
  taskModal.style.display = "none";
}

// Maneja el envío del formulario de tarea
function handleTaskFormSubmit(event) {
  event.preventDefault();

  const taskId = document.getElementById("taskId").value;
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const dueDate = document.getElementById("dueDate").value;
  const status = document.getElementById("status").value;

  if (!title || !dueDate) {
    alert("Por favor, complete los campos requeridos.");
    return;
  }

  const taskData = {
    title,
    description,
    dueDate: new Date(dueDate).toISOString(),
    status,
  };

  if (taskId) {
    updateTask(taskId, taskData);
  } else {
    addTask(taskData);
  }

  renderTasks();
  renderCalendar(); // Actualizar el calendario con las nuevas tareas
  closeTaskModal();
}

// Confirma y elimina una tarea
function confirmDeleteTask(taskId) {
  const task = getTaskById(taskId);
  if (
    confirm(`¿Estás seguro de que deseas eliminar la tarea "${task.title}"?`)
  ) {
    deleteTask(taskId);
    renderTasks();
    renderCalendar(); // Actualizar el calendario
  }
}
