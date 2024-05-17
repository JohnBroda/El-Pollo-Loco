/**
 * Represents a level in the game.
 */

class Level {

    /**
     * Creates an instance of Level.
     * @param {Array} enemies - An array of enemy objects in the level.
     * @param {Array} clouds - An array of cloud objects in the level.
     * @param {Array} backgroundObjects - An array of background objects in the level.
     * @param {Array} air - An array of air objects in the level.
     * @param {Array} salsa - An array of salsa objects in the level.
     * @param {Array} coins - An array of coin objects in the level.
     */

    constructor(enemies, clouds, backgroundObjects, air,  salsa, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.air = air;
        this.backgroundObjects = backgroundObjects;
        this.salsa = salsa;
        this.coins = coins;
        this.level_end_x = 2950;
    }

}