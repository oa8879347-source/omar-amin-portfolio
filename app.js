(() => {
  const $ = (s) => document.querySelector(s), $$ = (s) => [...document.querySelectorAll(s)];
  const root = document.documentElement;
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  let lang = root.lang === "ar" ? "ar" : "en";
  const t = (o) => (o && typeof o === "object" && !Array.isArray(o) && ("en" in o) ? (o[lang] ?? o.en) : o);
  const U = () => UI[lang];
  const ICON = {
    apple: '<svg viewBox="0 0 24 24"><path d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.1-1.2 2.9-2.4.9-1.4 1.3-2.7 1.3-2.8 0 0-2.4-.9-2.4-3.9zM14 5.4c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.6 2.8-1.4z"/></svg>',
    play: '<svg viewBox="0 0 24 24"><path d="M3.6 1.8 13.8 12 3.6 22.2c-.4-.2-.6-.6-.6-1.1V2.9c0-.5.2-.9.6-1.1zm11.3 11.3 2.4 2.4-11.1 6.3 8.7-8.7zm3.6-3.6 2.8 1.6c.8.5.8 1.3 0 1.8l-2.8 1.6-2.6-2.5 2.6-2.5zM6.2 2.2l11.1 6.3-2.4 2.4-8.7-8.7z"/></svg>',
    mail: '<svg viewBox="0 0 24 24"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.5L4 7.3V17h16V7.3l-8 5.2zM5.2 7l6.8 4.4L18.8 7H5.2z"/></svg>',
    wa: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>',
    call: '<svg viewBox="0 0 24 24"><path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg>',
    li: '<svg viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.2 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4z"/></svg>',
    dl: '<svg viewBox="0 0 24 24"><path d="M11 3h2v9.2l3.3-3.3 1.4 1.4L12 16l-5.7-5.7 1.4-1.4 3.3 3.3zM4 18h16v2H4z"/></svg>',
    repo: '<svg viewBox="0 0 16 16"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.71 1.71.75.75 0 0 1-1.06 1.06A2.5 2.5 0 0 1 2 11.5zm10.5-1h-8a1 1 0 0 0-1 1v6.71A2.5 2.5 0 0 1 4.5 9h8z"/></svg>',
    pin: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    org: '<svg viewBox="0 0 24 24"><path d="M4 21V5l8-3v19M12 9h8v12M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2M2 21h20"/></svg>',
    link: '<svg viewBox="0 0 24 24"><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/></svg>',
  };
  const badges = (a) => `${a.ios ? `<a class="badge" href="${a.ios}" target="_blank" rel="noopener">${ICON.apple}${U().m.ios}</a>` : ""}${a.android ? `<a class="badge" href="${a.android}" target="_blank" rel="noopener">${ICON.play}${U().m.android}</a>` : ""}`;
  const appIcon = (a, cls = "ic") => a.icon ? `<img class="${cls}" src="${a.icon}" alt="${esc(a.name)} icon" loading="lazy">` : `<span class="${cls}">RB</span>`;
  const liveApps = () => PROJECTS.flatMap((p) => (p.apps || []).map((a) => ({ ...a, pid: p.id, org: p.org })));

  function renderStatic() {
    const u = U();
    root.lang = lang; root.dir = u.dir;
    document.title = lang === "ar" ? "عمر أحمد أمين — مدير تقني ومهندس برمجيات أول" : "Omar Ahmed Amin — CTO & Senior Software Engineer";
    const ids = ["work", "nubni", "experience", "profile", "contact"];
    $("#navlinks").innerHTML = u.nav.map((n, i) => `<a href="#${i === 0 ? "live" : ids[i]}">${n}</a>`).join("");
    $("#lang").textContent = u.other;
    $("#cvbtn").textContent = u.cv; $("#cv2").textContent = u.cv;
    ["ghTitle", "ghSub", "eyebrow", "h1", "lead", "based", "liveTitle", "liveSub", "procTitle", "procSub", "workTitle", "workSub", "expTitle", "skillsTitle", "archTitle", "archSub", "contactTitle", "contactSub", "footer"].forEach((k) => { const el = $("#" + k); if (el) el.textContent = u[k]; });
    $("#ctaWork").textContent = u.ctaWork;
    $("#ctaMail").innerHTML = ICON.mail + esc(u.ctaMail); $("#ctaMail").href = `mailto:${PROFILE.email}`;
    $("#mail2").innerHTML = ICON.mail + esc(u.ctaMail); $("#mail2").href = `mailto:${PROFILE.email}`;
    $("#ctaLi").href = PROFILE.linkedin;
    $("#contactline").innerHTML = `${esc(PROFILE.email)} &nbsp;·&nbsp; <span dir="ltr">${esc(PROFILE.phone)}</span>`;
    $("#yr").textContent = new Date().getFullYear();

    renderHero(u);

    $("#stats").innerHTML = PROFILE.stats.map((s) => `<div class="stat reveal">${s.text ? `<b class="txt">${esc(s.text)}</b>` : `<b data-to="${s.value}" data-suf="${s.suffix}">0${s.suffix}</b>`}<span>${esc(s[lang])}</span></div>`).join("");

    const apps = liveApps();
    renderCtas(u);
    renderGh(u);
    renderFlag(u);
    buildJourney(u);
    const chips = apps.map((a) => `<a href="#project/${a.pid}">${a.icon ? `<img src="${a.icon}" alt="">` : "<i>RB</i>"}${esc(a.name)}</a>`).join("");
    $("#marquee").innerHTML = chips + chips;

    $("#apps").innerHTML = apps.map((a) => `
      <div class="appc reveal" data-id="${a.pid}" tabindex="0">
        <div class="top">${appIcon(a)}<div><h3>${esc(a.name)}</h3><small>${esc(a.org)}</small></div></div>
        <div class="badges">${badges(a)}</div>
      </div>`).join("");

    $("#steps").innerHTML = u.steps.map(([h, p], i) => `<li data-i="${i}"><h3><i>0${i + 1}</i>${esc(h)}</h3><p>${esc(p)}</p></li>`).join("");
    $("#dots").innerHTML = u.steps.map(() => "<b></b>").join("");
    const shots = ["assets/apps/dentalux-app-2.jpg", "assets/apps/ptfinder-1.jpg", "assets/rbm/rbm-2.jpg", "assets/apps/helpoo-driver-1.jpg"];
    $("#screens").innerHTML = shots.map((s) => `<img src="${s}" alt="" loading="lazy">`).join("");
    setStep(0, true);

    const f = Object.entries(u.filters);
    $("#filters").innerHTML = f.map(([k, v]) => `<button class="chip${k === filter ? " on" : ""}" data-f="${k}">${v}</button>`).join("");
    renderCards();

    $("#jobs").innerHTML = EXPERIENCE.map((j) => `
      <div class="job reveal">
        <div><div class="date">${esc(t(j.date))}</div><div class="place">${esc(t(j.place))}</div></div>
        <div><h3>${esc(t(j.role))}</h3>${j.link ? `<a class="org" href="${j.link}" target="_blank" rel="noopener">${esc(j.org)} ↗</a>` : `<span class="org">${esc(j.org)}</span>`}
        <ul>${t(j.points).map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
      </div>`).join("");
    $("#skillgrid").innerHTML = SKILLS.map((g) => `<div class="skill reveal"><h3>${esc(g[lang])}</h3><div>${g.items.map((i) => `<span>${esc(i)}</span>`).join("")}</div></div>`).join("");
    $("#archiveList").innerHTML = EARLIER.map(([n, c, d]) => `<div class="arc reveal"><b>${esc(n)}</b><small>${esc(t(c))}</small><p>${esc(t(d))}</p></div>`).join("");
    observe();
    if (modal.classList.contains("open")) route();
  }

  let filter = "all";
  const tones = ["teal", "coral", "deep"];
  function thumb(p, i) {
    if (p.phone && p.images.length) return `<div class="thumb ${tones[i % 3]}"><div class="fan">${p.images.slice(0, 3).map((s) => `<img src="${s}" alt="${esc(p.name)} screen" loading="lazy">`).join("")}</div></div>`;
    if (p.images.length) return `<div class="thumb"><img class="shot" src="${p.images[0]}" alt="${esc(p.name)}" loading="lazy"></div>`;
    if (p.logo) return `<div class="thumb"><img class="logo" src="${p.logo}" alt="${esc(p.name)} logo" loading="lazy"></div>`;
    return `<div class="thumb teal"><span class="initials">${p.initials}</span></div>`;
  }
  function renderCards() {
    const u = U();
    $("#cards").innerHTML = PROJECTS.filter((p) => filter === "all" || p.status === filter).map((p, i) => `
      <article class="card reveal" data-id="${p.id}" tabindex="0">
        <div style="position:relative">${thumb(p, i)}<span class="status ${p.status}">${u.status[p.status]}</span></div>
        <div class="body">
          <div class="meta">${esc(t(p.industry))} · ${esc(p.org)}</div>
          <h3>${esc(p.name)}</h3>
          <p>${esc(t(p.summary))}</p>
          <div class="tags">${p.stack.slice(0, 3).map((s) => `<span>${esc(s)}</span>`).join("")}</div>
          <span class="more">${u.view} <i>→</i></span>
        </div>
      </article>`).join("");
    observe();
  }
  $("#filters").addEventListener("click", (e) => {
    const b = e.target.closest(".chip"); if (!b) return;
    filter = b.dataset.f; $$(".chip").forEach((c) => c.classList.toggle("on", c === b)); renderCards();
  });
  const go = (e) => { if (e.target.closest("a.badge")) return; const c = e.target.closest("[data-id]"); if (c) location.hash = `project/${c.dataset.id}`; };
  ["#cards", "#apps"].forEach((s) => { $(s).addEventListener("click", go); $(s).addEventListener("keydown", (e) => e.key === "Enter" && go(e)); });

  // modal
  const modal = $("#modal"), body = $("#m-body");
  function openProject(id) {
    const p = PROJECTS.find((x) => x.id === id); if (!p) return;
    const u = U(), m = u.m;
    const head = p.logo ? `<img src="${p.logo}" alt="">` : `<div class="init">${p.initials}</div>`;
    const imgs = [...p.images, ...(p.web ? [p.web] : [])];
    body.innerHTML = `
      <div class="m-head">${head}<div><div class="meta">${esc(t(p.industry))} · ${esc(p.org)} · ${esc(t(p.markets))}</div><h2>${esc(p.name)}</h2></div></div>
      <span class="status ${p.status}" style="position:static">${u.status[p.status]}</span>
      <p class="m-sum" style="margin-top:12px">${esc(t(p.summary))}</p>
      ${p.apps ? `<div class="m-apps">${p.apps.map((a) => `<div class="m-app">${appIcon(a, "")}<div><b>${esc(a.name)}</b><div class="badges">${badges(a)}</div></div></div>`).join("")}</div>` : ""}
      ${imgs.length ? `<div class="gallery">${imgs.map((s) => `<img src="${s}" alt="${esc(p.name)} screenshot" class="${p.phone && s !== p.web ? "" : "wide"}">`).join("")}</div>` : `<div class="nda">${m.nda}</div>`}
      <div class="pcs"><div><h4>${m.problem}</h4><p>${esc(t(p.problem))}</p></div><div><h4>${m.built}</h4><p>${esc(t(p.built))}</p></div><div><h4>${m.outcome}</h4><p>${esc(t(p.outcome))}</p></div></div>
      <div class="two">
        <div class="box"><h4>${m.role}</h4><p class="role">${esc(t(p.role))}</p><ul>${t(p.resp).map((r) => `<li>${esc(r)}</li>`).join("")}</ul></div>
        <div class="box"><h4>${m.scope}</h4><div class="deliv">${t(p.deliv).map((d) => `<span>${esc(d)}</span>`).join("")}</div><h4>${m.stack}</h4><div class="tags">${p.stack.map((s) => `<span>${esc(s)}</span>`).join("")}</div></div>
      </div>
      <div class="m-links">${(p.links || []).map((l) => `<a class="store dark" href="${l.url}" target="_blank" rel="noopener">${esc(t(l))} ↗</a>`).join("")}<button class="store" id="share">${m.share}</button></div>`;
    modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden";
    $("#share").onclick = (e) => { navigator.clipboard?.writeText(location.href); e.currentTarget.textContent = m.copied + " ✓"; };
  }
  function closeProject() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
  function route() { const m = location.hash.match(/^#project\/(.+)$/); m ? openProject(m[1]) : closeProject(); }
  window.addEventListener("hashchange", route);
  $("#close").onclick = () => { history.pushState("", "", location.pathname + location.search + "#work"); closeProject(); };
  modal.addEventListener("click", (e) => { if (e.target === modal) $("#close").click(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { $("#lightbox").classList.remove("open"); if (modal.classList.contains("open")) $("#close").click(); } });
  body.addEventListener("click", (e) => { if (e.target.matches(".gallery img")) { $("#lightbox img").src = e.target.src; $("#lightbox").classList.add("open"); } });
  $("#lightbox").onclick = () => $("#lightbox").classList.remove("open");

  // toggles
  $("#lang").onclick = () => { lang = lang === "en" ? "ar" : "en"; localStorage.setItem("lang", lang); const q = new URL(location); q.searchParams.set("lang", lang); history.replaceState("", "", q); renderStatic(); };
  $("#theme").onclick = () => { const n = root.dataset.theme === "dark" ? "light" : "dark"; root.dataset.theme = n; localStorage.setItem("theme", n); document.querySelector('meta[name=theme-color]').content = n === "dark" ? "#0E1915" : "#F5EEE1"; };
  $("#motion").onclick = () => document.body.classList.toggle("paused");

  // pinned process story
  let step = -1;
  function setStep(i, force) {
    if (i === step && !force) return; step = i;
    $$("#steps li").forEach((li, k) => li.classList.toggle("on", k === i));
    $$("#dots b").forEach((d, k) => d.classList.toggle("on", k === i));
    $$("#screens img").forEach((im, k) => im.classList.toggle("on", k === i));
  }
  $("#steps").addEventListener("click", (e) => { const li = e.target.closest("li"); if (li) setStep(+li.dataset.i); });
  const proc = $("#process"), bar = $("#nav");
  function onScroll() {
    bar.classList.toggle("scrolled", scrollY > 10);
    if (innerWidth <= 980) return;
    const r = proc.getBoundingClientRect(), total = r.height - innerHeight;
    const k = Math.min(Math.max(-r.top / total, 0), 0.999);
    setStep(Math.floor(k * 4));
  }
  addEventListener("scroll", onScroll, { passive: true });

  // reveal + counters
  let io;
  function observe() {
    io = io || new IntersectionObserver((es) => es.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("in");
      en.target.querySelectorAll("[data-to]").forEach(count);
      io.unobserve(en.target);
    }), { threshold: 0.1 });
    $$(".reveal:not(.in)").forEach((el, i) => { el.style.transitionDelay = `${(i % 5) * 70}ms`; io.observe(el); });
  }
  function count(el) {
    const to = +el.dataset.to, suf = el.dataset.suf, t0 = performance.now();
    const f = (n) => { const k = Math.min((n - t0) / 1500, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + suf; if (k < 1) requestAnimationFrame(f); };
    requestAnimationFrame(f);
  }

  // flagship spotlight: Nubni
  const FI = {
    mic: '<path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3"/>',
    wand: '<path d="m15 4 1.5 3L20 8.5 16.5 10 15 13l-1.5-3L10 8.5 13.5 7zM4 20l9-9"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8M8 13h5"/>',
    code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
    phone: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>',
    cloud: '<path d="M7 18a4 4 0 0 1-.6-8A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z"/>',
    plug: '<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4"/>',
    shield: '<path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z"/><path d="m9 12 2 2 4-4"/>',
  };
  let flagTimer;
  function renderFlag(u) {
    const f = u.flag, p = PROJECTS.find((x) => x.id === "nubni");
    $("#flag").innerHTML = `
      <div class="flag-top">
        <div class="flag-copy reveal">
          <span class="flag-tag">${esc(f.tag)}</span>
          <h2><img src="${p.logo}" alt="">${esc(f.title)}</h2>
          <p>${esc(f.lead)}</p>
          <div class="flag-stack">${p.stack.map((s) => `<span>${esc(s)}</span>`).join("")}</div>
          <div class="cta"><a class="store flag-btn" href="https://nubni.com" target="_blank" rel="noopener">${esc(f.visit)} ↗</a><a class="store flag-ghost" href="#project/nubni">${esc(f.open)}</a></div>
        </div>
        <div class="flag-shot reveal"><div class="bz"><i></i><i></i><i></i><span>nubni.com</span></div><div class="slides">${p.images.map((s, i) => `<img src="${s}" alt="Nubni screen ${i + 1}"${i ? ' loading="lazy"' : ""} class="${i ? "" : "on"}">`).join("")}</div></div>
      </div>
      <div class="flag-feats">${f.feats.map(([ic, h, d]) => `<div class="ff reveal"><svg viewBox="0 0 24 24">${FI[ic]}</svg><h3>${esc(h)}</h3><p>${esc(d)}</p></div>`).join("")}</div>`;
    clearInterval(flagTimer);
    let k = 0;
    flagTimer = setInterval(() => { const im = $$("#flag .slides img"); if (!im.length) return; im[k].classList.remove("on"); k = (k + 1) % im.length; im[k].classList.add("on"); }, 3200);
    $("#flag").addEventListener("pointermove", (e) => { const sh = e.target.closest(".flag-shot"); if (!sh) return; const r = sh.getBoundingClientRect(); sh.style.setProperty("--rx", ((e.clientY - r.top) / r.height - 0.5) * -6 + "deg"); sh.style.setProperty("--ry", ((e.clientX - r.left) / r.width - 0.5) * 8 + "deg"); });
  }

  // always-visible contact actions: nav, side dock, mobile bar
  const WA = `https://wa.me/${PROFILE.phone.replace(/\D/g, "")}`, TEL = `tel:${PROFILE.phone}`, MAIL = `mailto:${PROFILE.email}`, CV = "Omar_Ahmed_Amin_CV_2026.pdf";
  function renderCtas(u) {
    $("#navWa").href = WA; $("#navWa").innerHTML = ICON.wa + esc(u.message);
    $("#navMail").href = MAIL; $("#navMail").innerHTML = ICON.mail + esc(u.mail);
    $("#cvbtn").innerHTML = ICON.dl + esc(u.cv);
    const d = [["wa", WA, ICON.wa, u.wa, 1], ["", MAIL, ICON.mail, u.mail], ["", TEL, ICON.call, u.call], ["", PROFILE.linkedin, ICON.li, u.li, 1], ["cv", CV, ICON.dl, u.cv]];
    $("#dock").innerHTML = d.map(([c, h, i, l, ext]) => `<a class="${c}" href="${h}"${ext ? ' target="_blank" rel="noopener"' : ""}${c === "cv" ? " download" : ""} aria-label="${esc(l)}">${i}<span>${esc(l)}</span></a>`).join("");
    $("#mbar").innerHTML = `<a class="wa" href="${WA}" target="_blank" rel="noopener">${ICON.wa}${esc(u.message)}</a><a href="${TEL}">${ICON.call}${esc(u.call)}</a><a class="cv" href="${CV}" download>${ICON.dl}${esc(u.cv)}</a>`;
  }

  // GitHub-style profile
  const LANGC = { Flutter: "#00B4AB", Dart: "#00B4AB", "React Native": "#61dafb", "Next.js": "#24292f", Android: "#3DDC84", React: "#61dafb", "Node.js": "#3c873a", TypeScript: "#3178c6", PHP: "#4F5D95", Laravel: "#f05340", Python: "#3572A5", Django: "#0C4B33", Angular: "#dd0031", PostgreSQL: "#336791", MySQL: "#00758f", Firebase: "#FFCA28", Docker: "#2496ED", Strapi: "#8e75ff", Redis: "#DC382D" };
  const ym = (s) => s === "now" ? 2026 * 12 + 9 : (+s.slice(0, 4)) * 12 + (+s.slice(5, 7) - 1);
  function renderGh(u) {
    const g = u.gh, live = liveApps().length;
    const MON = lang === "ar" ? ["ينا", "فبر", "مار", "أبر", "ماي", "يون", "يول", "أغس", "سبت", "أكت", "نوف", "ديس"] : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const spans = [...EXPERIENCE.filter((e) => e.from), FREELANCE];
    let cal = `<span></span>${MON.map((m) => `<span>${m}</span>`).join("")}`;
    for (let y = 2018; y <= 2026; y++) {
      cal += `<span class="yl">${y}</span>`;
      for (let m = 0; m < 12; m++) {
        const k = y * 12 + m;
        if (k > ym("now")) { cal += `<i class="x"></i>`; continue; }
        const n = spans.reduce((a, e) => a + (k >= ym(e.from) && k <= ym(e.to) ? e.load : 0), 0);
        cal += `<i data-l="${Math.min(n, 4)}" title="${MON[m]} ${y}: ${n} ${g.tip}" style="transition-delay:${(y - 2018) * 60 + m * 18}ms"></i>`;
      }
    }
    const cnt = {};
    PROJECTS.forEach((p) => p.stack.forEach((s) => { if (LANGC[s]) cnt[s] = (cnt[s] || 0) + 1; }));
    const tot = Object.values(cnt).reduce((a, b) => a + b, 0);
    const langs = Object.entries(cnt).sort((a, b) => b[1] - a[1]).slice(0, 8);
    const pins = ["nubni", "dentalux", "rbm", "curesuite", "rakny", "ptfinder"].map((id) => PROJECTS.find((p) => p.id === id)).filter(Boolean);
    const repo = (p) => { const l = p.stack.find((s) => LANGC[s]) || p.stack[0];
      return `<div class="repo" data-id="${p.id}" tabindex="0"><div class="t">${ICON.repo}<a href="#project/${p.id}">${esc(p.org.toLowerCase().replace(/\s+/g, "-"))}/<b>${esc(p.id)}</b></a><span class="pub">${u.status[p.status]}</span></div>
        <p>${esc(t(p.summary))}</p><div class="f"><span><i class="dot" style="background:${LANGC[l] || "#999"}"></i>${esc(l)}</span>${p.status === "live" ? `<span>${u.status.live}</span>` : ""}</div></div>`; };
    $("#gh").innerHTML = `
      <aside class="gh-side reveal">
        <img src="assets/omar.jpg" alt="${esc(t(PROFILE.name))}">
        <h3>${esc(t(PROFILE.name))}</h3><div class="handle mono">${g.handle}</div>
        <p class="bio">${esc(g.bio)}</p>
        <a class="btn" href="${WA}" target="_blank" rel="noopener">${ICON.wa}${esc(g.follow)}</a>
        <div class="gh-counts"><span><b>250+</b> ${g.repos}</span><span><b>8+</b> ${g.years}</span></div>
        <ul class="gh-meta"><li>${ICON.org}CodeWealth</li><li>${ICON.pin}${lang === "ar" ? "القاهرة، مصر" : "Cairo, Egypt"}</li><li>${ICON.link}<a href="${MAIL}">${esc(PROFILE.email)}</a></li><li>${ICON.link}<a href="${PROFILE.linkedin}" target="_blank" rel="noopener">linkedin/omar-amin</a></li></ul>
      </aside>
      <div class="gh-main">
        <div class="gh-h">${g.pinned}</div>
        <div class="pinned">${pins.map(repo).join("")}</div>
        <div class="gh-row"><div class="gh-box reveal"><div class="gh-h">${g.activity}</div><div class="cal" id="cal">${cal}</div>
          <div class="legend">${g.less}${[0, 1, 2, 3, 4].map((l) => `<i class="cal-l" style="background:${l ? `color-mix(in srgb,var(--teal) ${[0, 32, 55, 78, 100][l]}%,var(--paper2))` : "var(--paper2)"}"></i>`).join("")}${g.more}</div></div>
        <div class="gh-box reveal"><div class="gh-h">${g.stack}</div>
          <div class="lbar" id="lbar">${langs.map(([l, n]) => `<span data-w="${(n / tot * 100).toFixed(1)}" style="background:${LANGC[l]}"></span>`).join("")}</div>
          <div class="llist">${langs.map(([l, n]) => `<span><i class="dot" style="background:${LANGC[l]}"></i><b>${esc(l)}</b> <small>${(n / tot * 100).toFixed(1)}%</small></span>`).join("")}</div><p class="gh-note">${g.note}</p></div></div>
        <div class="term reveal" id="term"><div class="bar"><i></i><i></i><i></i><span>omar@codewealth: ~/career — ${g.log}</span></div><pre class="mono" id="termout"></pre></div>
      </div>`;
    const lines = [`<span class="p">$</span> git log --oneline --graph`];
    EXPERIENCE.filter((e) => e.from).forEach((e, i) => lines.push(`* <span class="h">${e.hash}</span>${i === 0 ? ` <span class="ref">(HEAD -> main)</span>` : ""} ${esc(e.from)}  ${esc(t(e.role))} @ ${esc(e.org)}`));
    lines.push(`* <span class="h">0000000</span> <span class="c">${lang === "ar" ? "init: بكالوريوس علوم الحاسب" : "init: B.Sc. Computer Science"}</span>`);
    $("#termout").dataset.lines = JSON.stringify(lines); $("#termout").innerHTML = "";
    termDone = false;
    const sec = $("#profile");
    ghIo?.disconnect();
    ghIo = new IntersectionObserver((es) => { if (es[0].isIntersecting) { playGh(); ghIo.disconnect(); } }, { threshold: 0.15 });
    ghIo.observe(sec);
    $("#gh").onclick = go;
  }
  let ghIo, termDone = false;
  function playGh() {
    $("#cal")?.classList.add("in");
    $$("#lbar span").forEach((s) => (s.style.width = s.dataset.w + "%"));
    if (termDone) return; termDone = true;
    const out = $("#termout"), lines = JSON.parse(out.dataset.lines);
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = 0;
    const next = () => { out.innerHTML = lines.slice(0, i + 1).join("\n") + (i < lines.length - 1 ? "" : '\n<span class="p">$</span> <span class="cur"></span>'); if (++i < lines.length) setTimeout(next, still ? 0 : 260); };
    next();
  }

  // hero: scroll-driven Nubni demo (Olfa technique: one pinned stage, scroll progress drives each phase)
  const film = $("#film"), demo = $("#hxDemo");
  const clamp = (x) => Math.min(Math.max(x, 0), 1);
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const CODE = [
    ['c', '# api/bookings.py'], ['k', '@router.post("/bookings")'], ['', 'async def create_booking(b: BookingIn, user=Depends(auth)):'],
    ['', '    slot = await slots.reserve(b.doctor_id, b.time)'], ['', '    pay = await paymob.intent(user, slot.price)'],
    ['', '    await notify(b.doctor_id, "new_booking", slot)'], ['', '    return {"booking": slot.id, "pay_url": pay.url}'],
  ];
  const TREE = ["app/lib/main.dart", "app/lib/booking_screen.dart", "dashboard/src/app/doctors", "api/bookings.py", "db/schema.sql"];
  let hx;
  function renderHero(u) {
    hx = u.hx;
    $("#hxName").textContent = t(PROFILE.name);
    $("#hxTitle").innerHTML = hx.title;
    $("#hxModel").textContent = hx.model;
    $("#hxSteps").innerHTML = hx.steps.map((st, i) => `<li data-i="${i}"><i style="--f:0"></i><b>0${i + 1}</b>${esc(st)}</li>`).join("");
    $("#hxPlanH").textContent = hx.planH;
    $("#hxPlan").innerHTML = hx.plan.map((x) => `<li><span class="ck"></span>${esc(x)}</li>`).join("");
    $("#hxApprove").textContent = hx.approve;
    $("#hxTree").innerHTML = TREE.map((f) => `<span>${f}</span>`).join("");
    $("#hxCode").innerHTML = CODE.map(([c, l]) => `<span class="${c}">${esc(l)}</span>`).join("\n");
    $("#hxAppName").textContent = hx.app; $("#hxAppSub").textContent = hx.appSub;
    $("#hxDocs").innerHTML = hx.docs.map(([n, d]) => `<div><i></i><span><b>${esc(n)}</b><small>${esc(d)}</small></span></div>`).join("");
    $("#hxBook").textContent = hx.book;
    $("#hxShip").innerHTML = hx.ship.map((x) => `<span>✓ ${esc(x)}</span>`).join("");
    paint(lastP);
  }
  let lastP = 0;
  function paint(p) {
    lastP = p;
    const k = p * 4, st = Math.min(3, Math.floor(k)), f = clamp(k - st);
    demo.dataset.s = st;
    $$("#hxSteps li").forEach((li, i) => { li.classList.toggle("on", i === st); li.firstChild.style.setProperty("--f", i < st ? 1 : i === st ? f : 0); });
    const say = hx.say, n = st > 0 ? say.length : Math.round(say.length * clamp(0.18 + f * 1.25));
    $("#hxSay").innerHTML = esc(say.slice(0, n)) + (n < say.length ? '<span class="caret"></span>' : "");
    $$("#hxPlan li").forEach((li, i, a) => li.classList.toggle("in", st > 1 || (st === 1 && f * 1.3 > i / a.length)));
    $("#hxApprove").classList.toggle("go", st > 1 || (st === 1 && f > 0.82));
    $$("#hxCode span").forEach((sp, i, a) => sp.classList.toggle("in", st > 2 || (st === 2 && f * 1.2 > i / a.length)));
    $$("#hxTree span").forEach((sp, i, a) => sp.classList.toggle("in", st > 2 || (st === 2 && f * 1.4 > i / a.length)));
    $$("#hxShip span").forEach((sp, i, a) => sp.classList.toggle("in", st === 3 && f * 1.5 > i / a.length));
  }
  // journey: a 3D camera flies through the scene as you scroll
  const world = $("#world"), stage = $("#stage");
  const smooth = (x) => x * x * (3 - 2 * x);
  const seg = (p, a, b) => clamp((p - a) / (b - a));
  const CHIPS = [["Flutter", ""], ["Python", ""], ["Angular", ""], ["Claude", "ai"], ["GPT", "ai"], ["Gemini", "ai"], ["React", ""], ["PostgreSQL", ""], ["DeepSeek", "ai"], ["✓ APK", "ok"], ["✓ IPA", "ok"], ["Node.js", ""], ["Mistral", "ai"], ["Docker", ""], ["Redis", ""], ["✓ deployed", "ok"], ["Strapi", ""], ["Next.js", ""]];
  const CH = [0, 0.14, 0.58, 0.9];
  let J = [], K = [], cur = 0, tgt = 0, demoItem, raf = 0;
  if (still) root.classList.add("no-film");
  function buildJourney(u) {
    const r = u.jr;
    $("#jProjT").innerHTML = r.projT; $("#jProjS").textContent = r.projS;
    $("#jEndT").innerHTML = r.endT; $("#jEndS").textContent = r.endS;
    $("#jEndMsg").href = WA; $("#jEndMsg").innerHTML = ICON.wa + esc(u.message); $("#jEndWork").textContent = r.work;
    $("#jHud").innerHTML = r.chapters.map((c, i) => `<button data-i="${i}"><i></i><span>${esc(c)}</span></button>`).join("");
    $$(".j-chip,.j-card").forEach((e) => e.remove());
    const frag = document.createDocumentFragment();
    CHIPS.forEach(([txt, cls]) => { const d = document.createElement("div"); d.className = `j j-chip ${cls}`; d.textContent = txt; frag.appendChild(d); });
    const cards = [];
    PROJECTS.forEach((p) => { (p.images || []).slice(0, p.phone ? 2 : 1).forEach((src) => cards.push([p, src])); });
    cards.slice(0, 22).forEach(([p, src]) => { const d = document.createElement("a"); d.className = `j j-card${p.phone ? " ph" : ""}`; d.href = `#project/${p.id}`; d.innerHTML = `<img src="${src}" alt="" loading="lazy"><span>${esc(p.name)}<small>${esc(t(p.industry))}</small></span>`; frag.appendChild(d); });
    world.appendChild(frag);
    layoutJourney();
  }
  function layoutJourney() {
    if (still) return;
    const W = stage.clientWidth, H = stage.clientHeight, mob = W < 760;
    const dx = mob ? 0 : W * 0.17, ix = mob ? 0 : -W * 0.2;
    J = [];
    const add = (el, x, y, z, extra = {}) => J.push({ el, x, y, z, ...extra });
    add($("#jIntro"), ix, mob ? -20 : 0, 0);
    demoItem = { el: $("#jDemo"), x: dx, y: mob ? 10 : 0, z: -1700, demo: 1, far: mob ? 1250 : 2300 }; J.push(demoItem);
    if (!mob) $("#jIntro").style.width = "min(560px,40vw)";
    let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    $$(".j-chip").forEach((el, i) => {
      let x, y; do { x = (rnd() - 0.5) * W * 1.5; y = (rnd() - 0.5) * H * 1.3; } while (Math.abs(x) < W * 0.22 && Math.abs(y) < H * 0.3);
      add(el, x, y, (mob ? -1000 : -350) - i * 330, { ry: (rnd() - 0.5) * 50, rx: (rnd() - 0.5) * 30 });
    });
    add($("#jProj"), 0, 0, -3300);
    const R = mob ? W * 0.62 : Math.min(W * 0.42, H * 0.62);
    $$(".j-card").forEach((el, i) => add(el, 0, 0, -3900 - i * 170, { th: i * 1.05, R: R * (1 + (i % 3) * 0.08), card: 1 }));
    const lastZ = 3900 + ($$(".j-card").length - 1) * 170;
    add($("#jEnd"), 0, 0, -(lastZ + 900));
    const endZ = lastZ + 900 - 170;
    K = [[0, 0, 0], [0.06, 260, 0], [0.16, 1540, -dx], [0.5, 1640, -dx], [0.6, 3300 - 260, 0], [0.64, 3420, 0], [0.88, endZ - 260, 0], [0.95, endZ, 0], [1, endZ + 30, 0]];
    tgt = progress(); cur = tgt; render();
  }
  function cam(p) {
    for (let i = 1; i < K.length; i++) if (p <= K[i][0]) { const a = K[i - 1], b = K[i], f = smooth((p - a[0]) / (b[0] - a[0])); return [a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f]; }
    return [K[K.length - 1][1], K[K.length - 1][2]];
  }
  const progress = () => { const r = film.getBoundingClientRect(); return clamp(-r.top / (film.offsetHeight - innerHeight)); };
  function render() {
    const [cz, cx] = cam(cur), spin = (cz - 3300) * 0.00032, sway = Math.sin(cur * 9) * 6;
    for (const it of J) {
      const d = it.z + cz;
      const far = it.far || 1300;
      let o = d > 0 ? 1 - d / 420 : d < -far ? 1 - (-far - d) / 700 : 1;
      o = clamp(o);
      it.el.style.opacity = o.toFixed(3);
      it.el.style.visibility = o <= 0.01 ? "hidden" : "visible";
      it.el.style.pointerEvents = o > 0.6 ? "auto" : "none";
      if (o <= 0.01) continue;
      let x = it.x, y = it.y, rot = `rotateY(${it.ry || 0}deg) rotateX(${it.rx || 0}deg)`;
      if (it.card) {
        const th = it.th + spin; x = Math.cos(th) * it.R * 1.25; y = Math.sin(th) * it.R * 0.78;
        rot = `rotateY(${-Math.cos(th) * 32}deg) rotateX(${Math.sin(th) * 22}deg)`;
      } else if (it.demo) {
        const arrive = seg(cur, 0.04, 0.16), leave = seg(cur, 0.5, 0.58);
        rot = `rotateY(${(1 - arrive) * -34 + leave * 26}deg) rotateX(${(1 - arrive) * 14}deg) rotateZ(${(1 - arrive) * -4}deg)`;
      }
      it.el.style.transform = `translate(-50%,-50%) translate3d(${(x + cx).toFixed(1)}px,${(y + sway).toFixed(1)}px,${d.toFixed(1)}px) ${rot}`;
    }
    paint(seg(cur, 0.16, 0.5) * 0.999);
    const ch = CH.reduce((a, v, i) => (cur >= v - 0.001 ? i : a), 0);
    $$("#jHud button").forEach((b, i) => b.classList.toggle("on", i === ch));
    stage.style.setProperty("--jp", cur.toFixed(4));
    $("#scrollhint").style.opacity = cur > 0.02 ? 0 : 1;
  }
  function tick() {
    cur += (tgt - cur) * 0.09;
    if (Math.abs(tgt - cur) < 0.0004) cur = tgt;
    render();
    raf = cur === tgt ? 0 : requestAnimationFrame(tick);
  }
  function filmScroll() { if (still) return; tgt = progress(); if (!raf) raf = requestAnimationFrame(tick); }
  $("#jHud").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; const p = [0, 0.3, 0.75, 1][+b.dataset.i]; scrollTo({ top: film.offsetTop + p * (film.offsetHeight - innerHeight), behavior: "smooth" }); });
  $("#hxSteps").addEventListener("click", (e) => { const li = e.target.closest("li"); if (!li || still) return; const p = 0.16 + (+li.dataset.i + 0.5) / 4 * 0.34; scrollTo({ top: film.offsetTop + p * (film.offsetHeight - innerHeight), behavior: "smooth" }); });
  $("#ctaWork").addEventListener("click", (e) => { if (still) return; e.preventDefault(); scrollTo({ top: film.offsetTop + 0.2 * (film.offsetHeight - innerHeight), behavior: "smooth" }); });
  function layoutFilm() { layoutJourney(); }
  addEventListener("resize", layoutFilm);
  addEventListener("scroll", filmScroll, { passive: true });
  if (still) paint(0.6);

  // magnetic primary buttons
  if (matchMedia("(hover: hover)").matches) document.addEventListener("pointermove", (e) => {
    const b = e.target.closest(".store.dark, .store.light, #cvbtn, .dock a");
    $$(".mag").forEach((m) => { if (m !== b) { m.style.transform = ""; m.classList.remove("mag"); } });
    if (!b || b.closest(".dock")) return;
    const r = b.getBoundingClientRect();
    b.classList.add("mag"); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.28}px)`;
  });

  renderStatic();
  onScroll();
  route();
})();
