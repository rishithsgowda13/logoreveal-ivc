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

/* ─── Phase 1 : Countdown 3 → 2 → 1  (scroll 0–25%) ─── */

// 3 is already visible via .active class
// Fade out 3
tl.to("#num3", { opacity: 0, scale: 2.5, duration: 1 })

    // Fade in 2, hold, fade out
    .to("#num2", { opacity: 1, scale: 1, duration: 0.5 })
    .to("#num2", { opacity: 0, scale: 2.5, duration: 1 }, "+=0.3")

    // Fade in 1, hold, fade out
    .to("#num1", { opacity: 1, scale: 1, duration: 0.5 })
    .to("#num1", { opacity: 0, scale: 2.5, duration: 1 }, "+=0.3");


/* ─── Phase 2 : Curtains Open  (scroll 25–45%) ─── */
tl.to("#left-curtain", { xPercent: -100, duration: 2.5, ease: "power3.inOut" })
    .to("#right-curtain", { xPercent: 100, duration: 2.5, ease: "power3.inOut" }, "<")
    .to("#countdown", { opacity: 0, duration: 0.5 }, "<");


/* ─── Phase 3 : Logo pops up BLURRED  (scroll 45–55%) ─── */
tl.to("#logo-area", { opacity: 1, scale: 1, duration: 1.5 });
// Logo is visible but still blurred (blur:20px from CSS)


/* ─── Phase 4 : Logo UNBLURS  (scroll 55–75%) ─── */
tl.to("#logo-area", { filter: "blur(0px)", duration: 3, ease: "power2.out" });


/* ─── Phase 5 : Typography  (scroll 75–100%) ─── */
tl.to("#logo-area", { y: -80, scale: 0.75, duration: 2 })
    .to("#title-area", { opacity: 1, y: 0, duration: 2, ease: "power2.out" }, "<");
