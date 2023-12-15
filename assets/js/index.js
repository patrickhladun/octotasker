let task;

document.addEventListener("DOMContentLoaded", () => {
  task = new Task();

  document
    .getElementById("task-form")
    .addEventListener("submit", (e) => task.addTask(e));
});

class Task {
  /**
   * Task constructor function to create a new task object with the following properties: name, dueDate, timeSpent, id
   * @param {*} name
   * @param {*} dueDate
   * @param {*} creationDate
   */
  constructor(name) {
    this.id = uniqueId;
    this.name = name;
    this.dueDate = "";
    this.creationDate = new Date();
  }

  addTask(e) {
    // Prevent default form submission so the page doesn't reload
    e.preventDefault();

    // Get the task name from the form
    const taskName = document.getElementById("task-name").value.trim();

    // Check if the task name is empty
    if (taskName === "" || !taskName) {
      alert("Please enter a task name");
      return;
    }

    // Get the tasks from local storage
    const tasks = this.getTasks();

    // Create a new task object
    const newTask = new Task(taskName);

    // Add the new task to the tasks array
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Reset the form
    document.getElementById("task-form").reset();
  }

  /**
   * Returns an array of tasks from local storage
   * @returns {Array}
   */
  getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  }
}

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

// Generate a unique id
const uniqueId = Utils.generateUniqueId();
