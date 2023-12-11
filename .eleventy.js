module.exports = function(eleventyConfig) {
    // Copy `css/` to `_site/css/`
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("images");

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