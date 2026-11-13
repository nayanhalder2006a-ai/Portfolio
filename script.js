
document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* ==========================================
       1. GLOBAL SETTINGS
    ========================================== */

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const desktopPointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;


    /* ==========================================
       2. TYPED ROLE ANIMATION
    ========================================== */

    if (window.Typed && document.querySelector("#typed-role")) {

        new Typed("#typed-role", {
            strings: [
                "Cybersecurity Enthusiast",
                "Web Security Learner",
                "Ethical Hacking Learner",
                "Penetration Testing Learner"
            ],

            typeSpeed: 48,
            backSpeed: 25,
            backDelay: 1500,
            loop: true
        });
    }


    /* ==========================================
       3. AOS SCROLL ANIMATION
    ========================================== */

    if (window.AOS) {

        AOS.init({
            duration: 750,
            once: true,
            offset: 65,
            easing: "ease-out-cubic"
        });
    }


    /* ==========================================
       4. PARTICLES BACKGROUND
    ========================================== */

    if (
        window.particlesJS &&
        document.getElementById("particles-js") &&
        !reducedMotion
    ) {

        particlesJS("particles-js", {

            particles: {

                number: {
                    value: 42,
                    density: {
                        enable: true,
                        value_area: 900
                    }
                },

                color: {
                    value: ["#50ffd0", "#49cfff"]
                },

                shape: {
                    type: "circle"
                },

                opacity: {
                    value: 0.35,
                    random: true
                },

                size: {
                    value: 2,
                    random: true
                },

                line_linked: {
                    enable: true,
                    distance: 145,
                    color: "#50ffd0",
                    opacity: 0.13,
                    width: 1
                },

                move: {
                    enable: true,
                    speed: 1.1,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out"
                }
            },

            interactivity: {

                detect_on: "canvas",

                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },

                    onclick: {
                        enable: false
                    },

                    resize: true
                },

                modes: {
                    grab: {
                        distance: 130,
                        line_linked: {
                            opacity: 0.25
                        }
                    }
                }
            },

            retina_detect: true
        });
    }


    /* ==========================================
       5. CURRENT YEAR
    ========================================== */

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* ==========================================
       6. BACK TO TOP + ACTIVE NAVIGATION
    ========================================== */

    const backTop = document.getElementById("backToTop");

    function updateNavigation() {

        if (backTop) {
            backTop.classList.toggle(
                "show",
                window.scrollY > 450
            );
        }

        const sections = document.querySelectorAll(
            "main section[id]"
        );

        let current = "home";

        sections.forEach(section => {

            if (window.scrollY >= section.offsetTop - 160) {
                current = section.id;
            }
        });

        document.querySelectorAll(".nav-link").forEach(link => {

            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${current}`
            );
        });
    }

    window.addEventListener("scroll", updateNavigation, {
        passive: true
    });

    updateNavigation();

    if (backTop) {

        backTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: reducedMotion ? "instant" : "smooth"
            });
        });
    }


    /* ==========================================
       7. MOBILE NAVIGATION
    ========================================== */

    document.querySelectorAll(
        ".navbar-nav .nav-link, .nav-cta"
    ).forEach(link => {

        link.addEventListener("click", () => {

            const menu = document.getElementById("mainNav");

            if (
                menu &&
                menu.classList.contains("show") &&
                window.bootstrap
            ) {

                bootstrap.Collapse
                    .getOrCreateInstance(menu)
                    .hide();
            }
        });
    });


    /* ==========================================
       8. HERO 3D TILT EFFECT
    ========================================== */

    const scene = document.getElementById("tiltScene");

    if (scene && desktopPointer && !reducedMotion) {

        scene.addEventListener("mousemove", event => {

            const rect = scene.getBoundingClientRect();

            const x = (
                (event.clientX - rect.left) / rect.width
            ) - 0.5;

            const y = (
                (event.clientY - rect.top) / rect.height
            ) - 0.5;

            scene.style.transform = `
                rotateY(${x * 7}deg)
                rotateX(${-y * 7}deg)
            `;
        });

        scene.addEventListener("mouseleave", () => {
            scene.style.transform = "";
        });
    }


    /* ==========================================
       9. HOLOGRAM CURSOR
       HTML ID: hologram-cursor
    ========================================== */

    const hologramCursor = document.getElementById(
        "hologram-cursor"
    );

    if (hologramCursor && desktopPointer) {

        document.addEventListener("mousemove", event => {

            hologramCursor.style.left = event.clientX + "px";
            hologramCursor.style.top = event.clientY + "px";

            hologramCursor.classList.add("active");
        });

        document.addEventListener("mouseleave", () => {
            hologramCursor.classList.remove("active");
        });

        document.addEventListener("mouseenter", () => {
            hologramCursor.classList.add("active");
        });

        document.addEventListener("mouseover", event => {

            const target = event.target.closest(
                "a, button, input, textarea, select, .project-card"
            );

            hologramCursor.classList.toggle(
                "hover",
                Boolean(target)
            );
        });
    }


    /* ==========================================
       10. MATRIX BINARY RAIN
       Canvas ID: binary-rain
    ========================================== */

    (() => {

        const canvas = document.getElementById("binary-rain");

        if (!canvas || reducedMotion) return;

        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        let width = 0;
        let height = 0;
        let columns = 0;
        let drops = [];

        const fontSize = 15;
        const speed = 5.90;

        function resizeCanvas() {

            const dpr = Math.min(
                window.devicePixelRatio || 1,
                2
            );

            width = window.innerWidth;
            height = window.innerHeight;

            canvas.width = width * dpr;
            canvas.height = height * dpr;

            canvas.style.width = width + "px";
            canvas.style.height = height + "px";

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            columns = Math.ceil(width / fontSize);

            drops = Array.from(
                { length: columns },
                () => Math.random() * (height / fontSize)
            );
        }

        function drawBinaryRain() {

            ctx.fillStyle = "rgba(2, 6, 11, 0.09)";

            ctx.fillRect(
                0,
                0,
                width,
                height
            );

            ctx.font = `bold ${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {

                const binary = Math.random() > 0.80
                    ? "1"
                    : "0";

                const x = i * fontSize;
                const y = drops[i] * fontSize;

                ctx.fillStyle = Math.random() > 7.94
                    ? "#ffffff"
                    : "#00ffc3";

                ctx.shadowColor = "#00ffc3";
                ctx.shadowBlur = 12;

                ctx.fillText(binary, x, y);

                ctx.shadowBlur = 0;

                if (y > height && Math.random() > 0.975) {
                    drops[i] = 0;
                } else {
                    drops[i] += speed;
                }
            }
        }

        let animationId = null;
        let running = false;

        function animate() {

            if (!running) return;

            drawBinaryRain();

            animationId = requestAnimationFrame(animate);
        }

        function startAnimation() {

            if (running || document.hidden) return;

            running = true;
            animate();
        }

        function stopAnimation() {

            running = false;

            if (animationId !== null) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        }

        resizeCanvas();
        startAnimation();

        window.addEventListener("resize", resizeCanvas);

        document.addEventListener(
            "visibilitychange",
            () => {

                if (document.hidden) {
                    stopAnimation();
                } else {
                    startAnimation();
                }
            }
        );

    })();


    /* ==========================================
       11. ENERGY PORTAL PARTICLES
       Container ID: energyParticles
    ========================================== */

    const energyParticles = document.getElementById(
        "energyParticles"
    );

    if (energyParticles && !reducedMotion) {

        const fragment = document.createDocumentFragment();

        for (let i = 0; i < 25; i++) {

            const particle = document.createElement("span");

            particle.className = "energy-particle";

            particle.style.left = Math.random() * 100 + "%";
            particle.style.top = Math.random() * 100 + "%";

            particle.style.animationDelay =
                Math.random() * 6 + "s";

            particle.style.animationDuration =
                4 + Math.random() * 6 + "s";

            fragment.appendChild(particle);
        }

        energyParticles.appendChild(fragment);
    }


    /* ==========================================
       12. BACKGROUND MOUSE PARALLAX
    ========================================== */

    if (desktopPointer && !reducedMotion) {

        let pointerFrame = null;

        document.addEventListener("mousemove", event => {

            if (pointerFrame) return;

            pointerFrame = requestAnimationFrame(() => {

                const x = (
                    event.clientX / window.innerWidth - 0.5
                ) * 2;

                const y = (
                    event.clientY / window.innerHeight - 0.5
                ) * 2;

                document.documentElement.style.setProperty(
                    "--mouse-x",
                    x.toFixed(3)
                );

                document.documentElement.style.setProperty(
                    "--mouse-y",
                    y.toFixed(3)
                );

                pointerFrame = null;
            });
        });
    }


    /* ==========================================
       13. CYBER SYSTEM CLOCK
       IDs: cyberClock, cyberDate
    ========================================== */

    const cyberClock = document.getElementById("cyberClock");
    const cyberDate = document.getElementById("cyberDate");

    function updateCyberClock() {

        const now = new Date();

        if (cyberClock) {

            cyberClock.textContent = now.toLocaleTimeString(
                "en-GB",
                {
                    hour12: false
                }
            );
        }

        if (cyberDate) {

            cyberDate.textContent = now.toLocaleDateString(
                "en-GB",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );
        }
    }

    updateCyberClock();

    if (cyberClock || cyberDate) {
        setInterval(updateCyberClock, 1000);
    }


    /* ==========================================
       14. SIMULATED PACKET COUNTER
       ID: packetCount
    ========================================== */

    const packetCount = document.getElementById("packetCount");

    let packets = 8421;

    if (packetCount) {

        setInterval(() => {

            packets += Math.floor(Math.random() * 8) + 1;

            packetCount.textContent = String(
                packets
            ).padStart(6, "0");

        }, 1000);
    }


    /* ==========================================
       15. SIMULATED TERMINAL LOGS
       ID: terminalOutput
    ========================================== */

    const terminalOutput = document.getElementById(
        "terminalOutput"
    );

    if (terminalOutput) {

        const logs = [

            "[INFO] Initializing security modules...",
            "[OK] Firewall status: ACTIVE",
            "[INFO] Network monitoring initialized",
            "[OK] Encryption module ready",
            "[INFO] Checking system integrity...",
            "[OK] Authentication service ready",
            "[INFO] Monitoring network traffic...",
            "[OK] Security environment initialized"

        ];

        let logIndex = 0;

        setInterval(() => {

            const line = document.createElement("div");

            line.textContent = logs[logIndex];

            terminalOutput.appendChild(line);

            while (terminalOutput.children.length > 5) {

                terminalOutput.removeChild(
                    terminalOutput.firstElementChild
                );
            }

            logIndex = (logIndex + 1) % logs.length;

        }, 2200);
    }


    /* ==========================================
       16. EXTRA PANEL ANIMATION SUPPORT
    ========================================== */

    const extraPanels = document.querySelectorAll(
        ".extra-panel, .holo-panel"
    );

    if (desktopPointer && !reducedMotion) {

        extraPanels.forEach(panel => {

            panel.addEventListener("mouseenter", () => {
                panel.classList.add("panel-active");
            });

            panel.addEventListener("mouseleave", () => {
                panel.classList.remove("panel-active");
            });
        });
    }


    /* ==========================================
       17. INITIALIZATION MESSAGE
    ========================================== */

    console.log(
        "%c CYBER PORTFOLIO INITIALIZED ",
        "background:#020b0a;color:#00ffc3;padding:10px;font-weight:bold;"
    );

});
