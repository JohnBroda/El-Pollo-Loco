
/**
 * Represents a background object in the game.
 * @extends MovableObject
 */

class BackgroundObject extends MovableObject {

    /**
     * Creates an instance of BackgroundObject.
     * @param {string} ImagePath - The path to the image of the background object.
     * @param {number} x - The initial x-coordinate of the background object.
     */

    constructor(ImagePath, x) {
        super().loadImage(ImagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}

/**
 * Represents an air object in the game.
 * @extends MovableObject
 */

class Air extends MovableObject {
    height = 480;
    width = 1536;

    /**
     * Creates an instance of Air.
     * @param {string} ImagePath - The path to the image of the air object.
     * @param {number} x - The initial x-coordinate of the air object.
     */

    constructor(ImagePath, x) {
        super().loadImage(ImagePath);
        this.x = x;
    }
}

/**
 * Represents a cloud in the game.
 * @extends MovableObject
 */

class Cloud extends MovableObject {
    x = Math.random() * 1536 * 2;
    y = 50;

    /**
     * Creates an instance of Cloud.
     * @param {string} ImagePath - The path to the image of the cloud.
     */

    constructor(ImagePath) {
        super().loadImage(ImagePath);
        this.cloudMovment();
    }

    /**
     * Moves the cloud horizontally across the screen.
     */

    cloudMovment() {
        setInterval(() => {
            this.ifGoInVoid(-1536, 3500);
            this.move('left', 0.25);
        }, 1000 / 60);
    }
}