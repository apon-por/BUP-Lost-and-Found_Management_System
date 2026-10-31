## নতুন আলাদা MySQL database (পুরোনো database অপরিবর্তিত থাকবে)

এই ZIP-এর backend/.env এখন `DB_NAME=bup_lost_found_professional` ব্যবহার করে। MySQL Workbench-এ এই project-এর SQL ফাইলগুলো চালানোর সময় `USE bup_lost_found_professional` নিশ্চিত করুন। `database/schema.sql` নতুন database-এই টেবিল তৈরি করে; এতে থাকা DROP TABLE কমান্ডগুলো কেবল এই নতুন database-এর টেবিলগুলোর জন্য প্রযোজ্য হবে। পুরোনো `bup_lost_found` database select করে কোনো SQL চালাবেন না।

প্রস্তাবিত ক্রম: `database/schema.sql` → `database/seed.sql` → `database/report_schema.sql` → `database/migrations/001_item_tracking_events.sql`। এরপর `backend/.env`-এ নিজের MySQL username/password ঠিক আছে কি না দেখুন।

# BUP Lost & Found Management System — Updated Build

## What's new
- Admin-only Item Tracking Report page at `/tracking`.
- Stable display Tracking ID (`BUP-LF-YEAR-000123`) derived from item ID.
- Search/filter by item, tracking ID, reporter/email, type, current status, verification status, and report date.
- CSV export for the currently filtered records.
- Timeline modal with lifecycle events and related claims.
- Tracking event capture for new reports, admin verification, claim submissions/reviews, and item status changes.
- Responsive tracking page styling.

## Before first run: apply the database migration
1. Keep your existing database backup.
2. Open MySQL Workbench and connect to the same MySQL instance used by the app.
3. Open `database/migrations/001_item_tracking_events.sql`.
4. Execute the script. It only creates the new `item_tracking_events` table; it does not drop existing tables.
5. Restart the Flask backend.

Historical note: events are captured from the time this update is installed. For older items with no tracking events, the timeline clearly indicates that only the original report record is available; it does not invent past actions.

## Run on Windows
### Backend terminal
```powershell
cd "BUP-Lost-and-Found/backend"
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```
If the project already has a working `venv`, activate it instead of recreating it. Confirm `backend/.env` points to your MySQL credentials and `bup_lost_found_professional`.

### Frontend terminal
```powershell
cd "BUP-Lost-and-Found/frontend"
npm install
npm run dev
```
Open the Vite URL printed in the terminal (usually http://localhost:5173).

## Use the new feature
Log in with an admin account and click **Tracking** in the navigation bar, or open `/tracking`.
The API is protected with the existing JWT authentication and admin role check.

## Important
- This build is provided as a separate copy; keep the old working project untouched.
- Existing `.env` values were preserved for convenience. Do not share the ZIP publicly because `.env` may contain database credentials.
- Test login, item submission, approval, claims, status changes, PDF reports, and tracking after applying the migration.


## Professional UI/UX Update (29 October 2026)
- Applied a consistent green-and-white theme across all existing pages.
- Refined typography, buttons, navigation, form controls, tables, cards, tracking timeline, focus states, and responsive behavior.
- This update changes presentation styles only; it does not intentionally change API routes, database schema, or application workflows.
- To apply it, replace the old project with this updated ZIP in a separate folder and run `npm install` followed by `npm run dev` inside `frontend`.
