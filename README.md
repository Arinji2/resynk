---

# 🚀 ReSynk

<p align="center">
  <b>Resilient Disaster Reporting & Synchronization Platform</b><br/>
  Offline-First • AI-Powered • Family-Aware
</p>

---

## 🌍 Overview

**ReSynk** is an intelligent disaster coordination backend built to collect, process, and organize disaster reports from mobile devices — even in low-connectivity environments.

It combines:

* 📱 Offline-first mobile syncing
* 🤖 AI-based disaster classification
* 🚨 Automatic incident grouping
* 👨‍👩‍👧 Household & family structuring
* 🖼️ Base64 image handling
* 🗄️ PocketBase data storage

---

## 🏗️ System Architecture

```
Mobile App (Expo / React Native)
          │
          ▼
      FastAPI Backend
          │
          ├── Authentication Layer
          ├── Sync Engine
          ├── AI Incident Engine (Gemini)
          ├── User & Household Manager
          ├── Image Processing (Base64 → File)
          │
          ▼
      PocketBase Database
          ├── Users
          ├── Households
          ├── Family Members
          ├── Reports
          └── Incidents
```

---

## ✨ Core Features

### 📄 Disaster Reports

Each report contains:

* Title
* Description
* Latitude & Longitude
* Image (Base64 encoded)
* Mesh Sync ID (for deduplication)

Reports are:

* AI-classified
* Linked to incidents
* Stored with image files
* Deduplicated safely

---

### 🤖 AI-Powered Incident Detection

When a report is received:

1. Description is sent to Google Gemini
2. Disaster type & severity are extracted
3. System checks for similar incidents
4. Report is linked or new incident is created

Example:

5 flood reports in same area
→ 1 Flood Incident
→ 5 linked reports

---

### 👤 User Management

Users are identified using Aadhar number.

Stored data:

* Name
* Role
* Age
* Blood group
* Allergies
* Medications
* Last known location (optional)

Users are automatically updated during sync.

---

### 🏠 Household & Family System

Each user can belong to a household.

Structure:

* 1 Head User
* 1 Household
* Multiple Family Members

Family members store:

* Full name
* Age
* Blood group
* Allergies
* Medical details

This enables disaster vulnerability mapping and family-based emergency coordination.

---

### 🔄 Offline Sync System

Mobile sends:

```json
{
  "user": {...},
  "reports": [...]
}
```

Backend performs:

* User upsert
* Household validation
* Family sync
* Report deduplication
* AI classification
* Image decoding
* Incident linking
* Structured response return

---

## 📂 Backend Structure

```
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
```

---

## 🖼 Image Processing Flow

Mobile sends:

```
data:image/jpeg;base64,...
```

Backend:

1. Extracts MIME type
2. Decodes Base64
3. Converts to binary file
4. Uploads via multipart form
5. Stores file in PocketBase
6. Generates public image URL

Frontend displays:

```javascript
<Image source={{ uri: report.image_url }} />
```

---

## 🔐 Environment Variables

Create a `.env` file inside the backend folder:

```
SUPERUSER_EMAIL=your_superuser_email
SUPERUSER_PASSWORD=your_superuser_password
GOOGLE_API_KEY=your_gemini_api_key
```

---

## ▶️ Running Locally

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Open:

```
http://127.0.0.1:8000/docs
```

---

## 🐳 Docker Deployment

Build:

```bash
docker build -t resynk-backend .
```

Run:

```bash
docker run -p 8000:8000 --env-file .env resynk-backend
```

---

## 🧠 Data Relationships

```
User
  │
  ├── Household
  │     ├── Family Member
  │     ├── Family Member
  │
  └── Reports
        └── Incident
```

---

## 🛡 Security Model

* Superuser authentication via PocketBase
* Deduplication using mesh_sync_id
* Strict JSON parsing from AI
* Base64 validation before upload
* Backend-only database credentials

---

## 🚀 Future Improvements

* Geo-clustering optimization
* Redis caching
* Background AI worker queue
* Incident severity scoring engine
* Household vulnerability prioritization
* Admin dashboard

---

## 💙 Project Meaning

**ReSynk = Resilient Synchronization**

A system built to synchronize disaster intelligence across devices, families, and regions — even during unstable conditions.

---
