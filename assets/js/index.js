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

  padZero(number) {
    return number < 10 ? "0" + number : number;
  }

  formatTime(time) {
    let hours = Math.floor(time / 3600);
    hours = app.utils.padZero(hours);
    let minutes = Math.floor((time % 3600) / 60);
    minutes = app.utils.padZero(minutes);
    let seconds = time % 60;
    seconds = app.utils.padZero(seconds);
    return `${hours}:${minutes}:${seconds}`;
  }
}

class Project {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.color = "";
  }

  addProject() {
    // Get the project name from the input
    const projectInput = document.getElementById("project-name");
    const projectName = projectInput.value.trim();

    // Generate a unique id
    const projectId = Utils.generateUniqueId();

    // Check if the project name is empty
    if (projectName === "" || !projectName) {
      return;
    }

    // Get the projects from local storage
    const projects = this.getProjects();

    // Create a new project object
    const newProject = new Project(projectId, projectName);

    // Add the new project to the projects array
    projects.push(newProject);
    localStorage.setItem("projects", JSON.stringify(projects));

    // Reset the form
    projectInput.value = "";
    this.renderProjects();

    return projectId;
  }

  updateProjectColor(projectId, color) {
    const projects = this.getProjects();
    const projectIndex = projects.findIndex(
      (project) => project.id === projectId
    );
    if (projectIndex !== -1) {
      projects[projectIndex].color = color;
      localStorage.setItem("projects", JSON.stringify(projects));
      this.renderProjects();
    }
  }

  updateProjectName(projectId, projectName) {
    const projects = this.getProjects();
    const projectIndex = projects.findIndex(
      (project) => project.id === projectId
    );
    if (projectIndex !== -1) {
      projects[projectIndex].name = projectName;
      localStorage.setItem("projects", JSON.stringify(projects));
      this.renderProjects();
    }
  }

  renderProjects() {
    // Get the projects from local storage
    const projects = this.getProjects();
    const projectList = document.querySelector(".projects-list");

    const addProject = document.createElement("div");
    addProject.classList.add("project", "project--add");
    addProject.innerHTML = `
    <div class="project__details">
      <input type="text" class="project__title" id="project-name" placeholder="Project Name" />
    </div>
    `;

    const projectActions = document.createElement("div");
    projectActions.classList.add("project__actions");

    const projectAdd = document.createElement("button");
    projectAdd.classList.add("project__add");
    projectAdd.innerHTML = `Add Project`;
    projectAdd.addEventListener("click", () => this.addProject());

    projectActions.appendChild(projectAdd);
    addProject.appendChild(projectActions);

    // Check if there are any projects
    if (projects.length !== 0) {
      // If there are projects, clear the project list
      projectList.innerHTML = "";
      projects.forEach((project) => {
        console.log(project);
        // Create a project item
        const projectItem = document.createElement("div");
        projectItem.setAttribute("data-project-id", project.id);
        projectItem.classList.add("project");

        // Create a project details node
        const projectDetails = document.createElement("div");
        projectDetails.classList.add("project__details");

        // Create a project title node
        const detailsInput = document.createElement("input");
        detailsInput.setAttribute("type", "text");
        detailsInput.setAttribute("value", project.name);
        detailsInput.classList.add("project__title");
        detailsInput.addEventListener("change", (e) => {
          this.updateProjectName(project.id, e.target.value);
        });

        const colorPicker = document.createElement("input");
        colorPicker.setAttribute("type", "color");
        colorPicker.classList.add("project__color-picker");
        colorPicker.value = project.color || "#ffffff"; // Default to white if no color is set
        colorPicker.addEventListener("change", (e) => {
          this.updateProjectColor(project.id, e.target.value);
        });

        const projectActions = document.createElement("div");
        projectActions.classList.add("project__actions");

        const projectDelete = document.createElement("button");
        projectDelete.classList.add("project__delete");
        projectDelete.innerHTML = `Delete`;
        projectDelete.addEventListener("click", () => {
          this.deleteProject(project.id);
        });

        projectActions.appendChild(colorPicker);
        projectActions.appendChild(projectDelete);

        // Build the project details
        projectDetails.appendChild(detailsInput);
        projectItem.appendChild(projectDetails);
        projectItem.appendChild(projectActions);

        projectList.appendChild(projectItem);
      });
    }

    projectList.appendChild(addProject);
  }

  getProjects() {
    return JSON.parse(localStorage.getItem("projects")) || [];
  }

  renderProjectsDropdown() {
    const projectsDropdown = document.querySelector(".projects-dropdown");
    const projects = this.getProjects();

    const defaultOption = document.createElement("option");
    defaultOption.classList.add("projects-dropdown__item");
    defaultOption.setAttribute("value", "");
    defaultOption.innerHTML = "No Project";
    projectsDropdown.appendChild(defaultOption);

    if (projects.length !== 0) {
      projects.forEach((project) => {
        const projectItem = document.createElement("option");
        projectItem.classList.add("projects-dropdown__item");
        projectItem.setAttribute("value", project.id);
        projectItem.innerHTML = project.name;
        projectsDropdown.appendChild(projectItem);
      });
    }
  }

  deleteProject(projectId) {
    let projects = this.getProjects(); // Retrieve the current list of projects
    projects = projects.filter((project) => project.id !== projectId); // Filter out the project with the given ID
    localStorage.setItem("projects", JSON.stringify(projects)); // Update the projects in local storage
    this.renderProjects(); // Refresh the displayed project list
  }
}

