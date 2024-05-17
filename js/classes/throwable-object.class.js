
/**
 * Represents a throwable object in the game, extending the MovableObject class.
 */

class ThrowableObject extends MovableObject {

    /**
     * Creates an instance of ThrowableObject.
     * @param {number} x - The initial x-coordinate of the throwable object.
     * @param {number} y - The initial y-coordinate of the throwable object.
     */

    constructor(x, y) {
        super();
        this.loadImage(this.images.throwableobjects.BOTTLE_ROTATION[0]);
        this.loadImages(this.images.throwableobjects.BOTTLE_ROTATION)
        this.loadImages(this.images.throwableobjects.BOTTLE_SPLASH)
        this.bottleAnimation()
        this.throw()
        this.x = x;
        this.y = y;
        this.width = 400 / 6;
        this.height = 400 / 6;
        this.currentImagetwo = 0
        this.speedY = 6
        this.speedX = 8
    }

    /**
     * Throws the throwable object with a specific horizontal speed and applies gravity.
     */

    throw() {
            this.applyGravity();
            setInterval(() => {
                if (this.otherDirection == false) {
                    this.move('right', this.speedX)
                } else if (this.otherDirection == true) {
                    this.move('left', this.speedX)
                }
            }, 1000 / 60);
    }

    /**
     * Handles the animation of the throwable object when in flight.
     */

    bottleAnimation() {
        setInterval(() => {
            if (this.isDead()) {
                this.setBottleSplash()
            } else {
                this.setBottleRotation()
            }
        }, 1000 / 24);
    }

    /**
     * Sets the rotation animation for the throwable object.
     */

    setBottleRotation() {
            this.animate(this.images.throwableobjects.BOTTLE_ROTATION, this.currentImage)
            this.currentImage++
    }

    /**
     * Sets the splash animation for the throwable object upon collision or reaching the ground.
     */

    setBottleSplash() {
            this.animate(this.images.throwableobjects.BOTTLE_SPLASH, this.currentImagetwo)
            this.currentImagetwo++ 
    }
}