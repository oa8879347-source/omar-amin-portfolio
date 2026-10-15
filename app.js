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
  };
  const badges = (a) => `${a.ios ? `<a class="badge" href="${a.ios}" target="_blank" rel="noopener">${ICON.apple}${U().m.ios}</a>` : ""}${a.android ? `<a class="badge" href="${a.android}" target="_blank" rel="noopener">${ICON.play}${U().m.android}</a>` : ""}`;
  const appIcon = (a, cls = "ic") => a.icon ? `<img class="${cls}" src="${a.icon}" alt="${esc(a.name)} icon" loading="lazy">` : `<span class="${cls}">RB</span>`;
  const liveApps = () => PROJECTS.flatMap((p) => (p.apps || []).map((a) => ({ ...a, pid: p.id, org: p.org })));

  function renderStatic() {
    const u = U();
    root.lang = lang; root.dir = u.dir;
    document.title = lang === "ar" ? "عمر أحمد أمين — مدير تقني ومهندس برمجيات أول" : "Omar Ahmed Amin — CTO & Senior Software Engineer";
    const ids = ["work", "process", "experience", "skills", "contact"];
    $("#navlinks").innerHTML = u.nav.map((n, i) => `<a href="#${i === 0 ? "live" : ids[i]}">${n}</a>`).join("");
    $("#lang").textContent = u.other;
    $("#cvbtn").textContent = u.cv; $("#cv2").textContent = u.cv;
    ["eyebrow", "h1", "lead", "based", "liveTitle", "liveSub", "procTitle", "procSub", "workTitle", "workSub", "expTitle", "skillsTitle", "archTitle", "archSub", "contactTitle", "contactSub", "footer"].forEach((k) => { const el = $("#" + k); if (el) el.textContent = u[k]; });
    $("#ctaWork").textContent = u.ctaWork;
    $("#ctaMail").innerHTML = ICON.mail + esc(u.ctaMail); $("#ctaMail").href = `mailto:${PROFILE.email}`;
    $("#mail2").innerHTML = ICON.mail + esc(u.ctaMail); $("#mail2").href = `mailto:${PROFILE.email}`;
    $("#ctaLi").href = PROFILE.linkedin;
    $("#contactline").innerHTML = `${esc(PROFILE.email)} &nbsp;·&nbsp; <span dir="ltr">${esc(PROFILE.phone)}</span>`;
    $("#yr").textContent = new Date().getFullYear();

    const name = t(PROFILE.name);
    let n = 0;
    $("#wordmark").innerHTML = name.split(" ").map((w) => lang === "ar"
      ? `<span class="w" style="animation-delay:${0.15 + n++ * 0.18}s">${esc(w)}</span>`
      : `<span class="w">${[...w].map((c) => `<span style="animation-delay:${0.15 + n++ * 0.045}s">${esc(c)}</span>`).join("")}</span>`).join(" ");

    $("#stats").innerHTML = PROFILE.stats.map((s) => `<div class="stat reveal"><b data-to="${s.value}" data-suf="${s.suffix}">0${s.suffix}</b><span>${esc(s[lang])}</span></div>`).join("");

    const apps = liveApps();
    const pos = [[-6, 8, -8], [84, 2, 10], [92, 38, -6], [-12, 46, 12], [80, 74, 8], [4, 82, -10], [40, -6, 6]];
    $("#floaters").innerHTML = apps.filter((a) => a.icon).slice(0, 7).map((a, i) => `<img src="${a.icon}" alt="" style="left:${pos[i][0]}%;top:${pos[i][1]}%;--rot:${pos[i][2]}deg;animation-delay:${-i * 0.9}s">`).join("");
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
    $("#filters").innerHTML = f.map(([k, v]) => `<button class="chip${k === filter ? " on" : ""}" data-f="${k}">${v} <small>${k === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.status === k).length}</small></button>`).join("");
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
          <div class="tags"><span>${t(p.deliv).length} ${u.products}</span>${p.stack.slice(0, 3).map((s) => `<span>${esc(s)}</span>`).join("")}</div>
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
        <div class="box"><h4>${m.scope} · ${t(p.deliv).length} ${u.products}</h4><div class="deliv">${t(p.deliv).map((d) => `<span>${esc(d)}</span>`).join("")}</div><h4>${m.stack}</h4><div class="tags">${p.stack.map((s) => `<span>${esc(s)}</span>`).join("")}</div></div>
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

  renderStatic();
  onScroll();
  route();
})();
