class Utils {
  /**
   * Generate unique id using random numbers and the date
   * @returns string
   */
  static generateUniqueId() {
    const random = Math.random().toString().slice(2, 5);
    const date = new Date().getTime().toString();
    return random + date;
  }
}

class Task {
  /**
   * Task constructor function to create a new task object with the following properties: name, dueDate, timeSpent, id
   * @param {*} name
   * @param {*} dueDate
   * @param {*} creationDate
   */
  constructor(name, id) {
    this.id = id;
    this.name = name;
    this.dueDate = "";
    this.creationDate = new Date();
  }

  addTask(e) {
    // Prevent default form submission so the page doesn't reload
    e.preventDefault();

    // Get the task name from the form
    const taskName = document.getElementById("task-name").value.trim();
    // Generate a unique id
    const taskId = Utils.generateUniqueId();

    // Check if the task name is empty
    if (taskName === "" || !taskName) {
      alert("Please enter a task name");
      return;
    }

    // Get the tasks from local storage
    const tasks = this.getTasks();

    // Create a new task object
    const newTask = new Task(taskName, taskId);
    console.log(newTask);
    // Add the new task to the tasks array
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Reset the form
    document.getElementById("task-form").reset();
    this.renderTasks();
  }

  renderTasks() {
    // Get the tasks from local storage
    const tasks = this.getTasks();
    const taskList = document.getElementById("tasks");
    taskList.innerHTML = "";

    tasks.forEach((task) => {
      // Create a task item
      const taskItem = document.createElement("div");
      taskItem.classList.add("task");

      // Create a task details
      const taskDetails = document.createElement("div");
      taskDetails.classList.add("task__details");
      taskDetails.innerHTML = `
        <div class="task__status">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
            <path
              d="m34.52,9.87l-4.9-4.9c-.44-.44-1.16-.44-1.61,0l-12.57,12.57c-.44.44-1.16.44-1.61,0l-5.84-5.84c-.44-.44-1.16-.44-1.61,0l-4.9,4.9c-.44.44-.44,1.16,0,1.61l13.15,13.15h0s19.9-19.88,19.9-19.88c.44-.44.44-1.16,0-1.61Z"
            />
          </svg>
        </div>
        <input
          type="text"
          class="task__title"
          value="${task.name}"
        />
        <div class="task__project">Project</div>
      `;
      taskItem.appendChild(taskDetails);

      // Create a task actions
      const taskActions = document.createElement("div");
      taskActions.classList.add("task__actions");

      const taskTimer = document.createElement("div");
      taskTimer.innerHTML = `00:00:00`;
      taskActions.appendChild(taskTimer);

      const startButton = document.createElement("button");
      startButton.classList.add("task__timer", "action-icon");
      startButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path d="m31.79,16.33c1.21.74,1.21,2.6,0,3.34l-12.88,7.87-12.88,7.87c-1.21.74-2.73-.19-2.73-1.67V2.25C3.3.77,4.82-.16,6.03.58l12.88,7.87,12.88,7.87Z" /></svg>`;
      taskActions.appendChild(startButton);

      const optionsButton = document.createElement("button");
      optionsButton.classList.add("task__options", "action-icon");
      optionsButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
        <circle cx="4.21" cy="18.95" r="3.97" />
        <circle cx="18.01" cy="18.95" r="3.97" />
        <circle cx="31.81" cy="18.95" r="3.97" />
      </svg>`;
      optionsButton.addEventListener("click", () =>
        this.openOptionsMenu(task.id)
      );
      taskActions.appendChild(optionsButton);

      const optionsMenu = document.createElement("div");
      optionsMenu.classList.add("task__options-menu");
      optionsMenu.id = `options-menu-${task.id}`;

      const editButton = document.createElement("button");
      editButton.classList.add("task__options-menu-item");
      editButton.innerHTML = "Edit";

      const deleteButton = document.createElement("button");
      deleteButton.classList.add(`task__options-menu-item`);
      deleteButton.innerHTML = "Delete";

      const closeButton = document.createElement("button");
      closeButton.classList.add("task__options-menu-item");
      closeButton.addEventListener("click", () =>
        this.closeOptionsMenu(task.id)
      );
      closeButton.innerHTML = "X";

      optionsMenu.appendChild(editButton);
      optionsMenu.appendChild(deleteButton);
      optionsMenu.appendChild(closeButton);

      taskActions.appendChild(optionsMenu);

      taskItem.appendChild(taskActions);

      taskList.appendChild(taskItem);
    });
  }

  /**
   * Returns an array of tasks from local storage
   * @returns {Array}
   */
  getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  }

  /**
   * Open the options menu for a task
   * @param {*} taskId
   */
  openOptionsMenu(taskId) {
    const menu = document.getElementById(`options-menu-${taskId}`);
    if (menu) {
      menu.style.display = "flex";
    }
  }

  /**
   * Close the options menu for a task
   * @param {*} taskId
   */
  closeOptionsMenu(taskId) {
    const menu = document.getElementById(`options-menu-${taskId}`);
    if (menu) {
      menu.style.display = "none";
    }
  }
}

class App {
  constructor() {
    this.task = new Task();
  }
  init() {
    this.task.renderTasks();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  app = new App();
  app.init();

  document
    .getElementById("task-form")
    .addEventListener("submit", (e) => app.task.addTask(e));
});
