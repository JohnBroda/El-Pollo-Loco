
/**
 * Represents the main character of the game.
 * @extends MovableObject
 */

class Character extends MovableObject {

    /**
     * Creates an instance of Character.
     */

    constructor() {
        super()
        this.loadAllImages()
        this.world;
        this.characterMovmentAndStatusBar()
        this.characterAnimationInterval()
        this.applyGravity()
        this.applyKnockback()
        this.lastBottle = 0
        this.y = 200
        this.x = 40
        this.width = 122
        this.height = 240
        this.deadCount = 0
        this.Slepp = 0;
        this.salsaCount = 0
        this.coinCount = 0
        this.health = 10;
        this.speed = 5
    }

    /**
     * Loads all images required for the character animation.
     */

    loadAllImages() {
        this.loadImage(this.images.character.IMAGES_IDLE[0])
        this.loadImages(this.images.character.IMAGES_IDLE)
        this.loadImages(this.images.character.IMAGES_LONG_IDLE)
        this.loadImages(this.images.character.IMAGES_WALK)
        this.loadImages(this.images.character.IMAGES_JUMP)
        this.loadImages(this.images.character.IMAGES_HURT)
        this.loadImages(this.images.character.IMAGES_DEAD)
    }

    /**
     * Manages character movement and status bar updates.
     */

    characterMovmentAndStatusBar() {
        setInterval(() => {
            if (gameOn) {
                this.createBottle()
                this.deleteBottle()
                this.ifMove()
                this.characterCamera()
                this.world.statusBar.setHealthbar(this.setBar(this.health, 10));
                this.world.coinBar.setCoinbar(this.setBar(this.coinCount, 5))
                this.world.salsaBar.setSalsabar(this.setBar(this.salsaCount, 10))
            }
        }, 1000 / 60);
    }

    /**
     * Handles the character's camera movement.
     */

    characterCamera() {
        if (this.x < 240) {
            this.world.camera_x;
        } else if (this.x > this.world.level.level_end_x - 360) {
            this.world.camera_x;
        } else {
            this.world.camera_x = -this.x + 240;
        }
    }

    /**
    * Sets the interval for character animation.
    */

    characterAnimationInterval() {
        setInterval(() => {
            this.world.audio.character[1].pause()
            this.world.audio.character[5].pause()
            this.ifElseAnimateCharacter()
            this.currentImage++;
        }, 1000 / 8);
    }

    /**
     * Determines the character's animation based on current state.
     */

    ifElseAnimateCharacter() {
        if (this.isDead()) {
            this.ifDead()
        } else if (this.isHurt(1500, this.lastHit)) {
            this.setHurtImage()
        } else if (this.isAboveGround()) {
            this.setJumpImage()
        } else {
            this.ifWalkOrIdle()
        }
    }

    /**
     * Determines if the character should walk or be idle.
     */


    ifWalkOrIdle() {
        if (gameOn) {
            if (keyboard.RIGHT == true) {
                this.setWalkImage()
            } else if (keyboard.LEFT == true) {
                this.setWalkImage()
            } else {
                this.setIdleImage()
            }
            this.currentJumpImage = 0
        }
    }

    /**
     * Handles character death scenario.
     */

    ifDead() {
        if (this.isHurt(750, this.lastHit)) {
            this.setDeadImage()
            this.world.audio.backgroundmusic[0].pause()
            this.world.audio.chickenboss[1].volume = 0
            this.acceleration = 0.1
            this.speed = 0
            this.world.gameOver = true
            winLose(world.audio.backgroundmusic[1], 'rgba(143, 0, 0, 0.85)', 'img/9_intro_outro_screens/game_over/gameover.png')
            setTimeout(() => {
                gameOn = false
            }, 600);
        }
    }

    /**
     * Sets the character's idle animation.
     */

    setIdleImage() {
        if (this.Slepp < 50) {
            this.animate(this.images.character.IMAGES_IDLE, this.currentImage)
            this.Slepp++;
        } else {
            this.animate(this.images.character.IMAGES_LONG_IDLE, this.currentImage)
            this.world.audio.character[5].play()
        }
    }

    /**
     * Sets the character's death animation.
     */

    setDeadImage() {
        this.animate(this.images.character.IMAGES_DEAD, this.deadCount)
        this.world.audio.character[3].play()
        this.deadCount++
    }

    /**
     * Sets the character's hurt animation.
     */

    setHurtImage() {
        this.animate(this.images.character.IMAGES_HURT, this.currentImage)
        this.Slepp = 0;
        this.world.audio.character[2].play()
    }

    /**
     * Sets the character's walk animation.
     */

    setWalkImage() {
        this.animate(this.images.character.IMAGES_WALK, this.currentImage)
        this.Slepp = 0;
        this.world.audio.character[1].play()
    }

    /**
     * Sets the character's jump animation.
     */

    setJumpImage() {
        this.animate(this.images.character.IMAGES_JUMP, this.currentJumpImage)
        this.Slepp = 0;
        this.currentJumpImage++
    }

    /**
     * Handles character movement based on user input.
     */

    ifMove() {
        if (this.speedX < 2 && this.speedX > -2) {
            if (keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.move('right', this.speed)
                this.otherDirection = false;
            } else if (keyboard.LEFT && this.x > 0) {
                this.move('left', this.speed)
                this.otherDirection = true;
            }
        }
        this.ifJump()
    }

    /**
     * Handles character jumping.
     */

    ifJump() {
        if (keyboard.SPACE && !this.isAboveGround()) {
            this.jump()
            this.world.audio.character[0].currentTime = 0.6
            this.world.audio.character[0].play()
        }
    }

    /**
     * Creates throwable objects (bottles) when triggered.
     */

    createBottle() {
        if (keyboard.F == true) {
            this.Slepp = 0;
            if (this.lastBottleTime() > 1500) {
                if (this.salsaCount > 0) {
                    this.salsaCount--
                    this.world.audio.throwableobjects[0].play()
                    let bottle = new ThrowableObject(this.x + 20, this.y + 100)
                    this.world.throwableObjects.push(bottle)
                    this.lastBottle = new Date().getTime();
                }
            }
        }
    }

    /**
     * Deletes throwable objects (bottles) when they reach certain conditions.
     */

    deleteBottle() {
        this.world.throwableObjects = this.world.throwableObjects.filter(object => {
            if (object.y < 480) {
                return true;
            } else {
                return false;
            }
        });
    }

    /**
     * Calculates the time since the last bottle was thrown.
     */

    lastBottleTime() {
        let timepassed = new Date().getTime() - this.lastBottle;
        return timepassed;
    }

    /**
     * Flips the direction of the throwable bottle.
     */

    flipThorwableBottle() {
        if (this.world.throwableObjects[0] && this.lastBottleTime() < 20) {
            this.world.throwableObjects[0].otherDirection = true
        }
    }
}