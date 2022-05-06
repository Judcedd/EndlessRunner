let config = {
    type: Phaser.CANVAS,
    width: 840,
    height: 525,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Menu, Play, Details, Rules]
};

let game = new Phaser.Game(config);

let keyUP, keyRIGHT, keyLEFT, keySPACE, keyR, keyDOWN, keyF;

const SCALE = 0.5;

const tileSize = 26;




