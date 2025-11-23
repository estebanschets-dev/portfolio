
class CustomHeader extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        
        let lastScroll = 0;
        const header = this.shadowRoot.querySelector('header');
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.classList.remove('hidden');
                return;
            }
            
            if (currentScroll > lastScroll && !header.classList.contains('hidden')) {
                // Scroll down
                header.classList.add('hidden');
            } else if (currentScroll < lastScroll && header.classList.contains('hidden')) {
                // Scroll up
                header.classList.remove('hidden');
            }
            
            lastScroll = currentScroll;
        });
this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: 'Inter', sans-serif;
                }
                header {
                    position: fixed;
                    top: 0;
                    width: 100%;
                    background-color: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    z-index: 1000;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
                    border-bottom: 1px solid rgba(0,0,0,0.05);
                    transform: translateY(0);
                    transition: transform 0.3s ease;
                    margin: 0;
                    padding: 0;
                }
header.hidden {
                    transform: translateY(-100%);
                }
nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 1rem 2rem;
                    height: 70px;
                }
                
                .logo {
                    font-size: 1.75rem;
                    font-weight: 800;
                    color: #111;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .logo span {
                    background: #000000;
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    -webkit-text-fill-color: transparent;
                }
                    .logo-icon {
                    width: 30px;
                    height: 30px;
                    background: #111;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                }
.nav-links {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                
                .nav-link {
                    color: #111;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 0.95rem;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    transition: all 0.2s ease;
                }
                
                .nav-link:hover {
                    background: rgba(0,0,0,0.03);
                }
                .nav-link.active {
                    background: rgba(0, 0, 0, 0.1);
                    color: #111;
                }
                
                .cta-button {
                    background: #111;
color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    font-weight: 600;
                    transition: all 0.2s ease;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                
                .cta-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
                .mobile-menu-button {
                    display: none;
                    visibility: hidden;
background: none;
                    border: none;
                    cursor: pointer;
                    width: 44px;
                    height: 44px;
                    border-radius: 8px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 5px;
                    padding: 0;
                    transition: all 0.2s ease;
                }
                
                .mobile-menu-icon {
                    display: block;
                    width: 20px;
                    height: 2px;
                    background-color: #111;
                    transition: all 0.3s ease;
                }
                .mobile-menu-button:hover .mobile-menu-icon {
                    background-color: #111;
}
                
                .mobile-menu-button[aria-expanded="true"] .mobile-menu-icon:nth-child(1) {
                    transform: translateY(7px) rotate(45deg);
                }
                
                .mobile-menu-button[aria-expanded="true"] .mobile-menu-icon:nth-child(2) {
                    opacity: 0;
                }
                
                .mobile-menu-button[aria-expanded="true"] .mobile-menu-icon:nth-child(3) {
                    transform: translateY(-7px) rotate(-45deg);
                }
                .nav-dropdown {
                    position: relative;
                    display: inline-block;
                }
                
                .nav-dropdown-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0.5rem 1rem;
                    font-weight: 600;
                    font-size: 0.95rem;
                    color: #111;
                    border-radius: 8px;
                    transition: all 0.2s ease;
                }
                
                .nav-dropdown-btn:hover {
                    background: rgba(0,0,0,0.03);
                }
                .nav-dropdown-content {
                    display: none;
                    position: absolute;
                    background-color: white;
                    min-width: 220px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.12);
                    border-radius: 12px;
                    z-index: 1;
                    padding: 0.75rem 0;
                    border: none;
                    transform-origin: top center;
                    transform: scaleY(0.95);
                    opacity: 0;
                    transition: all 0.2s cubic-bezier(0.32, 0.72, 0, 1);
                }
                
                .nav-dropdown:hover .nav-dropdown-content {
                    display: block;
                    transform: scaleY(1);
                    opacity: 1;
                }

                .nav-dropdown-content a {
                    display: flex;
                    align-items: center;
                    padding: 0.75rem 1.5rem;
                    color: #111;
                    text-decoration: none;
                    transition: all 0.2s ease;
                    font-size: 0.9rem;
                    font-weight: 500;
                    position: relative;
                    overflow: hidden;
                }

                .nav-dropdown-content a::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 3px;
                    background: linear-gradient(to bottom, #6366F1, #8B5CF6);
                    transform: translateX(-100%);
                    transition: transform 0.2s ease;
                }
                .nav-dropdown-content a:hover {
                    background: rgba(0, 0, 0, 0.05);
                    color: #111;
                }

                .nav-dropdown-content a:hover::before {
                    transform: translateX(0);
                    background: #111;
}

                .nav-dropdown-content a i {
                    margin-right: 0.75rem;
                    width: 16px;
                    height: 16px;
                }
.mobile-menu {
                    position: fixed;
                    top: 70px;
                    left: 0;
                    right: 0;
                    background: white;
                    padding: 1.5rem 2rem;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    transform: translateY(-100%);
                    opacity: 0;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    pointer-events: none;
                    z-index: 999;
                    max-height: calc(100vh - 70px);
                    overflow-y: auto;
                }
                
                .mobile-menu.open {
                    transform: translateY(0);
                    opacity: 1;
                    pointer-events: all;
                }
                
                .mobile-menu-links {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .mobile-menu-group h4 {
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #666;
                    margin: 1rem 0 0.5rem 1rem;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                
                .mobile-menu-links a:not(.cta-button) {
                    padding: 0.75rem 1.5rem;
                    border-radius: 6px;
                    transition: all 0.2s ease;
                    font-weight: 500;
                    color: #111;
                    text-decoration: none;
                    display: block;
                }
                .mobile-menu-links a:not(.cta-button):hover {
                    background: rgba(0, 0, 0, 0.05);
                    color: #111;
}
                .mobile-menu-links .cta-button {
                    margin: 2rem 0 1rem;
                    text-align: center;
                    background: #111;
                    color: white;
color: white;
                    border: none;
                    width: calc(100% - 2rem);
                    margin-left: 1rem;
                    margin-right: 1rem;
                }
@media (max-width: 1024px) {
                    .nav-links {
                        display: none;
                    }
                    
                    .mobile-menu-button {
                        display: flex;
                        visibility: visible;
                    }
                }
@media (max-width: 640px) {
                    nav {
                        padding: 1rem;
                    }
                    
                    .logo {
                        font-size: 1.5rem;
                    }
                    
                    .mobile-menu {
                        top: 60px;
                    }
                }
            </style>
            
            <header>
                <nav>
                    <a href="/" class="logo">
                        <span class="text-light">Esteban</span><span>Schets</span>
</a>
                    <div class="nav-links" style="margin-left: auto;">
                        <a href="#experience" class="nav-link">Featured Experience</a>
                        
                        <div class="nav-dropdown">
                            <button class="nav-dropdown-btn">Skills</button>
<div class="nav-dropdown-content">
                                <a href="#performance-marketing" class="nav-link">
                                    <i data-feather="bar-chart-2"></i>
                                    Performance Marketing
                                </a>
                                <a href="#omnichannel" class="nav-link">
                                    <i data-feather="repeat"></i>
                                    Omnichannel
                                </a>
                                <a href="#merchandising" class="nav-link">
                                    <i data-feather="shopping-bag"></i>
                                    Merchandising
                                </a>
                                <a href="#brand" class="nav-link">
                                    <i data-feather="award"></i>
                                    Brand Strategy
                                </a>
                                <a href="#product-mgmt" class="nav-link">
                                    <i data-feather="package"></i>
                                    Product Management
                                </a>
                                <a href="#crm" class="nav-link">
                                    <i data-feather="users"></i>
                                    CRM Marketing
                                </a>
                                <a href="#ai" class="nav-link">
                                    <i data-feather="cpu"></i>
                                    AI Expertise
                                </a>
</div>
                        </div>
                        
                        <a href="#contact" class="cta-button">Let's Connect</a>
                    </div>
<button class="mobile-menu-button" id="mobileMenuButton" aria-label="Toggle menu">
                        <span class="mobile-menu-icon"></span>
                        <span class="mobile-menu-icon"></span>
                        <span class="mobile-menu-icon"></span>
                    </button>
                </nav>
                <div class="mobile-menu" id="mobileMenu">
                <div class="mobile-menu-links">
                    <div class="mobile-menu-group">
                        <h4>Featured Experience</h4>
                        <a href="#experience" class="nav-link">Microsoft & Samsonite</a>
                    </div>
                    
                    <div class="mobile-menu-group">
                        <h4>Skills</h4>
                        <a href="#performance-marketing" class="nav-link">Performance Marketing</a>
                        <a href="#omnichannel" class="nav-link">Omnichannel</a>
                        <a href="#merchandising" class="nav-link">Merchandising</a>
                        <a href="#brand" class="nav-link">Brand Strategy</a>
                        <a href="#product-mgmt" class="nav-link">Product Management</a>
                        <a href="#crm" class="nav-link">CRM Marketing</a>
                        <a href="#ai" class="nav-link">AI Expertise</a>
                    </div>
                    
                    <a href="#contact" class="cta-button">Let's Connect</a>
</div>
</div>
</header>
        `;
        // Replace icons in dropdown
        feather.replace({
            'class': 'dropdown-icon',
            'width': 16,
            'height': 16,
            'stroke-width': 2
        });

        // Mobile menu toggle logic
const mobileMenuButton = this.shadowRoot.getElementById('mobileMenuButton');
        const mobileMenu = this.shadowRoot.getElementById('mobileMenu');
        let menuOpen = false;
        
        mobileMenuButton.addEventListener('click', () => {
            menuOpen = !menuOpen;
            mobileMenu.classList.toggle('open');
            mobileMenuButton.setAttribute('aria-expanded', menuOpen);
            
            // Prevent body scroll when menu is open
            if (menuOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        // Close mobile menu when clicking on a link
        const navLinks = this.shadowRoot.querySelectorAll('.mobile-menu-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuOpen = false;
                mobileMenu.classList.remove('open');
                mobileMenuButton.setAttribute('aria-expanded', false);
                document.body.style.overflow = '';
            });
        });
// Update active link based on scroll position
        window.addEventListener('scroll', () => {
            const sections = [
                '#ai', '#performance-marketing', '#omnichannel', 
                '#merchandising', '#brand', '#product-mgmt',
                '#crm', '#skills', '#experience', '#contact'
            ];
            
            let currentSection = '';
            
            sections.forEach(section => {
                const element = document.querySelector(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        currentSection = section;
                    }
                }
            });
            
            // Update active state for desktop and mobile links
            const allLinks = this.shadowRoot.querySelectorAll('.nav-link, .mobile-menu-links a');
            allLinks.forEach(link => {
                if (link.getAttribute('href') === currentSection) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        });
    }
}

customElements.define('custom-header', CustomHeader);
