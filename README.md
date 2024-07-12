# Online Library Management System

## Features
- Admin functionalities: Issue/return books, add/remove books.
- User functionalities: Browse catalog, view transaction history.
- Secure handling of admin credentials.
- JWT-based authentication.
- Responsive and intuitive user interface.

## Technologies Used
### Frontend
- React.js

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- bcrypt for password hashing
- jsonwebtoken for authentication
- cookie-parser for handling cookies
- cors for cross-origin resource sharing

## Installation

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running or mongoDB atlas connection url

### Steps
1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/library-management-system.git
    cd library-management-system
    ```

2. **Install backend dependencies:**
    ```bash
    cd backend
    npm install
    ```

3. **Install frontend dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

4. **Setup environment variables:**
    Create a `.env` file in the `backend` directory and add the following:
    ```
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    PORT = your_port_no
    ```

5. **Run the backend server:**
    ```bash
    cd backend
    npm start
    ```

6. **Run the frontend server:**
    ```bash
    cd ../frontend
    npm start
    ```

## Usage
1. Open your browser and navigate to `http://localhost:5173` for the frontend.
2. The backend will be running on `http://localhost:3300`.

## Contributing
Feel free to submit pull requests or open issues to improve this project.
