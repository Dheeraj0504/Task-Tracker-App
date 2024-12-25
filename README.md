# Task Tracking App

This is a full-stack task tracking application built with React, Node.js, Express, and MongoDB. It allows users to register, log in, and manage their tasks.

## Features

- User authentication (register, login, logout)
- Task management (add, edit, delete, view tasks)
- Task filtering and search
- Responsive design

## Technologies Used

- Frontend: React, Tailwind CSS, Axios, React Router
- Backend: Node.js, Express, MongoDB, Mongoose
- Authentication: JWT (JSON Web Tokens)
- Other: dotenv, bcrypt, cookie-parser

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/task-tracking-app.git
    cd task-tracking-app
    ```

2. Install dependencies for both frontend and backend:

    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:

    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

### Running the Application

1. Start the backend server:

    ```bash
    cd backend
    npm start
    ```

2. Start the frontend development server:

    ```bash
    cd frontend
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

### Authentication

#### Register a new user

- **Endpoint:** `POST /auth/register`
- **Request Body:**
    ```json
    {
        "fullname": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "email": "john.doe@example.com",
        "password": "password123"
    }
    ```
- **Response:**
    ```json
    {
        "message": "User registered successfully",
        "token": "jwt_token",
        "user": {
            "_id": "user_id",
            "fullname": {
                "firstName": "John",
                "lastName": "Doe"
            },
            "email": "john.doe@example.com",
            "password": "hashed_password"
        }
    }
    ```

#### Login an existing user

- **Endpoint:** `POST /auth/login`
- **Request Body:**
    ```json
    {
        "email": "john.doe@example.com",
        "password": "password123"
    }
    ```
- **Response:**
    ```json
    {
        "message": "Login successful",
        "token": "jwt_token",
        "user": {
            "_id": "user_id",
            "fullname": {
                "firstName": "John",
                "lastName": "Doe"
            },
            "email": "john.doe@example.com",
            "password": "hashed_password"
        }
    }
    ```

#### Get the authenticated user's profile

- **Endpoint:** `GET /auth/profile`
- **Headers:**
    ```json
    {
        "Authorization": "Bearer jwt_token"
    }
    ```
- **Response:**
    ```json
    {
        "_id": "user_id",
        "fullname": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "email": "john.doe@example.com"
    }
    ```

#### Logout the authenticated user

- **Endpoint:** `GET /auth/logout`
- **Headers:**
    ```json
    {
        "Authorization": "Bearer jwt_token"
    }
    ```
- **Response:**
    ```json
    {
        "message": "Logged out successfully"
    }
    ```

### Tasks

#### Get all tasks for the authenticated user

- **Endpoint:** `GET /tasks`
- **Headers:**
    ```json
    {
        "Authorization": "Bearer jwt_token"
    }
    ```
- **Response:**
    ```json
    [
        {
            "_id": "task_id",
            "name": "Task Name",
            "description": "Task Description",
            "dueDate": "2023-10-10T00:00:00.000Z",
            "status": "Pending",
            "priority": "Low",
            "user": "user_id",
            "createdAt": "2023-10-01T00:00:00.000Z",
            "updatedAt": "2023-10-01T00:00:00.000Z"
        }
    ]
    ```

#### Add a new task

- **Endpoint:** `POST /tasks/add`
- **Headers:**
    ```json
    {
        "Authorization": "Bearer jwt_token"
    }
    ```
- **Request Body:**
    ```json
    {
        "name": "New Task",
        "description": "Task Description",
        "dueDate": "2023-10-10",
        "status": "Pending",
        "priority": "Low"
    }
    ```
- **Response:**
    ```json
    {
        "message": "Task created successfully",
        "task": {
            "_id": "task_id",
            "name": "New Task",
            "description": "Task Description",
            "dueDate": "2023-10-10T00:00:00.000Z",
            "status": "Pending",
            "priority": "Low",
            "user": "user_id",
            "createdAt": "2023-10-01T00:00:00.000Z",
            "updatedAt": "2023-10-01T00:00:00.000Z"
        }
    }
    ```

#### Update a task

- **Endpoint:** `PUT /tasks/:id`
- **Headers:**
    ```json
    {
        "Authorization": "Bearer jwt_token"
    }
    ```
- **Request Body:**
    ```json
    {
        "name": "Updated Task",
        "description": "Updated Description",
        "dueDate": "2023-10-15",
        "status": "In Progress",
        "priority": "High"
    }
    ```
- **Response:**
    ```json
    {
        "message": "Task updated successfully",
        "task": {
            "_id": "task_id",
            "name": "Updated Task",
            "description": "Updated Description",
            "dueDate": "2023-10-15T00:00:00.000Z",
            "status": "In Progress",
            "priority": "High",
            "user": "user_id",
            "createdAt": "2023-10-01T00:00:00.000Z",
            "updatedAt": "2023-10-01T00:00:00.000Z"
        }
    }
    ```

#### Delete a task

- **Endpoint:** `DELETE /tasks/:id`
- **Headers:**
    ```json
    {
        "Authorization": "Bearer jwt_token"
    }
    ```
- **Response:**
    ```json
    {
        "message": "Task deleted successfully"
    }
    ```

## License

This project is licensed under the MIT License.