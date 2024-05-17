
/**
 * Represents a chicken boss enemy.
 * @extends MovableObject
 */

class Chickenboss extends MovableObject {

    /**
     * Creates an instance of Chickenboss.
     */

    constructor() {
        super()
        this.loadAllImages()
        this.x = 3200;
        this.width = 1045 / 5
        this.height = 1217 / 5
        this.setChickenBossAnimtaion()
        this.bossChickenMovement()
        this.entitieHeight(this.height - 10)
        this.alert = false
        this.chickenBoss = true;
        this.attack;
        this.speed = 2
        this.health = 36
        this.damage = 3
    }

    /**
     * Loads all images related to the chicken boss.
     */

    loadAllImages() {
        this.loadImage(this.images.chickenboss.IMAGES_WALK_BOSS[0])
        this.loadImages(this.images.chickenboss.IMAGES_WALK_BOSS)
        this.loadImages(this.images.chickenboss.IMAGES_ALERT_BOSS)
        this.loadImages(this.images.chickenboss.IMAGES_ATTACK_BOSS)
        this.loadImages(this.images.chickenboss.IMAGES_HURT_BOSS)
        this.loadImages(this.images.chickenboss.IMAGES_DEAD_BOSS)
    }

     /**
     * Handles movement and behavior of the chicken boss.
     */

    bossChickenMovement() {
        setInterval(() => {
            if (this.isDead()) {
                this.setBossBar()
            } else {
                if (this.world && this.world.bossBar[0]) {
                    this.setBossBar()
                    this.ifOutOfSafeZone()
                }
            }
        }, 1000 / 60);
    }

     /**
     * Checks if the character is out of the safe zone and adjusts its movement.
     */

    ifOutOfSafeZone() {
        if (this.world.character.x > 2600 && !this.characterOutOfZone) {
            this.characterOutOfSafeZone = true;
        } if (this.characterOutOfSafeZone) {
            this.move('left', this.speed)
            this.ifGoInVoid(-100, 3400)
        }
    }

    /**
     * Updates the boss bar based on the chicken boss's health.
     */

    setBossBar() {
        this.world.bossBar = [new Endbossbar(this.x, this.y)]
        if (this.health == 0) {
            this.world.bossBar.splice(0, 1)
        }
        if (this.health > 0) {
            this.world.bossBar[0].setBossbar(this.setBar(this.health, 36));
        }
    }

    /**
     * Sets the animation for the chicken boss.
     */

    setChickenBossAnimtaion() {
        setInterval(() => {
            if (!this.alert) {
                this.bossChickenAlert()
            } else if (this.isDead()) {
                this.setChickenBossDeath()
            } else if (this.isHurt(500, this.lastHit)) {
                this.setChickenBossHurt()
            } else {
                this.bossWalkAndAttack()
            }
        }, 1000 / 6)
    }



    bossWalkAndAttack() {
        this.destroyWeapon()
        this.bossChickenWalk()
        this.bossChickenAttack()
    }

    /**
     * Handles the behavior of the chicken boss during the alert phase.
     */

    bossChickenAlert() {
        if (this.x > 2850) {
            this.setChickenBossWalk()
            this.currentAlertAttackImage = 0
            this.currentHurtImage = 0
        }
        if (this.x < 2850 && !this.alert) {
            this.alertIf()
        }
    }

    /**
     * Initiates the alert phase for the chicken boss.
     */

    alertIf() {
        this.world.audio.chickenboss[0].play()
        this.setChickenBossAlert()
        this.speed = 0
        this.currentImage = 0
        setTimeout(() => {
            this.alert = true
            this.attack = false
        }, 1200);
    }

    /**
     * Handles the behavior of the chicken boss during the attack phase.
     */

    bossChickenAttack() {
        if (this.attack && this.alert) {
            this.setChickenBossAttack()
            this.speed = 0
            this.world.audio.chickenboss[1].play()
            setTimeout(() => {
                this.shoot()
            }, 2100);
            setTimeout(() => {
                this.attack = false
            }, 2800);
        }
    }

    /**
     * Handles the behavior of the chicken boss during the walking phase.
     */

    bossChickenWalk() {
        if (!this.attack) {
            this.setChickenBossWalk()
            this.speed = 2
            this.currentAlertAttackImage = 0
            this.currentHurtImage = 0
            setTimeout(() => {
                this.attack = true
            }, 3000);
        }
    }

    /**
     * Sets the animation for the chicken boss during walking.
     */

    setChickenBossWalk() {
        this.animate(this.images.chickenboss.IMAGES_WALK_BOSS, this.currentImage)
        this.currentImage++
    }

    /**
     * Sets the animation for the chicken boss during the alert phase.
     */


    setChickenBossAlert() {
        this.animate(this.images.chickenboss.IMAGES_ALERT_BOSS, this.currentAlertAttackImage)
        this.currentAlertAttackImage++
    }

    /**
     * Sets the animation for the chicken boss during the attack phase.
     */

    setChickenBossAttack() {
        this.animate(this.images.chickenboss.IMAGES_ATTACK_BOSS, this.currentAlertAttackImage)
        this.currentAlertAttackImage++
    }

    /**
     * Sets the animation for the chicken boss when hurt.
     */

    setChickenBossHurt() {
        this.world.audio.chickenboss[2].play()
        this.animate(this.images.chickenboss.IMAGES_HURT_BOSS, this.currentHurtImage)
        this.currentHurtImage++
        this.speed = 0
    }

    /**
     * Sets the animation for the chicken boss when dead.
     */

    setChickenBossDeath() {
        this.animate(this.images.chickenboss.IMAGES_DEAD_BOSS, this.currentImage)
        this.currentImage++
    }

    /**
     * Creates projectiles to be fired by the chicken boss.
     */

    shoot() {
        let chickenbossesweapon = this.world.level.enemies.filter(chicken => chicken instanceof Chickenbossweapon);
        if (chickenbossesweapon.length < 3 && this.attack) {
            let chick = new Chickenbossweapon(this.x + 20, this.y + 100)
            this.world.level.enemies.push(chick)
        }
    }

    /**
     * Removes projectiles that have moved out of the game area.
     */

    destroyWeapon() {
        this.world.level.enemies = this.world.level.enemies.filter(chicken => !(chicken instanceof Chickenbossweapon && chicken.y > 480));
    }
}

/**
 * Represents a projectile fired by the chicken boss.
 * @extends MovableObject
 */

class Chickenbossweapon extends MovableObject {

    /**
     * Creates an instance of Chickenbossweapon.
     * @param {number} x - The x-coordinate of the projectile.
     * @param {number} y - The y-coordinate of the projectile.
     */

    constructor(x, y) {
        super()
        this.loadImage(this.images.chickenbossweapon.IMAGES_WEAPON[0])
        this.bossWeapon()
        this.x = x
        this.y = y
        this.applyGravity()
        this.applyKnockback()
        this.speedX = 5 + Math.random() * 10
        this.speedY = 2 + Math.random() * 5
        this.width = 150 / 6
        this.height = 200 / 6
        this.acceleration = 0.3

    }

    /**
     * Sets behavior for the projectile fired by the chicken boss.
     */

    bossWeapon() {
        setInterval(() => {
            if (this.y > 480) {
                this.health = 0
            }
        }, 1000 / 8);
    }
}