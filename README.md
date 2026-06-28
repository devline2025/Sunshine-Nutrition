# 陽光營養 (Sunshine Nutrition) — Digital Health Education Portal

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Active-success?logo=github&logoColor=white)](https://devline2025.github.io/Sunshine-Nutrition/)
[![Built with HTML/CSS/JS](https://img.shields.io/badge/Built%20With-HTML5%20%7C%20CSS3%20%7C%20ES6+-blue?logo=javascript&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**陽光營養 (Sunshine Nutrition)** is an interactive, digital health education portal designed to promote iron nutrition, breastfeeding safety, and vitamin D supplementation while preventing iron-deficiency anemia among maternal and infant populations. 

Commissioned by the **Health Promotion Administration (HPA, 國民健康署)** of Taiwan, this pilot project is designed and executed by the clinical and academic research team from:
*   **Taipei Medical University (TMU, 臺北醫學大學)**
*   **Taipei Medical University Hospital (TMUH, 臺北醫學大學附設醫院)**
*   **Taipei Medical University Shuang Ho Hospital (雙和醫院)**

---

## 🌟 Core Objectives & Target Audience

Adequate iron and vitamin intake are crucial during pregnancy and early infancy to prevent maternal anemia and support healthy fetal and neonatal neurodevelopment. This portal serves as a digital companion delivered through automated educational workflows (such as LINE chat groups) to support:
1.  **Pregnant Mothers (孕媽咪)**: Guiding them through gestational stages, iron supplements, and diet plans.
2.  **New Parents & Infant Caretakers (新手媽咪/嬰幼兒家長)**: Educating them on breastfeeding, complementary feeding, pediatric iron needs, and preventing infant anemia.

---

## 📚 Educational Modules & Features

The platform is structured into highly visual, responsive, and easy-to-digest interactive slide-show guides:

### 🤰 1. Pregnancy Anemia & Nutrition (`/anemia-in-pregancy`)
*   Provides essential clinical guidelines for iron supplementation during pregnancy.
*   Educates on the biological impact of iron deficiency on both the mother and the developing fetus.
*   Includes a categorized list of prenatal iron supplements, dosages, and potential side effects.

### 👶 2. Infant Anemia & Care (`/anemia-in-baby`)
*   Guides parents through identifying early signs of infant iron-deficiency anemia.
*   Provides pediatric nutrition plans, solid food recommendations (complementary feeding), and supplement guidance.
*   Explains safe breastfeeding techniques and transition plans.

### ☀️ 3. Vitamin D Guides (`/pregancy-vitamin-d`, `/baby-vitamin-d`)
*   Offers step-by-step guidance on Vitamin D supplementation for pregnant mothers and newborns.
*   Highlights daily recommended intakes, sunlight exposure tips, and dietary sources of Vitamin D.

### 🧠 4. Interactive Quiz Game Engine (`/quiz`)
To reinforce learning and measure knowledge retention, the portal features an advanced, stateful Quiz engine:
*   **Initial Baseline Knowledge Assessment**: Multiple-choice questions that measure immediate recall.
*   **FIFO Wrong-Answer Queue**: Incorrectly answered questions are automatically queued back into a retry pool.
*   **Active Learning & Review Phase**: Users must re-evaluate and correctly answer their queued mistakes to complete the quiz, promoting actual learning.
*   **Attitude Evaluation**: Likert-scale questions ("Strongly Agree" to "Strongly Disagree") that gauge behavioral intentions.
*   **Visual Progress Tracking**: Real-time animated CSS progress bars keep users engaged and motivated.
*   **Start Screen Flow**: Quiz pages begin with a styled participant ID input screen before rendering questions.
*   **Resilient Data Loading**: Quiz JSON files are loaded with fallback paths so chapter pages remain stable across local servers and deployed paths.

### 🥦 5. External Resource Hubs
Integrated external links to detailed curation repositories (via Notion) for:
*   **Nutrition & Diet Hub**: Balanced recipes, daily intake tables, and dietary advice.
*   **Information Station & FAQs**: Quick answers to common maternal/infant health questions.

---

## 🛠️ Technical Stack & Visual Design

*   **Frontend**: Pure HTML5, CSS3, and ES6+ JavaScript. Designed as a lightweight, static client-side application for fast loading times on mobile devices.
*   **Styling**:
    *   **Tailwind CSS (v3)**: Powering modern layout sections and the home landing page.
    *   **Modular Custom CSS**: Found in sub-modules to maintain precise control over mobile rendering, animated sliders, and progress indicators.
*   **Typography**: Implements the **LXGW WenKai (霞鶩文楷)** font family via a lightweight Webfont CDN. Its warm, handwriting-like appearance delivers a friendly, empathetic, and professional educational aesthetic.
*   **Data-Driven Dynamic Sliders**: Client-side JavaScript fetches structured localized JSON data (e.g., `anemia-in-baby/data/*.json`) to generate interactive slider cards dynamically, ensuring content is easily maintainable and decoupled from HTML structure.
*   **Responsive Header System**: Shared header styles provide centered Sunshine logo placement, compact back/home controls, and a mobile side menu for module pages.
*   **Landing Page Scrolling**: The root landing page uses full-screen section snapping with scroll-triggered section animations and a mobile hamburger menu.

---

## 📂 Project Structure

```
.
├── index.html                   # Main landing page for the educational portal
├── index.css                    # Stylings for the landing page
├── GEMINI.md                    # Developer-specific context and instructions
├── README.md                    # Main English project documentation (this file)
├── sunhine_logo.jpg             # Shared source logo copied into module asset folders
├── css/                         # Shared CSS layouts (base, headers, lists, questions)
├── javascript/                  # Shared JS interactions (menus)
│
├── anemia-in-pregancy/          # Module: Maternal/Pregnancy Anemia
│   ├── index.html               # Module entry point
│   ├── data/                    # JSON data driving pregnancy nutrition guides
│   ├── html/                    # Sub-content pages (effects, supplement guides)
│   ├── javascript/              # Slider rendering and back navigation
│   └── src/                     # Locally optimized clinical & diet graphics
│
├── anemia-in-baby/              # Module: Infant Anemia & Care
│   ├── index.html               # Module entry point
│   ├── data/                    # JSON data driving baby anemia sliders
│   ├── html/                    # Sub-content pages (deficiency guide, supplement guide)
│   ├── javascript/              # Navigation and slide rendering engine
│   └── src/                     # Visual pediatric assets
│
├── pregancy-vitamin-d/          # Module: Pregnancy Vitamin D Guidance
│   ├── index.html               # Module entry point
│   ├── data/                    # JSON data for pregnancy Vitamin D guide
│   ├── html/                    # Content page
│   ├── javascript/              # Slide rendering and back navigation
│   └── src/                     # Local visual assets
│
├── baby-vitamin-d/              # Module: Infant Vitamin D Guidance
│   ├── index.html               # Module entry point
│   ├── data/                    # JSON data for baby Vitamin D guide
│   ├── html/                    # Content page
│   ├── javascript/              # Slide rendering and back navigation
│   └── src/                     # Local visual assets
│
└── quiz/                        # Module: Interactive Quiz Engine
    ├── index.html               # Main quiz entry page
    ├── data/                    # Categorized question pools (Chapters 2 & 3)
    ├── html/                    # Pathway layouts (pregnancy vs. infant)
    ├── javascript/              # Stateful game engine, FIFO queue, data loader, progress animation
    └── src/                     # Quiz-specific illustrations and UI icons
```

---

## 🚀 Getting Started

Since the frontend is composed entirely of static assets, it can be served locally with any basic HTTP file server.

### 1. Using VS Code (Recommended)
1.  Open the workspace in Visual Studio Code.
2.  Install the **Live Server** extension.
3.  Right-click `index.html` and select **"Open with Live Server"**.
4.  The server typically defaults to port **`5501`** (e.g., `http://127.0.0.1:5501`).

### 2. Using Command Line
Navigate to the project root directory and start a lightweight server of your choice:

*   **Node.js (serve)**:
    ```bash
    npx serve -p 5501
    ```
*   **Python 3**:
    ```bash
    python3 -m http.server 5501
    ```
*   **Ruby**:
    ```bash
    ruby -run -e httpd . -p 5501
    ```

Access the local site by opening `http://localhost:5501` in your web browser.

---

## 🌐 Deployment & Integration

The portal is designed to be hosted seamlessly on **GitHub Pages** (deployed at `https://devline2025.github.io/Sunshine-Nutrition/`) or any static hosting provider (e.g., Vercel, Netlify, Cloudflare Pages). 

### LINE Integration
To maximize clinical pilot participation, deep-links to specific modules (e.g., `https://<domain>/quiz/index.html` or `https://<domain>/anemia-in-pregancy/index.html`) can be configured directly into **LINE Rich Menus** or sent as scheduled auto-messages via **LINE Official Account (OA)** manager tools.

---

## 👥 Research & Development Team

This digital health initiative is a collaborative effort:
*   **Sponsor**: Health Promotion Administration (國民健康署), Ministry of Health and Welfare, Taiwan.
*   **Coordinating Institution**: Taipei Medical University (臺北醫學大學).
*   **Clinical Affiliates**: Taipei Medical University Hospital (臺北醫學大學附設醫院) and Shuang Ho Hospital (雙和醫院).

---

## 📄 License

This project is licensed under the MIT License.
