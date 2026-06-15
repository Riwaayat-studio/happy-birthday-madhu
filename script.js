// 🎁 1. 3D GIFT UNWRAP & CHROMATIC BLAST CONSOLE
function unwrapGiftBox() {
    const boxWrap = document.querySelector('.box-3d-wrap');
    if (boxWrap.classList.contains('open-animation')) return;

    boxWrap.classList.add('open-animation');

    setTimeout(() => {
        document.getElementById('gift-vault-screen').style.display = 'none';
        const mainWorkspace = document.getElementById('main-content-vault');
        mainWorkspace.style.display = 'block';
        
        setTimeout(() => {
            mainWorkspace.style.opacity = '1';
            initScratchModule();
            // Fire Metallic Patina Burst Animation
            triggerBirthdayBlast();
        }, 50);

        const music = document.getElementById('bgMusic');
        if (music) {
            music.volume = 0.65;
            music.play().catch(e => console.log("Audio asset stream secured."));
        }
        
        initScrollSurveillance();
    }, 1200);
}

// 💥 2. AUTOMATIC PARTY FOIL STRIP BURST ENGINE (CONFETTI ENGINE)
function triggerBirthdayBlast() {
    const canvas = document.getElementById('blastCanvas');
    const ctx = canvas.getContext('2d');
    canvas.style.display = 'block';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const colors = ['#DB7093', '#FFD700', '#FF1493', '#FFF0F5', '#4A0E28'];

    for (let i = 0; i < 160; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: canvas.height + 25, 
            sizeWidth: Math.random() * 7 + 4,
            sizeHeight: Math.random() * 14 + 6,
            speedX: Math.random() * 12 - 6,
            speedY: -(Math.random() * 16 + 11),
            gravity: 0.38,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 12 - 6,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    function animateBlast() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let activeParticles = false;

        particles.forEach(p => {
            p.speedY += p.gravity; p.x += p.speedX; p.y += p.speedY; p.rotation += p.rotationSpeed;
            if (p.y <= canvas.height + 25) activeParticles = true;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.sizeWidth / 2, -p.sizeHeight / 2, p.sizeWidth, p.sizeHeight);
            ctx.restore();
        });

        if (activeParticles) {
            requestAnimationFrame(animateBlast);
        } else {
            canvas.style.display = 'none';
        }
    }
    animateBlast();
}

// 📸 3. INTERSECTION SURVEILLANCE AUTO FOCUS ENGINE
function initScrollSurveillance() {
    const cards = document.querySelectorAll('.auto-parallax');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
                entry.target.classList.add('active-center');
            } else {
                entry.target.classList.remove('active-center');
            }
        });
    }, {
        root: null,
        threshold: [0.1, 0.6, 0.9],
        rootMargin: "-25% 0px -25% 0px"
    });

    cards.forEach(card => scrollObserver.observe(card));
    window.addEventListener('scroll', crossfadeAudioSurveillance);
}

// 🎵 4. VIDEO CROSSFADE DUCK SYSTEM
function crossfadeAudioSurveillance() {
    const videoSection = document.getElementById('videoSectionNode');
    const bdayVideo = document.getElementById('vlogVideo');
    const bgMusic = document.getElementById('bgMusic');
    
    if (!videoSection || !bdayVideo || !bgMusic) return;

    const bounds = videoSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (bounds.top < viewportHeight * 0.6 && bounds.bottom > viewportHeight * 0.4) {
        if (bdayVideo.paused) {
            bdayVideo.play().catch(e => console.log("Video pipe wait."));
            bgMusic.volume = 0.12; // Lower music score volume sharply
            bdayVideo.volume = 0.95;
        }
    } else {
        if (!bdayVideo.paused) {
            bdayVideo.pause();
            bgMusic.volume = 0.65; // Restore normal background scale
        }
    }
}

// 🧮 5. BRUSHED LIQUID GOLD METALLIC CANVAS ENGINE
function initScratchModule() {
    const canvas = document.getElementById('scratchCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const box = canvas.getBoundingClientRect();
    canvas.width = box.width; canvas.height = box.height;

    // Base background layer gradient for gold texture depth loop
    let goldGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    goldGrad.addColorStop(0, '#B8860B');  // Dark Goldenrod
    goldGrad.addColorStop(0.3, '#FFD700'); // Shiny Gold
    goldGrad.addColorStop(0.5, '#FFF8DC'); // Cornsilk Highlight Reflection
    goldGrad.addColorStop(0.7, '#DAA520'); // Goldenrod
    goldGrad.addColorStop(1, '#9B7100');  // Deep Metallic Shadow

    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Injecting dynamic metallic fine dust grains to add brushed reflection noise
    for (let i = 0; i < 950; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)';
        ctx.fillRect(x, y, 1.5, 1.5);
    }

    // Clean Premium Font Action Overlay
    ctx.font = '900 11px Montserrat, sans-serif';
    ctx.fillStyle = '#0A0108'; // Dark charcoal high-contrast ink
    ctx.letterSpacing = '3px';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH WITH POINTER HERE', canvas.width / 2, canvas.height / 2 + 4);

    let isDrawing = false;

    function scratchAction(e) {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        const x = clientX - rect.left; const y = clientY - rect.top;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 26, 0, Math.PI * 2);
        ctx.fill();
    }

    canvas.addEventListener('mousedown', () => isDrawing = true);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mousemove', scratchAction);

    canvas.addEventListener('touchstart', () => isDrawing = true);
    canvas.addEventListener('touchend', () => isDrawing = false);
    canvas.addEventListener('touchmove', scratchAction);
            }

