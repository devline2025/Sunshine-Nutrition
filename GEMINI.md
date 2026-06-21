# 鐵定幸福 (Iron Happiness) - Project Instructions & Architectural Guide

Welcome to **鐵定幸福 (Iron Happiness)**, a digital health education trial project. This workspace contains the codebase for both the patient-facing educational portal and the backend database integration and reward system.

---

## 1. Project Overview & Context

*   **Sponsor**: Commissioned by the Health Promotion Administration (HPA, 國民健康署) as part of a pilot program.
*   **Research & Execution Team**: 
    *   Taipei Medical University (臺北醫學大學)
    *   Taipei Medical University Hospital (北醫附醫)
    *   Taipei Medical University Shuang Ho Hospital (雙和醫院)
*   **Target Audience**: Pregnant mothers ("孕媽咪") and new parents/infant caretakers ("新手媽咪"/"嬰幼兒家長").
*   **Primary Objective**: To deliver digital health education materials focusing on iron nutrition, breastfeeding, and preventing iron-deficiency anemia in mothers and infants. The portal provides interactive slide guides, a progress-tracked quiz engine, and a gift voucher reward system to incentivize knowledge retention.

---

## 2. Directory & Architecture Structure

The project consists of a set of localized, static frontend sub-sites served alongside a Node.js Express backend.

```
/
├── index.html                   # Main landing page for the educational portal
├── index.css                    # Main stylesheet for the landing page
├── README.md                    # Core project introduction
├── GEMINI.md                    # This developer context/instruction file
├── anemia-in-baby/              # Educational module: Infant Anemia & Iron Nutrition
│   ├── index.html               # Main page for baby anemia guide
│   ├── css/                     # Module-specific styles (base, head, list, text, etc.)
│   ├── data/                    # JSON data driving image sliders/guides
│   ├── html/                    # Content pages (e.g., deficiency list, supplement guide)
│   ├── javascript/              # Front-end interactions (slider logic, navigation)
│   └── src/                     # Local medical and dietary visual assets
├── anemia-in-pregancy/          # Educational module: Maternal/Pregnancy Anemia & Nutrition
│   ├── index.html               # Main page for maternal anemia guide
│   ├── css/                     # Module-specific styles
│   ├── data/                    # JSON data driving pregnancy nutrition guides
│   ├── html/                    # Content pages (effects list, supplement guides)
│   ├── javascript/              # Front-end interactions (slider, header loading)
│   └── src/                     # Local maternal health and nutrition assets
├── quiz/                        # Interactive Quiz Frontend Application
│   ├── index.html               # Main entry page for taking quizzes
│   ├── css/                     # Quiz-specific layout and progress bar styles
│   ├── data/                    # Quiz datasets (JSON) categorized by topic and chapter
│   ├── html/                    # Quiz layouts (pregnant/baby paths, content template)
│   ├── javascript/              # Quiz game engine (state management, review logic)
│   └── src/                     # Quiz-specific icons and branding images
└── quiz-backend/                # Backend API Server (Express + PostgreSQL + Google Sheets)
    ├── package.json             # Backend dependencies and run scripts
    ├── server.js                # Core API routing, database pools, and Sheets client integration
    └── credentials.json         # Google Service Account Credentials (DO NOT commit)
```

---

## 3. Technology Stack & Key Features

### Frontend (Static Site)
*   **Language & Markup**: Standard HTML5, CSS3, ES6+ JavaScript.
*   **Styling**: 
    *   Uses **Tailwind CSS** (via CDN in modern sub-sections like `index.html`).
    *   Custom modular styles located in respective module directories (e.g. `css/base.css`, `css/list.css`).
*   **Typography**: Employs **LXGW WenKai** (`霞鶩文楷`) via Webfont CDN to provide a warm, handwritten, friendly medical/educational aesthetic.
*   **Dynamic Data-driven Components**: Slider cards and education lists are populated dynamically by loading localized `.json` files (e.g. `anemia-in-baby/javascript/iron_supplement.js` fetches `../data/iron_supplement_guide.json` matching the HTML filename).

