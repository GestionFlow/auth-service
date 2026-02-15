# 🔐 Auth Service

The **Auth Service** is a core backend microservice responsible for **authentication, authorization, and identity management** within Project Mayhem.

This service acts as the **single source of truth for user identity and access control** across the entire platform.

---

## 🎯 Purpose

The Auth Service ensures that:
- Users can securely register and authenticate
- Access to backend services is controlled via roles and permissions
- Other services can reliably verify user identity

This service is intentionally **isolated** to keep security logic centralized and auditable.

---

## 🧠 Responsibilities

### ✅ What This Service Handles
- User registration and login
- Secure password management
- JWT token issuance and validation
- Role-based access control (RBAC)
- User identity resolution (`who is the user?`)

### ❌ What This Service Does NOT Handle
- Task or issue data
- User productivity metrics
- Messaging or notifications
- Location tracking

Other services **must not** store authentication logic or user credentials.

---

## 🧩 Phase 1 Scope (MVP)

During **Phase 1**, the Auth Service focuses on delivering a **stable and production-ready authentication layer**.

### Included Features
- User signup & login
- JWT-based authentication
- Predefined roles:
  - Head
  - Lead
  - Volunteer
- Secure password hashing
- Basic user identity APIs

### Out of Scope (Phase 1)
- OAuth / SSO
- Refresh tokens
- Multi-factor authentication
- Advanced permission policies

---

## 📡 Public API (Phase 1)

| Method | Endpoint           | Description                     |
|------|--------------------|---------------------------------|
| POST | `/auth/register`   | Register a new user             |
| POST | `/auth/login`      | Authenticate user & issue token |
| GET  | `/auth/me`         | Get authenticated user details |

All endpoints are protected via standard HTTP security practices.

---

## 🗃️ Data Ownership

The Auth Service owns and manages:

- Users
- Roles
- User-role mappings
- Authentication credentials

Each instance operates on its **own dedicated database**.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT
- **Security:** bcrypt for password hashing

---

## 🔁 Communication With Other Services

- Issues JWTs that are validated by the API Gateway
- Exposes user identity information to authorized services
- Does not directly access other service databases

---

## 🧪 Definition of Done (Phase 1)

This service is considered complete for Phase 1 when:
- Users can successfully register and log in
- JWTs are correctly issued and validated
- Roles are assigned and enforced
- Other services can trust user identity from tokens
- The service runs independently via Docker

---

## 🧱 Repository Structure

The Auth Service follows a **lean, feature-based repository structure** designed to support incremental development during Phase 1 (MVP), while remaining scalable for future phases.

This structure clearly separates responsibilities, avoids premature abstraction, and keeps authentication logic centralized.

```text
auth-service/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   ├── modules/
│   │   ├── auth/
│   │   └── users/
│   ├── middlewares/
│   ├── utils/
│   └── routes.js
├── prisma/
├── tests/
├── Dockerfile
├── .env.example
└── README.md


