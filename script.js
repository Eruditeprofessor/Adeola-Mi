document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Entrance & Music Logic ---
    const enterBtn = document.getElementById('enter-btn');
    const entranceScreen = document.getElementById('entrance-screen');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    let isPlaying = false;

    enterBtn.addEventListener('click', () => {
        // 1. PLAY THE MUSIC IMMEDIATELY ON CLICK (Outside the delay)
        bgMusic.play().then(() => {
            isPlaying = true;
            musicToggle.innerText = '⏸ Pause Music';
        }).catch(e => console.log("Audio still blocked: ", e));

        // 2. Start the visual fade-out
        entranceScreen.style.opacity = '0';
        
        // 3. Wait 1 second for the fade, then show the content
        setTimeout(() => {
            entranceScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            launchConfetti();
        }, 1000);
    });

    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.innerText = '🎵 Play Music';
        } else {
            bgMusic.play();
            musicToggle.innerText = '⏸ Pause Music';
        }
        isPlaying = !isPlaying;
    });

    // --- 2. Emoji Confetti ---
    function launchConfetti() {
        const emojis = ['💖', '✨', '🥺', '🎂', '👑', '🌹'];
        const container = document.getElementById('emoji-container');
        
        for (let i = 0; i < 80; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.classList.add('emoji');
                emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
                
                emoji.style.left = Math.random() * 100 + 'vw';
                emoji.style.fontSize = (Math.random() * 2 + 1) + 'rem';
                emoji.style.animationDuration = (Math.random() * 3 + 3) + 's'; // 3 to 6 seconds fall
                
                container.appendChild(emoji);

                setTimeout(() => { emoji.remove(); }, 6000);
            }, i * 40); 
        }
    }

    // --- 3. Scroll Fade-In Observer ---
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    // Periodically check for fade-in elements (helps with elements hidden on load)
    setInterval(() => {
        document.querySelectorAll('.fade-in:not(.visible)').forEach(el => {
            if(window.getComputedStyle(el).display !== 'none') {
                observer.observe(el);
            }
        });
    }, 500);

    // --- 4. Flip Cards Logic ---
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
            // Little confetti burst on flip
            if(card.classList.contains('flipped')) {
                launchMiniConfetti(card);
            }
        });
    });

    function launchMiniConfetti(element) {
        const rect = element.getBoundingClientRect();
        const container = document.getElementById('emoji-container');
        for (let i = 0; i < 5; i++) {
            const emoji = document.createElement('div');
            emoji.classList.add('emoji');
            emoji.innerText = '✨';
            emoji.style.left = (rect.left + Math.random() * rect.width) + 'px';
            emoji.style.top = rect.top + 'px';
            emoji.style.fontSize = '1.5rem';
            emoji.style.animationDuration = '2s';
            container.appendChild(emoji);
            setTimeout(() => emoji.remove(), 2000);
        }
    }

    // --- 5. Lightbox Logic ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const galleryImages = document.querySelectorAll('.gallery-img');

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.remove('hidden');
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.add('hidden');
    });

    lightbox.addEventListener('click', (e) => {
        if(e.target !== lightboxImg) {
            lightbox.classList.add('hidden');
        }
    });
});
