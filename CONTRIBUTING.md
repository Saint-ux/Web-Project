# Developer Workflows & Guidelines

This document details the architectural boundaries and deployment guidelines applied throughout the development of the Student Information & Course Portal.

## 🛠️ Architectural Conventions

- **Model-View-Controller (MVC):** All data layer representations must be encapsulated strictly within the `models/` directory using Sequelize schemas.
- **Stateless Router Operations:** Application business logic should reside inside the `controllers/` layer, keeping the `routes/` layer clean and focused purely on endpoint maps and middleware validation rules.

## 🔒 Security Gateways

- All upcoming protected endpoints must actively chain the `authMiddleware` layer to intercept incoming requests and validate JSON Web Tokens (`JWT`).
- High-privilege routes (e.g., creating courses, modifying records) require an explicit role evaluation checkpoint matching `admin` privileges.
