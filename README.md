# 💼 Job Portal — Frontend

<div align="center">

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**Production-deployed React frontend for a full-stack MERN Job Portal.**  
Built with React 19, Vite 6, Redux Toolkit, Tailwind CSS v4, Framer Motion, and Radix UI.

[🌐 Live Demo](https://jobportal-frontend-ten.vercel.app) · [⚙️ Backend Repo](https://github.com/codewithabhi2003/jobportal-backend) · [👨‍💻 Portfolio](https://portfolio-tau-lilac-98.vercel.app)

</div>

---

## 📌 Overview

This is the React frontend for a MERN-stack Job Portal that seamlessly connects **Job Seekers** and **Recruiters**. It features a fully responsive UI, smooth animations, persistent auth state, dynamic job filtering, resume upload, and in-browser PDF generation — all deployed on Vercel with GitHub Actions CI/CD.

---

## ✨ Features

- 🔐 **Auth Flows** — Register/Login with role selection (Job Seeker or Recruiter), JWT handled via secure cookie
- 🔄 **Persistent State** — Redux Toolkit + Redux Persist keeps user session across page refreshes
- 🔍 **Dynamic Job Search** — Filter jobs by title, location, job type, salary, and more in real time
- 📄 **Resume Upload** — Upload and manage resume via Cloudinary from the profile dashboard
- 📋 **Application Tracking** — Job Seekers can track all submitted applications and statuses
- 🏢 **Recruiter Dashboard** — Post jobs, manage listings, view applicants, and update application statuses
- 🎨 **Smooth Animations** — Framer Motion page transitions and micro-interactions throughout
- 🌙 **Theme Support** — Light/Dark mode via `next-themes`
- 📜 **PDF Generation** — In-browser resume/document generation using `@react-pdf/renderer`
- 🚀 **Performance** — Code-splitting with React lazy/Suspense, dynamic routing, Vite 6 bundling
- 📱 **Fully Responsive** — Mobile-first design with Tailwind CSS v4

---

## 🗂️ Project Structure

```
jobportal-frontend/
├── public/                   # Static assets
├── src/
│   ├── components/
│   │   ├── ui/               # Reusable Radix UI + shadcn components
│   │   ├── auth/             # Login, Register, role selection
│   │   ├── job/              # Job cards, job details, job listing
│   │   ├── recruiter/        # Post job, manage jobs, applicants table
│   │   └── shared/           # Navbar, Footer, loaders, protected routes
│   ├── pages/                # Route-level page components
│   ├── hooks/                # Custom React hooks
│   ├── redux/
│   │   ├── store.js          # Redux store with persist config
│   │   ├── authSlice.js      # Auth state (user, token, role)
│   │   └── jobSlice.js       # Job listings, filters, applications
│   ├── utils/                # Axios instance, constants, helpers
│   ├── App.jsx               # Root component with route definitions
│   └── main.jsx              # Entry point
├── .github/workflows/        # GitHub Actions CI/CD
├── components.json           # shadcn/ui config
├── vite.config.js            # Vite config with path aliases
├── vercel.json               # SPA routing config for Vercel
└── package.json
```

---

## 🖥️ Pages & Routes

| Route | Role | Description |
|-------|------|-------------|
| `/` | Public | Home page with hero section and featured jobs |
| `/login` | Public | Login with role-based redirect |
| `/signup` | Public | Register as Job Seeker or Recruiter |
| `/jobs` | Public | Browse all jobs with dynamic filters |
| `/jobs/:id` | Public | Single job detail with apply button |
| `/profile` | Job Seeker | View/edit profile, upload resume |
| `/my-applications` | Job Seeker | Track all submitted applications |
| `/recruiter/companies` | Recruiter | Manage registered companies |
| `/recruiter/jobs` | Recruiter | View and manage all posted jobs |
| `/recruiter/jobs/create` | Recruiter | Post a new job listing |
| `/recruiter/jobs/:id/applicants` | Recruiter | View & manage applicants for a job |

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 |
| Build Tool | Vite 6 |
| State Management | Redux Toolkit + Redux Persist |
| Styling | Tailwind CSS v4 |
| UI Components | Radix UI (Avatar, Dialog, Popover, Select, Checkbox, Radio Group) |
| Animations | Framer Motion |
| Routing | React Router DOM v7 |
| HTTP Client | Axios |
| PDF Generation | @react-pdf/renderer |
| Notifications | React Toastify + Sonner |
| Theme | next-themes (Dark/Light) |
| Smooth Scroll | Lenis |
| Icons | Lucide React + React Icons |
| Carousel | Embla Carousel |
| Linting | ESLint |
| Deployment | Vercel |
| CI/CD | GitHub Actions |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- Backend server running (see [jobportal-backend](https://github.com/codewithabhi2003/jobportal-backend))

### 1. Clone the repository

```bash
git clone https://github.com/codewithabhi2003/jobportal-frontend.git
cd jobportal-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### 4. Run the development server

```bash
npm run dev
```

App will be available at `http://localhost:5173`

### 5. Build for production

```bash
npm run build
```

---

## 🔄 State Management

Redux Toolkit manages global state across two main slices:

**`authSlice`** — stores logged-in user data, role, and token. Persisted via `redux-persist` so the session survives page refresh.

**`jobSlice`** — stores job listings, applied jobs, search filters, and all jobs posted by a recruiter. Cleared on logout.

```
Redux Store
├── auth       → { user, token, role }        [persisted]
└── job        → { jobs, appliedJobs, filters } [session]
```

---

## ⚡ Performance

- **Code Splitting** — `React.lazy()` + `Suspense` for all route-level components
- **Dynamic Routing** — React Router DOM v7 with nested routes and layout components
- **Vite 6** — Lightning fast HMR in dev and optimized production builds
- **Tailwind CSS v4** — Utility-first CSS with zero unused styles in production

---

## ☁️ Deployment

The frontend is deployed as a standalone SPA on **Vercel**. The `vercel.json` rewrites all routes to `index.html` to support client-side routing without 404s on refresh.

CI/CD is handled via **GitHub Actions** — every push to `main` triggers a lint + build check before auto-deployment.

---

## 🔗 Related Repositories

| Repo | Description |
|------|-------------|
| [jobportal-backend](https://github.com/codewithabhi2003/jobportal-backend) | Node.js + Express + MongoDB REST API |
| [JOB-PORTAL](https://github.com/codewithabhi2003/JOB-PORTAL) | Full monorepo version |

---

## 👨‍💻 Author

**Abhishek Vishwakarma**

[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=flat&logo=vercel&logoColor=white)](https://portfolio-tau-lilac-98.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abhishek-vishwakarma-47a43828b)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/codewithabhi2003)

---

<div align="center">
  <sub>⭐ If this project helped you, consider giving it a star!</sub>
</div>
