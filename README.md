# My ToDo List Application

A full-stack ToDo list application built with **Next.js** for the frontend and **FastAPI** for the backend. This application allows users to create, read, update, and delete their tasks seamlessly, utilizing **Shadcn UI** components for a modern interface.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Contributing](#contributing)
- [Design Decisions and Component Choices](#design-decisions-and-component-choices)
- [Challenges](#challenges)

## Technologies Used
- **Frontend**: [Next.js](https://nextjs.org/)
- **Backend**: [FastAPI](https://fastapi.tiangolo.com/)
- **UI Components**: [Shadcn](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kavishkasashmitha/my-todo-list-app.git
   cd my-todo-list-app
   ```

2. Install dependencies for the Next.js frontend:
   ```bash
   cd frontend
   npm install
   ```

3. Install Shadcn components in the Next.js application:
   ```bash
   npx shadcn@latest init
   ```
   Follow the prompts to complete the installation.

4. Install dependencies for the FastAPI backend:
   ```bash
   cd backend
   pip install fastapi uvicorn
   ```

## Running the Application

### Start the FastAPI Backend
1. Run `fastapi dev main.py`

### Start the Next.js Frontend
1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Run the Next.js application:
   ```bash
   npm run dev
   ```

3. Open your browser and go to `http://localhost:3000` to view your application.

## Usage

1. Navigate to the ToDo List application in your browser at `http://localhost:3000`.
2. Create new tasks using the input field and button provided.
3. View your tasks in the list, with options to mark them as complete or delete them.
4. The application state will be managed through API calls to the FastAPI backend.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m 'Add new feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch
   ```
5. Open a pull request.

## Design Decisions and Component Choices

Due to the time constraints, the design idea was sourced from the Figma community. For components, the following Shadcn components were used:

a. Card component to wrap the todo list
b. Table component to display todos
c. Button component for actions (add, complete, delete)
d. Input component for the todo title
e. Select component for user assignment
f. Checkbox component to mark todos as complete

Extra:-
g. Textarea component for adding descriptions

## Challenges

The Shadcn documentation did not provide information on toast notifications for confirmations. As a workaround, SweetAlert2 was used for confirming deletions. All other functions use Shadcn Toasts.<img width="1440" alt="Screenshot 2024-10-20 at 13 09 27" src="https://github.com/user-attachments/assets/9c7ab1e0-005f-4dc9-9c94-87ab48f981cf">
<img width="1440" alt="Screenshot 2024-10-20 at 13 09 20" src="https://github.com/user-attachments/assets/b8f3041f-2ebb-4069-9b68-896c56199beb">
<img width="1440" alt="Screenshot 2024-10-20 at 13 09 13" src="https://github.com/user-attachments/assets/618ef23a-34cf-45ec-a0a9-5e5f4e8d93bc">

