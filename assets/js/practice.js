/* Week 1 · Lesson 1 — practice lab (3 activities) */
(function () {
  "use strict";

  var PKEY = "dalswin.cwl.w1l1.practice.v1";

  var DATA = {
    a1: {
      title: "Computer or not?",
      options: ["Computer", "Not a computer"],
      items: [
        { text: "A smartphone", correct: 0, why: "A smartphone has a processor, memory, storage, input and output, and runs apps. It is a small computer." },
        { text: "A paper notebook", correct: 1, why: "It can store words, but it cannot process data using instructions. It is not a computer." },
        { text: "A laptop", correct: 0, why: "A laptop performs all four jobs: input, processing, output and storage." },
        { text: "A bicycle", correct: 1, why: "It is a machine, but it does not accept or process data." },
        { text: "An ATM cash machine", correct: 0, why: "An ATM has a processor, screen, keypad and network connection, and it processes transactions." },
        { text: "A wooden ruler", correct: 1, why: "It is a simple measuring tool with no processor and no instructions to follow." },
        { text: "A tablet", correct: 0, why: "A tablet has a processor, memory, storage, a touchscreen and runs programs." },
        { text: "A candle", correct: 1, why: "It produces light, but it does not process information." }
      ]
    },
    a2: {
      title: "Match the device to the job",
      options: ["Desktop", "Laptop", "Tablet", "Smartphone", "Server", "Embedded system"],
      items: [
        { text: "A receptionist sits at one desk all day and needs a large screen and a comfortable keyboard.", correct: 0, why: "A desktop gives the most screen space and comfort for a fixed workstation, usually at the best price." },
        { text: "A field officer visits clients and must carry her work in a shoulder bag.", correct: 1, why: "A laptop is portable but still has a full keyboard and screen for documents and email." },
        { text: "A café owner wants a touch screen at the counter for taking orders.", correct: 2, why: "A tablet offers a simple touch interface that is easy to use at a counter." },
        { text: "A hospital needs one machine to store patient records for 30 staff computers.", correct: 4, why: "A server provides central storage and services to many computers on a network." },
        { text: "A commuter wants to check email, maps and mobile money while travelling.", correct: 3, why: "A smartphone is designed for communication and quick tasks on the move." },
        { text: "A car's engine timing is controlled automatically while driving.", correct: 5, why: "This is an embedded computer: a small computer built inside a machine to control it." }
      ]
    },
    a3: {
      title: "Which part of the cycle?",
      options: ["Input", "Processing", "Output", "Storage"],
      items: [
        { text: "A receptionist types a visitor's name into a register.", correct: 0, why: "Typing or entering data is input." },
        { text: "Word checks the spelling of your letter.", correct: 1, why: "The computer is working on the data using instructions, so this is processing." },
        { text: "A monitor displays the finished letter.", correct: 2, why: "Presenting the result to the user is output." },
        { text: "You save the file in the Documents folder.", correct: 3, why: "Keeping data for later is storage." },
        { text: "A clerk clicks the mouse to select a row.", correct: 0, why: "Clicking sends a command into the computer — input." },
        { text: "Excel adds up a column of expenses.", correct: 1, why: "Calculating is processing." },
        { text: "Speakers play the narration in a presentation.", correct: 2, why: "Sound leaving the computer is output." },
        { text: "A flash drive keeps a backup of your photos.", correct: 3, why: "A flash drive is a storage device holding data for later use." }
      ]
    }
  };

  var saved = load();
  var overall = document.getElementById("practice-overall-bar");
  var overallText = document.getElementById("practice-overall-text");
  var finishPanel = document.getElementById("practice-finish");

  function load() {
    try {
      var raw = localStorage.getItem(PKEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        return {
          a1: !!parsed.a1,
          a2: !!parsed.a2,
          a3: !!parsed.a3,
          scores: parsed.scores || {}
        };
      }
    } catch (e) {}
    return { a1: false, a2: false, a3: false, scores: {} };
  }

  function persist() {
    try { localStorage.setItem(PKEY, JSON.stringify(saved)); } catch (e) {}
    updateOverall();
  }

  function updateOverall() {
    var keys = ["a1", "a2", "a3"];
    var done = keys.filter(function (k) { return saved[k]; }).length;
    var pct = Math.round((done / keys.length) * 100);
    if (overall) overall.style.width = pct + "%";
    if (overallText) overallText.textContent = done + " of 3 activities complete";
    if (finishPanel) finishPanel.classList.toggle("show", done === 3);
    if (done === 3 && window.LessonProgress) window.LessonProgress.mark("practice", true);
  }

  function make(tag, className, text) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  function setup(key) {
    var cfg = DATA[key];
    var root = document.getElementById("activity-" + key.slice(1));
    if (!root) return;
    var stage = root.querySelector("[data-stage]");
    var counter = root.querySelector("[data-counter]");
    var bar = root.querySelector("[data-mini-bar]");
    var status = root.querySelector("[data-status]");
    var state = { i: 0, score: 0, answered: false };

    function setStatus(mode) {
      var labels = { start: "Not started", progress: "In progress", done: "Complete" };
      status.textContent = labels[mode];
      root.classList.toggle("is-done", mode === "done");
    }

    function finish() {
      saved[key] = true;
      saved.scores[key] = state.score;
      persist();
      setStatus("done");
      counter.textContent = cfg.items.length + " of " + cfg.items.length;
      bar.style.width = "100%";
      stage.innerHTML = "";
      var panel = make("div", "activity-done-panel");
      var mark = make("div", "done-mark");
      mark.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
      var h = make("h3", null, "Activity complete");
      var p = make("p", null, "You scored " + state.score + " out of " + cfg.items.length + " on “" + cfg.title + "”.");
      var again = make("button", "btn btn-outline btn-sm", "Practise this activity again");
      again.type = "button";
      again.style.marginTop = "16px";
      again.addEventListener("click", function () {
        saved[key] = false;
        delete saved.scores[key];
        persist();
        state = { i: 0, score: 0, answered: false };
        render();
      });
      panel.appendChild(mark);
      panel.appendChild(h);
      panel.appendChild(p);
      panel.appendChild(again);
      stage.appendChild(panel);
    }

    function render() {
      var item = cfg.items[state.i];
      state.answered = false;
      stage.innerHTML = "";
      setStatus("progress");
      counter.textContent = (state.i + 1) + " of " + cfg.items.length;
      bar.style.width = ((state.i / cfg.items.length) * 100) + "%";

      var kicker = make("p", "activity-sub", cfg.title + " · Item " + (state.i + 1) + " of " + cfg.items.length);
      var q = make("h3", "activity-question", item.text);
      var chips = make("div", "practice-chips");
      var fb = make("div", "practice-feedback");
      fb.setAttribute("role", "status");
      fb.setAttribute("aria-live", "polite");
      var next = make("button", "btn btn-dark btn-sm", state.i === cfg.items.length - 1 ? "Finish activity" : "Next item");
      next.type = "button";
      next.hidden = true;
      next.style.margin = "18px auto 0";

      cfg.options.forEach(function (label, i) {
        var btn = make("button", "practice-choice", label);
        btn.type = "button";
        btn.addEventListener("click", function () {
          if (state.answered) return;
          state.answered = true;
          var correct = i === item.correct;
          if (correct) state.score += 1;
          chips.querySelectorAll("button").forEach(function (b, bi) {
            b.disabled = true;
            if (bi === item.correct) b.classList.add("is-correct");
            else if (bi === i) b.classList.add("is-wrong");
          });
          var mark = make("strong", null, correct ? "Correct. " : "Not quite. ");
          fb.appendChild(mark);
          fb.appendChild(document.createTextNode(item.why));
          next.hidden = false;
          next.focus({ preventScroll: true });
        });
        chips.appendChild(btn);
      });

      next.addEventListener("click", function () {
        if (state.i === cfg.items.length - 1) {
          finish();
        } else {
          state.i += 1;
          render();
        }
      });

      stage.appendChild(kicker);
      stage.appendChild(q);
      stage.appendChild(chips);
      stage.appendChild(fb);
      stage.appendChild(next);
    }

    if (saved[key]) {
      state.score = saved.scores[key] || 0;
      setStatus("done");
      stage.innerHTML = "";
      var panel = make("div", "activity-done-panel");
      var mark = make("div", "done-mark");
      mark.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
      var h = make("h3", null, "Already complete");
      var p = make("p", null, "Your saved score is " + state.score + " out of " + cfg.items.length + ".");
      var again = make("button", "btn btn-outline btn-sm", "Practise this activity again");
      again.type = "button";
      again.style.marginTop = "16px";
      panel.appendChild(mark);
      panel.appendChild(h);
      panel.appendChild(p);
      panel.appendChild(again);
      stage.appendChild(panel);
      again.addEventListener("click", function () {
        saved[key] = false;
        delete saved.scores[key];
        persist();
        state = { i: 0, score: 0, answered: false };
        render();
      });
      counter.textContent = cfg.items.length + " of " + cfg.items.length;
      bar.style.width = "100%";
    } else {
      setStatus("start");
      counter.textContent = "0 of " + cfg.items.length;
      stage.innerHTML = "";
      var startPanel = make("div", "activity-done-panel");
      var startP = make("p", null, "This activity has " + cfg.items.length + " quick items. Answer one at a time and get instant feedback.");
      var startBtn = make("button", "btn btn-dark btn-sm", "Start activity");
      startBtn.type = "button";
      startBtn.style.marginTop = "16px";
      startBtn.addEventListener("click", render);
      startPanel.appendChild(make("h3", null, "Ready when you are"));
      startPanel.appendChild(startP);
      startPanel.appendChild(startBtn);
      stage.appendChild(startPanel);
    }
  }

  setup("a1");
  setup("a2");
  setup("a3");
  updateOverall();

  var resetAll = document.querySelector("[data-reset-practice]");
  if (resetAll) {
    resetAll.addEventListener("click", function () {
      saved = { a1: false, a2: false, a3: false, scores: {} };
      persist();
      window.location.reload();
    });
  }
})();
