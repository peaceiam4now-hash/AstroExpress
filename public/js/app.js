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
