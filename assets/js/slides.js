/* Week 1 · Lesson 1 — keyboard-navigable slide deck */
(function () {
  "use strict";

  var slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
  if (!slides.length) return;

  var current = 0;
  var counter = document.getElementById("deck-counter");
  var progress = document.getElementById("deck-progress-fill");
  var prevBtn = document.getElementById("deck-prev");
  var nextBtn = document.getElementById("deck-next");
  var notesPanel = document.getElementById("notes-panel");
  var notesBody = document.getElementById("notes-body");
  var notesBtn = document.getElementById("deck-notes");
  var notesClose = document.getElementById("notes-close");
  var fullBtn = document.getElementById("deck-fullscreen");

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  function show(index, updateHash) {
    current = Math.max(0, Math.min(slides.length - 1, index));
    slides.forEach(function (slide, i) {
      var active = i === current;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", active ? "false" : "true");
    });
    if (counter) counter.textContent = pad(current + 1) + " / " + pad(slides.length);
    if (progress) progress.style.width = (((current + 1) / slides.length) * 100) + "%";
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current === slides.length - 1;
    if (notesBody) notesBody.textContent = slides[current].getAttribute("data-notes") || "No notes for this slide.";
    if (updateHash !== false) {
      try { history.replaceState(null, "", "#slide-" + (current + 1)); } catch (e) {}
    }
    if (current === slides.length - 1 && window.LessonProgress) {
      window.LessonProgress.mark("slides", true);
    }
  }

  function go(step) { show(current + step); }

  function toggleNotes(force) {
    if (!notesPanel) return;
    var open = typeof force === "boolean" ? force : !notesPanel.classList.contains("is-open");
    notesPanel.classList.toggle("is-open", open);
    if (notesBtn) notesBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(function () {});
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen().catch(function () {});
    }
  }

  if (prevBtn) prevBtn.addEventListener("click", function () { go(-1); });
  if (nextBtn) nextBtn.addEventListener("click", function () { go(1); });
  if (notesBtn) notesBtn.addEventListener("click", function () { toggleNotes(); });
  if (notesClose) notesClose.addEventListener("click", function () { toggleNotes(false); });
  if (fullBtn) fullBtn.addEventListener("click", toggleFullscreen);

  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select") return;

    if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      show(0);
    } else if (e.key === "End") {
      e.preventDefault();
      show(slides.length - 1);
    } else if (e.key === "n" || e.key === "N") {
      toggleNotes();
    } else if (e.key === "f" || e.key === "F") {
      toggleFullscreen();
    } else if (e.key === "Escape") {
      toggleNotes(false);
    }
  });

  var touchX = null;
  var stage = document.querySelector(".deck-stage");
  if (stage) {
    stage.addEventListener("touchstart", function (e) {
      touchX = e.changedTouches[0].clientX;
    }, { passive: true });
    stage.addEventListener("touchend", function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 55) go(dx < 0 ? 1 : -1);
      touchX = null;
    }, { passive: true });
  }

  var initial = 0;
  var hash = window.location.hash.match(/slide-(\d+)/);
  if (hash) initial = Number(hash[1]) - 1;
  show(initial, false);
})();
