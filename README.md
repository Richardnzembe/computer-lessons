# Computer Literacy & Workplace Digital Skills — course website

A ready-to-publish lesson website for **Class 09** at **Dalswin Life & Business Institute**.

The first release is **Week 1 · Lessons 1–4: Computer Fundamentals**. The available lessons include reading material, teaching slides, interactive practice, self-marking quizzes, workplace assignments and teacher guides.

Everything is plain HTML, CSS and JavaScript. There is no build step and no server required, so it works on GitHub Pages (or any static host) exactly as it is.

**Live site:** <https://richardnzembe.github.io/computer-lessons/>
**Repository:** <https://github.com/Richardnzembe/computer-lessons>

---

## What is inside

```
computer-lessons-site/
├── index.html                     ← course home (start here)
├── week-01/
│   └── lesson-01/
│       ├── index.html             ← lesson overview + progress
│       ├── reading.html           ← full reading material
│       ├── slides.html            ← 20-slide presentation
│       ├── practice.html          ← 3 interactive activities
│       ├── quiz.html              ← 10-question self-marking quiz
│       ├── assignment.html        ← printable brief + rubric
│       └── teacher.html           ← lesson plan + answer keys
├── assets/
│   ├── css/style.css              ← all styling
│   ├── js/app.js                  ← navigation + progress tracking
│   ├── js/slides.js               ← slide deck controls
│   ├── js/quiz.js                 ← quiz engine + questions
│   ├── js/practice.js             ← practice activities
│   ├── img/                       ← generated photos, logo, favicon
│   └── docs/course-brochure.pdf   ← original course brochure
├── README.md
└── .nojekyll
```

**Student progress** (reading, slides, practice, quiz, assignment) and the best quiz score are saved in the learner's own browser using `localStorage`. Nothing is sent to a server, and clearing browser data resets progress.

---

## Classroom and verified certificate

On the first visit, the site shows a branded dialog offering two next steps:

1. **Join the Class 09 Google Classroom** — to track progress, submit work and keep files for offline audit.
2. **Apply for a verified certificate** — through the Dalswin online portal.

The dialog can be closed with the X, the **Maybe later** button, the Escape key or a click outside it. After it is dismissed it stays quiet for **3 days**, so it does not interrupt every lesson. Both links are also kept permanently in the site footer under **Programme**.

To change either address, edit the two constants at the top of the promo block in `assets/js/app.js`:

```js
var CLASSROOM_URL = "https://classroom.google.com/c/ODkwOTk3OTE3NjMw?cjc=yrz7hhhw";
var CERT_URL = "https://onb.richardn.online/apply/dalswin-life-business-institute-0ab50c9bc6/dlbi-27";
```

The dialog is automatically hidden when printing, so it never appears in PDFs.

---

## 1. Preview it on your computer

1. Open the folder `computer-lessons-site`.
2. Double-click **`index.html`**.
3. It opens in your browser. Click **Start Week 1 · Lesson 1**.
4. On the slides page, use the **← →** arrow keys (or space) to move. Press **N** for presenter notes and **F** for fullscreen.
5. To stop presenting, press **Esc**.

The site works offline. The only external request is for the Google fonts; if there is no internet, the built-in fallback fonts are used.

---

## 2. Publish on GitHub Pages (click by click)

The site is already live at <https://richardnzembe.github.io/computer-lessons/>, served from the `main` branch of the repository. The steps below are kept so the site can be republished or recreated from scratch.

You need a free GitHub account: <https://github.com/signup>.

### Step A — create the repository

1. Sign in to GitHub.
2. Click the **+** button at the top right, then **New repository**.
3. Repository name: `computer-lessons` (or any name you like).
4. Choose **Public**.
5. Do **not** tick "Add a README file" (this folder already has one).
6. Click **Create repository**.

### Step B — upload the website

Upload the **contents** of `computer-lessons-site`, not the outer folder itself. `index.html` must sit at the top level of the repository.

