
/**
 * Represents a chick enemy.
 * @extends MovableObject
 */

class Chick extends MovableObject {

    /**
     * Creates an instance of Chick.
     */

    constructor() {
        super();
        this.loadImage(this.images.chick.IMAGES_CHICK[0]);
        this.loadImages(this.images.chick.IMAGES_CHICK);
        this.width = 263 / 4;
        this.height = 210 / 4;
        this.entitieHeight(this.height);
        this.chickAnimation();
        this.chickMovementSpeed();
        this.x = 762 + Math.random() * 3600;
        this.chick = true;
    }

    /**
     * Sets the movement speed for the chick and the SafeZone of the character
     */

    chickMovementSpeed() {
        setInterval(() => {
            if (this.isDead()) {
            } else {
                if (this.world) {
                    if (this.world.character.x > 80 && !this.characterOutOfZone) {
                        this.characterOutOfSafeZone = true;
                    } if (this.characterOutOfSafeZone) {
                        this.move('left', this.speed)
                        this.ifGoInVoid(-100, 3400)
                    }
                }
            }
        }, 1000 / 60);
    }

    /**
     * Animates the movement of the chick.
     */

    chickAnimation() {
        setInterval(() => {
            if (this.isDead()) {
                this.setChickDeath()
            } else {
                this.setChickMovment()
            }
        }, 1000 / 8);
    }

    /**
     * Sets the animation for the chick's movement.
     */

    setChickMovment() {
        this.animate(this.images.chick.IMAGES_CHICK, this.currentImage)
        this.currentImage++
    }

    /**
     * Sets the animation for the chick's death.
     */

    setChickDeath() {
        this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png')
    }
}
