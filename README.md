# CRT Project

A simple web application repository containing a static frontend and a backend dependency manifest.

## Project Overview

- `frontend/`: Static website files built with HTML, CSS, and JavaScript.
- `backend/`: Node.js backend scaffold with package metadata and dependencies.

## Frontend

The frontend directory contains the client-facing pages and assets:

- `land.html` / `landing.css` / `landing.js` - landing page
- `login.html` / `login.css` / `login.js` - login page
- `signup.html` / `signup.css` / `signup.js` - signup page
- `dashboard.html` / `dashboard.css` / `dashboard.js` - dashboard page
- `admin.html` / `admin.css` / `admin.js` - admin page
- `about.html` / `about.css` - about page
- `common.css` - shared styles across pages

These pages can be served directly as a static site or by a simple web server.

## Backend

The backend directory currently includes an npm manifest:

- `backend/package.json`
- `backend/package-lock.json`

Declared dependencies:

- `express`
- `body-parser`
- `dotenv`
- `mysql2`
- `node`

> Note: The backend source files are not present in this repository yet. The `backend/controller`, `backend/middleware`, and `backend/view` folders are currently empty, and `backend/main.java` is empty.

## Setup

1. Install backend dependencies:

```bash
cd backend
npm install
```

2. Serve the frontend files by opening them in a browser or using a static file server.

3. If you add a backend server file (for example `index.js`), configure environment variables in a `.env` file and start the server with `node index.js`.

## Notes

- The frontend is currently static and does not require a build step.
- The backend manifest is ready for a Node.js/Express server implementation.
- Add backend entrypoint code and routes inside `backend/` to enable API functionality.
