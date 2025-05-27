# 📝 Notes Taking App

A simple, secure, and responsive full-stack Notes Taking application built with **Next.js 14 App Router**, **MongoDB**, **JWT Authentication**, **Axios**, and **Bcrypt**. Users can register, log in securely, and create/manage personal notes.

---

## 🚀 Features

- ✅ JWT-based Authentication (Login with cookies)
- ✅ Role-based User Management
- ✅ Protected Routes using Middleware
- ✅ Create, View, and Manage Notes
- ✅ Responsive Dashboard UI with Tailwind CSS
- ✅ API built using Next.js Route Handlers

---

## 🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| **Next.js** | React-based Framework (App Router) |
| **MongoDB** | NoSQL Database for storing users and notes |
| **JWT** | Secure token-based authentication |
| **Axios** | HTTP client for API communication |
| **Bcrypt** | Password hashing for security |
| **Tailwind CSS** | Utility-first CSS framework |

---

## 📦 Installation & Setup

### 🔧 Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas or local MongoDB
- Git
# Install all packages
npm install

# If you need specific packages individually:
npm install axios
npm install jsonwebtoken
npm install bcryptjs
npm install mongodb

## ENV VARIABLES
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000

### 📁 Clone the Repository

```bash
git clone https://github.com/your-username/notes-taking-app.git
cd notes-taking-app
