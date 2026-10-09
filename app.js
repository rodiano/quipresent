(function () {
  "use strict";

  const Q = window.QUIZ;
  const M = Q.messages || {};
  const app = document.getElementById("app");
  const progressBar = document.getElementById("progress");
  const STORE_KEY = "quiz-progress-v3:" + Q.title;

  // Each level uses the first `count` questions from the shared list (all if omitted)
  (Q.levels || []).forEach((l) => {
    l.steps = (Q.questions || []).slice(0, l.count ?? undefined);
  });

  // level = valgt sværhedsgrad (null = forside)
  // current: 0..n-1 = trin, n = vinderside
  let level = null;
  let current = 0;
  loadProgress();

  // Har besøgende allerede indtastet årstal i denne session?
  let gatePassed = sessionStorageGet("quiz-gate-passed") === "1";
  function sessionStorageGet(k) {
    try {
      return sessionStorage.getItem(k);
    } catch (e) {
      return null;
    }
  }
  function sessionStorageSet(k, v) {
    try {
      sessionStorage.setItem(k, v);
    } catch (e) {
      /* ignorer */
    }
  }

  function findLevel(id) {
    return (Q.levels || []).find((l) => l.id === id) || null;
  }

  function loadProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY));
      const l = saved && findLevel(saved.level);
      if (
        l &&
        Number.isInteger(saved.step) &&
        saved.step >= 0 &&
        saved.step <= l.steps.length
      ) {
        level = l;
        current = saved.step;
      }
    } catch (e) {
      /* ignorer */
    }
  }

  function saveProgress() {
    try {
      if (level)
        localStorage.setItem(
          STORE_KEY,
          JSON.stringify({ level: level.id, step: current }),
        );
      else localStorage.removeItem(STORE_KEY);
    } catch (e) {
      /* ignorer */
    }
  }

  // Tilføj børn til et element; lister flades ud og tomme værdier springes over
  function add(node, ...children) {
    children.flat().forEach((c) => {
      if (c == null || c === false || c === "") return;
      node.append(c instanceof Node ? c : document.createTextNode(String(c)));
    });
    return node;
  }

  // Lille hjælper til at bygge DOM-elementer
  function el(tag, props, ...children) {
    return add(
      Object.assign(document.createElement(tag), props || {}),
      ...children,
    );
  }

  // Ignorer store/små bogstaver, mellemrum og tegnsætning
  function normalize(s) {
    return String(s)
      .toLowerCase()
      .normalize("NFC")
      .replace(/[\s.,!?;:'"\-–—()]/g, "");
  }

  function go(index) {
    current = index;
    saveProgress();
    render();
    window.scrollTo(0, 0);
  }

  function startLevel(l) {
    level = l;
    go(0);
  }

  function resetCard() {
    document.title = Q.title;
    app.replaceChildren();
    // Genstart indgangsanimationen
    app.style.animation = "none";
    void app.offsetWidth;
    app.style.animation = "";
  }

  function render() {
    resetCard();
    if (!level && !gatePassed && Q.gate) {
      progressBar.style.width = "0%";
      return renderGate();
    }
    if (!level) {
      progressBar.style.width = "0%";
      return renderIntro();
    }
    const total = level.steps.length;
    progressBar.style.width = (Math.min(current, total) / total) * 100 + "%";
    if (current >= total) renderWinner();
    else renderStep(level.steps[current], current);
  }

  // Årstals-side foran quizzen
  function renderGate() {
    const G = Q.gate;
    const input = el("input", {
      type: "text",
      inputMode: "numeric",
      maxLength: 4,
      placeholder: G.placeholder || "fx 1985",
      autocomplete: "off",
      ariaLabel: G.text || "Årstal",
    });
    const submit = el(
      "button",
      { className: "primary", type: "submit" },
      G.button || "Videre",
    );
    const feedback = el("p", { className: "feedback", role: "status" });
    const form = el("form", { className: "answer-form" }, input, submit);

    form.onsubmit = (e) => {
      e.preventDefault();
      const raw = input.value.trim();
      const year = Number(raw);
      if (!/^\d{4}$/.test(raw) || year > new Date().getFullYear()) {
        feedback.textContent = G.invalid || "Skriv et gyldigt årstal";
        feedback.className = "feedback is-wrong";
        form.classList.remove("shake");
        void form.offsetWidth;
        form.classList.add("shake");
        input.select();
        return;
      }
      input.disabled = submit.disabled = true;
      const old = year < (G.cutoffYear || 1980);
      if (old || G.image) renderGateResult(G, old);
      else passGate();
    };

    add(
      app,
      el("h1", {}, G.title),
      G.text && el("p", {}, G.text),
      form,
      feedback,
    );
    input.focus();
  }

  // Short interstitial: message for those born before the cutoff year, image
  // for everyone – then on to the quiz
  function renderGateResult(G, old) {
    resetCard();
    add(
      app,
      old &&
        el(
          "div",
          { className: "gate-emoji", ariaHidden: "true" },
          G.oldEmoji || "😎",
        ),
      old && el("p", { className: "gate-old", role: "status" }, G.oldMessage),
      G.image && el("img", { className: "gate-image", src: G.image, alt: "" }),
    );
    setTimeout(passGate, G.delayMs || 3000);
  }

  function passGate() {
    gatePassed = true;
    sessionStorageSet("quiz-gate-passed", "1");
    render();
  }

  function renderIntro() {
    const levels = el("div", { className: "levels" });
    (Q.levels || []).forEach((l) => {
      levels.append(
        el(
          "button",
          { className: "level", onclick: () => startLevel(l) },
          l.emoji &&
            el(
              "span",
              { className: "level-emoji", ariaHidden: "true" },
              l.emoji,
            ),
          el("span", { className: "level-label" }, l.label),
          el(
            "span",
            { className: "level-desc" },
            l.description || `${l.steps.length} ${M.questions || "spørgsmål"}`,
          ),
        ),
      );
    });

    add(
      app,
      el("h1", {}, Q.title),
      Q.intro && el("p", {}, Q.intro),
      Q.chooseLevel && el("p", { className: "step-label" }, Q.chooseLevel),
      levels,
      Q.lazy &&
        el(
          "div",
          { className: "footer" },
          el(
            "button",
            { className: "link", onclick: renderLazy },
            Q.lazy.button || "Bare vis mig præmien",
          ),
        ),
    );
  }

  // Gimmick-siden for dem, der er "for gamle til sjov"
  function renderLazy() {
    const z = Q.lazy;
    resetCard();
    progressBar.style.width = "100%";
    add(
      app,
      el("h1", {}, z.title || "Her er din præmie!"),
      z.text && el("p", {}, z.text),
      z.image && el("img", { className: "media-img", src: z.image, alt: "" }),
      el(
        "button",
        {
          className: "primary",
          onclick: () => {
            level = null;
            go(0);
          },
        },
        z.back || "Tilbage",
      ),
    );
    window.scrollTo(0, 0);
  }

  function media(step) {
    return [
      step.rebus && el("div", { className: "rebus" }, step.rebus),
      step.image &&
        el("img", { className: "media-img", src: step.image, alt: "" }),
      step.audio &&
        el("audio", { controls: true, preload: "auto", src: step.audio }),
      step.video &&
        el("video", {
          className: "media-video",
          controls: true,
          playsInline: true,
          preload: "metadata",
          src: step.video,
        }),
    ];
  }

  function renderStep(step, index) {
    const feedback = el("p", { className: "feedback", role: "status" });
    const footer = el("div", { className: "footer" });

    const onCorrect = () => {
      feedback.textContent = M.correct || "Rigtigt!";
      feedback.className = "feedback is-correct";
      const next = el(
        "button",
        { className: "primary", onclick: () => go(index + 1) },
        M.next || "Videre",
      );
      footer.replaceChildren(next);
      next.focus();
    };
    const onWrong = (shakeTarget) => {
      feedback.textContent = M.wrong || "Prøv igen!";
      feedback.className = "feedback is-wrong";
      shakeTarget.classList.remove("shake");
      void shakeTarget.offsetWidth;
      shakeTarget.classList.add("shake");
    };

    const answerArea =
      step.type === "choice"
        ? choiceAnswer(step, onCorrect, onWrong)
        : textAnswer(step, onCorrect, onWrong);

    if (step.hint) {
      const hintBtn = el("button", { className: "link" }, M.hint || "Vis hint");
      hintBtn.onclick = () =>
        hintBtn.replaceWith(el("p", { className: "hint" }, step.hint));
      footer.append(hintBtn);
    }

    add(
      app,
      el(
        "p",
        { className: "step-label" },
        `${level.label} · ${index + 1} / ${level.steps.length}`,
      ),
      el("h1", {}, step.title || ""),
      step.text && el("p", {}, step.text),
      media(step),
      answerArea,
      feedback,
      footer,
      el(
        "div",
        {},
        el(
          "button",
          { className: "link", onclick: restart },
          M.restart || "Start forfra",
        ),
      ),
    );

    const input = app.querySelector("input");
    if (input) input.focus();
  }

  function choiceAnswer(step, onCorrect, onWrong) {
    const wrap = el("div", { className: "options" });
    step.options.forEach((label, i) => {
      const btn = el("button", { className: "option" }, label);
      btn.onclick = () => {
        if (i === step.correct) {
          btn.classList.add("is-correct");
          wrap.querySelectorAll("button").forEach((b) => (b.disabled = true));
          onCorrect();
        } else {
          btn.classList.add("is-wrong");
          btn.disabled = true;
          onWrong(btn);
        }
      };
      wrap.append(btn);
    });
    return wrap;
  }

  function textAnswer(step, onCorrect, onWrong) {
    const accepted = (step.answers || []).map(normalize);
    const input = el("input", {
      type: "text",
      placeholder: M.placeholder || "Skriv dit svar…",
      autocomplete: "off",
      autocapitalize: "off",
      spellcheck: false,
    });
    const submit = el(
      "button",
      { className: "primary", type: "submit" },
      M.check || "Svar",
    );
    const form = el("form", { className: "answer-form" }, input, submit);
    form.onsubmit = (e) => {
      e.preventDefault();
      if (!input.value.trim()) return;
      if (accepted.includes(normalize(input.value))) {
        input.disabled = submit.disabled = true;
        onCorrect();
      } else {
        onWrong(form);
        input.select();
      }
    };
    return form;
  }

  function prizeHtml(code) {
    const box = el("div", { className: "winner-html" });
    box.innerHTML = code;
    return box;
  }

  function prizeLink(link) {
    return (
      link &&
      link.url &&
      el(
        "a",
        {
          className: "button",
          href: link.url,
          target: "_blank",
          rel: "noopener",
        },
        link.text || link.url,
      )
    );
  }

  function renderWinner() {
    // Sværhedsgradens egen vinderside lægges oven på den fælles
    const w = Object.assign({}, Q.winner, level.winner);
    const x = w.extra;

    add(
      app,
      el("h1", {}, w.title || "Tillykke!"),
      w.text && el("p", {}, w.text),
      w.image && el("img", { className: "media-img", src: w.image, alt: "" }),
      w.imageTwo &&
        el("img", { className: "media-img", src: w.imageTwo, alt: "" }),
      w.html && prizeHtml(w.html),
      prizeLink(w.link),
      x &&
        el(
          "div",
          { className: "extra-prize" },
          x.title && el("h2", {}, x.title),
          x.text && el("p", {}, x.text),
          x.image &&
            el("img", { className: "media-img", src: x.image, alt: "" }),
          x.html && prizeHtml(x.html),
          prizeLink(x.link),
        ),
      el(
        "div",
        { className: "footer" },
        el(
          "button",
          { className: "link", onclick: restart },
          M.restart || "Start forfra",
        ),
      ),
    );

    if (w.confetti !== false) confetti();
  }

  function restart() {
    level = null;
    go(0);
  }

  // ---- Konfetti ----
  function confetti() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx.scale(dpr, dpr);

    const colors = [
      "#e91e8c",
      "#ff5eb0",
      "#ff8fc7",
      "#f472b6",
      "#ffc2de",
      "#c2185b",
    ];
    const pieces = Array.from({ length: 160 }, () => ({
      x: Math.random() * innerWidth,
      y: -20 - Math.random() * innerHeight * 0.6,
      w: 6 + Math.random() * 6,
      h: 8 + Math.random() * 8,
      vy: 2 + Math.random() * 3,
      vx: -1.5 + Math.random() * 3,
      rot: Math.random() * Math.PI,
      vr: -0.2 + Math.random() * 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const start = performance.now();
    (function frame(now) {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      let alive = false;
      for (const p of pieces) {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        if (p.y < innerHeight + 20) alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (alive && now - start < 8000) requestAnimationFrame(frame);
      else ctx.clearRect(0, 0, innerWidth, innerHeight);
    })(start);
  }

  render();
})();
