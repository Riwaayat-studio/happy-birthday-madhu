// ═══ GLOBALS & THREE.JS ENGINE CORE INITIALIZATION ═══
let scene, camera, renderer, giftBoxGroup, boxLidMesh;
let isUnwrappingActive = false;

function initReal3DModelEngine() {
    const canvas3D = document.getElementById('three-gift-canvas');
    if (!canvas3D) return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 6;

    renderer = new THREE.WebGLRenderer({ canvas: canvas3D, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvas3D.clientWidth, canvas3D.clientHeight);
    renderer.setClearColor(0x000000, 0); 

    // Light Shadows Environment Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85); 
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffd700, 1.5, 50); 
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pinkLight = new THREE.PointLight(0xdb7093, 1.5, 30); 
    pinkLight.position.set(-5, -3, 3);
    scene.add(pinkLight);

    giftBoxGroup = new THREE.Group();

    // Solid Materials handling light pipeline flawlessly
    const velvetMaterial = new THREE.MeshLambertMaterial({ color: 0x4a0e28 }); 
    const ribbonMaterial = new THREE.MeshLambertMaterial({ color: 0xffd700 });  

    // Build Box Base Body Mesh (3D Cube Object)
    const bodyGeom = new THREE.BoxGeometry(2, 1.5, 2);
    const boxBodyMesh = new THREE.Mesh(bodyGeom, velvetMaterial);
    boxBodyMesh.position.y = -0.3;
    giftBoxGroup.add(boxBodyMesh);

    // Build Box Lid Mesh (3D Cap)
    const lidGeom = new THREE.BoxGeometry(2.1, 0.4, 2.1);
    boxLidMesh = new THREE.Mesh(lidGeom, new THREE.MeshLambertMaterial({ color: 0x5c1333 }));
    boxLidMesh.position.y = 0.55;
    giftBoxGroup.add(boxLidMesh);

    // Vertical Ribbon Matrix
    const ribbonVGeom = new THREE.BoxGeometry(0.25, 1.55, 2.02);
    const ribbonVMesh = new THREE.Mesh(ribbonVGeom, ribbonMaterial);
    ribbonVMesh.position.y = -0.3;
    giftBoxGroup.add(ribbonVMesh);

    // Horizontal Ribbon Matrix
    const ribbonHGeom = new THREE.BoxGeometry(2.02, 1.55, 0.25);
    const ribbonHWithLid = new THREE.Mesh(ribbonHGeom, ribbonMaterial);
    ribbonHWithLid.position.y = -0.3;
    giftBoxGroup.add(ribbonHWithLid);

    scene.add(giftBoxGroup);

    // Real Animation Render Frame Loop
    let floatClock = 0;
    function render3DFrameLoop() {
        requestAnimationFrame(render3DFrameLoop);

        if (!isUnwrappingActive) {
            floatClock += 0.02;
            giftBoxGroup.rotation.y += 0.012; 
            giftBoxGroup.rotation.x = Math.sin(floatClock) * 0.1; 
            giftBoxGroup.position.y = Math.sin(floatClock * 1.5) * 0.12; 
        } else {
            // Mechanical 3D Fly-apart Lid Release (Fixed the scale calculation crash)
            if (boxLidMesh.position.y < 5) {
                boxLidMesh.position.y += 0.12; 
                boxLidMesh.rotation.x += 0.07;  
                if(giftBoxGroup.scale.x > 0.05) {
                    giftBoxGroup.scale.x -= 0.04;
                    giftBoxGroup.scale.y -= 0.04;
                    giftBoxGroup.scale.z -= 0.04;
                }
            }
        }
        renderer.render(scene, camera);
    }
    render3DFrameLoop();

    // Touch/Click Listener Attached directly to the gateway viewport wrapper
    document.getElementById('gift-vault-screen').addEventListener('click', unwrapGiftBox);
    document.getElementById('gift-vault-screen').addEventListener('touchstart', function(e) {
        unwrapGiftBox();
        e.preventDefault();
    }, { passive: false });

    window.addEventListener('resize', () => {
        if (!renderer) return;
        renderer.setSize(canvas3D.clientWidth, canvas3D.clientHeight);
    });
}

