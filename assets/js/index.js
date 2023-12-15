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
  }

  renderTasks() {
    // Get the tasks from local storage
    const tasks = this.getTasks();
    console.log(tasks);
  }

  /**
   * Returns an array of tasks from local storage
   * @returns {Array}
   */
  getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
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

let task;

document.addEventListener("DOMContentLoaded", () => {
  app = new App();
  app.init();

  document
    .getElementById("task-form")
    .addEventListener("submit", (e) => app.task.addTask(e));
});
