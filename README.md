# AI-Based Factory Management & Monitoring System

An intermediate-level college project showcasing a full-stack factory management system. 
Features real-time dashboard data, AI simulated rule-based monitoring, order processing with automated inventory deduction, and comprehensive CRUD modules.

## Features
- **Dashboard**: High-level metrics, active worker counts, running machines.
- **Machines**: Manage factory equipment (CRUD), track temperature and operating hours.
- **Workers**: Manage staff, shifts, and attendance.
- **Products & Inventory**: Manage products, stock levels, and low-stock limits.
- **Orders**: Sales management with automatic stock deduction upon order completion.
- **Production & Maintenance**: Track daily target vs actuals, and log machine maintenance.
- **AI Monitoring**: Rule-based alerts for overheating machines, low stock, and stopped machines.

## Prerequisites
- Node.js (v18+)
- Java 17+
- Maven
- MySQL Server (running on `localhost:3306`)

## Setup Instructions

### 1. Database
Ensure your MySQL server is running.
Create a database named `factory_db` or let Hibernate autocreate it.
Update credentials in `backend/src/main/resources/application.properties` if your MySQL user/pass is not `root`/`root`.

### 2. Backend
Navigate to the `backend` folder:
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
The backend API runs on `http://localhost:8080`. Sample data is automatically seeded.

### 3. Frontend
Navigate to the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

## Tech Stack
- Frontend: React + Vite + Bootstrap, Recharts, Lucide-React
- Backend: Java Spring Boot, Spring Data JPA, MySQL
- Architecture: RESTful APIs
