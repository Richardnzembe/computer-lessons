/* Week 1 · Lesson 1 quiz — 10 questions with instant feedback */
(function () {
  "use strict";

  var QUESTIONS = [
    {
      q: "Which of these best describes a computer?",
      options: [
        "A machine that only stores files",
        "An electronic device that accepts data, processes it using instructions, and produces information",
        "A screen and keyboard used for typing",
        "A device that connects to the internet"
      ],
      answer: 1,
      why: "A computer takes data in (input), works on it using programmed instructions (processing), gives a result (output) and can keep it (storage). The screen and keyboard are only parts of a computer."
    },
    {
      q: "A cashier types a price into a till. Which part of the information cycle is this?",
      options: ["Input", "Processing", "Output", "Storage"],
      answer: 0,
      why: "Typing or entering data is input. The till calculating the total is processing; the display is output; the saved sales record is storage."
    },
    {
      q: "A printer produces a payslip. Which part of the information cycle is this?",
      options: ["Input", "Processing", "Output", "Storage"],
      answer: 2,
      why: "A printer presents information to the user, so it is an output device and the step is output."
    },
    {
      q: "What is the main difference between a desktop and a laptop?",
      options: [
        "A desktop cannot connect to the internet",
        "A laptop has a built-in screen, keyboard and battery, so it is portable",
        "A desktop has no storage",
        "A laptop cannot run Microsoft Word"
      ],
      answer: 1,
      why: "A laptop combines the screen, keyboard, pointing device, battery and computer in one portable case. A desktop is usually more powerful for the same price but stays on a desk."
    },
    {
      q: "A small clinic needs one central machine to keep patient records available to six staff computers. Which is the best choice?",
      options: ["Smartphone", "Tablet", "Server", "Laptop"],
      answer: 2,
      why: "A server is built to store files and provide services to other computers on a network. A laptop or tablet is designed for one person, not a shared clinic records system."
    },
    {
      q: "Which of these is an example of an embedded computer?",
      options: [
        "The control unit inside a washing machine",
        "A desktop in a school computer lab",
        "A tablet used for reading",
        "A laptop used by an accountant"
      ],
      answer: 0,
      why: "An embedded computer is built inside another machine to control it. The washing machine's control unit is a computer dedicated to running wash cycles."
    },
    {
      q: "True or false: a smartphone is a computer.",
      options: ["True", "False"],
      answer: 0,
      why: "A smartphone has a processor, memory, storage, input (touchscreen, microphone), output (screen, speaker) and runs programs. Calling is just one of its many jobs."
    },
    {
      q: "Which type of computer is designed for demanding professional work such as video editing, engineering design or large data analysis?",
      options: ["Workstation", "Tablet", "Smartphone", "Basic desktop"],
      answer: 0,
      why: "A workstation is a high-performance computer built for demanding professional tasks. It has more processing power, memory and graphics capability than an ordinary office desktop."
    },
    {
      q: "A field sales officer visits clients all day and needs to show catalogues and send email. Which device fits best?",
      options: ["A server", "A laptop", "A mainframe", "A smartwatch"],
      answer: 1,
      why: "A laptop is portable, has a full keyboard and screen, and can run office software and email. A server and mainframe stay in a computer room; a smartwatch is too small for this work."
    },
    {
      q: "Why are computer skills important in the workplace? Which answer is best?",
      options: [
        "They replace the need to communicate with people",
        "They help staff work accurately, organise records and communicate professionally",
        "They are only useful for IT technicians",
        "They are needed only to pass exams"
      ],
      answer: 1,
      why: "Computers support accurate records, clear communication, faster reporting and reliable customer service. They do not replace good communication or professional judgement."
    }
  ];

  var LETTERS = ["A", "B", "C", "D"];
  var idx = 0;
  var selected = null;
  var checked = false;
  var answers = [];

  var startScreen = document.getElementById("quiz-start");
  var runScreen = document.getElementById("quiz-run");
  var resultScreen = document.getElementById("quiz-result");
  if (!startScreen || !runScreen || !resultScreen) return;

  var qNum = document.getElementById("quiz-q-num");
  var qText = document.getElementById("quiz-question");
  var optionsWrap = document.getElementById("quiz-options");
  var feedback = document.getElementById("quiz-feedback");
  var checkBtn = document.getElementById("quiz-check");
  var nextBtn = document.getElementById("quiz-next");
  var track = document.getElementById("quiz-track-fill");

  function show(screen) {
    [startScreen, runScreen, resultScreen].forEach(function (s) { s.hidden = s !== screen; });
  }

  function begin() {
    idx = 0;
    selected = null;
    checked = false;
    answers = [];
    show(runScreen);
    render();
  }

  function render() {
    var item = QUESTIONS[idx];
    selected = null;
    checked = false;

    qNum.textContent = "Question " + (idx + 1) + " of " + QUESTIONS.length;
    qText.textContent = item.q;
    track.style.width = ((idx / QUESTIONS.length) * 100) + "%";
    optionsWrap.innerHTML = "";

    item.options.forEach(function (text, i) {
      var label = document.createElement("label");
      label.className = "quiz-option";
      label.setAttribute("data-index", i);

      var input = document.createElement("input");
      input.type = "radio";
      input.name = "quiz-option";
      input.value = i;

      var box = document.createElement("span");
      box.className = "option-box";

      var key = document.createElement("span");
      key.className = "option-key";
      key.textContent = LETTERS[i];

      var span = document.createElement("span");
      span.textContent = text;

      box.appendChild(key);
      box.appendChild(span);
      label.appendChild(input);
      label.appendChild(box);
      optionsWrap.appendChild(label);

      input.addEventListener("change", function () {
        selected = i;
        checkBtn.disabled = false;
      });
    });

    feedback.hidden = true;
    feedback.className = "feedback";
    feedback.innerHTML = "";
    checkBtn.hidden = false;
    checkBtn.disabled = true;
    checkBtn.textContent = "Check answer";
    nextBtn.hidden = true;
    nextBtn.textContent = idx === QUESTIONS.length - 1 ? "See my result" : "Next question";
  }

  function check() {
    if (selected === null || checked) return;
    checked = true;
    var item = QUESTIONS[idx];
    var correct = selected === item.answer;
    answers[idx] = { choice: selected, correct: correct };

    optionsWrap.querySelectorAll(".quiz-option").forEach(function (label) {
      var i = Number(label.getAttribute("data-index"));
      label.classList.add("is-locked");
      var input = label.querySelector("input");
      input.disabled = true;
      if (i === item.answer) label.classList.add("is-correct");
      if (i === selected && !correct) label.classList.add("is-wrong");
    });

    feedback.hidden = false;
    feedback.className = "feedback " + (correct ? "correct" : "incorrect");
    feedback.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (correct
        ? '<path d="M20 6 9 17l-5-5"/>'
        : '<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/>') +
      "</svg><div><strong>" + (correct ? "Correct" : "Not quite") + "</strong>" + item.why + "</div>";

    checkBtn.hidden = true;
    nextBtn.hidden = false;
    nextBtn.focus({ preventScroll: true });
    track.style.width = (((idx + 1) / QUESTIONS.length) * 100) + "%";
  }

  function next() {
    if (!checked) return;
    if (idx === QUESTIONS.length - 1) {
      showResult();
    } else {
      idx += 1;
      render();
    }
  }

  function bandFor(pct) {
    if (pct >= 80) return { label: "Excellent", msg: "Outstanding work. You can explain what a computer is, what it does and which type fits a task. Move on to the slides to lock in the details." };
    if (pct >= 70) return { label: "Very good", msg: "Strong understanding. Review the questions you missed, then continue to the slides and practice lab." };
    if (pct >= 60) return { label: "Good", msg: "A good foundation. Re-read the sections on the information cycle and computer types before trying again." };
    if (pct >= 50) return { label: "Pass", msg: "You have the basics. Review the reading and retry the quiz to build confidence before the assignment." };
    return { label: "Needs improvement", msg: "Do not worry — go back through the reading, especially the information cycle and the types of computers, then retry." };
  }

  function showResult() {
    var score = answers.filter(function (a) { return a && a.correct; }).length;
    var pct = Math.round((score / QUESTIONS.length) * 100);
    var band = bandFor(pct);

    document.getElementById("result-score").textContent = score + "/" + QUESTIONS.length;
    document.getElementById("result-pct").textContent = pct + "%";
    document.getElementById("result-band").textContent = band.label;
    document.getElementById("result-msg").textContent = band.msg;

    var ring = document.getElementById("result-ring");
    var gold = getComputedStyle(document.documentElement).getPropertyValue("--gold").trim() || "#F2A91C";
    var sage = getComputedStyle(document.documentElement).getPropertyValue("--sage").trim() || "#E6EDE5";
    ring.style.background = "conic-gradient(" + gold + " " + (pct * 3.6) + "deg, " + sage + " 0deg)";

    var review = document.getElementById("result-review");
    review.innerHTML = "";
    QUESTIONS.forEach(function (item, i) {
      var a = answers[i] || { choice: -1, correct: false };
      var li = document.createElement("li");
      var ico = document.createElement("span");
      ico.className = "r-ico " + (a.correct ? "ok" : "no");
      ico.innerHTML = a.correct
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';
      var q = document.createElement("span");
      q.className = "r-q";
      q.textContent = (i + 1) + ". " + item.q;
      var ans = document.createElement("span");
      ans.className = "r-a";
      ans.textContent = "Answer: " + LETTERS[item.answer];
      li.appendChild(ico);
      li.appendChild(q);
      li.appendChild(ans);
      review.appendChild(li);
    });

    if (window.LessonProgress) window.LessonProgress.recordQuiz(score, QUESTIONS.length);
    show(resultScreen);
  }

  checkBtn.addEventListener("click", check);
  nextBtn.addEventListener("click", next);

  startScreen.querySelector("[data-start-quiz]").addEventListener("click", begin);
  resultScreen.querySelector("[data-retry-quiz]").addEventListener("click", begin);

  show(startScreen);
})();
