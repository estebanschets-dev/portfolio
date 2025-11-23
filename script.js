
document.addEventListener('DOMContentLoaded', function() {
    // Initialize feather icons
    feather.replace();
    
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('custom-header')?.shadowRoot?.querySelector('header')?.offsetHeight || 80;
                
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                
                // Update URL
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });

    // Search functionality
const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    const searchHitContainer = document.getElementById('searchHitContainer');
    const resultCount = document.getElementById('resultCount');
    
    const allSkills = [
        {name: 'AI Marketing Automation', icon: 'cpu'}, 
        {name: 'ChatGPT', icon: 'message-square'},
        {name: 'Zapier AI', icon: 'zap'},
        {name: 'HubSpot', icon: 'hubspot'},
        {name: 'Marketo', icon: 'mail'},
        {name: 'AI Agents', icon: 'user'},
        {name: 'LangChain', icon: 'link'},
        {name: 'AutoGPT', icon: 'activity'},
        {name: 'Rasa', icon: 'message-circle'},
        {name: 'Dialogflow', icon: 'message-circle'},
        {name: 'AI Content Optimization', icon: 'edit'},
        {name: 'Jasper', icon: 'file-text'},
        {name: 'SurferSEO', icon: 'search'},
        {name: 'Frase', icon: 'file-text'},
        {name: 'Clearscope', icon: 'eye'},
        {name: 'AI Web Development', icon: 'code'},
        {name: 'GitHub Copilot', icon: 'github'},
        {name: 'Tabnine', icon: 'code'},
        {name: 'Codeium', icon: 'code'},
        {name: 'Amazon CodeWhisperer', icon: 'code'},
        {name: 'Performance Marketing', icon: 'bar-chart-2'},
        {name: 'Google Ads', icon: 'dollar-sign'},
        {name: 'Meta Ads', icon: 'facebook'},
        {name: 'TikTok Ads', icon: 'video'},
        {name: 'Programmatic', icon: 'refresh-cw'},
        {name: 'Optimization', icon: 'sliders'},
        {name: 'A/B Testing', icon: 'git-merge'},
        {name: 'Landing Pages', icon: 'layout'},
        {name: 'Bid Strategies', icon: 'trending-up'},
        {name: 'Creative Testing', icon: 'image'},
        {name: 'ROI Focus', icon: 'dollar-sign'},
        {name: 'Attribution', icon: 'pie-chart'},
        {name: 'LTV Modeling', icon: 'dollar-sign'},
        {name: 'Budget Allocation', icon: 'divide'},
        {name: 'Performance Dashboards', icon: 'monitor'}
    ];

    if (searchInput && searchButton) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (query.length > 2) {
                search();
            } else if (query.length === 0) {
                hideResults();
            }
        });

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                search();
            }
        });

        searchButton.addEventListener('click', search);

        document.addEventListener('click', (e) => {
            if (!searchHitContainer.contains(e.target) && 
                !searchInput.contains(e.target) && 
                !searchButton.contains(e.target)) {
                hideResults();
            }
        });
    }

    function search() {
        const query = searchInput.value.toLowerCase();
        if (query) {
            const results = allSkills.filter(skill => 
                skill.name.toLowerCase().includes(query)
            );
            displayResults(results);
        } else {
            hideResults();
        }
    }

    function displayResults(results) {
        searchResults.innerHTML = '';
        if (results.length > 0) {
            results.forEach(result => {
                const item = document.createElement('div');
                item.className = 'search-result-item';
                item.innerHTML = `
                    <i data-feather="${result.icon}"></i>
                    <span>${result.name}</span>
                `;
                searchResults.appendChild(item);
            });
            resultCount.textContent = results.length;
            searchHitContainer.classList.add('show');
            
            // Replace icons after adding to DOM
            feather.replace();
        } else {
            const noResults = document.createElement('div');
            noResults.className = 'search-result-item';
            noResults.innerHTML = '<i data-feather="alert-circle"></i> No matching skills found';
            searchResults.appendChild(noResults);
            resultCount.textContent = '0';
            searchHitContainer.classList.add('show');
            feather.replace();
        }
    }

    function hideResults() {
        searchHitContainer.classList.remove('show');
    }
// Skills toggle functionality
const toggleSkillsBtn = document.getElementById('toggleSkills');
    const skillsContainer = document.getElementById('skillsContainer');
    const skillsArrow = document.getElementById('skillsArrow');
    let skillsVisible = false;

    if (toggleSkillsBtn && skillsContainer) {
        toggleSkillsBtn.addEventListener('click', function() {
            skillsVisible = !skillsVisible;
            
            if (skillsVisible) {
                skillsContainer.classList.remove('hidden');
                skillsContainer.classList.add('grid');
                skillsArrow.classList.add('rotate-180');
                
                // Animate cards when showing
                const cards = document.querySelectorAll('.skill-card');
                cards.forEach((card, index) => {
                    card.style.transitionDelay = `${index * 50}ms`;
                    setTimeout(() => {
                        card.classList.add('animate-fade');
                    }, 10);
                });
            } else {
                skillsContainer.classList.add('hidden');
                skillsContainer.classList.remove('grid');
                skillsArrow.classList.remove('rotate-180');
                
                // Reset animations when hiding
                const cards = document.querySelectorAll('.skill-card');
                cards.forEach(card => {
                    card.classList.remove('animate-fade');
                });
            }
        });
    }

    // Animate skill cards with staggered delays
const animateSkillCards = () => {
        const cards = document.querySelectorAll('.card-hover, [class*="animate-"]');
        cards.forEach((card, index) => {
            const delay = index * 100;
            setTimeout(() => {
                card.style.transition = `all 0.6s ease-out ${delay}ms`;
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 0);
        });
    };

    // Initialize Charts
const initCharts = () => {
        // Performance Marketing Chart
        const marketingCtx = document.getElementById('marketingChart');
        if (marketingCtx) {
            new Chart(marketingCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Paid Search', 'Social Media', 'Programmatic', 'Affiliate', 'Email', 'CRO'],
                    datasets: [{
                        data: [25, 20, 15, 10, 20, 10],
                        backgroundColor: [
                            '#6366F1',
                            '#8B5CF6',
                            '#EC4899',
                            '#F97316',
                            '#10B981',
                            '#3B82F6'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    cutout: '70%',
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    }
                }
            });
        }
};
    // Smooth scroll animation for all elements
    const animateOnScroll = () => {
        // Animate sections
        document.querySelectorAll('section:not(:first-child)').forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.75);
            
            if (isVisible) {
                section.classList.add('in-view');
            }
        });

        // Animate all elements with animate- classes
        document.querySelectorAll('[class*="animate-"]').forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.75);
            
            if (isVisible) {
                el.style.opacity = '1';
                el.style.transform = 'translate(0) scale(1)';
            }
        });
    };
// Throttle scroll events for better performance
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                animateOnScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
    // Initialize animations on load
    animateOnScroll();
    animateSkillCards();
// Initialize charts after feather icons are loaded
    feather.replace().then(() => {
        initCharts();
    });
// Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    // Load Calendly widget
    function loadCalendlyWidget() {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);

        // Initialize Calendly widget
        script.onload = function() {
            Calendly.initInlineWidget({
                url: 'https://calendly.com/your-username/30min',
                parentElement: document.getElementById('calendly-widget'),
                prefill: {},
                utm: {}
            });
        };
    }

    // Load Calendly when contact section is in view
    const contactObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            loadCalendlyWidget();
            contactObserver.disconnect();
        }
    }, {threshold: 0.1});

    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactObserver.observe(contactSection);
    }
});