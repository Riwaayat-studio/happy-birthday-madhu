// 🎁 1. GIFT BOX VAULT TRIGGER & INITIAL BLAST
function unwrapGiftBox() {
    const boxWrap = document.querySelector('.box-3d-wrap');
    if (boxWrap.classList.contains('open-animation')) return;

    boxWrap.classList.add('open-animation');

    setTimeout(() => {
        // Hiding unwrap matrix gate screen
        document.getElementById('gift-vault-screen').style.display = 'none';
        const mainWorkspace = document.getElementById('main-content-vault');
        mainWorkspace.style.display = 'block';
        
        setTimeout(() => {
            mainWorkspace.style.opacity = '1';
            initScratchModule();
            // Fire Paper Sprinkle Blast Eruption
            triggerBirthdayBlast();
        }, 50);

        // Core background score track play trigger
        const music = document.getElementById('bgMusic');
        if (music) {
            music.volume = 0.7; // Global background balance scale
            music.play().catch(e => console.log("Audio waiting engine handshake."));
        }
        
        // Attaching active viewport auto parallax system trackers
        initScrollSurveillance();
    }, 1000);
}

// 💥 2. AUTOMATIC LUXURY PAPER SPRINKLE BLAST (CONFETTI ENGINE)
function triggerBirthdayBlast() {
    const canvas = document.getElementById('blastCanvas');
    const ctx = canvas.getContext('2d');
    canvas.style.display = 'block';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const colors = ['#DB7093', '#FFD700', '#FF69B4', '#FFF0F5', '#8B008B'];

    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: canvas.height + 20, 
            sizeWidth: Math.random() * 8 + 4,
            sizeHeight: Math.random() * 12 + 6,
            speedX: Math.random() * 10 - 5,
            speedY: -(Math.random() * 15 + 10),
            gravity: 0.35,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    function animateBlast() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let activeParticles = false;

        particles.forEach(p => {
            p.speedY += p.gravity; p.x += p.speedX; p.y += p.speedY; p.rotation += p.rotationSpeed;
            if (p.y <= canvas.height + 20) activeParticles = true;

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

// 📸 3. INTERSECTION SURVEILLANCE AUTO FOCUS ENGINE (No click needed)
function initScrollSurveillance() {
    const cards = document.querySelectorAll('.auto-parallax');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Highlights cards automatically when passing through mid screen center focus
            if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
                entry.target.classList.add('active-center');
            } else {
                entry.target.classList.remove('active-center');
            }
        });
    }, {
        root: null,
        threshold: [0.1, 0.6, 0.9],
        rootMargin: "-20% 0px -20% 0px"
    });

    cards.forEach(card => scrollObserver.observe(card));
    
    // Attaching real time crossfade loops
    window.addEventListener('scroll', crossfadeAudioSurveillance);
}

// 🎵 4. AUDIO DUCK MANAGEMENT PIPELINE
function crossfadeAudioSurveillance() {
    const videoSection = document.getElementById('videoSectionNode');
    const bdayVideo = document.getElementById('vlogVideo');
    const bgMusic = document.getElementById('bgMusic');
    
    if (!videoSection || !bdayVideo || !bgMusic) return;

    const bounds = videoSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Checks if secret floor footage occupies the critical viewing area
    if (bounds.top < viewportHeight * 0.6 && bounds.bottom > viewportHeight * 0.4) {
        if (bdayVideo.paused) {
            bdayVideo.play().catch(e => console.log("Video track pipeline idle."));
            // Automatically duck tracking music audio profile down smoothly
            bgMusic.volume = 0.15;
            bdayVideo.volume = 0.95;
        }
    } else {
        if (!bdayVideo.paused) {
            bdayVideo.pause();
            // Restore native background scale metrics
            bgMusic.volume = 0.7;
        }
    }
}

// 🧮 5. HIGH END METALLIC SCRATCH CARD CANVAS
function initScratchModule() {
    const canvas = document.getElementById('scratchCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const box = canvas.getBoundingClientRect();
    canvas.width = box.width; canvas.height = box.height;

    // Solid dark pink coat layout overlay masking
    ctx.fillStyle = '#300516';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Adding noise grit sand dust points over top coat for textured leather mask look
    for (let i = 0; i < 800; i++) {
        let x = Math.random() * canvas.width; let y = Math.random() * canvas.height;
        ctx.fillStyle = 'rgba(219, 112, 147, 0.08)';
        ctx.fillRect(x, y, 2, 2);
    }

    ctx.font = 'bold 13px Raleway, sans-serif';
    ctx.fillStyle = '#FFD700';
    ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 4;
    ctx.textAlign = 'center';
    ctx.fillText('⚡ SCRATCH WITH POINTER HERE ⚡', canvas.width / 2, canvas.height / 2 + 4);
    ctx.shadowBlur = 0; // tracking reset

    let isDrawing = false;

    function scratchAction(e) {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        const x = clientX - rect.left; const y = clientY - rect.top;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 28, 0, Math.PI * 2);
        ctx.fill();
    }

    canvas.addEventListener('mousedown', () => isDrawing = true);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mousemove', scratchAction);

    canvas.addEventListener('touchstart', () => isDrawing = true);
    canvas.addEventListener('touchend', () => isDrawing = false);
    canvas.addEventListener('touchmove', scratchAction);
            }
