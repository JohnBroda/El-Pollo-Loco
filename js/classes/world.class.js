/**
 * Represents the game world, handling all gameplay elements such as drawing, collisions,
 * and game state management.
 */

class World {
    camera_x = 0;
    audio = new AUDIO()
    character = new Character(winLose(), gameOn)
    statusBar = new Statusbar()
    salsaBar = new Salsabar()
    coinBar = new Coinbar()
    bossBar = [new Endbossbar()]
    throwableObjects = [];
    level = level1;
    gameOver = false
    canvas;
    ctx;
    keyboard;
    lastRemove = 0;

    /**
    * Creates an instance of World.
    * @param {HTMLCanvasElement} canvas - The canvas on which the game will be drawn.
    */

    constructor(canvas) {
        this.ctx = canvas.getContext('2d')
        this.canvas = canvas;
        this.draw();
        this.checkCollisions();
        this.setWorld();
    }

    /**
     * Sets the world for all enemies and the character.
     */

    setWorld() {
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
        this.character.world = this;
    }

    /**
     * Regularly checks for collisions between game entities.
     */

    checkCollisions() {
        setInterval(() => {
            this.setWorld();
            if (this.character.health > 0 && !this.gameOver) {
                this.characterCollision()
            }
            this.bottleCollision()
            this.salsaCollision()
            this.CoinCollision()
            if (gameOn) {
                world.audio.backgroundmusic[0].play()
                world.audio.backgroundmusic[0].volume = 0.05
            }
        }, 1000 / 30);
    }

    /**
     * Checks and handles collisions between the character and salsa.
     */

    salsaCollision() {
        this.level.salsa.forEach(salsa => {
            if (salsa.isColliding(this.character)) {
                this.audio.collectables[1].volume = 0.6
                this.audio.collectables[1].play()
                this.level.salsa.splice(salsa, 1)
                this.character.salsaCount += 2
            }
        });
    }

    /**
     * Checks and handles collisions between the character and coins.
     */

    CoinCollision() {
        this.level.coins.forEach(coins => {
            if (coins.isColliding(this.character)) {
                this.audio.collectables[0].play()
                this.level.coins.splice(coins, 1)
                this.character.coinCount++
                this.character.damage++
            }
        });
    }

    /**
     * Checks and handles collisions between throwable objects and enemies.
     */

    bottleCollision() {
        const currentTime = Date.now();
        this.level.enemies.forEach(enemy => {
            if (this.throwableObjects[0] && this.throwableObjects[0].isColliding(enemy)) {
                const i = this.level.enemies.indexOf(enemy);
                this.throwableObjects[0].health--
                this.destroyBottleOnCollision()
                this.removeCooldown(currentTime, i)
            }
        });
    }

    /**
     * Handles the logic of removing an enemy from the level with a cooldown to avoid rapid removals.
     * @param {number} currentTime - The current time used to handle cooldown logic.
     * @param {number} i - The index of the enemy in the enemies array.
     */

    removeCooldown(currentTime, i) {
        if (currentTime - this.lastRemove > 1500) {
            this.level.enemies[i].hit(this.character.damage)
            this.removeEnemy(i)
            this.audio.throwableobjects[1].play()
            this.lastRemove = currentTime;
        }
    }

    /**
     * Removes an enemy from the game if conditions are met.
     * @param {number} i - The index of the enemy to be removed.
     */

    removeEnemy(i) {
        if (this.level.enemies[i].health < 1) {
            if (this.level.enemies[i].chicken) {
                this.remove(i, this.audio.chicken[0].play(), false)
            }
            if (this.level.enemies[i].chick) {
                this.remove(i, this.audio.chick[0].play(), false)
            }
            if (this.level.enemies[i].chickenBoss) {
                this.remove(i, this.audio.chickenboss[3].play(), true)
            }
        }
    }

    remove(i, sound, endboss) {
        sound
        this.level.enemies[i].health = 0;
        this.level.enemies[i].damage = 0;
        setTimeout(() => {
            this.level.enemies.splice(i, 1);
            if (endboss) {
                this.audio.backgroundmusic[0].pause()
                this.gameOver = true
                gameOn = false
                winLose(world.audio.backgroundmusic[2], 'rgba(0, 143, 55, 0.85)', 'img/9_intro_outro_screens/game_win/gamewin.png')
            }
        }, 300);
    }

