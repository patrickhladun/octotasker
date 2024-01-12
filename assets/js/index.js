/**
 * The Utils class provides a collection of utility methods for general purposes.
 *
 * Methods:
 * - generateUniqueId: Generates a unique string ID
 * - padZero: Adds a leading zero to single-digit numbers
 * - formatTime: Converts a time into a human-readable string
 */
class Utils {
  /**
   * Generates a unique ID by combining random numbers with the current
   * timestamp.
   *
   * @returns {string}
   */
  static generateUniqueId() {
    const random = Math.random().toString().slice(2, 5);
    const date = new Date().getTime().toString();
    return random + date;
  }

  /**
   * Prepends a zero to a single-digit digit (less than 10) and returns
   * it as a string. If the digit is 10 or greater, it returns the digit
   * as-is.
   *
   * @param {int}
   * @returns {string}
   */
  static padZero(digit) {
    const doubleDigit = digit < 10 ? "0" + digit : digit;
    return String(doubleDigit);
  }

  /**
   * Formats a time value given in seconds into a human-readable string of
   * hours, minutes, and seconds.Each component (hours, minutes, seconds)
   * is padded with a leading zero if it's a single digit.
   *
   * @param {int} time
   * @returns {string}
   */
  static formatTime(time) {
    let hours = Math.floor(time / 3600);
    hours = Utils.padZero(hours);
    let minutes = Math.floor((time % 3600) / 60);
    minutes = Utils.padZero(minutes);
    let seconds = time % 60;
    seconds = Utils.padZero(seconds);
    return `${hours}:${minutes}:${seconds}`;
  }

  static showAlert(message, type) {
    const alertContainer = document.getElementById("alert-container");
    const alertDiv = document.createElement("div");

    if (type === "danger") {
      alertDiv.classList.add("alert", "alert--danger");
    } else if (type === "success") {
      alertDiv.classList.add("alert", "alert--success");
    } else {
      alertDiv.classList.add("alert", "alert--info");
    }

    alertDiv.innerText = message;

    alertContainer.appendChild(alertDiv);

    // Remove the alert after 2 seconds
    setTimeout(() => {
      alertContainer.removeChild(alertDiv);
    }, 2000);
  }
}

/**
 * Represents a project with operations to manage it in local storage.
 * This class provides methods to add, update, delete, and render projects,
 * as well as to get project details from local storage.
 *
 * Constructor:
 * @param {string} id
 * @param {string} name
 * @param {string} [color=""]
 *
 * Key Methods:
 * - addProject: Adds a new project and returns its ID.
 * - updateProjectColor: Updates the color of a project.
 * - updateProjectName: Updates the name of a project.
 * - deleteProject: Deletes a project by its ID.
 * - getProjects: Retrieves projects from local storage.
 * - renderProjects: Renders the list of projects on the UI.
 * - renderProjectsDropdown: Renders projects in a dropdown menu.
 */
