gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════
   MASTER TIMELINE – scrubbed by scroll
   ═══════════════════════════════════════════════ */
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#spacer",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
    }
});

/* ─── Phase 1 : Countdown 3 → 2 → 1  (scroll 0–30%) ─── */

// 3 is already visible via .active class
// Fade out 3
tl.to("#num3", { opacity: 0, scale: 2.5, duration: 1 })

    // Fade in 2, hold, fade out
    .to("#num2", { opacity: 1, scale: 1, duration: 0.5 })
    .to("#num2", { opacity: 0, scale: 2.5, duration: 1 }, "+=0.3")

    // Fade in 1, hold, fade out
    .to("#num1", { opacity: 1, scale: 1, duration: 0.5 })
    .to("#num1", { opacity: 0, scale: 2.5, duration: 1 }, "+=0.3");


/* ─── Phase 2 : Curtains Open  (scroll 30–55%) ─── */
tl.to("#left-curtain", { xPercent: -100, duration: 2, ease: "power2.inOut" })
    .to("#right-curtain", { xPercent: 100, duration: 2, ease: "power2.inOut" }, "<")
    .to("#curtain-edge", { opacity: 0, duration: 1 }, "<")
    .to("#countdown", { opacity: 0, duration: 0.5 }, "<")
    .to("#scroll-hint", { opacity: 0, duration: 0.5 }, "<");


/* ─── Phase 3 : Logo Assembly  (scroll 55–80%) ─── */
tl.to("#logo-area", { opacity: 1, scale: 1, duration: 1 })
    .to(".gear-img", { opacity: 1, rotate: 0, duration: 1.2, ease: "back.out(1.4)" }, "-=0.5")
    .to(".brain-img", { opacity: 1, duration: 0.6 }, "-=0.4")
    .to(".bulb-img", { opacity: 1, duration: 0.6 }, "-=0.3")
    .to(".wrench-img", { opacity: 1, duration: 0.6 }, "-=0.3");


/* ─── Phase 4 : Typography  (scroll 80–100%) ─── */
tl.to("#title-area", { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" })
    .to("#logo-area", { y: -60, scale: 0.8, duration: 1.5 }, "<");
