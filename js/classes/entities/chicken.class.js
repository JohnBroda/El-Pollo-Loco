
/**
 * Represents a chicken enemy.
 * @extends MovableObject
 */

class Chicken extends MovableObject {

    /**
     * Creates an instance of Chicken.
     */

    constructor() {
        super();
        this.loadImage(this.images.chicken.IMAGES_CHICKEN[0]);
        this.loadImages(this.images.chicken.IMAGES_CHICKEN);
        this.width = 61;
        this.height = 62;
        this.entitieHeight(this.height);
        this.chickenAnimation();
        this.chickenMovementSpeed();
        this.x = 762 + Math.random() * 3600;
        this.chicken = true;
    }

    /**
     * Sets the movement speed for the chicken and the SafeZone of the character
     */

    chickenMovementSpeed() {
        setInterval(() => {
            if (this.isDead()) {
            } else {
                if (this.world) {
                    if (this.world.character.x > 80 && !this.characterOutOfZone) {
                        this.characterOutOfSafeZone = true;
                    } if (this.characterOutOfSafeZone) {
                        this.move('left', this.speed + 2)
                        this.ifGoInVoid(-100, 3400)
                    }
                }
            }
        }, 1000 / 60);
    }

    /**
     * Animates the movement of the chicken.
     */

    chickenAnimation() {
        setInterval(() => {
            if (this.isDead()) {
                this.setChickenDeath()
            } else {
                this.setChickenMovment()
            }
        }, 1000 / 8);
    }

    /**
     * Sets the animation for the chicken's movement.
     */

    setChickenMovment() {
        this.animate(this.images.chicken.IMAGES_CHICKEN, this.currentImage)
        this.currentImage++
    }

    /**
     * Sets the animation for the chicken's death.
     */

    setChickenDeath() {
        this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png')
    }
}