🚀 ReSynk

🌍 Resilient Disaster Reporting & Synchronization Platform
Offline-first. AI-powered. Family-aware.

🧠 What is ReSynk?

ReSynk is an intelligent disaster coordination system designed to:

📱 Collect reports from mobile devices (even offline)

🔄 Sync data when connectivity is restored

🤖 Use AI to classify disasters

🚨 Automatically group reports into incidents

👨‍👩‍👧 Organize users into households & families

🖼️ Handle image uploads via Base64

🗄️ Store structured disaster data using PocketBase

🏗️ System Architecture
Mobile App (Expo)
        │
        ▼
FastAPI Backend
        │
        ├── User & Household Engine
        ├── Sync Engine
        ├── AI Incident Engine (Gemini)
        ├── Image Processing Layer
        │
        ▼
PocketBase Database
✨ Core Features
📄 Disaster Reports

Title

Description

Location (Latitude / Longitude)

Image (Base64 → Stored as file)

Mesh Sync ID (Deduplication)

🤖 AI-Powered Incident Detection

Uses Google Gemini

Extracts disaster type & severity

Groups similar reports

Auto-creates incidents

Links reports to incidents

👤 Users

Stored via Aadhar identification

Medical data (blood group, allergies, medications)

Role & age

Linked to reports

🏠 Households & Families

Each user can be head of household

Family members stored separately

Structured disaster unit tracking

Supports emergency prioritization

🔄 Offline Sync System

Mobile sends:

{
  "user": {...},
  "reports": [...]
}

Backend:

Upserts user

Creates/updates household

Syncs family members

Deduplicates reports

Processes incidents

Uploads images

📂 Backend Structure
backend/
│
├── app/
│   ├── main.py
│   ├── routes/
│   │   ├── reports.py
│   │   ├── sync.py
│   │   ├── incidents.py
│   │   └── auth.py
│   │
│   └── services/
│       ├── pocketbase_service.py
│       ├── incidents_service.py
│       ├── incident_ai_service.py
│       └── ai_service.py
│
├── Dockerfile
└── README.md
🧠 How Incident Grouping Works

Reports are grouped when:

Same disaster type

Close geographic proximity

Similar title/context

Example:

5 flood reports in Mumbai
→ 1 Flood Incident
→ 5 linked reports

🖼 Image Handling

Mobile sends:

data:image/jpeg;base64,...

Backend:

Extract MIME type

Decode Base64

Convert to binary

Upload to PocketBase

Generate public image URL

Frontend displays:

<Image source={{ uri: report.image_url }} />
⚙️ Environment Variables

Create a .env file inside backend:

SUPERUSER_EMAIL=your_email
SUPERUSER_PASSWORD=your_password
GOOGLE_API_KEY=your_gemini_key
▶️ Running Locally
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

Visit:

http://127.0.0.1:8000/docs
🐳 Docker Support

Build image:

docker build -t resynk-backend .

Run container:

docker run -p 8000:8000 --env-file .env resynk-backend
🔐 Security Model

Superuser authentication via PocketBase

Deduplication using mesh_sync_id

Structured validation via Pydantic

AI responses forced into strict JSON

Base64 validation before upload

📊 Data Relationships
User
  │
  ├── Household
  │     ├── Family Member
  │     ├── Family Member
  │
  └── Reports
        └── Incident
🚀 Future Improvements

Geo-clustering algorithm

Redis caching

Background AI worker queue

Incident severity scoring engine

Household vulnerability prioritization

Admin dashboard

💙 Project Meaning

ReSynk = Resilient Synchronization

A system built to sync disaster intelligence across devices, families, and regions — even in unstable conditions.

🧑‍💻 Built With

FastAPI

PocketBase

Google Gemini API

Expo / React Native

Docker
