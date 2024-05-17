class DrawableObjects{
    x = 0
    y = 0
    img;
    width = 595 / 3
    height = 158 / 3
    currentImage = 0

    /**
     * Cache for loaded images.
     * @type {Object}
     */

    imageCache = {};

    /**
     * An instance of the IMAGES class for accessing image paths.
     * @type {IMAGES}
     */

    images = new IMAGES()
    

    /**
     * Draws the object on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads a single image from the given path.
     * @param {string} path - The path to the image.
     */

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images from an array of paths and stores them in the image cache.
     * @param {Array} array - An array of image paths.
     */
    
    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}