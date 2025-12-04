# University ERP Platform

A modern, fast, and scalable **University ERP System** built using **Vite + React**, **TypeScript**, **Tailwind CSS**, and **Node.js backend integrations**. Designed with clean UI, powerful authentication, secure session handling, and smooth navigation.

---

## 🚀 Tech Stack

### **Frontend**

* **Vite + React** (Fast dev & optimized production builds)
* **TypeScript** (Type-safety & cleaner code)
* **Tailwind CSS** (Utility-first styling)
* **PostCSS**
* **Autoprefixer**
* **Material Symbols**: Outlined, Rounded, Sharp
* **Material Icons**: Plain, Two‑Toned
* **Font**: *Poppins*

### **Developer Experience**

* `@` path aliasing for cleaner imports
* Exposed to network using `--host`
* Vite Proxy for backend API routing

---

## 🎨 UI / UX

### **Color Scheme**

* Light Theme
* Dark Theme

### **Breakpoints (Responsive Behaviour)**

* **1024px** → 2 columns → 1 column
* **768px** → Sidebar collapses
* **640px** → Searchbar collapses

### **Pages Added**

* Landing Page
* 404 - Page Not Found

### **UI Enhancements**

* Smooth scroll-to-top on route change
* Dynamic page title updates

---

## 🔐 Authentication & Security

### **Login Flow**

* Supports logging in to another account without manual logout
* New login overwrites previous session data

### **JWT Handling**

* JWT expires after **18 hours**
* Signed URLs for protected images (also expire after 18 hours)

### **Session Management**

* Unique **SessionId** created on each login & logout
* This invalidates all previous JWT tokens automatically

### **Auto-Logout System**

* Automatically logs out after **1 hour of inactivity**
* Logout status responses:

  * **No status** → Logged out successfully
  * **401** → Token expired or invalid
  * **440** → Logged out due to inactivity
  * **Else** → Logged out successfully

### **Smart Redirect After Logout/Login**

* Stores last visited page before redirecting to `/login`
* After successful login:

  * Redirects back to that page
  * If no page stored → Redirects to `/dashboard`

---

## 🌐 Networking

* Vite Dev Server exposed to network using `--host`
* Vite Proxy setup for automatic backend routing (no CORS issues)

---

## 🛠️ Features Summary

* Modern UI with Poppins + Material Icons
* Clean file structure with `@` aliasing
* Mobile & tablet-friendly responsive layout
* Smooth navigation and page effects
* Advanced authentication with session invalidation
* Auto logout + session expiry
* Dynamic title updates per page
* Protected media via signed URLs
* Intelligent redirection system

---

## 📌 Status

This project is **actively in development** as part of an academic & personal learning initiative  and is a working demonstration of University ERP system. More modules such as Attendance, Courses, Documents, Fee Management, Timetable, Results, and Admin Panel will be added.


