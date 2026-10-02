# 🎓 StudentHub - Student Management System

A production-quality, responsive college administration dashboard web application built with **React 18**, **Vite**, **Tailwind CSS**, **Recharts**, and **Lucide Icons**. 

This application provides complete student record lifecycle management (CRUD), real-time search, multi-criteria filtering, ascending/descending sorting, interactive dynamic analytics, field validations, toast notifications, confirmation modals, and seamless offline-first **LocalStorage** persistence.

---

## 👨‍💻 Candidate / Student Information
- **Project Name:** Student Management System (StudentHub)
- **Candidate Name:** Aswin
- **Role:** Frontend Developer Assessment

---

## 🚀 Key Features & Highlights

### 1. 📊 Executive Dashboard & Live Academic Analytics
- **Dynamic Metric Cards:** Total Students, IT Students, CSE Students, ECE Students, and MECH Department Overview.
- **Department Distribution:** Interactive Recharts Donut/Pie Chart & progress bar breakdown with percentages.
- **Year Distribution:** Recharts bar chart covering Years I, II, III, and IV.
- **Semester Distribution:** Complete enrollment breakdown across all 8 semesters (Sem I through Sem VIII).
- **Recent Registrations:** Quick activity feed of latest enrolled students.
- **100% Dynamic:** All statistics automatically re-calculate on every Add, Edit, or Delete action.

### 2. 👥 Student Directory & Management
- **Full Student Table (Desktop / Tablet):**
  - Displays: Register Number, Student Name, Department, Year, Semester, Email, Phone, Actions (View, Edit, Delete).
  - Department, Year, and Semester color-coded badges.
  - Interactive clickable rows & quick email/phone direct links (`mailto:` / `tel:`).
- **Responsive Mobile Grid / Cards:**
  - Compact, touch-friendly student profile cards with badges and action buttons.
  - View Switcher: Toggle seamlessly between Table View and Grid Cards View.
- **Student Profile Modal:** View full ID-card style details including CGPA, department, contact info, and enrollment date.

### 3. 🔍 Real-Time Search, Filtering & Sorting
- **Real-Time Search:** Instant case-insensitive matching by **Student Name**, **Register Number**, or **Email**.
- **Multi-Criteria Filters:** Combine Department (IT, CSE, ECE, MECH), Academic Year (I-IV), and Semester (I-VIII).
- **Dual Sorting:** Sort by Student Name, Register Number, Department, or Year with Ascending (A-Z) or Descending (Z-A) order.
- **Filter Tags & Clear All:** Visual applied filter chips with one-click reset.

### 4. 📝 Validated Add & Edit Student Forms
- **Comprehensive Validation Rules:**
  - **Register Number:** Mandatory, minimum length, **duplicate registration number check** with warning.
  - **Student Name:** Mandatory, alphabetic format validation.
  - **Email Address:** Mandatory, RFC standard email regex validation.
  - **Phone Number:** Mandatory, 10-digit Indian mobile format (`^[6-9]\d{9}$`).
  - **Department & Year:** Mandatory selection.
  - **Semester & Year Consistency:** Smart semester recommendation according to selected academic year.
- **Edit Mode:** Automatic pre-population of existing data and duplicate detection (excluding current student).

### 5. 🛡️ Safe Deletions & State Management
- **Delete Confirmation Modal:** Protects against accidental deletion with detailed prompt and student details.
- **Toast Notification System:** Animated toast feedback for additions, updates, deletions, and CSV downloads.
- **Empty States:** Specific states for "No Students Found" (filtered search) and "No Student Records" (empty database).
- **Loading Skeleton Loaders:** Smooth pulsing skeletons for tables, dashboard cards, and charts.
- **Error Boundaries:** Friendly error fallback with retry capability.

### 6. 💾 LocalStorage & Offline-First Persistence
- Pre-loaded on first launch with 16 realistic student records from `students.json`.
- All CRUD modifications persist across page refreshes.
- "Restore Demo Data" button available in sidebar and Settings for easy testing during reviews.
- Export student records to **CSV** or backup **JSON**.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **React 18** | Core component-based UI framework |
| **Vite 6** | Ultra-fast build tool and dev server |
| **Tailwind CSS** | Utility-first styling with custom academic palette |
| **React Router v6** | Client-side routing (`/dashboard`, `/students`, `/students/add`, `/students/edit/:id`) |
| **Recharts** | Interactive charts for department, year & semester analytics |
| **Lucide React** | Modern, clean vector iconography |
| **HTML5 LocalStorage** | Offline client-side data persistence |