### Quiz Frontend Engine (`quiz/javascript/question.js`)
An advanced state machine handling educational question execution:
1.  **Initial Knowledge Phase**: Prompts multi-choice questions assessing baseline iron knowledge.
2.  **Wrong-Answer Queue (FIFO)**: Automatically schedules incorrectly answered questions into a retry queue.
3.  **Review Phase**: Re-evaluates wrong answers sequentially until the user selects the correct option, ensuring active learning and retention.
4.  **Attitude Assessment**: Presents Likert-scale questions ("同意", "非常同意") regarding supplemental health behavior.
5.  **Visual Progress Feed**: Tracks progress dynamically, rendering updates through clean animated CSS progress bars.

### Backend (`quiz-backend/`)
*   **Framework**: **Express.js** (v5) running on **Node.js**.
*   **Database**: **PostgreSQL** (`pg`) to persist granular question responses (`quiz_answers` table) for research analysis.
*   **Rewards Integration**: Uses **Google Sheets API** (`googleapis`) to securely distribute digital gift vouchers:
    *   Prevents duplicate voucher issues by verifying whether a given `user_id` has already claimed a voucher.
    *   Finds first unused voucher in sheet, flags it as used (`TRUE`), and binds the timestamp & recipient's `user_id` directly back into the spreadsheet.
*   **Security & Middleware**:
    *   Validates headers for a custom `x-api-key` validation key (default: `3jnDfg4nw0wSDkb4295NBJkdwhuf378S` in dev).
    *   Permissive development CORS setup for port `5501` (Live Server) and production domain (`devline2025.github.io`).

---

## 4. Setting Up & Running the Application

### Running the Frontend
Since the frontend is purely static, no compilation is required.
You can run it using any basic HTTP static file server. For development, serve the project root `/` on port **`5501`** (this is hardcoded as an allowed CORS origin in the backend).

*   **VS Code**: Right-click `index.html` and select **"Open with Live Server"** (defaults to port `5501`).
*   **Node.js**:
    ```bash
    npx serve -p 5501
    ```
*   **Python**:
    ```bash
    python3 -m http.server 5501
    ```

### Running the Backend
1.  Navigate to the directory:
    ```bash
    cd quiz-backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Provide the Google Sheets credentials:
    *   Ensure a valid `credentials.json` file is present under `quiz-backend/` (this matches your Google Service Account).
4.  Set up environment variables in `.env` (or let the system fall back to defaults):
    ```env
    PORT=3000
    DATABASE_URL=postgresql://<user>@localhost:5432/quizdatabase
    API_KEY=3jnDfg4nw0wSDkb4295NBJkdwhuf378S
    ```
5.  Start the server:
    ```bash
    npm start
    ```

---

## 5. Development & Contribution Conventions

### Medical & Educational Tone
*   Maintain a polite, comforting, and scientifically accurate tone throughout all patient-facing materials.
*   Utilize Traditional Chinese (`zh-Hant`) as requested by the sponsoring agency (國民健康署).

### Slide Guides & JSON Data Matching
*   When editing or adding new slide sections in `anemia-in-baby/` or `anemia-in-pregancy/`:
    *   The file structure relies on file naming consistency. For example, `html/iron_supplement_guide.html` will automatically request `data/iron_supplement_guide.json` via client-side fetch. Keep names strictly identical.

### Database Schema Expectations
If modifying or re-creating the database tables, ensure the schema accommodates:
*   Table `quiz_answers`:
    *   `id` (serial primary key)
    *   `user_id` (varchar)
    *   `session_id` (varchar)
    *   `question_id` (varchar)
    *   `selected_option` (varchar)
    *   `is_correct` (boolean)
    *   `created_at` (timestamp)

### Google Sheets Mapping
*   **Target Sheet Tab**: `小測驗禮卷`
*   **Range**: `A:E`
*   **Columns**:
    *   `A`: Identifier (`id`)
    *   `B`: Digital Voucher URL (`voucher_url`)
    *   `C`: Access Code (`code`)
    *   `D`: Redeemed state (expected to be `"TRUE"` or `"FALSE"`)
    *   `E`: Redeemed User ID (`user_id`)
    *   `F`: Timestamp of claim (auto-appended during update as ISOString)

### Security Safeguards
*   **NEVER** commit `credentials.json` or custom configuration keys directly. Ensure `quiz-backend/.gitignore` stays up to date.
