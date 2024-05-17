/**
 * Represents a status bar for displaying health.
 * @extends DrawableObjects
 */

class Statusbar extends DrawableObjects {

    /**
     * Creates an instance of Statusbar.
     */

    constructor() {
        super();
        this.loadImages(this.images.statusbars.STATUSBAR_HEALTH);
        this.setHealthbar(5);
        this.x = 20;
        this.y = 0;
    }

    /**
     * Sets the health bar image based on the health value.
     * @param {number} health - The health value.
     */

    setHealthbar(health) {
        let path = this.images.statusbars.STATUSBAR_HEALTH[health];
        this.img = this.imageCache[path];
    }
}

/**
 * Represents a status bar for displaying salsa count.
 * @extends DrawableObjects
 */

class Salsabar extends DrawableObjects {

    /**
     * Creates an instance of Salsabar.
     */

    constructor() {
        super();
        this.loadImages(this.images.statusbars.STATUSBAR_SALSA);
        this.setSalsabar(0);
        this.x = 20;
        this.y = 50;
    }

    /**
     * Sets the salsa bar image based on the salsa count.
     * @param {number} salsa - The salsa count.
     */

    setSalsabar(salsa) {
        let path = this.images.statusbars.STATUSBAR_SALSA[salsa];
        this.img = this.imageCache[path];
    }
}

/**
 * Represents a status bar for displaying coin count.
 * @extends DrawableObjects
 */

class Coinbar extends DrawableObjects {

    /**
     * Creates an instance of Coinbar.
     */

    constructor() {
        super();
        this.loadImages(this.images.statusbars.STATUSBAR_COINS);
        this.setCoinbar(0);
        this.x = 20;
        this.y = 100;
    }

    /**
     * Sets the coin bar image based on the coin count.
     * @param {number} Coins - The coin count.
     */

    setCoinbar(Coins) {
        let path = this.images.statusbars.STATUSBAR_COINS[Coins];
        this.img = this.imageCache[path];
    }
}

/**
 * Represents a status bar for displaying end boss health.
 * @extends DrawableObjects
 */

class Endbossbar extends DrawableObjects {

    /**
     * Creates an instance of Endbossbar.
     * @param {number} x - The x-coordinate of the end boss bar.
     * @param {number} y - The y-coordinate of the end boss bar.
     */

    constructor(x, y) {
        super();
        this.loadImages(this.images.statusbars.STATUSBAR_BOSS);
        this.setBossbar(5);
        this.x = x;
        this.y = y - 20;
    }

    /**
     * Sets the end boss bar image based on the health value.
     * @param {number} health - The health value of the end boss.
     */
    
    setBossbar(health) {
        let path = this.images.statusbars.STATUSBAR_BOSS[health];
        this.img = this.imageCache[path];
    }
}