class Project {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.color = "";
  }

  /**
   * Adds a new project to local storage and returns its unique ID.
   * If the project name is empty, the method will not add it and
   * returns nothing.
   *
   * @returns {string|void}
   */
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

    Utils.showAlert("Project added successfully", "success");

    return projectId;
  }

  /**
   * Updates the color of a project with a given ID in local storage.
   * It finds the project by its ID, then changes its color.
   *
   * @param {string} projectId
   * @param {string} color
   * @returns {void}
   */
  updateProjectColor(projectId, color) {
    const projects = this.getProjects();
    const projectIndex = projects.findIndex(
      (project) => project.id === projectId
    );
    if (projectIndex !== -1) {
      projects[projectIndex].color = color;
      localStorage.setItem("projects", JSON.stringify(projects));
      this.renderProjects();
      Utils.showAlert("Project color updated successfully", "success");
    }
  }

  /**
   * Updates the name of a project with a given ID in local storage.
   *
   * @param {string} projectId
   * @param {string} projectName
   * @returns {void}
   */
  updateProjectName(projectId, projectName) {
    const projects = this.getProjects();
    const projectIndex = projects.findIndex(
      (project) => project.id === projectId
    );
    if (projectIndex !== -1) {
      projects[projectIndex].name = projectName;
      localStorage.setItem("projects", JSON.stringify(projects));
      this.renderProjects();
      Utils.showAlert("Project name updated successfully", "success");
    }
  }

  /**
   * Renders the list of projects in the DOM.
   * It gets the projects from local storage, then iterates through
   * them and renders them in the DOM.
   *
   * @returns {void}
   */
  renderProjects() {
    // Get the projects from local storage
    const projects = this.getProjects();
    const projectList = document.querySelector(".projects-list");
    projectList.innerHTML = "";

    const addProject = document.createElement("div");
    addProject.classList.add("project", "project--add");
    addProject.innerHTML = `
    <div class="project__details">
      <input type="text" aria-label="Project Title" class="project__title" id="project-name" placeholder="Project Name" />
    </div>
    `;

    const projectActions = document.createElement("div");
    projectActions.classList.add("project__actions");

    const projectAdd = document.createElement("button");
    projectAdd.setAttribute("aria-label", "Add Project");
    projectAdd.classList.add(
      "project__add",
      "button",
      "button--regular",
      "button--primary"
    );
    projectAdd.innerHTML = `Add Project`;
    projectAdd.addEventListener("click", () => this.addProject());

    projectActions.appendChild(projectAdd);
    addProject.appendChild(projectActions);

    // Check if there are any projects
    if (projects.length !== 0) {
      // If there are projects, clear the project list
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
        detailsInput.setAttribute(
          "aria-label",
          `Project name: ${project.name}`
        );
        detailsInput.setAttribute("type", "text");
        detailsInput.setAttribute("value", project.name);
        detailsInput.classList.add("project__title");
        detailsInput.addEventListener("change", (e) => {
          this.updateProjectName(project.id, e.target.value);
        });

        const colorPicker = document.createElement("input");
        colorPicker.setAttribute("aria-label", `Project color: ${project.name}`);
        colorPicker.setAttribute("type", "color");
        colorPicker.classList.add("project__color-picker");
        colorPicker.value = project.color || "#ffffff"; // Default to white if no color is set
        colorPicker.addEventListener("change", (e) => {
          this.updateProjectColor(project.id, e.target.value);
        });

        const projectActions = document.createElement("div");
        projectActions.classList.add("project__actions");

        const projectDelete = document.createElement("button");
        projectDelete.classList.add(
          "project__delete",
          "button",
          "button--small",
          "button--danger-outline"
        );
        projectDelete.innerHTML = `Delete`;
        projectDelete.addEventListener("click", () => {
          this.deleteProject(project.id);
        });

        projectActions.appendChild(projectDelete);

        // Build the project details
        projectDetails.appendChild(colorPicker);
        projectDetails.appendChild(detailsInput);
        projectItem.appendChild(projectDetails);
        projectItem.appendChild(projectActions);

        projectList.appendChild(projectItem);
      });
    }

    projectList.appendChild(addProject);
  }

  /**
   * Retrieves the projects from local storage and returns them as
   * an array.
   *
   * @returns {Array}
   */
  getProjects() {
    return JSON.parse(localStorage.getItem("projects")) || [];
  }

  /**
   * Renders the projects in a dropdown menu.
   *
   * @returns {void}
   */
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

  /**
   * Deletes a project from local storage based on its ID.
   * It removes the project from the stored list and updates the
   * display.
   *
   * @param {string} projectId
   */
  deleteProject(projectId) {
    let projects = this.getProjects();
    // Filter out the project with the given ID
    projects = projects.filter((project) => project.id !== projectId);
    // Update the projects in local storage
    localStorage.setItem("projects", JSON.stringify(projects));
    // Refresh the displayed project list
    this.renderProjects();
    Utils.showAlert("Project deleted successfully", "success");
  }
}

