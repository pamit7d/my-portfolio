# Data Scientist Portfolio  
**Modern • Scalable • Free-Tier • Engineer-Grade**

---

## 1. Project Overview

This project is a **professional Data Scientist portfolio website** designed to clearly communicate **analytical impact, engineering discipline, and system thinking** in a single artifact.

The goal is **not** to showcase every tool, but to demonstrate:
- Strong problem framing
- Data-driven reasoning
- Clean, maintainable engineering
- Awareness of real-world constraints (cost, scalability, simplicity)

This portfolio is built using **free-tier infrastructure only** and follows a **Software Development Life Cycle (SDLC)** approach.

---

## 2. Problem Statement

Most data science portfolios fail because they:
- List tools instead of impact
- Show notebooks without context
- Overengineer with unnecessary tech
- Lack structure and narrative

This project solves that by:
- Making impact visible within 60 seconds
- Separating static content from dynamic logic
- Prioritizing clarity over complexity
- Treating the portfolio like a real software product

---

## 3. Project Goals

### Primary Goals
- Present data science work with **clear business and analytical impact**
- Demonstrate **full-stack awareness** without overengineering
- Build a **scalable foundation** for future features (AI, analytics)
- Keep the system **free-tier compatible**

### Non-Goals (Explicitly Out of Scope for v1)
- Paid APIs or SaaS
- Authentication / user accounts
- AI chatbot in v1
- Microservices architecture

---

## 4. Tech Stack

### Frontend
- React
- HTML, CSS, JavaScript
- JSON-driven content architecture

### Backend (Planned & Implemented for Extensions)
- FastAPI
- Pydantic (validation)

### Database
- Managed PostgreSQL (Supabase / Neon – Free Tier)

### DevOps & Deployment
- Docker
- Docker Compose
- AWS EC2 (Free Tier)
- GitHub for version control

---

## 5. System Architecture

    Browser
    |
    React (Static UI, JSON-driven)
    |
    | (Only for dynamic features)
    FastAPI
    |
    Managed PostgreSQL (Free Tier)


### Architectural Principles
- **Static-first**: Portfolio content is static for speed and simplicity
- **Backend by justification**: FastAPI exists only for features that need it
- **Single source of truth**: All resume data lives in one JSON file
- **Free-tier safety**: No services that risk unexpected costs

---

## 6. Content Strategy

### Static Content (Frontend)
- Introduction
- Projects
- Experience
- Education
- Tech Stack
- Achievements & Certifications
- Extra-curricular Activities

All static content is stored in `resume.json`.

### Dynamic Content (Backend)
- Feedback submission
- Analytics (future)
- AI features (future)

---

## 7. Folder Structure

### Frontend
    src/
    ├── data/
    │ └── resume.json
    ├── components/
    ├── pages/
    ├── styles/
    └── App.jsx

### backend
    backend/
    ├── app/
    │ ├── main.py
    │ ├── routes/
    │ │ └── feedback.py
    │ ├── schemas/
    │ ├── models/
    │ └── database.py


---

## 8. Development Roadmap (SDLC-Based)

### Phase 0 – Planning
- Define project intent and scope
- Freeze v1 requirements
- Document non-goals

---

### Phase 1 – Frontend Foundation (Week 1)
- Initialize React project
- Create `resume.json`
- Build static sections (Experience, Education, Achievements)
- Implement Projects Showcase
- Add Tech Stack with optional confidence toggle
- Ensure responsive, professional UI

**Deliverable:** Fully functional static portfolio

---

### Phase 2 – Backend Design & Integration (Week 2)
- Design API contracts before coding
- Implement FastAPI backend
- Create feedback submission endpoint
- Connect to managed PostgreSQL
- Integrate frontend feedback form

**Deliverable:** Working frontend + backend integration

---

### Phase 3 – Dockerization & Deployment (Week 3)
- Create Dockerfiles for frontend and backend
- Write `docker-compose.yml`
- Deploy to AWS EC2 (Free Tier)
- Validate public accessibility

**Deliverable:** Live portfolio website

---

## 9. API Design

### Health Check
    GET /health
    Used for deployment and monitoring.

---

### Feedback Submission
POST /feedback

**Request Body**
```json
{
  "email": "user@example.com",
  "message": "Great portfolio!"
}
```

**Responce Body**

```json
{
  "status": "success"
}
```

## 10. Database Schema
| Column    | Type       |
| --------- | ---------- |
| id        | UUID / INT |
| email     | TEXT       |
| message   | TEXT       |
| timestamp | TIMESTAMP  |

## 11. Local Development Setup

### Frontend
- npm install
- npm start

### Backend
- python -m venv venv
- source venv/bin/activate
- pip install fastapi uvicorn
- uvicorn app.main:app --reload

## 12. Deployment (AWS Free Tier)

### Launch EC2 instance (Free Tier)

### Install Docker & Docker Compose

### Clone GitHub repository

### Run: ```docker-compose up -d```
### Access site via public IP

## 13. Quality Standards

### No hardcoded resume data in JSX

### Clean commit history

### Responsive across devices

### Clear, readable UI

### No unused dependencies

## 14. Future Roadmap (Planned, Not Implemented)

### AI-based project explainer

### Resume chatbot

### Portfolio analytics

### Additional sections via JSON extension

### All future features integrate via FastAPI without frontend rewrites.

## 15. Final Notes

This portfolio is intentionally:

### Simple where possible

### Structured where necessary

### Honest about trade-offs

### Designed to be explained confidently in interviews

### If a feature is missing, it is by design, not oversight.



**Author: Amit Kumar Pandey**
**Focus: Data Science • Machine Learning • Applied Engineering**