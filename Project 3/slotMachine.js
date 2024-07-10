function getRandomSymbol() {
    const symbols = ['7', '🍒', '🍋', '🔔', '💎'];
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function spin() {
    const reels = document.querySelectorAll('.reel-content');
    const result = document.getElementById('result');
    result.textContent = ''; // Clear the result text

    // Function to animate a single reel
    function animateReel(reel, delay) {
        const symbol1 = getRandomSymbol();
        const symbol2 = getRandomSymbol();
        const symbol3 = getRandomSymbol();
        
        reel.innerHTML = `
            <div>${symbol1}</div>
            <div>${symbol2}</div>
            <div>${symbol3}</div>
        `;

        setTimeout(() => {
            reel.style.transition = 'transform 0.5s ease-out';
            reel.style.transform = 'translateY(-66.66%)';
        }, delay);

        setTimeout(() => {
            reel.style.transition = '';
            reel.style.transform = 'translateY(0)';
            reel.innerHTML = `<div>${symbol2}</div>`;
        }, delay + 500);
    }

    // Animate each reel one by one with staggered delays
    animateReel(reels[0], 0);
    animateReel(reels[1], 300);
    animateReel(reels[2], 600);

    // Check the result after all reels have stopped
    setTimeout(() => {
        if (reels[0].textContent === reels[1].textContent && reels[1].textContent === reels[2].textContent) {
            result.textContent = 'Jackpot!';
        } else {
            result.textContent = 'Try Again!';
        }
    }, 1100);
}
