/**
 * Represents a coin collectible in the game.
 * @extends MovableObject
 */

class Coin extends MovableObject {

    /**
     * Creates an instance of Coin.
     * @param {number} x - The initial x-coordinate of the coin.
     */

    constructor(x) {
        super().loadImage(this.images.collectables.IMAGE_COINS[0]);
        this.loadImages(this.images.collectables.IMAGE_COINS);
        this.width = 400 / 5;
        this.height = 400 / 5;
        this.x = x;
        this.setCoinHover();
        this.entitieHeight(this.height + 20);
        this.setCoinAnimation();
    }

    /**
     * Sets the animation for the coin.
     */

    setCoinAnimation() {
        setInterval(() => {
            this.animate(this.images.collectables.IMAGE_COINS, this.currentImage);
            this.currentImage++;
        }, 500);
    }

    /**
     * Sets the hover effect for the coin.
     */

    setCoinHover() {
        let speed = Math.random() * 20;
        let direction = 0.8;
        setInterval(() => {
            if (this.y >= 360) {
                direction = -1;
            } else if (this.y <= 340 - speed) {
                direction = 1;
            }
            this.y += direction;
        }, 1000 / 30);
    }
}

/**
 * Represents a bottle of salsa collectible in the game.
 * @extends MovableObject
 */

class Salsa extends MovableObject {

    /**
     * Creates an instance of Salsa.
     * @param {string} ImagePath - The path to the image of the salsa bottle.
     * @param {number} x - The initial x-coordinate of the salsa bottle.
     */
    
    constructor(ImagePath, x) {
        super().loadImage(ImagePath);
        this.width = 400 / 5;
        this.height = 400 / 5;
        this.x = x;
        this.entitieHeight(this.height);
    }
}