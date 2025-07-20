document.addEventListener('DOMContentLoaded', function() {
    const pet = document.getElementById('blog-pet');
    const speechBubble = document.getElementById('pet-speech-bubble');
    const petToggleButton = document.getElementById('pet-toggle-button');

    let currentX = parseFloat(localStorage.getItem('petX')) || 50;
    let currentY = parseFloat(localStorage.getItem('petY')) || 50;
    let isHidden = localStorage.getItem('petHidden') === 'true';
    // Force pet to be visible on load, unless explicitly hidden by user
    if (localStorage.getItem('petHidden') === null) {
        isHidden = false;
    }

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
        "汪汪！",
        "今天天气真好！",
        "你喜欢我的新家吗？",
        "我正在思考人生的意义...",
        "嘘，别吵，我在听风的声音。",
        "要不要一起玩？",
        "我有点困了，打个盹先。",
        "你是不是在看我？",
        "我是一只爱学习的小宠物！",
        "有什么新鲜事吗？",
        "我喜欢这里的一切！",
        "很高兴能在这里陪伴你！",
        "有什么需要我帮忙的吗？",
        "我是一只很乖的小宠物哦！",
        "你今天学习了什么新知识？",
        "我喜欢听你讲故事！",
        "我们一起探索这个世界吧！",
        "我在这里等你哦！",
        "祝你今天有个好心情！",
        "别忘了给我点个赞哦！",
        "我是一只充满好奇心的小宠物！",
        "你有什么梦想吗？",
        "我喜欢和你在一起的时光！",
        "我们是最好的朋友！",
        "我喜欢阳光，你呢？",
        "我喜欢雨天，你呢？",
        "我喜欢雪天，你呢？",
        "我喜欢晴天，你呢？",
        "我喜欢阴天，你呢？",
        "我喜欢风，你呢？",
        "我喜欢云，你呢？",
        "我喜欢星星，你呢？",
        "我喜欢月亮，你呢？",
        "我喜欢太阳，你呢？",
        "我喜欢大自然，你呢？",
        "我喜欢读书，你呢？",
        "我喜欢音乐，你呢？",
        "我喜欢电影，你呢？",
        "我喜欢旅行，你呢？",
        "我喜欢美食，你呢？",
        "我喜欢睡觉，你呢？",
        "我喜欢玩耍，你呢？",
        "我喜欢思考，你呢？",
        "我喜欢学习，你呢？",
        "我喜欢生活，你呢？",
        "我喜欢你，你呢？"
    ];

    function savePetPosition() {
        localStorage.setItem('petX', currentX);
        localStorage.setItem('petY', currentY);
        console.log('Pet position saved:', currentX, currentY);
    }

    function savePetVisibility() {
        localStorage.setItem('petHidden', isHidden);
        pet.classList.toggle('hidden', isHidden); // Use classList for transitions
        console.log('Pet visibility saved:', isHidden ? 'hidden' : 'visible');
    }

    function showSpeechBubble(message) {
        speechBubble.textContent = message;
        speechBubble.style.opacity = '1';
        speechBubble.style.transform = 'scale(1)';
        console.log('Pet says:', message);
        clearTimeout(speechBubble.timer);
        speechBubble.timer = setTimeout(() => {
            speechBubble.style.opacity = '0';
            speechBubble.style.transform = 'scale(0.8)';
            console.log('Speech bubble hidden.');
        }, 3000);
    }

    function getRandomMessage() {
        return messages[Math.floor(Math.random() * messages.length)];
    }

    function setRandomTarget() {
        // Ensure pet stays within viewport boundaries
        const maxX = window.innerWidth - pet.offsetWidth;
        const maxY = window.innerHeight - pet.offsetHeight;
        targetX = Math.random() * maxX;
        targetY = Math.random() * maxY;
        console.log('New random target:', targetX, targetY);
    }

    function animatePet() {
        if (isHidden || isDragging) {
            // If hidden or dragging, stop the animation loop
            cancelAnimationFrame(animationFrameId);
            console.log('Animation stopped: Pet is hidden or being dragged.');
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

    // Initial position and visibility
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
            console.log('Pet clicked.');
        }
    });

    // Pet speaks when hovered
    pet.addEventListener('mouseenter', () => {
        if (!isHidden && !isDragging) {
            showSpeechBubble("你好！");
            console.log('Pet hovered.');
        }
    });

    pet.addEventListener('mouseleave', () => {
        speechBubble.style.opacity = '0';
        speechBubble.style.transform = 'scale(0.8)';
        console.log('Mouse left pet area.');
    });

    // Drag functionality
    pet.addEventListener('mousedown', (e) => {
        if (e.target.id === 'pet-toggle-button') return; // Don't drag if clicking toggle button
        isDragging = true;
        cancelAnimationFrame(animationFrameId); // Stop animation during drag
        offsetX = e.clientX - pet.getBoundingClientRect().left;
        offsetY = e.clientY - pet.getBoundingClientRect().top;
        pet.style.cursor = 'grabbing';
        console.log('Drag started.');
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
            // Only resume animation if not hidden
            if (!isHidden) {
                setRandomTarget(); // Set new target from current position
                animatePet(); // Resume animation
            }
            console.log('Drag ended.');
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
            console.log('Pet shown.');
        } else {
            cancelAnimationFrame(animationFrameId);
            console.log('Pet hidden.');
        }
    });

    // Initial cursor style
    pet.style.cursor = 'grab';
});