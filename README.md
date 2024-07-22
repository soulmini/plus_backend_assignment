# Project Management API (Plus Gold)

his API provides endpoints for managing projects, timesheets, and employees within an organization. It includes functionality for creating, reading, updating, and deleting projects and timesheets. Additionally, it supports user authentication with JWT and offers detailed documentation for all available routes and operations.

## Requirements

- Node.js
- PostgreSQL
- Docker

## Installation

### Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/yourproject.git
   ```
2. Navigate to the project directory:
   ```bash
   cd yourproject
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Set up the PostgreSQL database and configure the connection details in your environment variables.
   ```bash
   DB_USER=avnadmin
   DB_PASSWORD=AVNS_d6P-Q41NXZvpZbLHl8F
   DB_HOST=pg-17f1a0f7-ajaiswal08324-9ed7.e.aivencloud.com
   DB_PORT=18795
   DB_NAME=defaultdb
   DB_SSLMODE=require
   DATABASE_URL=Your DB URI
   SECRET_KEY=AVNS_d6P8
   PORT=3000
   ```

5. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

6. Run the migrations the database:
   ```bash
   npx prisma migrate dev
   ```
7. Build & Start the development server:
   ```bash
   npm run build
   npm start
   ```

### Docker Setup

1. Build the Docker image:
   ```bash
   docker-compose build
   ```
2. Run the Docker container:
   ```bash
   docker-compose up
   ```

## API Documentation

The API documentation is available at `/api-docs` endpoint. You can access it by running the development server and navigating to `http://localhost:3000/api-docs` in your web browser.

## Usage

### Authentication

- **POST** `/auth/login`: Authenticate a user and receive a JWT token.
- **POST** `/auth/signup`: Register a new user.

### Departments

- **GET** `/departments`: Retrieve a list of departments.
- **POST** `/departments`: Create a new department.
- **GET** `/departments/{id}`: Get a specific department by ID.
- **PUT** `/departments/{id}`: Update a department by ID.
- **DELETE** `/departments/{id}`: Delete a department by ID.

### Employees

- **GET** `/employees`: Retrieve a list of employees.
- **POST** `/employees`: Create a new employee.
- **GET** `/employees/{id}`: Get a specific employee by ID.
- **PUT** `/employees/{id}`: Update an employee by ID.
- **DELETE** `/employees/{id}`: Delete an employee by ID.

### Projects

- **GET** `/projects`: Retrieve a list of projects.
- **POST** `/projects`: Create a new project.
- **GET** `/projects/{id}`: Get a specific project by ID.
- **PUT** `/projects/{id}`: Update a project by ID.
- **DELETE** `/projects/{id}`: Delete a project by ID.

### Timesheets

- **GET** `/timesheets`: Retrieve a list of timesheets.
- **POST** `/timesheets`: Create a new timesheet.
- **GET** `/timesheets/{id}`: Get a specific timesheet by ID.
- **PUT** `/timesheets/{id}`: Update a timesheet by ID.
- **DELETE** `/timesheets/{id}`: Delete a timesheet by ID.

## Testing

To run the test cases:

```bash
npm test
```

## Folder Structure

```
prisma/
└── schema.prisma

src/
├── auth/
│   ├── login.ts
│   └── signup.ts
├── middleware/
│   └── auth.ts
├── routes/
│   ├── department.ts
│   ├── employee.ts
│   ├── project.ts
│   └── timesheet.ts
├── swaggers/
│   ├── authSwagger/
│   │   ├── login.swagger.ts
│   │   └── signup.swagger.ts
│   ├── routerSwagger/
│   │   ├── department.swagger.ts
│   │   ├── employee.swagger.ts
│   │   ├── project.swagger.ts
│   │   └── timesheet.swagger.ts
│   └── index.swagger.ts
├── index.ts
├── server.ts
└── swagger.ts

tests/
    ├── app.test.ts
    ├── auth.test.ts
    ├── department.test.ts
    ├── employee.test.ts
    ├── project.test.ts
    └── timesheet.test.ts
```

## Developed by Ayush Jaiswal ❤️