1. On the new repository page, click **uploading an existing file** (or **Add file → Upload files**).
2. Open `computer-lessons-site` on your computer.
3. Select **everything inside it** — `index.html`, `week-01`, `assets`, `README.md`, `.nojekyll` — and drag it into the GitHub upload box.
4. Wait for the files to finish uploading. You should see `index.html`, `week-01/`, `assets/` in the list.
5. Click **Commit changes**.

> If you cannot see `.nojekyll` in your file explorer, enable "Show hidden files" in Windows. It is a tiny empty file; if it is missing, GitHub Pages usually still works because this site does not use underscores in asset names.

### Step C — switch on Pages

1. In the repository, click **Settings** (top menu).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, choose **main** and folder **/ (root)**.
5. Click **Save**.
6. Wait 1–3 minutes, then refresh the page. GitHub shows the live address:

   `https://richardnzembe.github.io/computer-lessons/`

7. Open that address. If you see the course home page, publishing worked.

### Step D — share it

Send learners the live address, or link it from the student portal. On a phone, the site is fully responsive.

### Updating the site later

1. Go to the repository and open the file you want to change (for example `week-01/lesson-01/reading.html`).
2. Click the pencil icon, make the change, then **Commit changes**.
3. GitHub republishes automatically in about a minute.

---

## 3. Adding future lessons

The structure is designed to grow:

1. Duplicate the folder `week-01/lesson-01` and rename it, for example `week-01/lesson-02`.
2. Edit the text in the new HTML pages. Keep the same file names so the tabs and links continue to work.
3. Update `assets/js/quiz.js` with the new questions (the quiz data is at the top of the file).
4. Update `assets/js/practice.js` with new practice items.
5. Add the new lesson to:
   - `index.html` (the Week 1 day list), and
   - the `lesson-tabs` navigation in every lesson page.
6. **Important:** each lesson currently uses the same progress storage key (`dalswin.cwl.w1l1.v1`). For Lesson 2, change that key in `assets/js/app.js`, `assets/js/practice.js` and `assets/js/quiz.js` (search for `w1l1`) so progress is tracked separately.

---

## 4. What can be edited without touching code

| To change… | Edit this |
|---|---|
| Reading text | `week-01/lesson-01/reading.html` |
| Slide text or notes | `week-01/lesson-01/slides.html` (`data-notes` holds presenter notes) |
| Quiz questions and answers | `assets/js/quiz.js` — the `QUESTIONS` list at the top |
| Practice activities | `assets/js/practice.js` — the `DATA` object at the top |
| Assignment and rubric | `week-01/lesson-01/assignment.html` |
| Teacher plan / answer keys | `week-01/lesson-01/teacher.html` |
| Classroom and certificate links | `assets/js/app.js` — `CLASSROOM_URL` and `CERT_URL` |
| Popup wording or repeat interval | `assets/js/app.js` — the promo block and `PROMO_SNOOZE_DAYS` |
| Colours and fonts | the `:root` block at the top of `assets/css/style.css` |
| Photos | replace files in `assets/img/` with the same file names |

Brand colours used throughout: forest green `#0A4027`, gold `#F2A91C`, warm cream `#FAF7EF`.

---

## 5. Printing and offline use

- **Assignment brief:** open `assignment.html` and click **Print brief** (or Ctrl/Cmd + P). Navigation and buttons are hidden automatically.
- **Slides:** Ctrl/Cmd + P prints all 20 slides, one per page.
- **Reading:** Ctrl/Cmd + P prints a clean article without the table of contents.
- **No internet in class?** Print the reading, slides and assignment beforehand. The quiz and practice lab need the browser's JavaScript, but reloading offline still works once the page has been opened.
- The classroom/certificate popup is hidden automatically when printing; it never appears in a PDF.

---

## 6. Credits

- Curriculum and branding based on the institute's 2026 course brochure (`assets/docs/course-brochure.pdf`).
- Photographs are AI-generated illustrations created for this lesson site. They are not photographs of real learners or staff.
- Fonts: Fraunces and Manrope via Google Fonts (SIL Open Font License).
- Icons: simple inline SVG drawn for this site.

Certificate of completion recognises the institute's own training programme. It is not an official Microsoft qualification or accreditation unless separately obtained.
