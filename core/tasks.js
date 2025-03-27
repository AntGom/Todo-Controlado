// Obtiene todas las tareas
function getAllTasks() {
  return tasks;
}

// Obtiene tareas filtradas por estado
function getFilteredTasks(status) {
  if (status === 'all') {
    return tasks;
  }
  return tasks.filter(task => task.status === status);
}

// Añade una nueva tarea
function addTask(taskData) {
  const newTask = {
    id: Date.now().toString(),
    title: taskData.title,
    description: taskData.description || '',
    dueDate: taskData.dueDate,
    status: taskData.status || 'pending',
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  saveTasks();
  return newTask;
}

// Actualiza una tarea existente
function updateTask(taskId, updatedData) {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  
  if (taskIndex === -1) {
    return null;
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...updatedData,
    updatedAt: new Date().toISOString()
  };

  saveTasks();
  return tasks[taskIndex];
}

// Elimina una tarea
function deleteTask(taskId) {
  const initialLength = tasks.length;
  tasks = tasks.filter(task => task.id !== taskId);
  
  if (initialLength === tasks.length) {
    return false;
  }

  saveTasks();
  return true;
}

// Obtiene una tarea por su ID
function getTaskById(taskId) {
  return tasks.find(task => task.id === taskId) || null;
}