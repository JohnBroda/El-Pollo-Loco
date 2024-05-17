/**
 * Represents the first level of the game.
 * @type {Level}
 */

const level1 = new Level(

    // Array of enemy objects in the level

    [
        new Chicken(), new Chicken(), new Chicken(), new Chick(), new Chick(),
        new Chick(), new Chick(), new Chickenboss()
    ],

    // Array of cloud objects in the level

    [
        new Cloud('./img/5_background/layers/4_clouds/1.png'),
        new Cloud('./img/5_background/layers/4_clouds/2.png'),
        new Cloud('./img/5_background/layers/4_clouds/1.png'),
    ],

    // Array of background objects in the level

    [
        new BackgroundObject(`img/5_background/layers/3_third_layer/1.png`, 0),
        new BackgroundObject(`img/5_background/layers/3_third_layer/2.png`, 767),
        new BackgroundObject(`img/5_background/layers/3_third_layer/1.png`, 767 * 2),
        new BackgroundObject(`img/5_background/layers/3_third_layer/2.png`, 767 * 3),
        new BackgroundObject(`img/5_background/layers/2_second_layer/1.png`, 0),
        new BackgroundObject(`img/5_background/layers/2_second_layer/2.png`, 767),
        new BackgroundObject(`img/5_background/layers/2_second_layer/1.png`, 767 * 2),
        new BackgroundObject(`img/5_background/layers/2_second_layer/2.png`, 767 * 3),
        new BackgroundObject(`img/5_background/layers/1_first_layer/1.png`, 0),
        new BackgroundObject(`img/5_background/layers/1_first_layer/2.png`, 767),
        new BackgroundObject(`img/5_background/layers/1_first_layer/1.png`, 767 * 2),
        new BackgroundObject(`img/5_background/layers/1_first_layer/2.png`, 767 * 3),
    ],

    // Array of air objects in the level

    [
        new Air(`img/5_background/layers/air.png`, 0), new Air(`img/5_background/layers/air.png`, 1534)
    ],

      // Array of salsa objects in the level

    [
        new Salsa('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 600),
        new Salsa('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 1300),
        new Salsa('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 1700),
        new Salsa('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 1900),
        new Salsa('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 2500),

    ],
    
    // Array of coin objects in the level

    [
        new Coin(700), new Coin(1100), new Coin(1500), new Coin(2000), new Coin(2400)
    ]
)
