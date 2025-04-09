const fs = require('fs');
const path = require('path');

module.exports = function(eleventyConfig) {
    // Add cache busting filter
    eleventyConfig.addFilter("cacheBust", function(url) {
        const [urlPath, urlQuery] = url.split('?');
        const filePath = path.join(__dirname, urlPath.substring(1)); // Remove leading slash

        try {
            const stats = fs.statSync(filePath);
            const timestamp = stats.mtime.getTime();
            return `${urlPath}?v=${timestamp}${urlQuery ? '&' + urlQuery : ''}`;
        } catch (e) {
            console.log('Cache busting error for', url, e);
            return url;
        }
    });

    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("images");
    eleventyConfig.addPassthroughCopy("js");

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
    eleventyConfig.addPairedShortcode("lars", function(content, imageAlt, smallImageSrc, largeImageSrc) {
        return `<div class="lars">
            <div class="lars__image-wrapper">
                <a href="${largeImageSrc}" data-modal-image="${largeImageSrc}" data-modal-alt="${imageAlt}" title="Otwórz większe zdjęcie w oknie popup (kliknij zdjęcie, aby zamknąć)">
                    <img src="${smallImageSrc}" alt="${imageAlt}" class="lars__image" />
                </a>
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