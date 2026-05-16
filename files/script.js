/* ============================================================
   MANPREET SARNA — PORTFOLIO SCRIPTS
   EDIT: RADII and SPEEDS to adjust the orbit
   ============================================================ */

/* ── CURSOR ── */
const cur = document.getElementById("cur");
const ring = document.getElementById("curRing");
let mx = window.innerWidth/2, my = window.innerHeight/2, rx = mx, ry = my;

document.addEventListener("mousemove", e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx+"px"; cur.style.top = my+"px";
});
(function loop(){
  rx+=(mx-rx)*.1; ry+=(my-ry)*.1;
  ring.style.left=rx+"px"; ring.style.top=ry+"px";
  requestAnimationFrame(loop);
})();

/* Only show dot cursor on links/buttons/pills — NOT on project rows */
document.querySelectorAll("a, button, .skill-pill").forEach(el=>{
  el.addEventListener("mouseenter",()=>cur.classList.add("hov"));
  el.addEventListener("mouseleave",()=>cur.classList.remove("hov"));
});

/* ── IMAGE CURSOR ON PROJECT ROWS ── */
let activeCursor = null;

document.querySelectorAll(".proj-row[data-cursor]").forEach(row => {
  const cursorEl = document.getElementById(row.dataset.cursor);
  if (!cursorEl) return;

  row.addEventListener("mousemove", e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx+"px"; cur.style.top = my+"px";
    cursorEl.style.left = mx + "px";
    cursorEl.style.top  = my + "px";
  });

  row.addEventListener("mouseenter", () => {
    /* Hide dot cursor completely on project rows */
    cur.style.opacity = "0";
    ring.style.opacity = "0";
    activeCursor = cursorEl;
    cursorEl.style.left = mx + "px";
    cursorEl.style.top  = my + "px";
    requestAnimationFrame(() => cursorEl.classList.add("visible"));
  });

  row.addEventListener("mouseleave", () => {
    /* Restore dot cursor */
    cur.style.opacity = "1";
    ring.style.opacity = "1";
    cursorEl.classList.remove("visible");
    activeCursor = null;
  });
});

/* ── PLANETARY ORBIT ──
   EDIT: RADII = distance from center per ring (px)
   EDIT: SPEEDS = degrees per frame (negative = counter-clockwise)
*/
const RADII = { r1:50, r2:90, r3:130, r4:165 };
const SPEEDS = { r1:0.3, r2:-0.18, r3:0.12, r4:-0.08 };
const angles = { r1:0, r2:0, r3:0, r4:0 };
let orbitPaused = false;

function animOrbits(){
  if(!orbitPaused){
    angles.r1 += SPEEDS.r1; angles.r2 += SPEEDS.r2;
    angles.r3 += SPEEDS.r3; angles.r4 += SPEEDS.r4;
  }
  document.querySelectorAll(".skill-pill").forEach(pill=>{
    const r = pill.dataset.ring;
    const base = parseFloat(pill.dataset.angle);
    const total = base + angles[r];
    const rad = total * Math.PI / 180;
    const radius = RADII[r];
    const x = Math.cos(rad) * radius;
    const y = Math.sin(rad) * radius;
    pill.style.left = "50%";
    pill.style.top = "50%";
    pill.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
  });
  requestAnimationFrame(animOrbits);
}
document.querySelectorAll(".skill-pill").forEach(p=>{
  p.addEventListener("mouseenter",()=>{ orbitPaused=true; });
  p.addEventListener("mouseleave",()=>{ orbitPaused=false; });
});
animOrbits();

/* ── NAV ── */
window.addEventListener("scroll",()=>{
  document.getElementById("nav").classList.toggle("scrolled", window.scrollY > 60);
});

/* ── SCROLL REVEAL ── */
const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add("in"); });
},{ threshold:0.06 });
document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));

/* ── MAGNETIC BUTTONS ── */
["mb1","mb2","mb3"].forEach(id=>{
  const el = document.getElementById(id);
  if(!el) return;
  el.addEventListener("mousemove",e=>{
    const r = el.getBoundingClientRect();
    const dx = e.clientX-(r.left+r.width/2);
    const dy = e.clientY-(r.top+r.height/2);
    el.style.transform = `translate(${dx*.3}px,${dy*.3}px)`;
  });
  el.addEventListener("mouseleave",()=>{ el.style.transform=""; });
});