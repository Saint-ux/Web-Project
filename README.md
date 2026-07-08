# Student Information & Course Portal

An individual capstone web application constructed using Node.js, Express.js, a relational SQLite database layer, and a clean vanilla JavaScript API consumer client interface.

## 🚀 Applied Features & Technical Patterns
- **Relational Architecture:** Formulated via clean Model-View-Controller (MVC) directory separation, mapping relational schemas across Users, Courses, and Many-to-Many Enrollment associations.
- **Security Protocols:** Secured user account information via adaptive password hashing (`bcryptjs`) and session identity isolation using JSON Web Tokens (JWT).
- **Access Authorization:** Configured strict Role-Based Access Control (RBAC) ensuring only validated Administrator profiles can publish system courses.
- **Auditing Infrastructure:** Engineered custom global request logging middleware tracking endpoint invocation metrics down to standard systems outputs.

## 🏃‍♂️ Operational Run Instructions
1. Navigate to the project directory workspace root.
2. Install all core compiled workspace packages:
   ```bash
   npm install