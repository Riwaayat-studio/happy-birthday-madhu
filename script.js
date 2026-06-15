// 🎁 1. GIFT BOX UNWRAP MECHANICS
function unwrapGiftBox() {
    const boxWrap = document.querySelector('.box-3d-wrap');
    if (boxWrap.classList.contains('open-animation')) return;

    boxWrap.classList.add('open-animation');

    setTimeout(() => {
        const gatewayScreen = document.getElementById('gift-vault-screen');
        const mainWorkspace = document.getElementById('main-content-vault');
        
        gatewayScreen.style.opacity = '0';
        gatewayScreen.style.visibility = 'hidden';
        
        mainWorkspace.style.display = 'block';
        setTimeout(() => {
            mainWorkspace.style.opacity = '1';
            // Auto initialization of scratch canvas logic after load
            initScratchModule();
        }, 50);

        // Media execution triggers
        const music = document.getElementById('bgMusic');
        if (music) music.play().catch(e => console.log("Audio awaiting user interaction node."));

        const video = document.getElementById('vlogVideo');
        if (video) video.play().catch(e => console.log("Video track pipeline initialized."));
    }, 1000);
}

// 🧮 2. HYPER-REALISTIC SCRATCH TO REVEAL SYSTEM
function initScratchModule() {
    const canvas = document.getElementById('scratchCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Dynamically scaling resolution based on parent box element bounding rect
    const box = canvas.getBoundingClientRect();
    canvas.width = box.width;
    canvas.height = box.height;

    // Creating solid metallic mask coat over secret text area
    ctx.fillStyle = '#4A0E28'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Adding subtle aesthetic text helper on top coat canvas layer
    ctx.font = 'bold 12px Raleway, sans-serif';
    ctx.fillStyle = '#FFD700';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH WITH POINTER HERE', canvas.width / 2, canvas.height / 2);

    let isDrawing = false;

    function scratchAction(e) {
        if (!isDrawing) return;
        
        // Tracking direct relative offset values for mouse/touch nodes
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // Erasing the top coat layer using composite source-out profile
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 24, 0, Math.PI * 2);
        ctx.fill();
    }

    // Direct desktop mapping listeners
    canvas.addEventListener('mousedown', () => isDrawing = true);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mousemove', scratchAction);

    // Responsive mobile pointer tracking support
    canvas.addEventListener('touchstart', () => isDrawing = true);
    canvas.addEventListener('touchend', () => isDrawing = false);
    canvas.addEventListener('touchmove', scratchAction);
}
