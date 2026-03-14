# AI Career Interview Assistant 🚀

AI Career Interview Assistant is a full-stack web application designed to help job seekers prepare for interviews. By analyzing a candidate's resume, self-description, and target job description using **Google Gemini AI**, the application generates a comprehensive interview preparation report including match scores, technical/behavioral questions, skill gap analysis, and a personalized 7-day preparation plan.

## ✨ Features

-   **🔐 Secure Authentication:** User registration and login with JWT-based authentication.
-   **📄 Resume Analysis:** Upload PDF resumes for automated parsing and analysis.
-   **🤖 AI-Powered Insights:** Utilizes Google Gemini to generate:
    -   **Match Score:** How well you fit the job requirements.
    -   **Technical Questions:** Tailored questions with suggested answers and interviewer intent.
    -   **Behavioral Questions:** STAR-method based questions and answers.
    -   **Skill Gap Analysis:** Identification of missing skills with severity levels.
    -   **Preparation Plan:** A structured 7-day roadmap to bridge gaps and prepare.
-   **📜 History Tracking:** Save and view previous interview reports to track your progress.
-   **⚡ Modern UI:** Responsive and intuitive interface built with React and Tailwind CSS.

## 🛠️ Tech Stack

### Frontend
-   **Framework:** React 19 (Vite)
-   **Styling:** Tailwind CSS
-   **Routing:** React Router 7
-   **State Management:** Context API
-   **HTTP Client:** Axios

### Backend
-   **Runtime:** Node.js
-   **Framework:** Express.js
-   **Database:** MongoDB (Mongoose)
-   **AI Integration:** Google Generative AI (@google/genai)
-   **Authentication:** JSON Web Tokens (JWT) & bcryptjs
-   **File Handling:** Multer & pdf-parse
-   **Validation:** Zod

## 🚀 Getting Started

### Prerequisites
-   Node.js (v18 or higher)
-   MongoDB Atlas account or local MongoDB instance
-   Google Gemini API Key (get it from [Google AI Studio](https://aistudio.google.com/))

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ai-career-interview-assistant.git
    cd ai-career-interview-assistant
    ```

2.  **Backend Setup:**
    ```bash
    cd Backend
    npm install
    ```
    Create a `.env` file in the `Backend` directory:
    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    GEMINI_API_KEY=your_gemini_api_key
    ```

3.  **Frontend Setup:**
    ```bash
    cd ../Frontend
    npm install
    ```
    Create a `.env` file in the `Frontend` directory (if needed, though standard Vite uses `VITE_` prefix):
    ```env
    VITE_API_URL=http://localhost:3000/api
    ```

### Running the Application

1.  **Start Backend:**
    ```bash
    cd Backend
    npm start # or node Server.js
    ```

2.  **Start Frontend:**
    ```bash
    cd Frontend
    npm run dev
    ```
    Open `http://localhost:5173` in your browser.

## 📁 Project Structure

```
AI Career Interview Assistant/
├── Backend/
│   ├── Src/
│   │   ├── Controller/    # API logic
│   │   ├── Middleware/    # Auth & File upload middlewares
│   │   ├── Model/         # Mongoose schemas
│   │   ├── Routes/        # Express routes
│   │   ├── Service/       # AI service integration
│   │   └── config/        # DB configuration
│   ├── Server.js          # Entry point
│   └── vercel.json        # Vercel deployment config
└── Frontend/
    ├── src/
    │   ├── Auth/
    │   │   ├── Componenets/  # UI Components (Home, Result, History, etc.)
    │   │   ├── context/      # React Context providers
    │   │   ├── Hooks/        # Custom React hooks
    │   │   ├── Pages/        # Login and Register pages
    │   │   └── Service/      # API services (axios)
    │   ├── App.jsx           # Main App component
    │   └── app.routes.jsx    # Application routing
    └── index.html         # Entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.


