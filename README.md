# AI-Based Factory Management & Monitoring System

A modern, cloud-connected Full-Stack Industrial IoT & Factory Operations Management Platform featuring JWT-secured authentication, machine telemetrics, worker scheduling, production tracking, automated inventory deduction, and AI rule-based anomaly detection.

---

## 📌 Project Submission Details (Google Form Ready)

### Project Abstract (Title)
> **AI-Based Factory Management & Monitoring System**

### About Project
> The **AI-Based Factory Management & Monitoring System** is an enterprise-grade full-stack smart manufacturing platform designed to streamline industrial workflows, equipment health diagnostics, and human resource tracking in real time. 
> 
> The system integrates a high-performance **React (Vite)** single-page frontend with a robust **Java Spring Boot 3** RESTful microservice architecture and a cloud-hosted **Aiven MySQL** database. Security is enforced through stateless **JWT (JSON Web Tokens)** and **BCrypt** password hashing, safeguarding operations across role-based tiers (Admin, Manager, Worker).
> 
> Core capabilities include real-time IoT machine condition and temperature threshold monitoring, automated AI rule-based anomaly detection for preventative maintenance, dynamic production capacity tracking, automated inventory recalculation upon sales order dispatch, and high-density operational telemetry dashboards powered by interactive data visualizations.

### Frontend (GitHub Link)
🔗 **[https://github.com/gudivenukasaikrishna7-lang/factory-management/tree/main/frontend](https://github.com/gudivenukasaikrishna7-lang/factory-management/tree/main/frontend)**

### Backend (GitHub Link)
🔗 **[https://github.com/gudivenukasaikrishna7-lang/factory-management/tree/main/backend](https://github.com/gudivenukasaikrishna7-lang/factory-management/tree/main/backend)**

### Final Project Deployment Link
🌐 **[https://frontend-psi-teal-37.vercel.app](https://frontend-psi-teal-37.vercel.app)**

---

## 🏗️ System Architecture & Tech Stack

| Layer | Technologies & Tools |
|---|---|
| **Frontend UI/UX** | React 19, Vite 8, Bootstrap 5, Recharts (Data Viz), Lucide React Icons, Axios |
| **Backend API** | Java 17/21, Spring Boot 3.2.4, Spring Data JPA, Hibernate ORM, Maven |
| **Security & Auth** | Spring Security 6, Stateless JWT (JJWT), BCrypt Password Encryption, CORS |
| **Database** | Aiven Cloud MySQL (Production with SSL/TLS) / Local MySQL (Development) |
| **Cloud Hosting** | **Vercel** (Frontend SPA) + **Render** (Containerized Docker Backend API) |

---

## ⚙️ Key Modules & Capabilities

1. **Secure Access & Identity Control:** 
   - Role-based authorization (Admin / Manager / Worker).
   - Dual-mode identifier login (supports either registered Username or Email).
   - Protected route guards with automatic session expiration handling.
2. **Real-time Machine Monitoring & IoT Telemetry:**
   - Real-time diagnostics for operational temperature, active run-hours, and throughput.
   - Status categorization (`Running`, `Idle`, `Maintenance`).
3. **AI Rule-Based Anomaly Detection & Alerts:**
   - Automated threshold scanning for overheating equipment (> 80°C), low stock anomalies, and unexpected line stoppages.
   - One-click alert lifecycle management (`Unresolved` &rarr; `Resolved`).
4. **Inventory & Order Automation:**
   - Synchronized product catalog with automated stock deduction when purchase orders transition to `Completed`.
5. **Workforce & Maintenance Operations:**
   - Shift scheduling (Morning/Evening/Night) and employee attendance logs.
   - Preventative maintenance scheduling and history logs.

---

## 🚀 Deployment Endpoints

* **Live Frontend:** [https://frontend-psi-teal-37.vercel.app](https://frontend-psi-teal-37.vercel.app)
* **Live Backend API:** [https://factory-management-backend-oi58.onrender.com](https://factory-management-backend-oi58.onrender.com)
* **GitHub Repository:** [https://github.com/gudivenukasaikrishna7-lang/factory-management](https://github.com/gudivenukasaikrishna7-lang/factory-management)
