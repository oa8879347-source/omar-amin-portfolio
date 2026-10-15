(() => {
  const P = window.PROFILE, $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  $("#yr").textContent = new Date().getFullYear();
  ["#mail", "#mail2"].forEach((s) => ($(s).href = `mailto:${P.email}`));
  $("#li").href = P.linkedin;
  $("#contactline").innerHTML = `${esc(P.email)} &nbsp;·&nbsp; ${esc(P.phone)} &nbsp;·&nbsp; ${esc(P.location)}`;

  // typed roles
  let ri = 0, ci = 0, del = false;
  const typed = $("#typed");
  (function tick() {
    const w = P.roles[ri];
    typed.textContent = w.slice(0, ci);
    if (!del && ci === w.length) { del = true; return setTimeout(tick, 1600); }
    if (del && ci === 0) { del = false; ri = (ri + 1) % P.roles.length; }
    ci += del ? -1 : 1;
    setTimeout(tick, del ? 35 : 70);
  })();

  $("#stats").innerHTML = P.stats.map((s) => `<div class="stat"><b data-to="${s.value}" data-suf="${s.suffix}">0</b><span>${esc(s.label)}</span></div>`).join("");

  const names = PROJECTS.map((p) => p.name).concat(EARLIER.slice(0, 12).map((e) => e[0]));
  $("#marquee").innerHTML = names.concat(names).map((n) => `<span>${esc(n)}</span>`).join("");

  // project cards
  const industries = ["All", "Live", "Delivered", "In development"];
  $("#filters").innerHTML = industries.map((f, i) => `<button class="chip${i ? "" : " on"}" data-f="${f}">${f}</button>`).join("");
  const thumb = (p) => {
    if (p.phone && p.images.length) return `<div class="thumb phones">${p.images.slice(0, 3).map((i) => `<img src="${i}" alt="${esc(p.name)} screen" loading="lazy">`).join("")}</div>`;
    if (p.images.length) return `<div class="thumb"><img class="shot" src="${p.images[0]}" alt="${esc(p.name)} screenshot" loading="lazy"></div>`;
    if (p.logo) return `<div class="thumb"><img class="logo" src="${p.logo}" alt="${esc(p.name)} logo" loading="lazy"></div>`;
    return `<div class="thumb"><span class="initials">${p.initials}</span></div>`;
  };
  const renderCards = (f) => {
    $("#cards").innerHTML = PROJECTS.filter((p) => f === "All" || p.status === f).map((p) => `
      <article class="card reveal" data-id="${p.id}" tabindex="0">
        ${thumb(p).replace('<div class="thumb', `<div class="thumb`)}
        <span class="status ${p.status.split(" ")[0]}">${p.status}</span>
        <div class="body">
          <div class="meta">${esc(p.industry)} · ${esc(p.org)}</div>
          <h3>${esc(p.name)}</h3>
          <p>${esc(p.summary)}</p>
          <div class="tags">${p.deliverables.length} products · ${p.stack.slice(0, 3).map((t) => `<span>${esc(t)}</span>`).join("")}</div>
          <span class="more">View project &rarr;</span>
        </div>
      </article>`).join("");
    observe();
    tilt();
  };
  $("#filters").addEventListener("click", (e) => {
    const b = e.target.closest(".chip"); if (!b) return;
    document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("on", c === b));
    renderCards(b.dataset.f);
  });
  $("#cards").addEventListener("click", (e) => { const c = e.target.closest(".card"); if (c) location.hash = `project/${c.dataset.id}`; });
  $("#cards").addEventListener("keydown", (e) => { const c = e.target.closest(".card"); if (c && e.key === "Enter") location.hash = `project/${c.dataset.id}`; });

  $("#timeline").innerHTML = EXPERIENCE.map((j) => `
    <div class="job reveal">
      <div class="top"><div><h3>${esc(j.role)}</h3><div class="org">${j.link ? `<a href="${j.link}" target="_blank" rel="noopener">${esc(j.org)} &#8599;</a>` : esc(j.org)} · <span class="muted">${esc(j.place)}</span></div></div><div class="date">${esc(j.date)}</div></div>
      <ul>${j.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
    </div>`).join("");

  $("#skillgrid").innerHTML = SKILLS.map((g) => `<div class="skill reveal"><h3>${esc(g.group)}</h3><div>${g.items.map((i) => `<span>${esc(i)}</span>`).join("")}</div></div>`).join("");
  $("#archive").innerHTML = EARLIER.map(([n, t, d]) => `<div class="arc reveal"><small>${esc(t)}</small><b>${esc(n)}</b><p>${esc(d)}</p></div>`).join("");

  // project detail (deep link: #project/<id>)
  const modal = $("#modal"), body = $("#m-body");
  const openProject = (id) => {
    const p = PROJECTS.find((x) => x.id === id); if (!p) return;
    const head = p.logo ? `<img src="${p.logo}" alt="">` : `<div class="init">${p.initials}</div>`;
    body.innerHTML = `
      <div class="m-head">${head}<div><div class="eyebrow" style="margin:0">${esc(p.industry)} · ${esc(p.org)} · ${p.markets.map(esc).join(", ")}</div><h2 id="m-title">${esc(p.name)}</h2></div></div>
      <p class="lead" style="max-width:none">${esc(p.summary)}</p>
      ${p.images.length ? `<div class="gallery ${p.phone ? "phones" : ""}">${p.images.map((i) => `<img src="${i}" alt="${esc(p.name)} screenshot">`).join("")}</div>` : `<div class="box" style="margin:20px 0"><p class="muted">Screenshots are under NDA or the product is still in private development. Live demo available on request.</p></div>`}
      <div class="pcs"><div><h4>The problem</h4><p>${esc(p.problem)}</p></div><div><h4>What we built</h4><p>${esc(p.built)}</p></div><div><h4>Outcome</h4><p>${esc(p.outcome)}</p></div></div>
      <div class="two">
        <div class="box"><h4>My role</h4><p style="color:#cfe0ff;margin-bottom:10px">${esc(p.role)}</p><ul>${p.responsibilities.map((r) => `<li>${esc(r)}</li>`).join("")}</ul></div>
        <div class="box"><h4>Scope & effort: ${p.deliverables.length} software products</h4><div class="deliv">${p.deliverables.map((d) => `<span>${esc(d)}</span>`).join("")}</div>
          <h4 style="margin-top:18px">Stack</h4><div class="tags">${p.stack.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
          <h4 style="margin-top:18px">Status</h4><span class="status ${p.status.split(" ")[0]}" style="position:static">${p.status}</span></div>
      </div>
      <div class="links">${p.links.map((l) => `<a class="btn" href="${l.url}" target="_blank" rel="noopener">${esc(l.label)} &#8599;</a>`).join("")}<button class="btn ghost" id="share">Copy project link</button></div>`;
    modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden";
    $("#share").onclick = (e) => { navigator.clipboard?.writeText(location.href); e.target.innerHTML = "Link copied &#10003;"; };
  };
  const closeProject = () => { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; };
  const route = () => { const m = location.hash.match(/^#project\/(.+)$/); m ? openProject(m[1]) : closeProject(); };
  window.addEventListener("hashchange", route);
  $("#close").onclick = () => history.pushState("", "", location.pathname + "#work") || closeProject();
  modal.addEventListener("click", (e) => { if (e.target === modal) $("#close").click(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { $("#lightbox").classList.remove("open"); if (modal.classList.contains("open")) $("#close").click(); } });
  body.addEventListener("click", (e) => { if (e.target.matches(".gallery img")) { $("#lightbox img").src = e.target.src; $("#lightbox").classList.add("open"); } });
  $("#lightbox").onclick = () => $("#lightbox").classList.remove("open");

  // scroll effects
  let io;
  function observe() {
    io = io || new IntersectionObserver((es) => es.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("in");
      en.target.querySelectorAll?.("[data-to]").forEach(count);
      io.unobserve(en.target);
    }), { threshold: 0.12 });
    document.querySelectorAll(".reveal:not(.in)").forEach((el, i) => { el.style.transitionDelay = `${(i % 6) * 60}ms`; io.observe(el); });
  }
  function count(el) {
    const to = +el.dataset.to, suf = el.dataset.suf, t0 = performance.now();
    const step = (t) => { const k = Math.min((t - t0) / 1400, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + suf; if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }
  function tilt() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(hover: none)").matches) return;
    document.querySelectorAll(".card").forEach((c) => {
      c.onmousemove = (e) => { const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; c.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 6}deg) translateY(-4px)`; };
      c.onmouseleave = () => (c.style.transform = "");
    });
  }
  const bar = $("#progress"), nav = $("#nav");
  addEventListener("scroll", () => {
    const h = document.documentElement; bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
    nav.classList.toggle("scrolled", h.scrollTop > 10);
  }, { passive: true });

  renderCards("All");
  observe();
  route();
})();