    /**
     * Handles the destruction of a throwable object on collision.
     */

    destroyBottleOnCollision() {
        if (this.throwableObjects[0].health < 1) {
            this.throwableObjects[0].health = 0
            this.throwableObjects[0].speedY = 0
            this.throwableObjects[0].speedX = 0
            setTimeout(() => {
                this.throwableObjects.splice(0, 1)
            }, 215);
        }
    }

    /**
     * Checks and handles collisions where the character is involved.
     */

    characterCollision() {
        this.level.enemies.forEach(enemy => {
            const currentTime = Date.now();
            let enemyTop = enemy.y;
            let enemyTopAreaHeight = enemy.height * 0.3;
            const i = this.level.enemies.indexOf(enemy);
            if (this.character.isCollidingTopOnly(enemy, enemyTop, enemyTopAreaHeight)) {
                this.characterJumpKillCollission(currentTime, i)
            } else if (this.character.isColliding(enemy)) {
                this.character.hit(this.level.enemies[i].damage);
                this.characterKnockback(enemy)
            }
        });
    }

    /**
    * Handles the collision between the character and an enemy when the character performs a jump kill.
    * @param {number} currentTime - The current time in milliseconds.
    * @param {number} i - The index of the enemy in the enemies array.
    */

    characterJumpKillCollission(currentTime, i) {
        if (currentTime - this.lastRemove > 400) {
            this.audio.character[4].play()
            this.level.enemies[i].hit(this.character.damage)
            this.removeEnemy(i)
            this.lastRemove = currentTime;
            this.character.speedY = 8
        }
    }

    /**
    * Handles the knockback effect on the character when hit by an enemy.
    * @param {Object} enemy - The enemy object that collided with the character.
    */

    characterKnockback(enemy) {
        if (enemy.x > this.character.x && this.character.x > 80) {
            this.character.speedY = 3
            this.character.speedX = 8
        } else if (enemy.x < this.character.x && this.character.x < 3000) {
            this.character.speedY = 3
            this.character.speedX = -8
        }
    }

    /**
     * Renders all game elements on the canvas.
     */

    draw() {
        this.ctx.clearRect(0, 0, canvas.height, canvas.width)

        this.ctx.translate(this.camera_x, 0)
        this.drawOnjectsAndEntities()
        this.loadMultipleOnMap(this.throwableObjects)
        this.drawStatusBar()
        this.ctx.translate(-this.camera_x, 0)

        self = this
        requestAnimationFrame(function () {
            self.draw();
        });
    };

    drawOnjectsAndEntities() {
        this.loadMultipleOnMap(this.level.air)
        this.loadMultipleOnMap(this.level.backgroundObjects)
        this.loadMultipleOnMap(this.level.clouds)
        this.loadMultipleOnMap(this.level.salsa)
        this.loadMultipleOnMap(this.level.coins)
        this.loadMultipleOnMap(this.level.enemies)
        this.addToMap(this.character)
    }

    drawStatusBar() {
        this.loadMultipleOnMap(this.bossBar)
        this.ctx.translate(-this.camera_x, 0)
        this.addToMap(this.statusBar)
        this.addToMap(this.coinBar)
        this.addToMap(this.salsaBar)
        this.ctx.translate(this.camera_x, 0)
    }

    /**
    * Helper method to draw multiple game objects on the map.
    * @param {Array} arrays - Array of game objects to be drawn.
    */

    loadMultipleOnMap(arrays) {
        arrays.forEach(objects => {
            this.addToMap(objects)
        });
    }

    /**
    * Helper method to add a single game object to the map.
    * @param {Object} all - The game object to be added.
    */

    addToMap(all) {
        this.flipImg(all)
        all.draw(this.ctx)
        this.flipImgBack(all)
    }

    /**
    * Flips the image of a game object if its orientation is to the other direction.
    * @param {Object} all - The game object whose image may need flipping.
    */

    flipImg(all) {
        if (all.otherDirection) {
            this.ctx.save();
            this.ctx.translate(all.width, 0);
            this.ctx.scale(-1, 1)
            all.x = all.x * -1;
            this.character.flipThorwableBottle()
        }
    }

    /**
     * Restores the original orientation of a flipped game object's image.
     * @param {Object} all - The game object whose image was flipped.
     */

    flipImgBack(all) {
        if (all.otherDirection) {
            all.x = all.x * -1;
            this.ctx.restore();
        }
    }
}