window.addEventListener('DOMContentLoaded', initReal3DModelEngine);

// 🎁 2. REAL 3D OPEN TRANSITION CORE
function unwrapGiftBox() {
    if (isUnwrappingActive) return;
    isUnwrappingActive = true; 

    setTimeout(() => {
        document.getElementById('gift-vault-screen').style.display = 'none';
        const mainWorkspace = document.getElementById('main-content-vault');
        mainWorkspace.style.display = 'block';
        
        setTimeout(() => {
            mainWorkspace.style.opacity = '1';
            initScratchModule();
            triggerBirthdayBlast(); 
        }, 50);

        const music = document.getElementById('bgMusic');
        if (music) { music.volume = 0.65; music.play().catch(e => console.log("Audio pipeline connected.")); }
        initScrollSurveillance();
    }, 900);
}

// 💥 3. AUTOMATIC CHROMATIC METALLIC BURST ENGINE (CONFETTI ENGINE)
function triggerBirthdayBlast() {
    const canvas = document.getElementById('blastCanvas');
    const ctx = canvas.getContext('2d');
    canvas.style.display = 'block';
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;

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

            ctx.save(); ctx.translate(p.x, p.y); ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color; ctx.fillRect(-p.sizeWidth / 2, -p.sizeHeight / 2, p.sizeWidth, p.sizeHeight);
            ctx.restore();
        });

        if (activeParticles) { requestAnimationFrame(animateBlast); } else { canvas.style.display = 'none'; }
    }
    animateBlast();
}

// 📸 4. INTERSECTION SURVEILLANCE AUTO FOCUS ENGINE
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
        root: null, threshold: [0.1, 0.6, 0.9], rootMargin: "-25% 0px -25% 0px"
    });

    cards.forEach(card => scrollObserver.observe(card));
    window.addEventListener('scroll', crossfadeAudioSurveillance);
}

// 🎵 5. video AUDIO DUCK ENGINE
function crossfadeAudioSurveillance() {
    const videoSection = document.getElementById('videoSectionNode');
    const bdayVideo = document.getElementById('vlogVideo');
    const bgMusic = document.getElementById('bgMusic');
    
    if (!videoSection || !bdayVideo || !bgMusic) return;

    const bounds = videoSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (bounds.top < viewportHeight * 0.6 && bounds.bottom > viewportHeight * 0.4) {
        if (bdayVideo.paused) {
            bdayVideo.play().catch(e => console.log("Video active."));
            bgMusic.volume = 0.12; 
            bdayVideo.volume = 0.95;
        }
    } else {
        if (!bdayVideo.paused) {
            bdayVideo.pause();
            bgMusic.volume = 0.65; 
        }
    }
}

// 🧮 6. BRUSHED METAL SCRATCH SURFACE GENERATOR (Cinzel High Contrast Ink)
function initScratchModule() {
    const canvas = document.getElementById('scratchCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const box = canvas.getBoundingClientRect();
    canvas.width = box.width; canvas.height = box.height;

    let goldGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    goldGrad.addColorStop(0, '#B8860B');  
    goldGrad.addColorStop(0.3, '#FFD700'); 
    goldGrad.addColorStop(0.5, '#FFF8DC'); 
    goldGrad.addColorStop(0.7, '#DAA520'); 
    goldGrad.addColorStop(1, '#9B7100');  

    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < 950; i++) {
        let x = Math.random() * canvas.width; let y = Math.random() * canvas.height;
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)';
        ctx.fillRect(x, y, 1.5, 1.5);
    }

    ctx.font = '900 12px Cinzel, serif';
    ctx.fillStyle = '#0A0108'; 
    ctx.letterSpacing = '4px';
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
        ctx.beginPath(); ctx.arc(x, y, 26, 0, Math.PI * 2); ctx.fill();
    }

    canvas.addEventListener('mousedown', () => isDrawing = true);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mousemove', scratchAction);

    canvas.addEventListener('touchstart', () => isDrawing = true);
    canvas.addEventListener('touchend', () => isDrawing = false);
    canvas.addEventListener('touchmove', scratchAction);
            }
                                                            
