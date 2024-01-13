# Octotasker - CI Project 2 v.0.5.0 <!-- omit from toc -->

"Octotasker is my second portfolio project for the Code Institute Diploma in Full-Stack Software Development. This MVP task manager app is meticulously designed to optimize workflow and boost productivity. It allows users to add tasks effortlessly, track the time spent on each task, and organize tasks under specific projects for enhanced clarity. Octotasker stands out with its intuitive interface, making task management straightforward for both personal and professional contexts. In addition to these features, the app offers the convenience of marking tasks as complete and supports the bulk deletion of finished tasks. This keeps the workspace organized and efficient, ensuring users can focus on what matters most. Designed with simplicity and effectiveness in mind, Octotasker is a tool that transforms task management into a seamless and productive experience."

![GitHub contributors](https://img.shields.io/github/issues/patrickhladun/octotasker?style=flat)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/patrickhladun/octotasker/main?style=flat)
![GitHub language count](https://img.shields.io/github/languages/count/patrickhladun/octotasker?style=flat)
![GitHub top language](https://img.shields.io/github/languages/top/patrickhladun/octotasker?style=flat)

[Octotasker Deployed Website](https://patrickhladun.github.io/octotasker/)

## Table of Contents<!-- omit from toc -->

- [User Experience](#user-experience)
  - [Audience Persona: Emily O'Sullivan](#audience-persona-emily-osullivan)
    - [Demographics:](#demographics)
    - [Psychographics:](#psychographics)
    - [Behavioral Traits:](#behavioral-traits)
  - [Online Habits:](#online-habits)
    - [How Octotasker Meets Emily's Needs:](#how-octotasker-meets-emilys-needs)
  - [User Goals for Octotasker](#user-goals-for-octotasker)
  - [User Stories](#user-stories)
  - [Five Planes of UX for Octotasker](#five-planes-of-ux-for-octotasker)
    - [1. Strategy Plane](#1-strategy-plane)
    - [2. Scope Plane](#2-scope-plane)
    - [3. Structure Plane](#3-structure-plane)
    - [4. Skeleton Plane](#4-skeleton-plane)
    - [5. Surface Plane](#5-surface-plane)
  - [Wireframes](#wireframes)
- [Features](#features)
  - [Task Management:](#task-management)
  - [Time Tracking:](#time-tracking)
  - [Task Detail Editing:](#task-detail-editing)
  - [Project Management:](#project-management)
  - [User Interface:](#user-interface)
  - [Data Persistence:](#data-persistence)
  - [Alert System:](#alert-system)
- [Technology used](#technology-used)
- [Design](#design)
  - [Color Scheme](#color-scheme)
- [Primary Colors](#primary-colors)
- [Neutral Tones](#neutral-tones)
- [Accent Colors](#accent-colors)
  - [Logo](#logo)
  - [404 Image](#404-image)
  - [Typography](#typography)
  - [Icons](#icons)
- [Setup and installation](#setup-and-installation)
- [Usage and Examples](#usage-and-examples)
- [Projects Structure](#projects-structure)
- [Known Issues](#known-issues)
- [Credits](#credits)


## User Experience
[Back to Top](#table-of-contents)

### Audience Persona: Emily O'Sullivan

#### Demographics:
[Back to Top](#table-of-contents)
- **Age**: 35
- **Gender**: Female
- **Location**: Near Dublin, Ireland
- **Occupation**: Middle-level Manager in a Tech Company
- **Education**: Bachelor's Degree in Business Management
- **Marital Status**: Married with two children

#### Psychographics:
[Back to Top](#table-of-contents)

- **Interests**: Emily enjoys optimizing work processes, loves technology that simplifies life, and seeks tools to balance work and family life.
- **Goals**: Aims to enhance productivity at work and home, efficiently manage her team, and keep track of family-related tasks.
- **Challenges**: Struggles to balance a demanding career with her roles as a mother and wife, often finding it hard to track various tasks and deadlines.

#### Behavioral Traits:
[Back to Top](#table-of-contents)

- **Tech-Savvy**: Comfortable using digital tools and apps for task management.
- **Organizational Needs**: Prefers structured approach in managing professional and personal tasks.
- **Time Management**: Looks for ways to manage time more effectively.

### Online Habits:
[Back to Top](#table-of-contents)

- **App Usage**: Relies on productivity apps for daily activity organization.
- **Research-Oriented**: Spends time researching best tools for task and project management.
- **Community Engagement**: Participates in forums and groups related to productivity and management.

#### How Octotasker Meets Emily's Needs:
[Back to Top](#table-of-contents)

- **Task Organization**: Allows Emily to categorize and prioritize tasks efficiently.
- **Time Tracking**: Helps monitor time spent on individual tasks, aiding better time management.
- **Project Categorization**: Enables creating different projects for her varied roles and responsibilities.
- **Intuitive Interface**: Easy to navigate and use.
- **Mobile Accessibility**: Manages tasks on-the-go, suitable for her busy lifestyle.

### User Goals for Octotasker
[Back to Top](#table-of-contents)

1. **Efficient Task Management**: Users aim to efficiently manage and organize their daily tasks, ensuring a clear understanding of priorities and deadlines.
2. **Time Tracking**: Users seek to track the amount of time spent on individual tasks, facilitating better time management and productivity.
3. **Project Organization**: The ability to categorize tasks under specific projects, allowing users to separate personal tasks from professional ones and manage them accordingly.
4. **Ease of Use**: A simple and intuitive interface that doesn't require a steep learning curve, making the app accessible to users of all technical skill levels.
5. **Data Persistence**: Users need their tasks and projects to be saved and accessible across sessions, ensuring no loss of data when they return to the app.

### User Stories
[Back to Top](#table-of-contents)

- As a user, I want to add new tasks, so that I can keep track of the things I need to do.
- As a user, I want to set due dates for tasks, so that I can manage my deadlines and ensure timely completion.
- As a user, I want to start and stop a timer for each task, so that I can track the amount of time I spend on each task.
- As a user, I want to edit project details such as the project name and color, so that I can customize and organize projects according to my preferences.
- As a user, I want to view a list of all my projects, so that I can easily access and manage them.
- As a user, I want to delete tasks or projects that are no longer needed, so that I can keep my task list and project board up-to-date.
- As a user, I want to see a visual indication (like a highlight color) for each task, so that I can easily distinguish between different projects.
- As a user, I want a simple and intuitive user interface, so that I can use the application easily without a steep learning curve.

### Five Planes of UX for Octotasker
[Back to Top](#table-of-contents)

#### 1. Strategy Plane

**User Needs:**
- Efficient and easy management of tasks.
- Accurate time tracking for tasks.
- Simple and intuitive user interface.

  **Business Objectives:**
- Provide a user-friendly task management tool.
- Increase user base through intuitive design and functionality.
- Build a foundation for future enhancements like collaboration tools.

#### 2. Scope Plane

**Functional Requirements:**
- Add, edit, and delete tasks.
- Start and stop task timers.
- Categorize tasks under projects.
- View completed and pending tasks.

#### 3. Structure Plane

**Interaction Design:**
- Straightforward navigation between task list, timer, and projects.
- Interactive elements like buttons for adding tasks and toggling timers.

**Information Architecture:**
- Clear categorization of tasks and projects.
- Easy-to-find controls for task and project management.

#### 4. Skeleton Plane

**Interface Design:**
- Clean layout with prominent task and timer sections.
- Visually distinct areas for not-completed and completed tasks.

**Navigation Design:**
- Simple menu for accessing main features.
- Clear labels and icons for intuitive navigation.

**Information Design:**
- Task lists displayed with necessary details like deadlines and time spent.
- Visual cues for overdue tasks or active timers.

#### 5. Surface Plane

**Visual Design:**
- Aesthetic consistency with the Octotasker brand.
- Custom icons and imagery that align with the overall design language.

### Wireframes

**Tasks Page**
![Tasks](./docs/wireframes-tasks.jpg)
**Projects Page**
![Projects](./docs/wireframes-projects.jpg)


## Features
[Back to Top](#table-of-contents)

### Task Management:

- Add new tasks with ease.
- Instantly start a timer for new tasks.
- View lists of completed and uncompleted tasks.
- Edit task names directly from the task list.
- Start and stop timers for existing tasks.
- Toggle tasks between completed and uncompleted status.
- Delete individual tasks.
- Bulk delete all completed tasks with a single button.

### Time Tracking:

- Keep track of the time spent on each task with an integrated timer.
- Time tracking continues seamlessly across task switching.

### Task Detail Editing:

- Access a dedicated edit window for each task.
- Update task names, due dates, and detailed descriptions.
- Assign tasks to specific projects from available options.

### Project Management:

- Add new projects to categorize tasks.
- Delete projects.
- Rename projects for better identification.
- Customize project colors for visual distinction.

### User Interface:

- Intuitive and responsive design for both personal and professional use.
- Dynamic updates to the user interface using JavaScript DOM manipulation.

### Data Persistence:

- Tasks and projects are saved in the browser's local storage, ensuring data persistence between sessions.

### Alert System:

- Customizable alerts for various actions like task addition, updates, or deletions.

## Technology used

## Design

### Color Scheme

Choosing the right colors for my app is very important. Colors can affect how users feel and interact with the app. They also help make the app's design clear and easy to use.

## Primary Colors
I use blue as the main color for action buttons and important parts of the interface. Blue is a trustworthy and reliable color.

## Neutral Tones
Whites and grays are the colors I choose for backgrounds and inactive elements. They make the app look clean and easy to read.

## Accent Colors
Red is the color for delete buttons and alerts. It grabs attention and signals caution. Green is for success messages and completed tasks. It gives a feeling of accomplishment and positivity.

![Color Scheme](./docs/colours.jpg)

### Logo
The custom-designed logo features an octopus holding a timer, symbolizing the app's multifaceted task management capabilities and efficient time tracking.

![Octotasker Logo](./docs/octotasker-logo.jpg)

### 404 Image
For the 404 error page, a fun and engaging image of an octopus is generated using DALL-E, adding a unique and playful touch to the app.

![404 Image](./docs/octotasker-404.jpg)

### Typography
The app uses the Montserrat font, known for its clean lines and modern feel. This sans-serif typeface offers excellent readability and a contemporary aesthetic, aligning well with the app's minimalist design philosophy.

![Montserrat light](./docs/montserrat-light.jpg)
![Montserrat medium](./docs/montserrat-medium.jpg)

### Icons
Custom icons created in Illustrator adorn the app, lending a unique and cohesive look. These simple yet effective icons are designed for clarity and ease of use, enhancing the overall user experience.

![Icons](./docs/octotasker-icons.jpg)

## Setup and installation

## Usage and Examples

## Projects Structure

## Known Issues

## Credits
