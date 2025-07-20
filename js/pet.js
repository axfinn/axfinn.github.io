document.addEventListener('DOMContentLoaded', function() {
    const pet = document.getElementById('blog-pet');
    const speechBubble = document.getElementById('pet-speech-bubble');

    let currentX = 50;
    let currentY = 50;
    let targetX = 50;
    let targetY = 50;
    let animationFrameId;

    const messages = [
        "你好呀！",
        "欢迎来到我的博客！",
        "今天过得怎么样？",
        "有什么想找的吗？",
        "很高兴见到你！",
        "别忘了常来看看哦！"
    ];

    function showSpeechBubble(message) {
        speechBubble.textContent = message;
        speechBubble.style.opacity = '1';
        speechBubble.style.transform = 'scale(1)';
        setTimeout(() => {
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
        const dx = targetX - currentX;
        const dy = targetY - currentY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 1) {
            currentX += dx * 0.05;
            currentY += dy * 0.05;
            pet.style.left = currentX + 'px';
            pet.style.top = currentY + 'px';
        } else {
            // If close to target, set a new random target
            setRandomTarget();
        }
        animationFrameId = requestAnimationFrame(animatePet);
    }

    // Initial position and start animation
    setRandomTarget();
    animatePet();

    // Pet speaks randomly
    setInterval(() => {
        showSpeechBubble(getRandomMessage());
    }, 10000); // Every 10 seconds

    // Pet speaks when clicked
    pet.addEventListener('click', () => {
        showSpeechBubble("你点我啦！" + getRandomMessage());
    });

    // Pet speaks when hovered
    pet.addEventListener('mouseenter', () => {
        showSpeechBubble("你好！");
    });

    pet.addEventListener('mouseleave', () => {
        speechBubble.style.opacity = '0';
        speechBubble.style.transform = 'scale(0.8)';
    });
});