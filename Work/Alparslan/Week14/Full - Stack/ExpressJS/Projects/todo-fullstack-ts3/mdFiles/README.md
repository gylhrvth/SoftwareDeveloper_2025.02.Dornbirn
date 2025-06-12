# To-Do App

A multilingual full-stack To-Do application built with Express.js, TypeScript, EJS, and AJAX.  
Users can manage tasks, switch between English, Spanish, and Hungarian, and enjoy a dynamic, interactive UI.

---

## Features

- **Add, edit, delete, and toggle tasks**
- **Language selection:** English, Spanish, Hungarian
- **Instant UI updates** with AJAX (no page reloads for status changes or popup forms)
- **Date formatting** according to locale
- **MVC architecture** for clean code separation
- **Popup/modal forms** for adding and editing tasks (no full-page edit/add views)
- **Dark mode toggle**
- **Task filtering** by status, priority, and date

---

## Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Frontend:** EJS templates, Vanilla JS (with fetch/AJAX)
- **Database:** MySQL
- **Styling:** CSS (with dark mode support)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/todo-fullstack-ts2.git
cd todo-fullstack-ts2
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

- Set up your MySQL database and update your `.env` file with the connection details.
- (Optional) Edit `/src/i18n/translations.ts` to customize translations.

### 4. Run the app

```bash
npm run dev
```

Visit [http://localhost:3003](http://localhost:3003) in your browser.

---

## Usage

- **Add a task:** Click the "+" button, fill out the form, and submit.
- **Edit a task:** Click the edit icon next to a task.
- **Delete a task:** Click the trash icon.
- **Toggle status:** Check/uncheck the box to mark as completed/pending.
- **Change language:** Use the dropdown in the header. The app and all forms will update instantly.
- **Filter tasks:** Use the filter form to filter by status, priority, or date.
- **Switch dark mode:** Use the dark mode toggle button in the header.

---

## Project Structure

```
src/
  controllers/    # Express controllers (business logic)
  models/         # Data models and database logic
  routes/         # Express routes
  views/          # EJS templates (UI, including partials for forms)
  i18n/           # translations.ts (all translations)
public/           # Static JS/CSS/assets
```

---

## Architecture

- **MVC:** Separation of Model (data), View (UI), Controller (logic)
- **AJAX:** Used for dynamic form loading and status toggling
- **i18n:** All UI text is translatable via a single translations file
- **Partials:** Popup/modal forms for add/edit are rendered as EJS partials

---

## Customization

- Add more languages by extending `src/i18n/translations.ts`
- Change styling in `public/main.css`
- Extend task fields or logic in the model/controller

---

## License

MIT

---

**Made with ❤️ by Carlitos & GitHub Copilot**