🏥 MediFlow – Smart Supply, Seamless Care

MediFlow is a smart inventory management platform tailored for hospitals, clinics, and pharmacies. It streamlines the tracking, reporting, and management of medical supplies to reduce wastage, avoid critical shortages, and ensure uninterrupted patient care.

🚀 Features

📊 Dashboard Overview
Real-time inventory metrics and a quick summary of stock health.

🗺️ Supply Location Map
Static map layout highlighting key supply zones inside the facility.

🛠️ Inventory Management
Create, view, update, and manage inventory items with ease.

🛎️ Notifications Panel
Timeline-style logs that track every inventory action or change.

📦 Stock Alerts
Automatic highlighting of low-stock and out-of-stock items.

📈 Reports & Analytics
Visual insights into stock trends and usage patterns using bar and pie charts.

🔒 LocalStorage Data Persistence
Client-side state persists across sessions for demo usage.

🛠️ Tech Stack

Frontend
React.js (Vite)
Tailwind CSS (utility-first styling)
React Router DOM (SPA navigation)
Chart.js / Recharts (data visualization)
Backend
Node.js + Express (REST API)
MySQL (relational database)

📁 Project Structure
mediFlow/
├── client/                     # React frontend
│   ├── components/             # Sidebar, navbar, cards, shared UI
│   ├── pages/                  # Dashboard, Inventory, Reports, etc.
│   ├── data/                   # Dummy inventory data for demo
│   └── App.jsx                 # Main app routing
│
└── server/                     # Backend API
    ├── models/                 # Sequelize models
    ├── db.js                   # MySQL connection setup
    └── server.js               # Express server entry point

🧠 Use Case

Problem:-

Hospitals and clinics frequently face operational challenges due to outdated or manual inventory systems:
Stock shortages during emergencies
Overstocking and wastage
Difficulty tracking supplies across locations
Lack of timely alerts for critical items
Inefficient, error-prone manual logs

Solution:-

MediFlow resolves these issues by offering:
A complete digital inventory tracking system
Real-time stock monitoring
Low-stock and out-of-stock alerting
Visual dashboards for at-a-glance insights
Timeline logs for traceability
Reports for data-driven supply analysis

💻 Getting Started:-

Prerequisites

Node.js & npm
MySQL (local or cloud)
Git

▶️ Install & Run Frontend
cd client
npm install
npm run dev

▶️ Install & Run Backend
cd server
npm install
node server.js

