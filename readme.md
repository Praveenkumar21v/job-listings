# 📘 Job Listing Web Application

## 🎯 Objective
Create a job listing web application where users can view job opportunities in a two-column layout:
- Left side: list of jobs
- Right side: detailed view of the selected job

Users can also filter jobs by location through a search bar.

---

## 🧩 Features

### ✅ Frontend Features:
- Display a list of jobs on the left-hand side.
- When a job is clicked, show its details dynamically on the right-hand side.
- Location-based search bar to filter job listings.
- Fields displayed:
  - Job Title
  - Location
  - Description
  - Employment Type
  - Posted Date
  - Source
  - Experience Range

---

### ✅ Backend Features:
- JSON data provided is imported into MongoDB.
- Created a Mongoose schema based on the data structure.
- REST API to:
  - `GET /jobs` → Fetch all jobs
  - `GET /jobs?location={location}` → Fetch jobs filtered by location

---

## 🛠 Tech Stack

- **Frontend**: Next.js + Tailwind CSS
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB
- **Deployment**:
  - Frontend: Vercel
  - Backend: Render

---

## 🚀 Deployment Links

- 🔗 **Frontend Live**: https://job-listings-hazel.vercel.app
- 🔗 **Backend Live**: https://job-listings-2d10.onrender.com

---

## 🖥️ How to Run Locally

### Backend
cd backend
npm install
node index.js

### Frontend
cd frontend
npm install
npm run dev

## Assumptions / Challenges 

Job data was manually imported using MongoDB Compass.

Basic error handling and filtering implemented.

No login/authentication – public job listing only.

Basic UI built for functional clarity, not extensive design.

CORS handled between frontend and backend during development.