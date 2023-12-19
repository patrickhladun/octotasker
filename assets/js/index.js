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
    this.isRunning = false;
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

  /**
   * Render the tasks in the DOM
   * @returns void
   */
  renderTasks() {
    // Get the tasks from local storage
    const tasks = this.getTasks();
    const taskList = document.getElementById("tasks");

    // Check if there are any tasks
    if (tasks.length !== 0) {
      // If there are tasks, clear the task list
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

        // Create a task timer
        const taskTimer = document.createElement("div");
        taskTimer.innerHTML = `00:00:00`;
        taskActions.appendChild(taskTimer);

        // Create a start button
        const startButton = document.createElement("button");
        startButton.classList.add("task__timer", "action-icon");
        startButton.innerHTML = `
        <svg class="icon-start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path d="m31.79,16.33c1.21.74,1.21,2.6,0,3.34l-12.88,7.87-12.88,7.87c-1.21.74-2.73-.19-2.73-1.67V2.25C3.3.77,4.82-.16,6.03.58l12.88,7.87,12.88,7.87Z" /></svg>
        <svg class="icon-stop" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><rect x="4.71" y="4.71" width="26.58" height="26.58" rx="2.03" ry="2.03"/></svg>`;
        startButton.setAttribute("data-task-id", task.id);
        startButton.addEventListener("click", (e) => app.timer.toggleTimer(e));
        taskActions.appendChild(startButton);

        // Create an options buttons
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

        // Create an options menu
        const optionsMenu = document.createElement("div");
        optionsMenu.classList.add("task__options-menu");
        optionsMenu.id = `options-menu-${task.id}`;

        // Create an edit button
        const editButton = document.createElement("button");
        editButton.classList.add("task__options-menu-item");
        editButton.innerHTML = "Edit";

        // Create a delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add(`task__options-menu-item`);
        deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener("click", () =>
          this.deleteTaskById(task.id)
        );

        // Create a close button
        const closeButton = document.createElement("button");
        closeButton.classList.add("task__options-menu-item");
        closeButton.addEventListener("click", () =>
          this.closeOptionsMenu(task.id)
        );
        closeButton.innerHTML = "X";

        // Append the buttons to the options menu
        optionsMenu.appendChild(editButton);
        optionsMenu.appendChild(deleteButton);
        optionsMenu.appendChild(closeButton);

        // Append the options menu to the task actions
        taskActions.appendChild(optionsMenu);

        // Append the task actions to the task item
        taskItem.appendChild(taskActions);

        // Append the task item to the task list
        taskList.appendChild(taskItem);
      });
    } else {
      // If there are no tasks, display a message
      taskList.innerHTML = "<p>No tasks yet</p>";
    }
  }

  /**
   * Returns an array of tasks from local storage
   * @returns {Array}
   */
  getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  }

  /**
   * Delete a task by id
   * @param {*} taskId
   */
  deleteTaskById(taskId) {
    let tasks = this.getTasks(); // Retrieve the current list of tasks
    tasks = tasks.filter((task) => task.id !== taskId); // Filter out the task with the given ID
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Update the tasks in local storage
    this.renderTasks(); // Refresh the displayed task list
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

class Timer {
  constructor() {
    this.activeTimer = {};
  }

  toggleTimer(e) {
    const taskEl = e.target;
    const taskId = taskEl.getAttribute("data-task-id");

    if (taskId) {
      const tasks = app.task.getTasks();
      const taskIndex = tasks.findIndex((task) => task.id === taskId);

      const isRunning = tasks[taskIndex].isRunning;

      if (!isRunning) {
        this.stopAnyRunningTimers();
        taskEl.classList.add("task__timer--active");
        tasks[taskIndex].isRunning = true;
        localStorage.setItem("tasks", JSON.stringify(tasks));
      } else {
        taskEl.classList.remove("task__timer--active");
        tasks[taskIndex].isRunning = false;
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }

      console.log(tasks[taskIndex]);
      // this.activeTimer = setInterval(() => {
      //   console.log("timer is running");
      // });
    }
  }

  stopAnyRunningTimers() {
    let tasks = app.task.getTasks();

    tasks.forEach((task) => {
      if (task.isRunning) {
        const taskEl = document.querySelector(`[data-task-id="${task.id}"]`);
        taskEl.classList.remove("task__timer--active");
        task.isRunning = false;
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

class App {
  constructor() {
    this.task = new Task();
    this.timer = new Timer();
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
