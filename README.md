# 🍽️ DineFlow - Smart Hostel Dining Management System

A full-stack MERN application built to streamline hostel dining operations through a centralized platform. DineFlow enables students to access daily menus, submit complaints, share reviews, and track their activities, while providing administrators with powerful tools to manage menus, students, complaints, and feedback efficiently.

## 🚀 Live Demo

🌐 **Frontend:** https://dine-flow-three-omega.vercel.app/

> ⚠️ Backend deployment is in progress.

---

## ✨ Features

### 👨‍🎓 Student Portal
- 🔐 Secure Authentication (JWT)
- 🍽️ View Today's Menu
- 📝 Raise Complaints
- 📊 Track Complaint Status
- ⭐ Submit Reviews
- 📋 View Personal Activity
- 👤 Update Profile

### 👨‍💼 Admin Portal
- 📊 Interactive Dashboard
- 👥 Manage Students
- 🍽️ Manage Weekly Menus
- 💬 Manage Student Complaints
- ⭐ Manage Reviews
- 📈 Dashboard Statistics

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

---

## 📂 Project Structure

```text
DineFlow
├── frontend
├── backend
└── README.md
```

---

## 🔐 Authentication & Security

- JWT Authentication
- Password Hashing using bcryptjs
- Protected Routes
- Role-Based Access Control

---


## 🌟 Project Highlights

- Full-Stack MERN Architecture
- JWT-based Authentication & Authorization
- Role-Based Access Control (Student & Admin)
- Secure Password Hashing with bcryptjs
- RESTful API Integration
- CRUD Operations for Menus, Complaints & Reviews
- Responsive User Interface
- Clean and Modular Folder Structure
- Reusable React Components
- MongoDB Atlas Integration

---

## ⚙️ Deployment Guide

This project is fully structured for easy local execution and production deployment.

### 💻 Local Deployment

To run DineFlow locally:
1. **Initialize Environments:**
   - Copy `backend/.env.example` to `backend/.env` and supply your database connection and secrets:
     ```bash
     cp backend/.env.example backend/.env
     ```
   - Copy `frontend/.env.example` to `frontend/.env`:
     ```bash
     cp frontend/.env.example frontend/.env
     ```
2. **Install Dependencies:**
   Install both frontend and backend dependencies using the workspace orchestrator:
   ```bash
   npm run install:all
   ```
3. **Start the Application:**
   Run both frontend and backend concurrently with a single command:
   ```bash
   npm run dev
   ```
   - Backend will run on [http://localhost:5000](http://localhost:5000)
   - Frontend will run on [http://localhost:5173](http://localhost:5173)

---

### 🛢️ MongoDB Atlas Setup
1. Sign up/Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free shared cluster.
3. In **Network Access**, add IP Address `0.0.0.0/0` (allows connections from your local machine and Render servers).
4. In **Database Access**, create a user with read/write privileges.
5. Click **Connect** -> **Drivers** to retrieve your MongoDB Connection String (e.g., `mongodb+srv://...`). Use this as `MONGO_URI`.

---

### 🚀 Backend Cloud Deployment (Render)
We have provided a blueprint (`render.yaml`) for one-click setup on [Render](https://render.com/).
1. Commit and push the project to a GitHub repository.
2. In Render, select **Blueprints** -> **New Blueprint Instance**.
3. Connect your repository. Render will automatically detect `render.yaml` and set up the service.
4. Supply the env variables in the Render dashboard:
   - `MONGO_URI`: Your MongoDB Atlas URI.
   - `JWT_SECRET`: A secure random string for signing JWT tokens.

*Alternatively, manually create a Render Web Service with:*
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Root Directory:** `backend` (or run from root with appropriate prefix commands)

---

### ⚡ Frontend Cloud Deployment (Vercel / Netlify)
1. Go to [Vercel](https://vercel.com/) and import your project repository.
2. Select `frontend` as the **Root Directory**.
3. Add the following **Environment Variable**:
   - `VITE_API_URL`: Your deployed backend service URL (e.g., `https://dineflow-backend.onrender.com/api`).
4. Vercel will automatically detect Vite, set the build command to `npm run build`, and deploy the frontend.

---

## 👩‍💻 Author

**Shweta Ahirwar**

GitHub: https://github.com/Shwetaak15

---

## 📄 License

This project is developed for learning, academic, and portfolio purposes.
