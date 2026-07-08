# Student Information & Course Portal Backend Application

A fully functional, capstone-level web application showcasing a clean separation of concerns between a secure Node.js/Express RESTful API and a lightweight vanilla JavaScript consumer dashboard.

## 🚀 Core Features & Applied Concepts
- **Relational Architecture:** Designed using the MVC pattern with automated Sequelize model mapping across `Users`, `Courses`, and `Enrollments` (Many-to-Many relationship).
- **Security Protocols:** Implemented strict password hashing using `bcryptjs` along with token-based identity management using JSON Web Tokens (JWT).
- **Access Control:** Outlined clear Role-Based Access Control (RBAC) where any authorized user can fetch courses, but only an administrator account can publish new courses.
- **Request Auditing:** Configured active console logging tracking active server requests.

## 🛠️ Technology Stack
- **Runtime Environment:** Node.js
- **Backend Framework:** Express.js
- **Database Layer:** SQLite via Sequelize ORM
- **Frontend Layer:** Semantic HTML5, CSS3, and Native Vanilla JavaScript

## 🔧 Environment Configuration
Create a `.env` file in the root directory and define the following variables:
```env
PORT=5000
JWT_SECRET=your_secure_random_key_string