# Proposal Requirements Traceability

FR-01 Register -> `/api/auth/register`
FR-02 Login -> `/api/auth/login`
FR-03 Authentication -> JWT-protected endpoints
FR-04 Profile -> `/api/users/me`
FR-05-09 Lost reporting, fields, image, update and status -> `/api/lost`, `/api/items`
FR-10-13 Found reporting, information, image and update -> `/api/found`, `/api/items`
FR-14-18 Search, category/location/date filters and matching results -> `/api/items`
FR-19-23 Claims, ownership verification, admin review, approval/rejection and status -> `/api/claims`, `/api/admin/claims`
FR-24-25 Lost/Found/Claimed/Returned/Closed and admin status update -> `/api/admin/items/<id>/status`
FR-26-27 Notifications -> `/api/notifications`
FR-28-32 User management, report review, verification, categories and admin dashboard -> `/api/admin/*`
FR-33-34 Basic statistics and reports -> `/api/reports/*`

NFR-01/02: indexed database fields and lightweight REST queries.
NFR-03/04: authentication and admin authorization.
NFR-05: Werkzeug password hashing.
NFR-06: validation and database error handling.
NFR-07/08: simple responsive React forms.
NFR-09: standard browser React application.
NFR-10: separate React, Flask and MySQL layers.
NFR-11: `docs/Setup_Guide.md` includes mysqldump backup/restore.
