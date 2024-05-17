/**
 * Represents movable objects in the game, extending the DrawableObjects class.
 */

class MovableObject extends DrawableObjects {

    /**
     * Creates an instance of MovableObject.
     */

    constructor() {
        super();
        this.width = 768;
        this.height = 432;
        this.speedY = 0;
        this.speedX = 0;
        this.speed = 0.8 + Math.random();
        this.health = 1;
        this.damage = 1;
        this.acceleration = 0.3;
        this.lastHit = 0;
        this.characterOutOfZone = false;
        this.otherDirection = false;
    }

    /**
     * Checks if the object is colliding with another object.
     * @param {Object} all - The object to check collision with.
     * @returns {boolean} - True if colliding, false otherwise.
     */

    isColliding(all) {
        return this.x + this.width > all.x &&
            this.y + this.height > all.y &&
            this.x < all.x + all.width &&
            this.y < all.y + all.height
    }

    /**
     * Checks if the object is colliding with another object's top area only.
     * @param {Object} all - The object to check collision with.
     * @param {number} enemyTop - The top position of the other object.
     * @param {number} topAreaHeight - The height of the top area to check collision with.
     * @returns {boolean} - True if colliding with the top area, false otherwise.
     */

    isCollidingTopOnly(all, enemyTop, topAreaHeight) {
        return this.y + this.height > enemyTop &&
            this.y + this.height < enemyTop + topAreaHeight &&
            this.x + this.width > all.x &&
            this.x < all.x + all.width &&
            this.y <= enemyTop;
    }

    /**
     * Handles when the object is hit by an enemy.
     * @param {number} enemyDamage - The damage inflicted by the enemy.
     */

    hit(enemyDamage) {
        if (enemyDamage > 0) {
            if (this.health < 1) {
                this.health = 0
            } else {
                if (!this.isHurt(1500, this.lastHit)) {
                    this.invincibility(enemyDamage)
                    this.lastHit = new Date().getTime();
                }
            }
        }
    }

    /**
     * Checks if the object is dead (health less than 1).
     * @returns {boolean} - True if dead, false otherwise.
     */

    isDead() {
        return this.health < 1;
    }

    /**
     * Checks if the object is currently in a hurt state.
     * @param {number} t - The duration of the hurt state in milliseconds.
     * @param {number} than - The timestamp of the last hit.
     * @returns {boolean} - True if in hurt state, false otherwise.
     */

    isHurt(t, than) {
        let timepassed = new Date().getTime() - than;
        return timepassed < t;
    }

    /**
     * Applies invincibility frames to the object after being hit.
     * @param {number} enemyDamage - The damage inflicted by the enemy.
     */

    invincibility(enemyDamage) {
        if (this.isHurt(1500, this.lastHit)) {
            this.health -= 0
        } else {
            this.health -= enemyDamage
        }
    }

    /**
     * Determines the current health bar/boss bar/salsa bar/coin bar level based on the current amount and maximum amount.
     * @param {number} currentHealth - The current amount of the object.
     * @param {number} health - The maximum amount of the object.
     * @returns {number} - The level of the bar (0-5).
     */

    setBar(currentamount, amount) {
        if (currentamount == amount) {
            return 5
        } else if (currentamount <= amount && currentamount > amount * 0.75) {
            return 4
        } else if (currentamount <= amount * 0.75 && currentamount > amount * 0.5) {
            return 3
        } else if (currentamount <= amount * 0.5 && currentamount > amount * 0.25) {
            return 2
        } else if (currentamount <= amount * 0.25 && currentamount > 0) {
            return 1
        } else if (currentamount <= 1) {
            return 0
        }
    }

    /**
     * Sets the entity's position based on its height relative to the ground.
     * @param {number} height - The height of the entity.
     */


    entitieHeight(height) {
        this.y = 435 - height;

    }

    /**
     * Animates the object by updating its image based on the provided animation array and current image index.
     * @param {Array} animate - The array containing paths to animation images.
     * @param {number} currentImg - The index of the current image in the animation.
     */

    animate(animate, currentImg) {
        let path = animate[currentImg % animate.length];
        this.img = this.imageCache[path];
    }

    /**
     * Adjusts the object's position to prevent it from going out of bounds.
     * @param {number} xStart - The starting x-coordinate of the boundary.
     * @param {number} xEnd - The ending x-coordinate of the boundary.
     */

    ifGoInVoid(xStart, xEnd) {
        if (this.x < xStart) {
            this.x = xEnd
        }
    }

    /**
     * Applies gravity to the object, causing it to fall downwards.
     */

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60)
    }

    /**
     * Applies knockback effect to the object when hit by an enemy.
     */

    applyKnockback() {
        setInterval(() => {
            if (this.speedX > 0) {
                this.x -= this.speedX;
                this.speedX -= this.acceleration;
            } if (this.speedX < -1) {
                this.x -= this.speedX;
                this.speedX += this.acceleration;
            }
        }, 1000 / 60)
    }

     /**
     * Checks if the object is above the ground level.
     * @returns {boolean} - True if above ground, false otherwise.
     */

    isAboveGround() {
        if (this instanceof ThrowableObject || this instanceof Chickenbossweapon || this.health < 1) {
            return true
        } else if (this.health > 0) {
            return this.y < 200
        }
    }

    /**
     * Moves the object in the specified direction at the given speed.
     * @param {string} direction - The direction of movement ("left" or "right").
     * @param {number} speed - The speed of movement.
     */

    move(direction, speed) {
        if (direction === "right") {
            this.x += speed;
        } else if (direction === "left") {
            this.x -= speed;
        }
    }

    /**
     * Initiates a jump action for the object, propelling it upwards.
     */

    jump() {
        this.speedY = 8.2
    }

}