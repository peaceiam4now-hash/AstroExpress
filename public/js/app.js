// AstroExpress Frontend JavaScript

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 AstroExpress loaded successfully!');
    
    // Fetch and display API health status
    fetchHealthStatus();
    
    // Add interactive effects
    addInteractiveEffects();
});

async function fetchHealthStatus() {
    try {
        const response = await fetch('/api/health');
        const data = await response.json();
        
        if (data.success) {
            console.log('✅ Server Health:', data.data);
            displayHealthStatus(data.data);
        }
    } catch (error) {
        console.error('❌ Error fetching health status:', error);
    }
}

function displayHealthStatus(healthData) {
    // Create a status indicator
    const statusIndicator = document.createElement('div');
    statusIndicator.className = 'status-indicator';
    statusIndicator.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: rgba(77, 255, 136, 0.2); 
                    border: 1px solid #4DFF88; border-radius: 20px; padding: 10px 20px; 
                    display: flex; align-items: center; gap: 10px; z-index: 1000;">
            <div style="width: 10px; height: 10px; background: #4DFF88; border-radius: 50%; 
                        animation: pulse 2s infinite;"></div>
            <span style="color: #4DFF88; font-size: 0.9rem;">Server Online</span>
        </div>
    `;
    document.body.appendChild(statusIndicator);
    
    // Add pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
    `;
    document.head.appendChild(style);
}

function addInteractiveEffects() {
    // Add click effect to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', () => {
            card.style.transition = 'all 0.3s ease';
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'translateY(-5px)';
            }, 150);
        });
    });
    
    // Add hover effect to tech badges
    const techBadges = document.querySelectorAll('.tech-badge');
    techBadges.forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            badge.style.cursor = 'pointer';
        });
    });
    
    // Add click to copy for endpoints
    const endpoints = document.querySelectorAll('.endpoint code');
    endpoints.forEach(endpoint => {
        endpoint.style.cursor = 'pointer';
        endpoint.title = 'Click to copy';
        
        endpoint.addEventListener('click', () => {
            const text = endpoint.textContent;
            navigator.clipboard.writeText(window.location.origin + text);
            
            // Show copied feedback
            const originalText = endpoint.textContent;
            endpoint.textContent = '✓ Copied!';
            setTimeout(() => {
                endpoint.textContent = originalText;
            }, 1500);
        });
    });
}

// Add starfield effect to background
function createStarfield() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const stars = [];
    const numStars = 100;
    
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            opacity: Math.random(),
        });
    }
    
    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
        });
    }
    
    function animateStars() {
        stars.forEach(star => {
            star.opacity += (Math.random() - 0.5) * 0.02;
            star.opacity = Math.max(0.1, Math.min(1, star.opacity));
        });
        drawStars();
        requestAnimationFrame(animateStars);
    }
    
    animateStars();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Uncomment to enable starfield effect
// createStarfield();
