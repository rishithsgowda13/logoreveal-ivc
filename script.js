gsap.registerPlugin(ScrollTrigger);

// Initialize main timeline
const mainTl = gsap.timeline({
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
        pin: ".scroll-container",
    }
});

// Phase 1: Countdown on Closed Curtains (0-40%)
const stageTl = gsap.timeline();
stageTl
    .to(".stage-section", { opacity: 1, duration: 0.1 })
    // Countdown
    .fromTo("#num-3", { opacity: 0, scale: 5, z: 500 }, {
        opacity: 1, scale: 1, z: 0, duration: 1,
        onComplete: () => createParticles(window.innerWidth / 2, window.innerHeight / 2)
    })
    .to("#num-3", { opacity: 0, scale: 0.5, z: -200, duration: 1 })
    .fromTo("#num-2", { opacity: 0, scale: 5, z: 500 }, {
        opacity: 1, scale: 1, z: 0, duration: 1,
        onComplete: () => createParticles(window.innerWidth / 2, window.innerHeight / 2)
    }, "-=0.5")
    .to("#num-2", { opacity: 0, scale: 0.5, z: -200, duration: 1 })
    .fromTo("#num-1", { opacity: 0, scale: 5, z: 500 }, {
        opacity: 1, scale: 1, z: 0, duration: 1,
        onComplete: () => createParticles(window.innerWidth / 2, window.innerHeight / 2)
    }, "-=0.5")
    .to("#num-1", { opacity: 0, scale: 0.5, z: -200, duration: 1 })

    // Phase 2: Open Curtains (40-70%)
    .to(".left-shutter", { xPercent: -100, duration: 2, ease: "power2.inOut" }, "+=0.5")
    .to(".right-shutter", { xPercent: 100, duration: 2, ease: "power2.inOut" }, "-=2")
    .to(".reveal-glow", { opacity: 0.6, duration: 1 }, "-=1")
    .to(".stage-section", { opacity: 0, duration: 1, display: "none" });

mainTl.add(stageTl, 0);

// Background Gears Animation
mainTl.to(".gear-1", { rotation: 1080, duration: 20, ease: "none" }, 0);
mainTl.to(".gear-2", { rotation: -720, duration: 20, ease: "none" }, 0);
mainTl.to(".gear-3", { rotation: 360, duration: 20, ease: "none" }, 0);

// Phase 3: Logo Assembly (60-80%)
const logoTl = gsap.timeline();
logoTl
    .to(".logo-section", { opacity: 1, duration: 0.1 })
    .from(".glass-container", { scale: 0, rotation: -45, opacity: 0, duration: 1.5, ease: "back.out(1.7)" })
    .from(".gear-frame", { rotation: 180, scale: 2, opacity: 0, duration: 1.5, ease: "power3.out" }, "-=1")
    .from(".brain", { x: -200, y: -200, rotationY: 90, opacity: 0, duration: 1, ease: "power2.out" }, "-=0.5")
    .from(".bulb", { y: -300, rotationX: 90, opacity: 0, duration: 1, ease: "power2.out" }, "-=0.7")
    .from(".wrench", { x: 200, y: 200, rotationZ: 45, opacity: 0, duration: 1, ease: "power2.out" }, "-=0.7")
    .to(".logo-icon", {
        filter: "drop-shadow(0 0 40px var(--accent))",
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut"
    });

mainTl.add(logoTl, 6);

// Letter splitting utility
document.querySelectorAll(".word").forEach(word => {
    const letters = word.textContent.split("");
    word.textContent = "";
    letters.forEach(letter => {
        const span = document.createElement("span");
        span.className = "letter";
        span.textContent = letter;
        word.appendChild(span);
    });
});

// Phase 4: Typography (80-100%)
const typoTl = gsap.timeline();
typoTl
    .to(".typography-section", { opacity: 1, duration: 0.1 })
    .from(".letter", {
        yPercent: 100,
        stagger: 0.05,
        duration: 1,
        ease: "power4.out"
    })
    .to(".tagline", { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.5")
    .to(".logo-viewport", { scale: 0.6, y: -100, duration: 2 }, "-=1");

mainTl.add(typoTl, 9);

// Spotlight Mouse Follow
document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    gsap.to(".spotlight", {
        background: `radial-gradient(circle at ${x}% ${y}%, transparent 10%, rgba(0,0,0,0.8) 70%)`,
        duration: 0.3
    });
});

// Particle Effect for Countdown (Simple version)
function createParticles(x, y) {
    for (let i = 0; i < 20; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        document.body.appendChild(p);

        const size = Math.random() * 5 + 2;
        gsap.set(p, {
            x: x,
            y: y,
            width: size,
            height: size,
            backgroundColor: Math.random() > 0.5 ? "var(--accent)" : "white",
            boxShadow: `0 0 10px var(--accent)`
        });

        gsap.to(p, {
            x: x + (Math.random() - 0.5) * 200,
            y: y + (Math.random() - 0.5) * 200,
            opacity: 0,
            duration: 1 + Math.random(),
            onComplete: () => p.remove()
        });
    }
}
