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
    this.id = "dfh9237623gf";
    this.name = name;
    this.dueDate = "";
    this.creationDate = new Date();
  }

  addTask(e) {
    // Prevent default form submission so the page doesn't reload
    e.preventDefault();

    // Get the task name from the form
    const taskName = document.getElementById("task-name").value.trim();

    // Create a new task object
    const newTask = new Task(taskName);

    console.log(newTask);

    document.getElementById("task-form").reset();
  }
}
