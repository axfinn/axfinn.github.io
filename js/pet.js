document.addEventListener('DOMContentLoaded', function() {
    const pet = document.getElementById('blog-pet');
    const speechBubble = document.getElementById('pet-speech-bubble');
    const petToggleButton = document.getElementById('pet-toggle-button');

    let currentX = parseFloat(localStorage.getItem('petX')) || 50;
    let currentY = parseFloat(localStorage.getItem('petY')) || 50;
    let isHidden = localStorage.getItem('petHidden') === 'true';
    let targetX = currentX;
    let targetY = currentY;
    let animationFrameId;
    let isDragging = false;
    let offsetX, offsetY;

    const messages = [
        "你好呀！",
        "欢迎来到我的博客！",
        "今天过得怎么样？",
        "有什么想找的吗？",
        "很高兴见到你！",
        "别忘了常来看看哦！",
        "我是一只可爱的小宠物，很高兴为你服务！",
        "点击我，我会说话哦！",
        "你可以把我拖到任何地方！",
        "如果你觉得我碍事，可以点击右上角的X隐藏我。",
        "希望你喜欢我的陪伴！",
        "探索博客，发现更多精彩内容吧！",
        "有什么问题可以问我哦，虽然我只会说这些话。",
        "咕噜咕噜~",
        "喵呜~",
        "汪汪！"
    ];

    function savePetPosition() {
        localStorage.setItem('petX', currentX);
        localStorage.setItem('petY', currentY);
    }

    function savePetVisibility() {
        localStorage.setItem('petHidden', isHidden);
        pet.style.display = isHidden ? 'none' : 'block';
    }

    function showSpeechBubble(message) {
        speechBubble.textContent = message;
        speechBubble.style.opacity = '1';
        speechBubble.style.transform = 'scale(1)';
        clearTimeout(speechBubble.timer);
        speechBubble.timer = setTimeout(() => {
            speechBubble.style.opacity = '0';
            speechBubble.style.transform = 'scale(0.8)';
        }, 3000);
    }

    function getRandomMessage() {
        return messages[Math.floor(Math.random() * messages.length)];
    }

    function setRandomTarget() {
        targetX = Math.random() * (window.innerWidth - pet.offsetWidth);
        targetY = Math.random() * (window.innerHeight - pet.offsetHeight);
    }

    function animatePet() {
        if (isDragging || isHidden) {
            animationFrameId = requestAnimationFrame(animatePet);
            return;
        }

        const dx = targetX - currentX;
        const dy = targetY - currentY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 1) {
            currentX += dx * 0.02; // Slower movement
            currentY += dy * 0.02; // Slower movement
            pet.style.left = currentX + 'px';
            pet.style.top = currentY + 'px';
        } else {
            setRandomTarget();
        }
        animationFrameId = requestAnimationFrame(animatePet);
    }

    // Initialize pet position and visibility
    pet.style.left = currentX + 'px';
    pet.style.top = currentY + 'px';
    savePetVisibility(); // Apply initial visibility

    // Start animation if not hidden
    if (!isHidden) {
        setRandomTarget();
        animatePet();
    }

    // Pet speaks randomly
    setInterval(() => {
        if (!isHidden && !isDragging) {
            showSpeechBubble(getRandomMessage());
        }
    }, 15000); // Every 15 seconds

    // Pet speaks when clicked
    pet.addEventListener('click', (e) => {
        if (e.target.id !== 'pet-toggle-button') {
            showSpeechBubble("你点我啦！" + getRandomMessage());
        }
    });

    // Pet speaks when hovered
    pet.addEventListener('mouseenter', () => {
        if (!isHidden && !isDragging) {
            showSpeechBubble("你好！");
        }
    });

    pet.addEventListener('mouseleave', () => {
        speechBubble.style.opacity = '0';
        speechBubble.style.transform = 'scale(0.8)';
    });

    // Drag functionality
    pet.addEventListener('mousedown', (e) => {
        if (e.target.id === 'pet-toggle-button') return; // Don't drag if clicking toggle button
        isDragging = true;
        cancelAnimationFrame(animationFrameId); // Stop animation during drag
        offsetX = e.clientX - pet.getBoundingClientRect().left;
        offsetY = e.clientY - pet.getBoundingClientRect().top;
        pet.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX - offsetX;
        currentY = e.clientY - offsetY;

        // Keep pet within viewport
        currentX = Math.max(0, Math.min(currentX, window.innerWidth - pet.offsetWidth));
        currentY = Math.max(0, Math.min(currentY, window.innerHeight - pet.offsetHeight));

        pet.style.left = currentX + 'px';
        pet.style.top = currentY + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            savePetPosition(); // Save new position
            pet.style.cursor = 'grab';
            setRandomTarget(); // Set new target from current position
            animatePet(); // Resume animation
        }
    });

    // Toggle visibility
    petToggleButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent pet click event from firing
        isHidden = !isHidden;
        savePetVisibility();
        if (!isHidden) {
            setRandomTarget();
            animatePet();
        } else {
            cancelAnimationFrame(animationFrameId);
        }
    });

    // Initial cursor style
    pet.style.cursor = 'grab';
});