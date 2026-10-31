# Setup and Backup Guide

## MySQL backup
`mysqldump -u root -p bup_lost_found_professional > bup_lost_found_professional_backup.sql`

## Restore
`mysql -u root -p bup_lost_found < bup_lost_found_professional_backup.sql`

## Troubleshooting
- Confirm MySQL is running.
- Check `backend/.env` credentials.
- Start Flask on port 5000 before Vite.
- If images fail, check `backend/uploads/` and the Flask server.
