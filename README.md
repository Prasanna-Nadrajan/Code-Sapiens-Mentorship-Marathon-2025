# 🎬 Stream-Verse: A Mini OTT Platform

## 🌟 Project Overview

**Stream-Verse** is a modern, responsive frontend application developed for an Over-The-Top (OTT) streaming platform. This project was built as part of the Codesapiens 4-Week Frontend Mentorship Marathon to demonstrate core React development skills, custom hooks, context-based state management, and external API integration.

### Project Goal
The primary goal is to simulate the user experience of a modern streaming service, featuring dynamic media fetching, user-specific data persistence, and interactive viewing controls.

## ✨ Key Features

The application incorporates several functional features using local storage for persistence and custom hooks for state management:

* **Authentication Flow:** Complete Sign In and Sign Up pages with basic validation, using a dynamic list of users managed via a custom hook and persisted in `localStorage`.
* **Dynamic Content Fetching:** Media content is fetched from **The Movie Database (TMDb) API**, organized into categorized rows (Top 10, Action, Horror, Comedy).
* **Interactive Media Display:**
    * **Hero Carousel:** A full-screen slider showcasing trending movies.
    * **Search Functionality:** Filter media titles dynamically on the home screen.
* **User Data Persistence (Custom Hooks):**
    * **Watchlist:** Users can add/remove items to a personal, persistent watchlist.
    * **Progress Tracking:** Users can mark content as "Watched" or reset its progress, visually represented by a status tag and progress bar.
* **Detail View & Playback:** Dedicated media detail page and a full-screen video player overlay (uses a mock video URL).
* **Theme Management:** Global Dark/Light mode toggle persisted using React Context and `localStorage`.

## 💻 Tech Stack

* **Frontend Framework:** React.js
* **Build Tool:** Vite
* **Language:** JavaScript (JSX)
* **Styling:** Custom CSS (with variables for theming) / Tailwind CSS (as originally planned)
* **State Management:** Local Component State (`useState`), Context API, and Custom Hooks.

## 🚀 Installation and Local Setup

To get a copy of this project running on your local machine, ensure you have Node.js installed.

If the main project folder is `Stream_Verse` inside the repository:

1.  **Clone the repository:**
    ```bash
    git clone "https://github.com/Prasanna-Nadrajan/Code-Sapiens-Mentorship-Marathon-2025/tree/main"
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application should now be running locally, typically at `http://localhost:5173`.

## ⚙️ Deployment Configuration (Netlify)

The project is configured for easy deployment of its static assets.

If you are using Netlify and your project files are nested in the `Stream_Verse` subfolder, use these settings:

| Setting | Value |
| :--- | :--- |
| **Build command** | `npm run build` |
| **Publish directory** | `dist` |

**Note on VITE_BASE_URL:** For deployment to a GitHub Pages or a subdirectory path, remember to configure the `base` URL in `vite.config.js` to prevent asset loading failures (white screen).

## 📅 Project Status

This project was part of the Codesapiens 4-Week Frontend Mentorship Marathon.

| Week | Goal | Deliverable | Status |
| :--- | :--- | :--- | :--- |
| **Week 1** | Foundation & Setup | Working prototype with basic add/create functionality and navigation. | **Done** |
| **Week 2** | Feature Development | Fully functional features with data persistence and API integration. | **Done** |
| **Week 3** | Advanced Features & Polish | Feature-complete application with polished user experience. | **Done** |
| **Week 4** | Testing, Optimization & Deployment | Production-ready, deployed application with documentation. | **Done** |

## 🤝 Contributors

* **PRASANNA NADRAJAN R**
* **SUBASH R**
* **RUBAN KUMAR R**

## 📜 License

This project is licensed under the **MIT License**.