---

## 📁 Project Structure

```text
c:/Users/aswin/OneDrive/Desktop/Frontend Assesment/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── README.md
├── screenshots/
│   └── README.md
├── public/
│   └── favicon.svg
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    ├── context/
    │   └── StudentContext.jsx       # Central state, CRUD, validations & LocalStorage
    ├── hooks/
    │   └── useStudents.js           # Reusable student management hook
    ├── data/
    │   └── students.json            # Initial dataset (16 realistic student profiles)
    ├── components/
    │   ├── Sidebar.jsx              # Responsive navigation drawer with overlay
    │   ├── Header.jsx               # Breadcrumbs, notifications & profile
    │   ├── DashboardCard.jsx        # Statistical metric card with trends
    │   ├── FilterBar.jsx            # Search, dropdowns, sort controls & view switcher
    │   ├── StudentTable.jsx         # Responsive academic data table
    │   ├── StudentCard.jsx          # Mobile/Grid card view
    │   ├── StudentForm.jsx          # Add/Edit form with real-time validation
    │   ├── StudentDetailModal.jsx   # Student ID card detail view modal
    │   ├── DeleteModal.jsx          # Danger confirmation modal
    │   ├── EmptyState.jsx           # Zero-results and empty DB state screens
    │   ├── SkeletonLoader.jsx       # Animated skeleton loading states
    │   ├── Toast.jsx                # Floating toast notifications
    │   └── ErrorBoundary.jsx        # UI error boundary fallback
    └── pages/
        ├── Dashboard.jsx            # Analytics & statistics dashboard
        ├── Students.jsx             # Student directory list & management
        ├── StudentFormPage.jsx      # Route wrapper for Add/Edit student
        ├── Settings.jsx             # Local storage backup & data controls
        └── Help.jsx                 # System documentation and FAQ
```

---

## 💻 How to Install and Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` (v9.0.0 or higher)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000` (or the URL shown in terminal).

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📱 Responsive Testing & Screen Breakpoints

The UI has been designed and tested across standard device viewports:
- **Desktop (1920px & 1440px):** Fixed sidebar, full multi-column dashboard, spacious data table.
- **Laptop / Tablet (1024px & 768px):** Collapsible navigation, fluid charts, horizontal scroll table.
- **Mobile (390px & 375px):** Slide-out drawer menu with backdrop blur, stacked stat cards, responsive student cards, touch-optimized buttons.

---

## 📸 Screenshots Directory

Refer to the [`screenshots/`](./screenshots/README.md) directory for visual documentation:
1. **Dashboard:** Key metrics, department charts, and semester breakdown.
2. **Student List:** Complete table view with filters and search.
3. **Add Student Form:** Real-time form validations and notifications.
4. **Edit Student Form:** Pre-filled fields and live update flow.
5. **Delete Confirmation Modal:** Safe deletion prompt.
6. **Search & Filter:** Multi-filter query matching in action.
7. **Mobile Responsive View:** Drawer menu and card layout.

---

## 🧪 Assessment Requirements Checklist

- [x] **Dashboard:** Real-time total students, department counts, year counts, and semester distribution.
- [x] **Student List:** Register Number, Name, Department, Year, Semester, Email, Phone Number, Actions.
- [x] **Add Student:** All mandatory fields with validation (Email regex, 10-digit Indian phone, unique Reg No).
- [x] **Edit Student:** Pre-populated values and instant dashboard/table sync.
- [x] **Delete Student:** Safe confirmation modal and instant state recalculation.
- [x] **Search:** Real-time case-insensitive search by student name or register number.
- [x] **Filters:** Department (IT, CSE, ECE, MECH), Academic Year (I-IV), Semester (I-VIII).
- [x] **Sorting:** Name and Register Number in Ascending/Descending orders.
- [x] **Persistence:** HTML5 LocalStorage persistence with initial `students.json` dataset.
- [x] **State Handling:** Loading skeletons, empty states, error boundary, and animated toasts.
- [x] **Code Quality:** Modular architecture, clean semantic HTML, ARIA accessibility attributes.
