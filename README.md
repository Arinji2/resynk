Note: Run the following to have prefixing commits
`git config core.hooksPath .githooks`

ReSynk

Decentralized Disaster Reporting & Synchronization Platform
Built for real-time emergency coordination.

What is ReSynk?

ReSynk is a disaster management backend + mobile system that:

Collects disaster reports from phones (even offline)

Syncs data when internet is available

Uses AI (Gemini) to classify incidents

Groups reports into incidents by type + location

Stores base64 images as real files

Uses PocketBase as backend database

Architecture

Phone App
⬇
/sync endpoint
⬇
FastAPI Backend
⬇
AI Classification (Gemini)
⬇
PocketBase Database

Tech Stack
Backend

FastAPI

PocketBase

Google Gemini API

Docker Ready

Mobile

Expo / React Native

Core Features
✅ 1. Disaster Reports

Users can submit:

Title

Description

Latitude / Longitude

Image (Base64)

Mesh Sync ID

Images are:

Decoded from base64

Uploaded as real files

Returned with full image URL

✅ 2. AI Incident Grouping

When a report is submitted:

Gemini analyzes description

Detects incident type

Groups reports by:

Disaster type

Geographic proximity

Either:

Creates new incident

Or attaches to existing one

✅ 3. Offline Sync Support

Phone stores:

User data

Reports

When online:

Sends everything to /sync

Backend:

Updates user

Deduplicates reports

Links to incidents

Uploads images

How Incident Grouping Works

Reports are grouped if:

Same disaster type

Close geographic distance

Similar title/context

Example:

5 flood reports in same area
→ 1 Flood Incident
→ 5 linked reports

📂 Project Structure
backend/
│
├── app/
│   ├── main.py
│   ├── routes/
│   │   ├── reports.py
│   │   ├── sync.py
│   │   └── auth.py
│   │
│   └── services/
│       ├── pocketbase_service.py
│       ├── incidents_service.py
│       ├── incident_ai_service.py
│       └── ai_service.py
│
└── Dockerfile
Environment Variables

Create .env file:

SUPERUSER_EMAIL=your_superuser_email
SUPERUSER_PASSWORD=your_superuser_password
GOOGLE_API_KEY=your_gemini_api_key

Run Locally
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

Open:

http://127.0.0.1:8000/docs
Run with Docker

Build:

docker build -t resynk-backend .

Run:

docker run -p 8000:8000 --env-file .env resynk-backend
API Endpoints
POST /reports

Create single report

POST /sync

Bulk sync user + reports

POST /auth/login

Superuser authentication

Image Handling

Mobile sends:

data:image/jpeg;base64,...

Backend:

Decodes base64

Converts to file

Uploads to PocketBase

Returns public image URL

Frontend displays:

<Image source={{ uri: report.image_url }} />
🛡 Production Ready Features

Deduplication via mesh_sync_id

Superuser authentication

AI-powered classification

File upload handling

Incident linking

Scalable structure