class Task {
  /**
   * Task constructor function to create a new task object with the following properties: name, dueDate, timeSpent, id
   * @param {*} name
   * @param {*} dueDate
   * @param {*} creationDate
   */
  constructor(name, id, projectId) {
    this.id = id;
    this.name = name;
    this.dueDate = "";
    this.creationDate = new Date();
    this.details = "";
    this.timeSpent = 0;
    this.startTime = 0;
    this.isRunning = false;
    this.completed = false;
    this.projectId = projectId;
  }

  addTask() {
    // Get the task name from the input
    const taskInput = document.getElementById("task-name");
    const taskName = taskInput.value.trim();

    const taskProject = document.getElementById("task-project");
    const projectId = taskProject.value;

    // Generate a unique id
    const taskId = Utils.generateUniqueId();

    // Check if the task name is empty
    if (taskName === "" || !taskName) {
      return;
    }

    // Get the tasks from local storage
    const tasks = this.getTasks();

    // Create a new task object
    const newTask = new Task(taskName, taskId, projectId);

    // Add the new task to the tasks array
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Reset the form
    taskInput.value = "";
    this.renderTasks();

    return taskId;
  }

  /**
   * Render the tasks in the DOM
   * @returns void
   */
  renderTasks() {
    // Get the tasks from local storage
    const tasks = this.getTasks();
    const taskList = document.getElementById("tasks");

    const tasksUncompleted = document.createElement("div");
    tasksUncompleted.classList.add("tasks__uncompleted");
    tasksUncompleted.innerHTML = "<h2>Tasks</h2>";

    const tasksCompleted = document.createElement("div");
    tasksCompleted.classList.add("tasks__completed");
    tasksCompleted.innerHTML = "<h2>Completed</h2>";

    const clearCompleted = document.createElement("button");
    clearCompleted.classList.add("button", "button--clear");
    clearCompleted.innerHTML = "Clear Completed Tasks";
    clearCompleted.addEventListener("click", () => this.clearCompleted());

    // Get running task
    const runningTask = tasks.find((task) => task.isRunning === true);

    if(tasks.length <= 0) {
      taskList.innerHTML = "";
      const noTasks = document.createElement("p");
      noTasks.classList.add("no-tasks");
      noTasks.innerHTML = "No tasks yet. Add a task to get started.";
      tasksUncompleted.appendChild(noTasks);
      taskList.appendChild(tasksUncompleted);
      taskList.appendChild(tasksCompleted);
      return;
    }

    // If there are tasks, clear the task list
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      // Create a task item
      const taskItem = document.createElement("div");
      taskItem.setAttribute("data-completed", task.completed);
      taskItem.setAttribute("data-task-id", task.id);

      taskItem.classList.add("task");

      // Create a task details node
      const taskDetails = document.createElement("div");
      taskDetails.classList.add("task__details");

      // Create a task status node
      const detailsStatus = document.createElement("div");
      detailsStatus.classList.add("task__status");
      detailsStatus.setAttribute("data-completed", task.completed);
      detailsStatus.setAttribute("data-task-id", task.id);
      detailsStatus.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
        <path
          d="m34.52,9.87l-4.9-4.9c-.44-.44-1.16-.44-1.61,0l-12.57,12.57c-.44.44-1.16.44-1.61,0l-5.84-5.84c-.44-.44-1.16-.44-1.61,0l-4.9,4.9c-.44.44-.44,1.16,0,1.61l13.15,13.15h0s19.9-19.88,19.9-19.88c.44-.44.44-1.16,0-1.61Z"
        />
      </svg>
    `;
      detailsStatus.addEventListener("click", () =>
        this.toggleCompleted(task.id)
      );

      // Task Project
      const projects = JSON.parse(localStorage.getItem("projects")) || [];
      const taskProject = projects.find((project) => project.id === task.projectId);

      const taskProjectDot = document.createElement("div");
      taskProjectDot.classList.add("task__project");
      if(taskProject !== undefined) {
        taskProjectDot.setAttribute("title", taskProject.name);
        taskProjectDot.style.backgroundColor = taskProject.color;
      } else {
        taskProjectDot.setAttribute("title", "No Project");
        taskProjectDot.style.backgroundColor = "#ffffff";
      }

      // Create a task title node
      const detailsInput = document.createElement("input");
      detailsInput.setAttribute("type", "text");
      detailsInput.setAttribute("value", task.name);
      detailsInput.classList.add("task__title");
      detailsInput.setAttribute("data-task-id", task.id);
      detailsInput.addEventListener("change", (e) => {
        this.updateTaskName(task.id, e.target.value);
      });

      // Build the task details
      taskDetails.appendChild(detailsStatus);
      taskDetails.appendChild(taskProjectDot);
      taskDetails.appendChild(detailsInput);
      taskItem.appendChild(taskDetails);

      // Create a task actions
      const taskActions = document.createElement("div");
      taskActions.classList.add("task__actions");

      // Create a task timer node
      const taskTimer = document.createElement("div");
      taskTimer.classList.add("task__timer");
      taskTimer.setAttribute("data-task-timer", task.id);
      taskTimer.innerHTML = app.utils.formatTime(task.timeSpent);
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
      editButton.classList.add("button", "button--edit");
      editButton.setAttribute("data-task-id", task.id);
      editButton.addEventListener("click", () => {
        this.closeOptionsMenu(task.id);
        this.renderTaskEditWindow(task.id);
      });
      editButton.innerHTML = "Edit";

      // Create a delete button
      const deleteButton = document.createElement("button");
      deleteButton.classList.add(`button`, `button--delete`);
      deleteButton.innerHTML = "Delete";
      deleteButton.addEventListener("click", () =>
        this.deleteTaskById(task.id)
      );

      // Create a close button
      const closeButton = document.createElement("button");
      closeButton.classList.add("button", "button--close");
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
      if (task.completed) {
        tasksCompleted.appendChild(taskItem);
      } else {
        tasksUncompleted.appendChild(taskItem);
      }

      taskList.appendChild(tasksUncompleted);
      taskList.appendChild(tasksCompleted);
      tasksCompleted.appendChild(clearCompleted);
    });
    
  }

  updateTaskName(taskId, taskName) {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    tasks[taskIndex].name = taskName;
    localStorage.setItem("tasks", JSON.stringify(tasks));
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
   * Delete all completed tasks
   */
  clearCompleted() {
    let tasks = this.getTasks();
    tasks = tasks.filter((task) => task.completed !== true);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.renderTasks();
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

  /**
   * Toggle the completed status of a task
   * @param {*} taskId
   */
  toggleCompleted(taskId) {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.renderTasks();
  }

  closeOptionsMenu(taskId) {
    const menu = document.getElementById(`options-menu-${taskId}`);
    if (menu) {
      menu.style.display = "none";
    }
  }

  renderTaskEditWindow(taskId) {
    const task = this.getTaskDetails(taskId);
    console.log(task);

    const app = document.getElementById("app");
    const editWindow = document.createElement("div");
    editWindow.classList.add("edit-window");
    editWindow.innerHTML = `
      <div class="edit-window__header">
        <h2>Edit Task</h2>
      </div>
    `;

    const details = document.createElement("div");
    details.classList.add("edit-window__body");

    const taskName = document.createElement("input");
    taskName.setAttribute("type", "text");
    taskName.setAttribute("id", "edit-task-name");
    taskName.setAttribute("value", task.name);

    const dueDate = document.createElement("input");
    dueDate.setAttribute("type", "date");
    dueDate.setAttribute("id", "edit-task-due-date");
    dueDate.setAttribute("value", task.dueDate);

    const projects = JSON.parse(localStorage.getItem("projects")) || [];

    let taskProject = projects.find((project) => project.id === task.projectId);
    if(taskProject === undefined) {
      taskProject = {name: "No Project", id: ""};
    }

    const projectSelect = document.createElement("select");
    projectSelect.setAttribute("id", "edit-task-project");
    projectSelect.setAttribute("value", task.projectId);
    projectSelect.innerHTML = `
      <option value="${task.projectId}">${taskProject.name}</option>
    `;
    
    projects.forEach((project) => {
      const projectItem = document.createElement("option");
      projectItem.classList.add("projects-dropdown__item");
      projectItem.setAttribute("value", project.id);
      projectItem.innerHTML = project.name;
      console.log(projectItem)
      projectSelect.appendChild(projectItem);
    });

    const taskDetails = document.createElement("textarea");
    taskDetails.setAttribute("id", "edit-task-details");
    taskDetails.innerHTML = task.details;

    details.appendChild(taskName);
    details.appendChild(dueDate);
    details.appendChild(projectSelect);
    details.appendChild(taskDetails);

    const footer = document.createElement("div");
    footer.classList.add("edit-window__footer");

    const saveButton = document.createElement("button");
    saveButton.classList.add("button", "button--save");
    saveButton.innerHTML = "Save";
    saveButton.addEventListener("click", () => {
      const taskName = document.getElementById("edit-task-name").value;
      const dueDate = document.getElementById("edit-task-due-date").value;
      const projectId = document.getElementById("edit-task-project").value;
      const details = document.getElementById("edit-task-details").value;
      this.updateTask(taskId, taskName, dueDate, projectId, details);
    });

    const closeButton = document.createElement("button");
    closeButton.classList.add("button", "button--close");
    closeButton.innerHTML = "Close";
    closeButton.addEventListener("click", () => {
      editWindow.remove();
    });

    footer.appendChild(saveButton);
    footer.appendChild(closeButton);
    editWindow.appendChild(details);
    editWindow.appendChild(footer);

    app.appendChild(editWindow);
  }

  updateTask(taskId, taskName, dueDate, projectId, details) {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const menu = document.getElementById(`options-menu-${taskId}`);
    console.log(taskName, dueDate, details);
    tasks[taskIndex].name = taskName;
    tasks[taskIndex].dueDate = dueDate;
    tasks[taskIndex].projectId = projectId;
    tasks[taskIndex].details = details;    
    console.log(tasks[taskIndex])
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.renderTasks();
    if (menu) {
      menu.style.display = "none";
    }
  }

  getTaskDetails(taskId) {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    return tasks[taskIndex];
  }
  
  setupEditButtonListener() {
    const editButtons = document.querySelectorAll(".task__options-edit");
    editButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const taskId = button.getAttribute("data-task-id");
        this.renderTaskEditWindow(taskId);
      });
    });
  }
}

class Timer {
  constructor() {
    this.activeTimer = {};
    this.runningTaskId = "";
  }

  updateWeeklyTime() {
    const tasks = app.task.getTasks();
    const weeklyTime = document.querySelector(".weekly-time");

    const now = new Date();

    // Calculate the start and end of the week
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1));
    startOfWeek.setHours(0, 0, 0, 0); // Set to Monday 00:00
    const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 7));
    endOfWeek.setHours(23, 59, 59, 999); // Set to Sunday 23:59

    // Filter tasks within this week and sum their time
    const weeklyTotal = tasks.reduce((total, task) => {
      const taskDate = new Date(task.creationDate);
      if (taskDate >= startOfWeek && taskDate <= endOfWeek) {
        return total + task.timeSpent;
      }
      return total;
    }, 0);

    weeklyTime.innerHTML = app.utils.formatTime(weeklyTotal);
  }

  updateRunningTimer() {
    const timer = document.querySelector("#timer");
    const timerButton = document.querySelector("[data-action='task-timer']");

    if (this.runningTaskId === "") {
      timerButton.classList.remove("timer-toggle--active");
      timerButton.removeAttribute("data-running-task-id");
      timer.innerHTML = "00:00:00";
    } else {
      timerButton.classList.add("timer-toggle--active");
      timerButton.setAttribute("data-running-task-id", this.runningTaskId);
    }
  }

  toggleTimer(e) {
    // Get the task id from the button
    const button = e.target;
    const buttonType = button.getAttribute("data-action");
    // const buttonStatus = button.getAttribute("data-status");
    const taskId = button.getAttribute("data-task-id");

    // Stop running timer before running a new one
    if (this.runningTaskId !== "" && this.runningTaskId !== taskId) {
      this.stopTimer();
    }

    if (buttonType === "task-timer") {
      this.runningTaskId = app.task.addTask(e);
    } else {
      this.runningTaskId = taskId;
    }

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

    tasks[taskIndex].isRunning = true;
    tasks[taskIndex].startTime = now.getTime();

    const taskName = document.getElementById("task-name");
    taskName.value = tasks[taskIndex].name;

    this.activeTimer[taskId] = setInterval(() => {
      this.updateTaskTime(taskId);
    }, 1000);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.updateRunningTimer();
  }

  restartTimer() {
    const tasks = app.task.getTasks();

    const taskIndex = tasks.findIndex((task) => task.isRunning === true);
    if (taskIndex < 0) return;

    const task = tasks[taskIndex];
    const taskId = task.id;

    this.runningTaskId = taskId;

    const now = new Date().getTime();
    const elapsed = now - task.startTime;
    const elapsedSeconds = Math.floor(elapsed / 1000);

    const totalTime = task.timeSpent + elapsedSeconds;

    const taskName = document.getElementById("task-name");
    taskName.value = tasks[taskIndex].name;

    tasks[taskIndex].timeSpent = totalTime;
    tasks[taskIndex].startTime = now;

    this.activeTimer[taskId] = setInterval(() => {
      this.updateTaskTime(taskId);
    }, 1000);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.updateRunningTimer();
  }

  stopTimer() {
    if (!this.runningTaskId) return;
    const taskId = this.runningTaskId;

    const taskName = document.getElementById("task-name");
    taskName.value = "";

    clearInterval(this.activeTimer[taskId]);
    delete this.activeTimer[taskId];

    const tasks = app.task.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    const taskEl = document.querySelector(`[data-task-id="${taskId}"]`);
    taskEl.classList.remove("timer-toggle--active");

    const taskTimer = document.querySelector(`[data-task-timer="${taskId}"]`);
    const time = app.utils.formatTime(tasks[taskIndex].timeSpent);
    taskTimer.innerHTML = `${time}`;

    tasks[taskIndex].isRunning = false;
    tasks[taskIndex].startTime = 0;
    this.runningTaskId = "";

    localStorage.setItem("tasks", JSON.stringify(tasks));

    this.updateRunningTaskTimeUI(taskId);
    this.updateRunningTimer();
  }

  updateRunningTaskTimeUI(taskId) {
    const tasks = app.task.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const taskEl = document.querySelector(`#timer`);
    const totalSeconds = tasks[taskIndex].timeSpent;
    const time = app.utils.formatTime(totalSeconds);
    taskEl.innerHTML = `${time}`;
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
    this.updateRunningTaskTimeUI(taskId);
  }
}

class App {
  constructor() {
    this.utils = new Utils();
    this.project = new Project();
    this.task = new Task();
    this.timer = new Timer();
  }
  init() {
    if (window.location.href.toLowerCase().includes("projects.html")) {
      this.project.renderProjects();
    } else {
      this.task.renderTasks();
      this.timer.restartTimer();
      // this.timer.updateWeeklyTime();
      this.project.renderProjectsDropdown();
      document
        .querySelector('[data-action="task-timer"]')
        .addEventListener("click", (e) => this.timer.toggleTimer(e));
      document
        .querySelector('[data-action="task-add"]')
        .addEventListener("click", (e) => this.task.addTask(e));
      document.querySelector("#task-name").addEventListener("keypress", (e) => {
        if (e.key == "Enter") {
          this.task.addTask();
        }
      });
    }
  }
}

let app;

document.addEventListener("DOMContentLoaded", () => {
  app = new App();
  app.init();
});
