// Obtener todas tareas
const getAllTasks = () => {
  return tasks;
};

// Obtener tareas por estado
const getFilteredTasks = (status) => {
  if (status === "all") {
    return tasks;
  }
  return tasks.filter((task) => task.status === status);
};

// Añadir nueva tarea
const addTask = (taskData) => {
  const newTask = {
    id: Date.now().toString(),
    title: taskData.title,
    description: taskData.description || "",
    dueDate: taskData.dueDate,
    status: taskData.status || "pending",
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  saveTasks();
  return newTask;
};

// Actualizar tarea
const updateTask = (taskId, updatedData) => {
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return null;
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...updatedData,
    updatedAt: new Date().toISOString(),
  };

  saveTasks();
  return tasks[taskIndex];
};

// Eliminar tarea
const deleteTask = (taskId) => {
  const initialLength = tasks.length;
  tasks = tasks.filter((task) => task.id !== taskId);

  if (initialLength === tasks.length) {
    return false;
  }

  saveTasks();
  return true;
};

// Obtener tarea por ID
const getTaskById = (taskId) => {
  return tasks.find((task) => task.id === taskId) || null;
};
