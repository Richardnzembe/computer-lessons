/* Dalswin course site — shared UI + lesson progress */
(function () {
  "use strict";

  var STORAGE_KEY = "dalswin.cwl.w1l1.v1";
  var CHECKLIST_KEY = "dalswin.cwl.w1l1.checklist.v1";
  var TRACKED = ["reading", "slides", "practice", "quiz", "assignment"];
  var state = load();

  function load() {
    var fallback = { reading: false, slides: false, practice: false, quiz: false, assignment: false, bestScore: null, attempts: 0 };
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return fallback;
      var parsed = JSON.parse(raw);
      return Object.assign(fallback, parsed);
    } catch (e) {
      return fallback;
    }
  }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  function percent() {
    var done = TRACKED.filter(function (k) { return state[k]; }).length;
    return Math.round((done / TRACKED.length) * 100);
  }

  function refresh() {
    var pct = percent();

    document.querySelectorAll("[data-progress-key]").forEach(function (el) {
      var done = !!state[el.getAttribute("data-progress-key")];
      el.classList.toggle("is-complete", done);
      el.classList.toggle("complete", done);
      if (el.hasAttribute("data-done-label")) {
        var label = el.querySelector("[data-status-label]");
        if (label) label.textContent = done ? "Completed" : el.getAttribute("data-todo-label") || "Not started";
      }
    });

    document.querySelectorAll("[data-progress-percent]").forEach(function (el) {
      el.textContent = pct + "%";
    });
    document.querySelectorAll("[data-progress-ring]").forEach(function (el) {
      var color = getComputedStyle(document.documentElement).getPropertyValue("--gold").trim() || "#F2A91C";
      var empty = getComputedStyle(document.documentElement).getPropertyValue("--sage").trim() || "#E6EDE5";
      el.style.background = "conic-gradient(" + color + " " + (pct * 3.6) + "deg, " + empty + " 0deg)";
    });
    document.querySelectorAll("[data-progress-bar]").forEach(function (el) {
      el.style.width = pct + "%";
    });
    document.querySelectorAll("[data-progress-label]").forEach(function (el) {
      el.textContent = pct + "% complete";
    });
    document.querySelectorAll("[data-step]").forEach(function (el) {
      el.classList.toggle("done", !!state[el.getAttribute("data-step")]);
    });
    document.querySelectorAll("[data-best-score]").forEach(function (el) {
      el.textContent = state.bestScore === null ? "—" : state.bestScore + "/10";
    });
    document.querySelectorAll("[data-attempts]").forEach(function (el) {
      el.textContent = state.attempts || 0;
    });

    document.dispatchEvent(new CustomEvent("lessonprogress", { detail: { state: getState(), percent: pct } }));
  }

  function getState() { return JSON.parse(JSON.stringify(state)); }

  function mark(key, value) {
    if (TRACKED.indexOf(key) === -1) return;
    state[key] = value === undefined ? true : !!value;
    save();
    refresh();
  }

  function recordQuiz(score, total) {
    state.quiz = true;
    state.attempts = (state.attempts || 0) + 1;
    if (state.bestScore === null || score > state.bestScore) state.bestScore = score;
    save();
    refresh();
  }

  function reset() {
    state = { reading: false, slides: false, practice: false, quiz: false, assignment: false, bestScore: null, attempts: 0 };
    save();
    refresh();
  }

  window.LessonProgress = {
    get: getState,
    mark: mark,
    recordQuiz: recordQuiz,
    percent: percent,
    reset: reset
  };

  /* ----- Mobile navigation ----- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ----- Active tabs ----- */
  var page = document.body.getAttribute("data-page");
  document.querySelectorAll(".lesson-tabs a[data-tab]").forEach(function (a) {
    var active = a.getAttribute("data-tab") === page;
    a.classList.toggle("is-active", active);
    if (active) a.setAttribute("aria-current", "page");
  });

  /* ----- Reveal on scroll ----- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ----- Reading progress + table of contents ----- */
  var article = document.querySelector("[data-reading-article]");
  if (article) {
    var bar = document.querySelector(".reading-progress");
    var tocBar = document.querySelector("[data-toc-bar]");
    function onScroll() {
      var rect = article.getBoundingClientRect();
      var start = rect.top + window.scrollY;
      var total = article.offsetHeight - window.innerHeight * 0.55;
      var travelled = window.scrollY - start + 80;
      var p = Math.max(0, Math.min(1, travelled / Math.max(total, 1)));
      if (bar) bar.style.width = (p * 100) + "%";
      if (tocBar) tocBar.style.width = (p * 100) + "%";
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    var tocLinks = document.querySelectorAll(".toc a[href^='#']");
    if ("IntersectionObserver" in window && tocLinks.length) {
      var map = {};
      tocLinks.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            tocLinks.forEach(function (a) { a.classList.remove("is-active"); });
            var link = map[entry.target.id];
            if (link) link.classList.add("is-active");
          }
        });
      }, { rootMargin: "-150px 0px -65% 0px", threshold: 0 });
      Object.keys(map).forEach(function (id) {
        var sec = document.getElementById(id);
        if (sec) spy.observe(sec);
      });
    }
  }

  /* ----- Mark-complete buttons ----- */
  document.querySelectorAll("[data-mark-reading]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      mark("reading", true);
      btn.textContent = "Reading marked complete";
      btn.disabled = true;
      btn.classList.add("is-done");
    });
  });
  document.querySelectorAll("[data-mark-assignment]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      mark("assignment", true);
      btn.textContent = "Assignment marked submitted";
      btn.disabled = true;
    });
  });

  /* ----- Print buttons ----- */
  document.querySelectorAll("[data-print]").forEach(function (btn) {
    btn.addEventListener("click", function () { window.print(); });
  });

  /* ----- Class & certificate promo ----- */
  var PROMO_KEY = "dalswin.cwl.promo.v1";
  var PROMO_SNOOZE_DAYS = 3;
  var CLASSROOM_URL = "https://classroom.google.com/c/ODkwOTk3OTE3NjMw?cjc=yrz7hhhw";
  var CERT_URL = "https://onb.richardn.online/apply/dalswin-life-business-institute-0ab50c9bc6/dlbi-27";

  function promoIsDue() {
    try {
      var stamp = parseInt(localStorage.getItem(PROMO_KEY), 10);
      if (!stamp) return true;
      return Date.now() - stamp > PROMO_SNOOZE_DAYS * 864e5;
    } catch (e) {
      return true;
    }
  }

  function snoozePromo() {
    try { localStorage.setItem(PROMO_KEY, String(Date.now())); } catch (e) {}
  }

  var overlay = document.createElement("div");
  overlay.className = "promo-overlay no-print";
  overlay.hidden = true;
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-labelledby", "promo-title");
  overlay.setAttribute("aria-describedby", "promo-desc");
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = [
    '<div class="promo-dialog">',
      '<aside class="promo-aside">',
        '<div class="promo-brand">',
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4 2 9l10 5 10-5-10-5z"/><path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/></svg>',
          '<span>Dalswin Life &amp; Business Institute</span>',
        '</div>',
        '<p class="promo-aside-title">Two ways to make your work count.</p>',
        '<p class="promo-aside-copy">Learning is better when your progress is visible — and when it leads to recognition you can show an employer.</p>',
        '<ul class="promo-points">',
          '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg><span>Progress tracked in one place</span></li>',
          '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg><span>Files kept for offline audit</span></li>',
          '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg><span>Verified certificate for your CV</span></li>',
        '</ul>',
        '<span class="promo-aside-foot">Class 09 · Computer Literacy</span>',
      '</aside>',
      '<div class="promo-main">',
        '<button type="button" class="promo-close" data-promo-close aria-label="Close this message">',
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
        '</button>',
        '<span class="eyebrow">Class 09 · Get recognised</span>',
        '<h2 id="promo-title">Track your progress. Get certified.</h2>',
        '<p class="promo-lede" id="promo-desc">Join the Class 09 Google Classroom to track your progress and keep your files for offline audit — then apply for a verified certificate when you are ready.</p>',
        '<div class="promo-options">',
          '<section class="promo-option is-featured">',
            '<div class="promo-option-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 18v3M16 18v3M8 8h8M8 12h5"/></svg></div>',
            '<div>',
              '<h3>Join the Google Classroom</h3>',
              '<p>Submit your work, track your progress and save your files for offline audit.</p>',
              '<a class="btn btn-primary" data-promo-cta href="' + CLASSROOM_URL + '" target="_blank" rel="noopener">Join the class <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>',
              '<span class="promo-hint">Opens classroom.google.com in a new tab</span>',
            '</div>',
          '</section>',
          '<section class="promo-option">',
            '<div class="promo-option-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="5"/><path d="m8.5 13.5-1.5 8.5 5-2.5 5 2.5-1.5-8.5"/></svg></div>',
            '<div>',
              '<h3>Apply for a verified certificate</h3>',
              '<p>Enrol on the Dalswin portal and apply for a verified certificate to show employers.</p>',
              '<a class="btn btn-dark" data-promo-cta href="' + CERT_URL + '" target="_blank" rel="noopener">Apply for a certificate <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>',
              '<span class="promo-hint">Opens onb.richardn.online in a new tab</span>',
            '</div>',
          '</section>',
        '</div>',
        '<div class="promo-foot">',
          '<button type="button" class="promo-dismiss" data-promo-close>Maybe later — continue studying</button>',
          '<span>Both links are also in the site footer.</span>',
        '</div>',
      '</div>',
    '</div>'
  ].join("");
  document.body.appendChild(overlay);

  var promoClose = overlay.querySelector("[data-promo-close]");
  var promoLastFocus = null;
  var promoHideTimer = null;

  function openPromo() {
    if (overlay.classList.contains("is-open")) return;
    clearTimeout(promoHideTimer);
    promoLastFocus = document.activeElement;
    overlay.hidden = false;
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("promo-open");
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { overlay.classList.add("is-open"); });
    });
    setTimeout(function () { if (promoClose) promoClose.focus(); }, 180);
  }

  function closePromo() {
    if (!overlay.classList.contains("is-open")) return;
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("promo-open");
    promoHideTimer = setTimeout(function () { overlay.hidden = true; }, 320);
    if (promoLastFocus && promoLastFocus.focus) promoLastFocus.focus();
  }

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      snoozePromo();
      closePromo();
    }
  });
  overlay.querySelectorAll("[data-promo-close]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      snoozePromo();
      closePromo();
    });
  });
  overlay.querySelectorAll("[data-promo-cta]").forEach(function (link) {
    link.addEventListener("click", function () {
      snoozePromo();
      closePromo();
    });
  });
  overlay.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      e.preventDefault();
      snoozePromo();
      closePromo();
      return;
    }
    if (e.key !== "Tab") return;
    var items = overlay.querySelectorAll("a[href],button:not([disabled])");
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  if (promoIsDue() && document.body.getAttribute("data-page") !== "slides") {
    setTimeout(openPromo, 1200);
  }

  /* ----- Footer links to class and certificate ----- */
  document.querySelectorAll(".footer-col").forEach(function (col) {
    var heading = col.querySelector("h3");
    if (!heading || !/programme/i.test(heading.textContent)) return;
    var list = col.querySelector("ul");
    if (!list) return;
    [
      { href: CLASSROOM_URL, label: "Google Classroom" },
      { href: CERT_URL, label: "Verified certificate" }
    ].forEach(function (item) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = item.href;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = item.label;
      li.appendChild(a);
      list.appendChild(li);
    });
  });

  /* ----- Assignment checklist memory ----- */
  var checks = document.querySelectorAll(".checklist input[type='checkbox']");
  if (checks.length) {
    var saved = {};
    try { saved = JSON.parse(localStorage.getItem(CHECKLIST_KEY) || "{}"); } catch (e) {}
    checks.forEach(function (box) {
      var key = box.getAttribute("data-check");
      box.checked = !!saved[key];
      box.addEventListener("change", function () {
        saved[key] = box.checked;
        try { localStorage.setItem(CHECKLIST_KEY, JSON.stringify(saved)); } catch (e) {}
      });
    });
  }

  refresh();

  if (state.reading) {
    document.querySelectorAll("[data-mark-reading]").forEach(function (btn) {
      btn.textContent = "Reading marked complete";
      btn.disabled = true;
      btn.classList.add("is-done");
    });
  }
  if (state.assignment) {
    document.querySelectorAll("[data-mark-assignment]").forEach(function (btn) {
      btn.textContent = "Assignment marked submitted";
      btn.disabled = true;
    });
  }
})();
