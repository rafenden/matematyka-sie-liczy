module.exports = function(eleventyConfig) {
    // Copy `css/` to `_site/css/`
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("images");
    
    // Add shortcode for current year
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

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