class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                footer {
                    background-color: #111111;
                    color: white;
                    padding: 3rem 2rem;
                    text-align: center;
                }
                .footer-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }
                .footer-links {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    flex-wrap: wrap;
                }
                .footer-link {
                    color: white;
                    text-decoration: none;
                    transition: opacity 0.3s ease;
                }
                .footer-link:hover {
                    opacity: 0.8;
                }
                .copyright {
                    opacity: 0.7;
                    font-size: 0.9rem;
                }
            </style>
            <footer>
                <div class="footer-content">
                    <div class="footer-links">
                        <a href="#top" class="footer-link">Overview</a>
                        <a href="#experience" class="footer-link">Experience</a>
                        <a href="#ai" class="footer-link">AI Expertise</a>
                        <a href="#performance-marketing" class="footer-link">Performance</a>
                        <a href="#omnichannel" class="footer-link">Omnichannel</a>
                        <a href="#merchandising" class="footer-link">Merchandising</a>
                        <a href="#brand" class="footer-link">Brand</a>
                        <a href="#market-intel" class="footer-link">Market Intel</a>
                        <a href="#startup-ops" class="footer-link">Startup Ops</a>
                        <a href="#crm" class="footer-link">CRM</a>
                        <a href="#contact" class="footer-link">Contact</a>
                    </div>
                    <div class="copyright">
                        &copy; ${new Date().getFullYear()} Esteban Schets. All rights reserved.
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('custom-footer', CustomFooter);
