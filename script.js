// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Header Background Change on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 248, 240, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(248, 216, 216, 0.4)';
    } else {
        header.style.background = 'rgba(255, 248, 240, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(248, 216, 216, 0.3)';
    }
});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections for animations
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Observe individual elements for staggered animations
document.querySelectorAll('.gallery-item, .testimonial, .faq-item').forEach((element, index) => {
    element.style.transitionDelay = `${index * 0.1}s`;
    element.classList.add('fade-in');
    observer.observe(element);
});

// Form Handling
const orderForm = document.getElementById('orderForm');

orderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(orderForm);
    const orderData = Object.fromEntries(formData);
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'quantity', 'needed-date'];
    const missingFields = requiredFields.filter(field => !orderData[field]);
    
    if (missingFields.length > 0) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(orderData.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Validate date (should be at least 5 days from now)
    const selectedDate = new Date(orderData['needed-date']);
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 5);
    
    if (selectedDate < minDate) {
        showNotification('Please allow at least 5 days for custom decorated sugar cookies.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = document.querySelector('.submit-btn');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Mixing the magic...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Sweet! Your order request has been submitted. We\'ll be in touch within 24 hours to make your cookie dreams come true! 🍪', 'success');
        orderForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Generate email content for demonstration
        generateEmailContent(orderData);
    }, 1500);
});

// Show notification function
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add slide-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: auto;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Close notification functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Generate email content for demonstration
function generateEmailContent(orderData) {
    const emailContent = `
Subject: New Cookie Order Request - Hannah's Cookie Corner - ${orderData.name}

Order Details:
- Name: ${orderData.name}
- Email: ${orderData.email}
- Phone: ${orderData.phone || 'Not provided'}
- Event Type: ${orderData['event-type'] || 'Not specified'}
- Quantity: ${orderData.quantity}
- Needed Date: ${orderData['needed-date']}


Design Details:
${orderData['design-details'] || 'No specific details provided'}

Please respond within 24 hours with a custom quote.
    `;
    
    console.log('Email content generated:', emailContent);
    
    // In a real application, this would be sent to your backend
    // For now, we'll show it in the console for demonstration
}

// Set minimum date for the date input (5 days from today)
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('needed-date');
    const today = new Date();
    const minDate = new Date(today.getTime() + (5 * 24 * 60 * 60 * 1000)); // 5 days from now
    
    // Format date as YYYY-MM-DD
    const year = minDate.getFullYear();
    const month = String(minDate.getMonth() + 1).padStart(2, '0');
    const day = String(minDate.getDate()).padStart(2, '0');
    const formattedMinDate = `${year}-${month}-${day}`;
    
    dateInput.setAttribute('min', formattedMinDate);
});

// Add floating professional elements animation
function createFloatingCookie() {
    // Create a simple CSS circle instead of emoji
    const cookie = document.createElement('div');
    cookie.innerHTML = '●';
    cookie.style.cssText = `
        position: fixed;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 1000;
        animation: float-across 10s linear infinite;
        left: -50px;
        top: ${Math.random() * 80 + 10}%;
        opacity: 0.3;
        color: #F8D8D8;
    `;
    
    // Add floating animation
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float-across {
            0% {
                transform: translateX(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.6;
            }
            90% {
                opacity: 0.6;
            }
            100% {
                transform: translateX(${window.innerWidth + 100}px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(floatStyle);
    
    document.body.appendChild(cookie);
    
    // Remove cookie after animation
    setTimeout(() => {
        if (cookie.parentNode) {
            cookie.remove();
        }
    }, 8000);
}

// Create subtle floating elements occasionally
setInterval(() => {
    if (Math.random() < 0.2) { // 20% chance every 8 seconds
        createFloatingCookie();
    }
}, 8000);

// Add some interactive hover effects to menu items
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Gallery Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    // Add animation
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.transition = 'all 0.5s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// Add enhanced hover effects to gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effect to buttons
document.querySelectorAll('.cta-button, .submit-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        // Add ripple animation
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}); 