module.exports = function(eleventyConfig) {
    // Copy `css/` to `_site/css/`
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("images");
    
    // Add shortcode for current year
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    // Dodanie paired shortcode dla sekcji cennika
    eleventyConfig.addPairedShortcode("prices", function(content) {
        return `<div class="pricing-grid">${content}</div>`;
    });

    // Dodanie shortcode dla cennika z pozycyjnymi parametrami
    eleventyConfig.addShortcode("price", function(title, price, duration, description) {
        return `<div class="pricing-card card">
            <h3>${title}</h3>
            <div class="price">${price}</div>
            <p>${duration}</p>
            <p>${description}</p>
        </div>`;
    });

    // Dodanie paired shortcode dla sekcji z Larsem
    eleventyConfig.addPairedShortcode("lars", function(content) {
        return `<div class="lars-section">
            <div class="lars-image">
                <img src="/images/lars.jpg" alt="Lars - Golden Retriever, matematyczny asystent" title="Lars - Golden Retriever, matematyczny asystent" class="dog-image" />
            </div>
            <div class="lars-text">
                ${content}
            </div>
        </div>`;
    });

    // Dodanie shortcode dla pojedynczej opinii z pozycyjnymi parametrami
    eleventyConfig.addShortcode("testimonial", function(quote, author, description) {
        return `<div class="testimonial card">
            <blockquote>"${quote}"</blockquote>
            <div class="author">
                <strong>${author}</strong>
                <em>${description}</em>
            </div>
        </div>`;
    });

    // Dodanie paired shortcode dla sekcji opinii
    eleventyConfig.addPairedShortcode("testimonials", function(content) {
        return `<div class="testimonials-grid">${content}</div>`;
    });
    
    // Dodanie shortcode dla przycisku CTA pod opiniami
    eleventyConfig.addShortcode("testimonialsCta", function(text, linkText, url) {
        return `<div class="testimonials-cta">
            <h3>${text}</h3>
            <a href="${url}" class="cta-button">${linkText}</a>
        </div>`;
    });

    return {
        // Set directories to pass through to the _site folder
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
            data: "_data"
        }
    };
};