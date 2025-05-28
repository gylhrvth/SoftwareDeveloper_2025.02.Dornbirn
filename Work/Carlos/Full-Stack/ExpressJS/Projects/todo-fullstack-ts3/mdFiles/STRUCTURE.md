# Project Structure Diagram: To-Do App

This document explains the structure of the To-Do App project in a clear and  visual way.
The diagram below shows how the main folders and files are organized and how they relate to each other.

---

## 📁 Project Root

```
todo-fullstack-ts2/
│
├── .env                  # Environment variables (DB credentials, etc.)
├── package.json          # Project metadata and dependencies
├── tsconfig.json         # TypeScript configuration
├── README.md             # Project overview and instructions
│
├── public/               # Static assets (served directly to the browser)
│   ├── main.css          # Main stylesheet (all app styles)
│   ├── main.js           # Main JavaScript (AJAX, UI logic)
│   └── assets/           # Images and icons
│       └── icons/
│           ├── add.svg
│           ├── dark.svg
│           ├── delete.svg
│           ├── edit.svg
│           └── remove.svg
│
└── src/                  # Application source code
    │
    ├── server.ts         # Main server entry point (Express app)
    │
    ├── controllers/      # Controllers: handle HTTP requests and responses
    │   └── taskController.ts
    │
    ├── models/           # Data models and database logic
    │   ├── db.ts         # Database connection (MySQL)
    │   └── taskModel.ts  # Task model (CRUD operations)
    │
    ├── routes/           # Express route definitions
    │   └── taskRoutes.ts
    │
    ├── i18n/             # Internationalization (translations)
    │   └── translations.ts
    │
    └── views/            # EJS templates (UI rendering)
        ├── 404.ejs       # Custom 404 error page
        ├── tasks.ejs     # Main tasks page (lists all tasks)
        └── partials/     # Reusable UI components (EJS partials)
            ├── addForm.ejs   # Add task form (popup/modal)
            └── editForm.ejs  # Edit task form (popup/modal)
```

---

## 🗂️ How the Pieces Work Together

- **public/**  
  Contains all static files (CSS, JS, images) that are sent directly to the browser.  
  - `main.js` handles AJAX, popup forms, and UI interactivity.
  - `main.css` styles the entire app, including dark mode.

- **src/server.ts**  
  The entry point of the app.  
  - Sets up Express, configures the view engine (EJS), static file serving, and routes.

- **src/controllers/**  
  Contains controller files that process incoming requests, interact with models, and render views or send responses.

- **src/models/**  
  Contains the database connection and logic for interacting with the MySQL database (CRUD operations for tasks).

- **src/routes/**  
  Defines the URL endpoints and maps them to controller functions.

- **src/i18n/**  
  Holds translation files for multilingual support.  
  - `translations.ts` contains all UI text in English, Spanish, and Hungarian.

- **src/views/**  
  Contains EJS templates for rendering HTML pages.
  - `tasks.ejs` is the main page showing the task list.
  - `partials/` contains reusable form components for adding and editing tasks (used in popups/modals).
  - `404.ejs` is shown for not found pages.

---

## 📊 MVC Flow Example

1. **User visits `/tasks`**  
   - `server.ts` routes the request to `taskRoutes.ts`
   - `taskRoutes.ts` calls the appropriate function in `taskController.ts`
   - `taskController.ts` fetches data using `taskModel.ts`
   - Data is passed to `tasks.ejs` for rendering
   - The browser receives the rendered HTML, styled by `main.css` and made interactive by `main.js`

2. **User adds/edits a task via popup**  
   - `main.js` fetches the partial form (`addForm.ejs` or `editForm.ejs`) via AJAX
   - User submits the form; the controller updates the database via the model
   - UI updates instantly without a full page reload

---

## 📝 Summary Table

| Folder/File         | Purpose                                      |
|---------------------|----------------------------------------------|
| `.env`              | Environment variables                        |
| `public/`           | Static assets (CSS, JS, images)              |
| `src/server.ts`     | Express server setup                         |
| `src/controllers/`  | Request/response logic                       |
| `src/models/`       | Database and data logic                      |
| `src/routes/`       | URL routing                                  |
| `src/i18n/`         | Translations for multilingual support        |
| `src/views/`        | EJS templates for UI rendering               |

---

**This structure keeps your code organized, maintainable, and scalable.  
Each part has a clear responsibility, following the MVC (Model-View-Controller) pattern.**