# 📚 Table of Contents
- [🎉 Introduction](#introduction)
- [🛠️ Tech Stack](#tech-stack)
- [⚙️ Project Setup](#project-setup)
  - [🔗 Clone the Repository](#clone-the-repository)
  - [💻 Run the App Locally](#run-the-app-locally)
- [✨ Features](#features)
- [🧑‍💻 Best Practices](#best-practices)
- [📝 License](#license)

---

## 🎉 Introduction
This project is a **full-stack web application** built with **Flask** for the backend, **React** for the frontend, and **SQLite** as the database. The app includes features such as **user authentication** (signup, login, and logout) and **CRUD operations** (Create, Read, Update, Delete). The frontend is built using **Material UI** for a **responsive, modern design**. This app serves as a practical example of how to integrate Python, Flask, React, and SQLite into a single project.

---

## 🛠️ Tech Stack
- **Python** 🐍 for the backend
- **Flask** 🧪 as the web framework for building REST APIs
- **React** ⚛️ for building a dynamic and interactive frontend
- **SQLAlchemy** 🗃️ as the ORM (Object-Relational Mapping) tool
- **SQLite** 🗄️ for the database
- **Material UI** 🎨 for building a modern and responsive UI

---

## ⚙️ Project Setup
Follow these steps to set up the project locally. It includes instructions for cloning the repository, setting up the virtual environment, and installing dependencies.

### 🔗 Clone the Repository
Clone the project using the following command:
```bash
git clone https://github.com/seanjoerick/react-flask-crud-with-authentication.git

```
#### 🏠 Navigate to the Project Directory
Once cloned, navigate into the project directory:mand:
```bash
cd JRDEV-EXAM

```
#### 🔧 Navigate to the Backend Directory
Go into the backend directory:
```bash
cd backend

```
#### 🐍 Create a Virtual Environment
Create a virtual environment for the backend:
```bash
py -m venv venv

```
#### 🖥️ Activate the Virtual Environment
Activate the virtual environment:
```bash
.venv\Scripts\activate  # On Windows
source .venv/bin/activate  # On macOS/Linux

```
#### 🏃 Navigate to the Frontend Directory
Go back to the root directory, then navigate to the frontend directory:
```bash
cd ../frontend

```
#### 📦 Install Frontend Dependencies
Install the frontend dependencies:
```bash
cd ../frontend
```

#### 🔨 Build the Frontend
Build the frontend app for production:
```bash
npm run build

```
#### ⚙️ Run the Backend Server
Go back to the backend directory and start the Flask server:
```bash
flask run

```
##### ✨ Features
CRUD operations (Create, Read, Update, Delete) for managing items
User authentication (Login, Signup, and Logout)
Responsive design using Material UI for the frontend
Full-stack development using React for the frontend and Flask for the backend
Uses SQLAlchemy as the ORM to interact with the SQLite database

##### 🧑‍💻 Best Practices
MVC Pattern: The project follows the Model-View-Controller (MVC) pattern to separate concerns, ensuring better maintainability and scalability.
Virtual Environments: The backend runs within a virtual environment, ensuring dependencies are isolated and the project setup is clean.
Environment Variables: Used .env files to manage sensitive information such as database URIs and secret keys.

Watch the demo here: https://youtu.be/PzR-T5CEejo



