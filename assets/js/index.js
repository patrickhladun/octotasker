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

  formatTime(number) {
    return number < 10 ? "0" + number : number;
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
    this.timeSpent = 0;
    this.startTime = 0;
    this.isRunning = false;
  }

  addTask() {
    // Get the task name from the input
    const taskInput = document.getElementById("task-name");
    const taskName = taskInput.value.trim();

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
    taskInput.value = "";
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

    // Get running task
    const runningTask = tasks.find((task) => task.isRunning === true);

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
        taskTimer.setAttribute("data-task-timer", task.id);
        const totalSeconds = task.timeSpent;
        let hours = Math.floor(totalSeconds / 3600);
        hours = app.utils.formatTime(hours);
        let minutes = Math.floor((totalSeconds % 3600) / 60);
        minutes = app.utils.formatTime(minutes);
        let seconds = totalSeconds % 60;
        seconds = app.utils.formatTime(seconds);
        taskTimer.innerHTML = `${hours}:${minutes}:${seconds}`;
        taskActions.appendChild(taskTimer);

        // Create a start button
        const startButton = document.createElement("button");
        if (task.isRunning && task.startTime !== 0) {
          startButton.classList.add(
            "timer-toggle",
            "timer-toggle--active",
            "action-icon"
          );
        } else {
          startButton.classList.add("timer-toggle", "action-icon");
        }
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
    this.runningTaskId = "";
  }

  toggleTimer(e) {
    // Get the task id from the button
    const taskEl = e.target;
    const taskId = taskEl.getAttribute("data-task-id");

    // Check if there is a running timer when the button is clicked and stop it before running a new one
    if (this.runningTaskId !== "" && this.runningTaskId !== taskId) {
      this.stopTimer();
    }

    this.runningTaskId = taskId;

    if (this.runningTaskId) {
      const tasks = app.task.getTasks();
      const taskIndex = tasks.findIndex(
        (task) => task.id === this.runningTaskId
      );
      const isRunning = tasks[taskIndex].isRunning;

      if (taskIndex < 0) return;

      if (!isRunning) {
        this.startTimer();
      } else {
        this.stopTimer();
      }
    }
  }

  startTimer() {
    if (this.runningTaskId === "") {
      return;
    }

    const now = new Date();
    const taskId = this.runningTaskId;
    const tasks = app.task.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    const taskEl = document.querySelector(`[data-task-id="${taskId}"]`);
    taskEl.classList.add("timer-toggle--active");

    console.log(tasks[taskIndex]);

    tasks[taskIndex].isRunning = true;
    tasks[taskIndex].startTime = now.getTime();

    this.activeTimer[taskId] = setInterval(() => {
      this.updateTaskTime(taskId);
    }, 1000);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  restartTimer() {
    const tasks = app.task.getTasks();
    console.log(tasks);

    const taskIndex = tasks.findIndex((task) => task.isRunning === true);
    if (taskIndex < 0) return;

    const task = tasks[taskIndex];
    const taskId = task.id;
    console.log(task);

    this.runningTaskId = taskId;

    const now = new Date().getTime();
    const elapsed = now - task.startTime;
    const elapsedSeconds = Math.floor(elapsed / 1000);
    console.log(`Elapsed: ${elapsedSeconds}`);

    const totalTime = task.timeSpent + elapsedSeconds;
    console.log(`Total: ${totalTime}`);

    tasks[taskIndex].timeSpent = totalTime;
    tasks[taskIndex].startTime = now;

    this.activeTimer[taskId] = setInterval(() => {
      this.updateTaskTime(taskId);
    }, 1000);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  stopTimer() {
    if (!this.runningTaskId) return;
    const taskId = this.runningTaskId;

    clearInterval(this.activeTimer[taskId]);
    delete this.activeTimer[taskId];

    const tasks = app.task.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    const taskEl = document.querySelector(`[data-task-id="${taskId}"]`);
    taskEl.classList.remove("timer-toggle--active");

    tasks[taskIndex].isRunning = false;
    tasks[taskIndex].startTime = 0;
    this.runningTaskId = "";
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.updateTaskTimeUI(taskId);
  }

  updateTaskTimeUI(taskId) {
    const tasks = app.task.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const taskEl = document.querySelector(`[data-task-timer="${taskId}"]`);
    const totalSeconds = tasks[taskIndex].timeSpent;
    let hours = Math.floor(totalSeconds / 3600);
    hours = app.utils.formatTime(hours);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    minutes = app.utils.formatTime(minutes);
    let seconds = totalSeconds % 60;
    seconds = app.utils.formatTime(seconds);
    taskEl.innerHTML = `${hours}:${minutes}:${seconds}`;
  }

  updateTaskTime(taskId) {
    const now = new Date();
    let tasks = app.task.getTasks();
    let taskIndex = tasks.findIndex((task) => task.id === taskId);

    // Increment the time spent
    tasks[taskIndex].timeSpent++;

    // Update the start time
    tasks[taskIndex].startTime = now.getTime();

    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.updateTaskTimeUI(taskId);
    console.log(
      `Update: ${tasks[taskIndex].timeSpent} id: ${taskId} running task id: ${this.runningTaskId}`
    );
  }
}

class App {
  constructor() {
    this.task = new Task();
    this.timer = new Timer();
    this.utils = new Utils();
  }
  init() {
    this.task.renderTasks();
    this.timer.restartTimer();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  app = new App();
  app.init();

  document
    .querySelector('[data-action="task-timer"]')
    .addEventListener("click", (e) => app.task.addTask(e));

  document
    .querySelector('[data-action="task-add"]')
    .addEventListener("click", (e) => app.task.addTask(e));

  document.querySelector("#task-name").addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
      app.task.addTask();
    }
  });
});
