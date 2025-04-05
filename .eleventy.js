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
            <h3 class="pricing-card__title">${title}</h3>
            <div class="pricing-card__price">${price}</div>
            <p class="pricing-card__description">${duration}</p>
            <p class="pricing-card__description">${description}</p>
        </div>`;
    });

    // Dodanie paired shortcode dla sekcji z Larsem
    eleventyConfig.addPairedShortcode("lars", function(content) {
        return `<div class="lars">
            <div class="lars__image-wrapper">
                <img src="/images/lars.jpg" alt="Lars - Golden Retriever, matematyczny asystent" title="Lars - Golden Retriever, matematyczny asystent" class="lars__image" />
            </div>
            <div class="lars__content">
                ${content}
            </div>
        </div>`;
    });

    // Dodanie shortcode dla pojedynczej opinii z pozycyjnymi parametrami
    eleventyConfig.addShortcode("testimonial", function(quote, author, description) {
        return `<div class="testimonial card">
            <blockquote class="testimonial__quote">"${quote}"</blockquote>
            <div class="testimonial__author">
                <strong class="testimonial__author-name">${author}</strong>
                <em class="testimonial__author-info">${description}</em>
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
            <h3 class="testimonials-cta__title">${text}</h3>
            <a href="${url}" class="button">${linkText}</a>
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