# 🚀 AI Learning Platform

An intelligent AI-powered learning platform that helps users improve through **personalized tests, weak topic analysis, and AI-generated study plans**.

---

## 🌐 Live Demo:https://ai-learning-platform-git-main-dhiraj-kumars-projects-e9bc6d24.vercel.app
 

---

## ✨ Features

- 🔐 User Authentication (Login / Register)
- 🧠 AI-based Test Generation
- 📊 Result Analysis with Score & Percentage
- ❌ Weak Topic Detection
- 🤖 AI Study Suggestions (Auto Generated)
- 📅 Personalized Study Plan Generator
- 📚 Question Review System
- 🎯 Performance Tracking Dashboard

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### AI Integration
- Groq API (LLM-based suggestions)

---

## 📁 Project Structure
ai-learning-platform/
│
├── Backend/
│ ├── src/
│ │ ├── config/
│ │ │ └── db.js
│ │ │
│ │ ├── controllers/
│ │ │ ├── auth.controller.js
│ │ │ ├── progress.controller.js
│ │ │ ├── result.controller.js
│ │ │ ├── study-plan.controller.js
│ │ │ └── test.controller.js
│ │ │
│ │ ├── middlewares/
│ │ │ ├── auth.middleware.js
│ │ │ ├── error.middleware.js
│ │ │ ├── notFound.middleware.js
│ │ │ └── rateLimiter.middleware.js
│ │ │
│ │ ├── models/
│ │ │ ├── user.model.js
│ │ │ ├── result.model.js
│ │ │ ├── progress.model.js
│ │ │ ├── studyPlan.model.js
│ │ │ └── resource.model.js
│ │ │
│ │ ├── routes/
│ │ │ ├── index.js
│ │ │ ├── auth.routes.js
│ │ │ ├── progress.routes.js
│ │ │ ├── result.routes.js
│ │ │ ├── studyPlan.routes.js
│ │ │ └── test.routes.js
│ │ │
│ │ ├── services/
│ │ │ ├── ai.service.js
│ │ │ ├── progress.service.js
│ │ │ ├── result.service.js
│ │ │ ├── scoring.service.js
│ │ │ └── studyPlan.service.js
│ │ │
│ │ └── app.js
│ │
│ ├── server.js
│ ├── package.json
│ └── .env
│
├── Frontend/
│ ├── public/
│ │
│ ├── src/
│ │ ├── app/
│ │ │ ├── App.jsx
│ │ │ └── routes.jsx
│ │ │
│ │ ├── components/
│ │ │ └── Navbar.jsx
│ │ │
│ │ ├── features/
│ │ │ ├── auth/
│ │ │ │ └── auth.api.js
│ │ │ └── test/
│ │ │ └── test.api.js
│ │ │
│ │ ├── pages/
│ │ │ ├── auth/
│ │ │ │ ├── Login.jsx
│ │ │ │ └── Register.jsx
│ │ │ │
│ │ │ ├── dashboard/
│ │ │ │ └── Dashboard.jsx
│ │ │ │
│ │ │ └── test/
│ │ │ ├── GenerateTest.jsx
│ │ │ ├── Test.jsx
│ │ │ ├── Result.jsx
│ │ │ └── Home.jsx
│ │ │
│ │ ├── services/
│ │ │ └── api.js
│ │ │
│ │ ├── store/
│ │ │ └── testStore.js
│ │ │
│ │ ├── assets/
│ │ ├── main.jsx
│ │ └── index.css
│ │
│ ├── index.html
│ ├── package.json
│ └── vite.config.js


---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Offical-Dhiraj/ai-learning-platform.git
cd ai-learning-platform


---

### 2️⃣ Backend Setup
cd Backend
npm install
Run backend:
npm start


---
### 3️⃣ Frontend Setup
cd Frontend
npm install
npm run dev

## 🌍 Deployment

- Frontend → Vercel  
- Backend → Render  
- Database → MongoDB Atlas  

---

## 🔐 Environment Variables

### Backend (.env)
MONGO_URI=
JWT_SECRET=
GROQ_API_KEY=
EMAIL=
EMAIL_PASS=

---

### Frontend (.env)
VITE_API_URL=https://your-backend-url.onrender.com


---


## 🔥 Future Improvements

- 📧 Email Verification System
- 🔁 OTP Login
- 📊 Advanced Analytics
- 🎓 Course Recommendation

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to fork this repo and submit a pull request.

---

## 👨‍💻 Author

**Dhiraj Kumar**

- GitHub: https://github.com/Offical-Dhiraj

---

## ⭐ Support

If you like this project:

- ⭐ Star the repo  
- 🍴 Fork it  
- 📢 Share it  

---

## 📄 License

This project is licensed under the MIT License.

