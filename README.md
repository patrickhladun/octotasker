# Octotasker - CI Project 2 v.0.4.1

## User Stories

- As a user, I want to add new tasks, so that I can keep track of the things I need to do.
- As a user, I want to assign tasks to specific projects, so that I can organize my tasks more effectively.
- As a user, I want to set due dates for tasks, so that I can manage my deadlines and ensure timely completion.
- As a user, I want to start and stop a timer for each task, so that I can track the amount of time I spend on each task.
- As a user, I want to edit project details such as the project name and color, so that I can customize and organize projects according to my preferences.
- As a user, I want to view a list of all my projects, so that I can easily access and manage them.
- As a user, I want to filter tasks by projects, so that I can focus on tasks related to a specific project without distractions.
- As a user, I want to see statistics about my projects, such as the number of tasks, completed tasks, and pending tasks, so that I can get an overview of my project progress.
- As a user, I want to delete tasks or projects that are no longer needed, so that I can keep my task list and project board up-to-date.
- As a user, I want to see a visual indication (like a highlight color) for each task, so that I can easily distinguish between different projects.
- As a user, I want a simple and intuitive user interface, so that I can use the application easily without a steep learning curve.

## Development Roadmap

### Tasks functionality
1. Initialize the App
   - Load existing tasks from local storage
   - Update the task list display

2. Add a New Task
   - When the user press enter or click add button:
     - Get the task name from the input field
     - Generate a unique ID for the new task
     - Stop any currently running timer
     - Create a new task object with:
       - ID, task name, default due date, project, time spent, and running status
     - Add the new task object to the task list
     - Save the updated task list to local storage
     - Reset the task input form
     - Update the task list display

3. Start a Timer
   - When the 'Start' button is clicked:
     - Stop any currently running timer
     - Start a new timer for the clicked task
     - Update the task's 'isRunning' status to true
     - Save the updated task list to local storage
     - Update the task list display in real-time

4. Stop a Timer
   - When the 'Stop' button is clicked:
     - Stop the timer for the clicked task
     - Update the task's 'isRunning' status to false
     - Update the task's time spent
     - Save the updated task list to local storage
     - Update the task list display

5. Update Task List Display
   - Clear the current display
   - For each task in the task list:
     - Create a task element
     - Add the task name, due date, project name, and time spent to the task item
     - Add 'Start' and 'Stop' buttons to the task item
     - Attach event listeners to the buttons for timer functionality
     - Append the task item to the task list display 

6. Filter Tasks by Project
   - On the main tasks page, allow tasks to be filtered by projects, due date, creation date
   - When a project is selected from the filter:
     - Display only the tasks that are assigned to the selected project
    - When due date filter is clicked reorder tasks starting from the closest upcoming due date
    - When creation date is clicked reorder the tasks by creation date starting with the newest one

7. Assign Tasks to Projects
   - When adding or editing a task:
     - Allow the user to select a project from available projects
     - Update the task's project assignment
     - Reflect this change in both the task and project details in local storage

8. Delete a Task
   - When the 'Delete' button is clicked:
     - Remove the task with the corresponding ID from the task list
     - Save the updated task list to local storage
     - Update the task list display

### Project functionality
1. Initialize the Projects
   - Load existing projects from local storage
   - Update the projects list display on the project page
   - Populate project options in the tasks filter on the main tasks page
   - Populate each project with the tasks details (how many tasks, completed tasks etc)

2. Add a Project
   - When the user submits the project form:
     - generate a unique ID for the project
     - Create a project object with:
       - ID, project name, highlight color set to none, list of assigned tasks (initially empty for new projects)
     - Add/Update the project object in the project list
     - Reset the project input form
     - Update the project list display

3. Display Project List
   - For each project in the projects list:
     - Create a project container element
     - Add the project name and highlight color to the container
     - Add a button to edit the project (open the project in edit mode)
     - Display project stats including:
       - Total number of tasks
       - Number of finished tasks
       - Number of not started tasks
     - Append the project container to the project list display

6. Update Project Stats
   - Whenever tasks are added, completed, or their status changes:
     - Update the relevant project's stats
     - Reflect these updates in the project display

7. Delete a Project
   - Provide an option to delete a project
   - When deleted, remove the project from the local storage
   - Update the project list display
   - Optionally, handle reassignment or deletion of tasks linked to the deleted project

## Planning
## Design
## Deployment
## Technology used
## Bugs
## Credits