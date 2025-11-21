# Todo List Application

Professional Next.js Todo app with CRUD, pagination, and responsive design.

## Features

- Create, Read, Update, Delete todos
- Responsive design
- Filter by status (Pending, In-Progress, Completed)
- Pagination support
- Modern UI with Tailwind CSS
- Real-time updates
- Form validation
- Toast notifications

## Tech Stack

- **Frontend**: Next.js 15, React, JavaScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Date Formatting**: date-fns

## Getting Started

Install dependencies:

    npm install

Run the development server:

    npm run dev

Open your browser and navigate to:

    http://localhost:3000

## API Endpoints

### Todos Collection

- GET /api/todos - List all todos (supports pagination & filtering)
- POST /api/todos - Create a new todo

### Individual Todo

- GET /api/todos/[id] - Get a specific todo
- PUT /api/todos/[id] - Update a todo
- DELETE /api/todos/[id] - Delete a todo

## Project Structure

    todo-app-mern/
    ├── app/
    │   ├── api/todos/
    │   │   ├── route.js
    │   │   └── [id]/route.js
    │   ├── globals.css
    │   ├── layout.js
    │   └── page.js
    ├── components/
    │   ├── TodoCard.jsx
    │   ├── TodoForm.jsx
    │   ├── Pagination.jsx
    │   └── LoadingSkeleton.jsx
    ├── lib/
    │   └── db.js
    └── package.json

## Features in Detail

### Create Todo
- Add todos with title and description
- Automatic status set to "Pending"
- Form validation

### Edit Todo
- Update title, description, and status
- Status options: Pending, In-Progress, Completed
- Real-time updates

### Delete Todo
- Confirmation dialog before deletion
- Automatic pagination adjustment

### Pagination
- 6 todos per page
- Page navigation controls
- Smart page number display

### Filtering
- Filter by status
- Instant results
- Maintains pagination

## Database



- MongoDB using Mongoose


## Customization

Change items per page in app/page.js:

    limit: '6'  // Change this value

Add new status options in lib/db.js and components.

## License

MIT

---

Built for MERN Technical Assignment
