# BUP Lost & Found Management System

Final academic implementation aligned with the submitted proposal and final architecture/methodology documents.

## Architecture
Three-Layer Architecture: React.js Presentation -> REST API -> Flask/Python Application -> MySQL Database.

## Methodology
Agile Scrum.

## Requirements
The implementation follows proposal FR-01 through FR-34 and the listed NFRs. See `docs/Requirements_Traceability.md`.

## Install
### Database
1. Start MySQL.
2. Run `database/schema.sql` in MySQL Workbench.
3. Run `database/seed.sql`.

### Backend
```bash
cd backend
python -m venv venv
venv\\Scripts\\activate
pip install -r requirements.txt
copy .env.example .env
python create_admin.py
python app.py
```
Mac/Linux activation: `source venv/bin/activate`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

## Admin
Run `python create_admin.py` from backend. Default account:
- Email: admin@bup.edu.bd
- Password: Admin@123

## User
Register from the website. Supported normal roles: student, faculty, officer, staff.

## Main Features
Registration/login, profile, lost/found reporting, image upload, search/filtering, item details, claims, ownership verification information, claim review, item statuses, notifications, admin dashboard, user/report/category management and basic statistics/reports.

## Excluded by proposal
GPS real-time tracking, CCTV, facial recognition, biometrics, payment, delivery service and direct social-media integration.
