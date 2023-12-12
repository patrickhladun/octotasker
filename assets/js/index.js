let task;

document.addEventListener("DOMContentLoaded", () => {
  task = new Task();

  document
    .getElementById("task-form")
    .addEventListener("submit", (e) => task.addTask(e));
});

class Task {
  constructor(name) {
    this.name = name;
  }
  addTask(e) {
    e.preventDefault();
    this.name = document.getElementById("task-name").value.trim();
    console.log(this.name);
    document.getElementById("task-form").reset();
  }
}
