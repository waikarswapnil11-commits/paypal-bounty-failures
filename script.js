// Animate counters
function animateCounter(elementId, targetValue, prefix = '', suffix = '') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let current = 0;
    const increment = targetValue / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
            current = targetValue;
            clearInterval(timer);
        }
        element.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
    }, 20);
}

// Update live counter
function updateLiveCounter() {
    const startDate = new Date('2026-02-01');
    const now = new Date();
    const days = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    
    // Estimated metrics
    const reportsPerDay = 0.7;
    const bountyPerReport = 1500;
    
    const totalReports = Math.floor(days * reportsPerDay);
    const totalLoss = totalReports * bountyPerReport;
    
    const counter = document.getElementById('liveCounter');
    if (counter) {
        counter.textContent = `$${totalLoss.toLocaleString()}+ in denied bounties`;
    }
}

// Toggle evidence sections
document.addEventListener('DOMContentLoaded', function() {
    // Animate counters on page load
    setTimeout(() => {
        animateCounter('deniedBounties', 15000, '$', '+');
        animateCounter('closedReports', 7, '', '+');
    }, 500);
    
    // Update live counter
    updateLiveCounter();
    setInterval(updateLiveCounter, 60000); // Update every minute
    
    // Make code blocks copyable
    document.querySelectorAll('pre').forEach(pre => {
        pre.addEventListener('click', function() {
            const code = this.querySelector('code');
            if (code) {
                navigator.clipboard.writeText(code.textContent)
                    .then(() => {
                        const original = this.style.boxShadow;
                        this.style.boxShadow = '0 0 0 2px #00ff88';
                        setTimeout(() => {
                            this.style.boxShadow = original;
                        }, 500);
                    });
            }
        });
    });
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.step, .metric, .impact-card').forEach(el => {
        observer.observe(el);
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .step, .metric, .impact-card {
        opacity: 0;
    }
`;
document.head.appendChild(style);