/**
 * Represents a task with various properties and methods to manage tasks in an application.
 * This class includes functionalities to create, update, delete, and render tasks,
 * as well as to interact with local storage for persistence.
 *
 * Constructor:
 * - Initializes a new task object with properties like name, due date, creation date, details, etc.
 *
 * Methods:
 * - addTask: Adds a new task to local storage and returns its unique ID.
 * - renderTasks: Renders the list of tasks in the DOM.
 * - updateTask: Updates a task's details and saves it to local storage.
 * - getTasks: Retrieves an array of tasks from local storage.
 * - deleteTaskById: Deletes a task by its ID.
 * - clearCompleted: Deletes all completed tasks.
 * - openOptionsMenu: Opens the options menu for a task.
 * - closeOptionsMenu: Closes the options menu for a task.
 * - toggleCompleted: Toggles the 'completed' status of a task.
 * - renderTaskEditWindow: Renders an edit window for a specific task.
 * - updateTaskName: Updates the name of a task.
 * - getTaskDetails: Retrieves the details of a specific task.
 * - setupEditButtonListener: Sets up event listeners for task edit buttons.
 */
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

  /**
   * Adds a new task to local storage and returns its unique ID.
   *
   * @returns {string|void}
   */
  addTask() {
    // Get the task name from the input
    const taskInput = document.getElementById("task-name");
    const taskName = taskInput.value.trim();

    // Get the project id from the input
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
    taskProject.value = "";
    this.renderTasks();

    Utils.showAlert("Task added successfully", "success");

    return taskId;
  }

  /**
   * Renders the list of tasks in the DOM. It gets the tasks from local
   * storage, then iterates through them and renders them in the DOM.
   *
   * @returns {void}
   */
  renderTasks() {
    // Get the tasks from local storage
    const tasks = this.getTasks();
    const taskList = document.getElementById("tasks");

    // Get projects from local storage
    const projects = JSON.parse(localStorage.getItem("projects")) || [];

    // Create uncompleted task list container with heading
    const tasksUncompleted = document.createElement("div");
    tasksUncompleted.classList.add("tasks__uncompleted");
    tasksUncompleted.innerHTML = "<h2>Tasks</h2>";

    // Create completed task list container with heading
    const tasksCompleted = document.createElement("div");
    tasksCompleted.classList.add("tasks__completed");
    tasksCompleted.innerHTML = "<h2>Completed</h2>";

    // Create clear completed button
    const clearCompleted = document.createElement("button");
    if (tasks.filter((task) => task.completed === true).length === 0) {
      clearCompleted.style.display = "none";
    }
    clearCompleted.classList.add(
      "button",
      "button--regular",
      "button--danger-outline",
      "button--clear-completed"
    );
    clearCompleted.innerHTML = "Clear Completed Tasks";
    clearCompleted.addEventListener("click", () => this.clearCompleted());

    // Get running task
    const runningTask = tasks.find((task) => task.isRunning === true);

    // If there is a running task, render it
    if (tasks.length <= 0) {
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

      // Add a project dot to indicate the project
      const taskProject = projects.find(
        (project) => project.id === task.projectId
      );

      const taskProjectDot = document.createElement("div");
      taskProjectDot.classList.add("task__project");
      if (taskProject !== undefined) {
        taskProjectDot.setAttribute("title", taskProject.name);
        taskProjectDot.style.backgroundColor = taskProject.color;
      } else {
        taskProjectDot.setAttribute("title", "No Project");
        taskProjectDot.style.backgroundColor = "#ffffff";
      }

      // Create a task title node
      const detailsInput = document.createElement("input");
      detailsInput.setAttribute("aria-label", `Task name: ${task.name}`);
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
      taskTimer.innerHTML = Utils.formatTime(task.timeSpent);
      taskActions.appendChild(taskTimer);

      // Create a start button
      const startButton = document.createElement("button");
      startButton.setAttribute("aria-label", "Start Stop timer");
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
      <svg class="icon-start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path d="m29.8,16.04c1.51.87,1.51,3.06,0,3.93l-8.43,4.87-8.43,4.87c-1.51.87-3.4-.22-3.4-1.96V8.26c0-1.75,1.89-2.84,3.4-1.96l8.43,4.87,8.43,4.87Z"
    /></svg>
      <svg class="icon-stop" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><rect
      x="6.23"
      y="6.23"
      width="23.54"
      height="23.54"
      rx="2.03"
      ry="2.03"
    /></svg>`;
      startButton.setAttribute("data-task-id", task.id);
      // If the task is completed, disable the start button
      if (task.completed) {
        startButton.setAttribute("disabled", true);
      } else {
        startButton.addEventListener("click", (e) => app.timer.toggleTimer(e));
      }
      taskActions.appendChild(startButton);

      // Create an options buttons
      const optionsButton = document.createElement("button");
      optionsButton.setAttribute("aria-label", "Open Option Menu");
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
      editButton.classList.add("button", "button--small", "button--primary");
      editButton.setAttribute("data-task-id", task.id);
      editButton.addEventListener("click", () => {
        this.closeOptionsMenu(task.id);
        this.renderTaskEditWindow(task.id);
      });
      editButton.innerHTML = "Edit";

      // Create a delete button
      const deleteButton = document.createElement("button");
      deleteButton.classList.add(
        "button",
        "button--small",
        "button--danger-outline"
      );
      deleteButton.innerHTML = "Delete";
      deleteButton.addEventListener("click", () =>
        this.deleteTaskById(task.id)
      );

      // Create a close button
      const closeButton = document.createElement("button");
      closeButton.setAttribute("aria-label", "Close Option Menu");
      closeButton.classList.add("action-icon", "action-icon--danger");
      closeButton.addEventListener("click", () =>
        this.closeOptionsMenu(task.id)
      );
      closeButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path class="cls-1" d="m27.87,23.47l-5.48-5.48,5.48-5.48c.6-.6.61-1.59,0-2.19l-2.19-2.19c-.6-.6-1.59-.61-2.19,0l-5.48,5.48-5.47-5.47c-.6-.6-1.59-.61-2.19,0l-2.19,2.19c-.6.6-.61,1.59,0,2.19l5.48,5.48-5.48,5.48c-.6.6-.61,1.59,0,2.19l2.19,2.19c.6.6,1.59.61,2.19,0l5.48-5.48,5.48,5.48c.6.6,1.59.61,2.19,0l2.19-2.19c.6-.6.61-1.59,0-2.19h0Z"/></svg>
      `;

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

  /**
   * Updates the task name and saves it to local storage.
   *
   * @param {string} taskId
   * @param {string} taskName
   * @returns {void}
   */
  updateTaskName(taskId, taskName) {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    tasks[taskIndex].name = taskName;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    Utils.showAlert("Task name updated successfully", "success");
  }

  /**
   * Returns an array of tasks from local storage
   *
   * @returns {Array}
   */
  getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  }

  /**
   * Delete a task by id
   *
   * @param {string} taskId
   * @returns {void}
   */
  deleteTaskById(taskId) {
    let tasks = this.getTasks(); // Retrieve the current list of tasks
    tasks = tasks.filter((task) => task.id !== taskId); // Filter out the task with the given ID
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Update the tasks in local storage
    this.renderTasks(); // Refresh the displayed task list
    Utils.showAlert("Task deleted successfully", "success");
  }

  /**
   * Delete all completed tasks
   *
   * @returns {void}
   */
  clearCompleted() {
    let tasks = this.getTasks();
    tasks = tasks.filter((task) => task.completed !== true);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    Utils.showAlert("Completed tasks cleared successfully", "success");
    this.renderTasks();
  }

  /**
   * Open the options menu for a task
   *
   * @param {*} taskId
   * @returns {void}
   */
  openOptionsMenu(taskId) {
    const menu = document.getElementById(`options-menu-${taskId}`);
    if (menu) {
      menu.style.display = "flex";
    }
  }

  /**
   * Closes the options menu for a given task by setting its display
   * style to 'none'.
   *
   * @param {string} taskId
   * @returns {void}
   */
  closeOptionsMenu(taskId) {
    const menu = document.getElementById(`options-menu-${taskId}`);
    if (menu) {
      menu.style.display = "none";
    }
  }

  /**
   * Toggles the 'completed' status of a task identified by taskId.
   * If the task is found, it inverts its 'completed' status (true to false or vice versa),
   *
   * @param {string} taskId
   * @returns {void}
   */
  toggleCompleted(taskId) {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    app.timer.stopTimer();
    this.renderTasks();
  }

  /**
   * Closes the options menu for a given task by setting its display style to 'none'.
   *
   * @param {string} taskId
   * @returns {void}
   */
  closeOptionsMenu(taskId) {
    const menu = document.getElementById(`options-menu-${taskId}`);
    if (menu) {
      menu.style.display = "none";
    }
  }

  /**
   * Renders an edit window for a specific task, allowing the user to modify task details.
   * It creates a form with fields for task name, due date, project, and additional details.
   * The form also includes 'Save' and 'Close' buttons for submitting changes or closing the window.
   *
   * @param {string} taskId - The ID of the task to be edited.
   * @returns {void}
   */
  renderTaskEditWindow(taskId) {
    const task = this.getTaskDetails(taskId);
    const app = document.getElementById("app");

    // Create the edit window container and give it a class and heading
    const editWindow = document.createElement("div");
    editWindow.classList.add("edit-window");
    editWindow.innerHTML = `
      <div class="edit-window__header">
        <h2>Edit Task</h2>
      </div>
    `;

    // Create the edit window body
    const details = document.createElement("div");
    details.classList.add("edit-window__body");

    // Build Task Name Field element
    const nameField = document.createElement("div");
    nameField.classList.add("field");

    // Build Name Label element
    const nameLabel = document.createElement("label");
    nameLabel.classList.add("field__label");
    nameLabel.setAttribute("for", "edit-task-name");
    nameLabel.innerHTML = "Task Name";

    // Build Name Input element
    const taskName = document.createElement("input");
    taskName.setAttribute("type", "text");
    taskName.setAttribute("id", "edit-task-name");
    taskName.setAttribute("value", task.name);

    // Append Name Label and Input to Name Field
    nameField.appendChild(nameLabel);
    nameField.appendChild(taskName);

    // Build Due Date Field
    const dueDateField = document.createElement("div");
    dueDateField.classList.add("field");

    // Build Due Date Label element
    const dueDateLabel = document.createElement("label");
    dueDateLabel.classList.add("field__label");
    dueDateLabel.setAttribute("for", "edit-task-due-date");
    dueDateLabel.innerHTML = "Due Date";

    // Build Due Date Input element
    const dueDate = document.createElement("input");
    dueDate.setAttribute("type", "date");
    dueDate.setAttribute("id", "edit-task-due-date");
    dueDate.setAttribute("value", task.dueDate);

    // Append Due Date Label and Input to Due Date Field
    dueDateField.appendChild(dueDateLabel);
    dueDateField.appendChild(dueDate);

    // Get Projects from Local Storage
    const projects = JSON.parse(localStorage.getItem("projects")) || [];

    // If there are no projects, create a default project
    let taskProject = projects.find((project) => project.id === task.projectId);
    if (taskProject === undefined) {
      taskProject = { name: "No Project", id: "" };
    }

    // Build Project Field
    const projectsField = document.createElement("div");
    projectsField.classList.add("field");

    // Build Project Label element
    const projectLabel = document.createElement("label");
    projectLabel.classList.add("field__label");
    projectLabel.setAttribute("for", "edit-task-project");
    projectLabel.innerHTML = "Project";

    // Build Project Select element
    const projectSelect = document.createElement("select");
    projectSelect.setAttribute("id", "edit-task-project");
    projectSelect.setAttribute("value", task.projectId);
    projectSelect.innerHTML = `
      <option value="${task.projectId}">${taskProject.name}</option>
    `;

    // For each project, create an option and append it to the select element
    projects.forEach((project) => {
      const projectItem = document.createElement("option");
      projectItem.classList.add("projects-dropdown__item");
      projectItem.setAttribute("value", project.id);
      projectItem.innerHTML = project.name;
      projectSelect.appendChild(projectItem);
    });

    // Append Project Label and Select to Project Field
    projectsField.appendChild(projectLabel);
    projectsField.appendChild(projectSelect);

    // Build Details Field
    const detailsField = document.createElement("div");
    detailsField.classList.add("field");

    // Build Details Label element
    const detailsLabel = document.createElement("label");
    detailsLabel.classList.add("field__label");
    detailsLabel.setAttribute("for", "edit-task-details");
    detailsLabel.innerHTML = "Details";

    // Build Details Textarea element
    const taskDetails = document.createElement("textarea");
    taskDetails.setAttribute("id", "edit-task-details");
    taskDetails.innerHTML = task.details;

    // Append Details Label and Textarea to Details Field
    detailsField.appendChild(detailsLabel);
    detailsField.appendChild(taskDetails);

    // Appent all fields to the details container
    details.appendChild(nameField);
    details.appendChild(dueDateField);
    details.appendChild(projectsField);
    details.appendChild(detailsField);

    // Build the edit window footer
    const footer = document.createElement("div");
    footer.classList.add("edit-window__footer");

    // Build the Save button
    const saveButton = document.createElement("button");
    saveButton.classList.add("button", "button--regular", "button--primary");
    saveButton.innerHTML = "Save";
    saveButton.addEventListener("click", () => {
      const taskName = document.getElementById("edit-task-name").value;
      const dueDate = document.getElementById("edit-task-due-date").value;
      const projectId = document.getElementById("edit-task-project").value;
      const details = document.getElementById("edit-task-details").value;
      this.updateTask(taskId, taskName, dueDate, projectId, details);
    });

    // Build the Close button
    const closeButton = document.createElement("button");
    closeButton.classList.add(
      "button",
      "button--regular",
      "button--danger-outline"
    );
    closeButton.innerHTML = "Close";
    closeButton.addEventListener("click", () => {
      editWindow.remove();
    });

    // Append the buttons to the footer
    footer.appendChild(saveButton);
    footer.appendChild(closeButton);

    // Append the details and footer to the edit window
    editWindow.appendChild(details);
    editWindow.appendChild(footer);

    // Append the edit window to the app
    app.appendChild(editWindow);
  }

  /**
   * Updates the details of a specific task in local storage.
   * This method modifies the task's name, due date, project association, and additional details
   * based on the provided parameters. It then updates the task list in local storage and re-renders
   * the tasks. Additionally, it hides the task's options menu if it is open.
   *
   * @param {string} taskId
   * @param {string} taskName
   * @param {string} dueDate
   * @param {string} projectId
   * @param {string} details
   * @returns {void}
   */
  updateTask(taskId, taskName, dueDate, projectId, details) {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const menu = document.getElementById(`options-menu-${taskId}`);

    // Update the task details
    tasks[taskIndex].name = taskName;
    tasks[taskIndex].dueDate = dueDate;
    tasks[taskIndex].projectId = projectId;
    tasks[taskIndex].details = details;

    // Update the task in local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.renderTasks();

    // Close the options menu if it is open
    if (menu) {
      menu.style.display = "none";
    }

    Utils.showAlert("Task updated successfully", "success");
  }

  /**
   * Retrieves the details of a specific task by its ID.
   * It fetches the task list from local storage and returns the task object
   * matching the provided task ID.
   *
   * @param {string} taskId
   * @returns {Object}
   */
  getTaskDetails(taskId) {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    return tasks[taskIndex];
  }

  /**
   * Sets up click event listeners for all edit buttons in the task list.
   * When an edit button is clicked, it triggers the rendering of the task edit window
   * for the associated task.
   */
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

    const newTaskForm = document.querySelector(".new-task");
    newTaskForm.classList.add("task-timer-stared");

    const now = new Date();
    const taskId = this.runningTaskId;
    const tasks = app.task.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    const timer = document.querySelector("#timer");
    const time = Utils.formatTime(tasks[taskIndex].timeSpent);
    timer.innerHTML = `${time}`;

    const taskEl = document.querySelector(`[data-task-id="${taskId}"]`);
    taskEl.classList.add("timer-toggle--active");

    const project = document.getElementById("task-project");
    project.value = tasks[taskIndex].projectId;

    tasks[taskIndex].isRunning = true;
    tasks[taskIndex].startTime = now.getTime();

    const taskName = document.getElementById("task-name");
    taskName.value = tasks[taskIndex].name;

    this.activeTimer[taskId] = setInterval(() => {
      this.updateTaskTime(taskId);
    }, 1000);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.updateRunningTimer();

    Utils.showAlert("Timer started for the task", "success");
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

    const newTaskForm = document.querySelector(".new-task");
    newTaskForm.classList.remove("task-timer-stared");

    const taskName = document.getElementById("task-name");
    taskName.value = "";

    clearInterval(this.activeTimer[taskId]);
    delete this.activeTimer[taskId];

    const tasks = app.task.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    const project = document.getElementById("task-project");
    project.value = "";

    const taskEl = document.querySelector(`[data-task-id="${taskId}"]`);
    taskEl.classList.remove("timer-toggle--active");

    const taskTimer = document.querySelector(`[data-task-timer="${taskId}"]`);
    const time = Utils.formatTime(tasks[taskIndex].timeSpent);
    taskTimer.innerHTML = `${time}`;

    tasks[taskIndex].isRunning = false;
    tasks[taskIndex].startTime = 0;
    this.runningTaskId = "";

    localStorage.setItem("tasks", JSON.stringify(tasks));

    this.updateRunningTaskTimeUI(taskId);
    this.updateRunningTimer();

    Utils.showAlert("Timer stopped for the task", "success");
  }

  updateRunningTaskTimeUI(taskId) {
    const tasks = app.task.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    const taskEl = document.querySelector(`#timer`);
    const totalSeconds = tasks[taskIndex].timeSpent;
    const time = Utils.formatTime(totalSeconds);

    const taskTimer = document.querySelector(`[data-task-timer="${taskId}"]`);
    taskTimer.innerHTML = `${time}`;

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

/**
 * The App class serves as the main entry point for the application,
 * initializing and managing core components like Project, Task,
 * and Timer. It handles the initialization and orchestration of these
 * components to ensure the application functions as intended.
 *
 * Constructor:
 * - Initializes instances of Project, Task, and Timer classes.
 *
 * Method:
 * - init: Sets up the application based on the current page. It renders
 *   projects and tasks, sets up timers, and attaches event listeners to
 *   various UI elements for interaction. This method differentiates
 *   behavior based on whether the current page is 'projects.html' or not.
 */
class App {
  constructor() {
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
