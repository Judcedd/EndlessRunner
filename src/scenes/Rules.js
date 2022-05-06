class Rules extends Phaser.Scene {
    constructor() {
      super("rulesScene");
    }

    preload() {
        this.load.image('1', './assets/1.png');
    }

    create() {
        let textConfig = {
            fontFamily: 'Fantasy',
            fontSize: '90px',
            color: '#5C44C2',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
      
        // sound effect & image
        this.sfx_select = this.sound.add('blip');
        this.scenes = this.add.tileSprite(0, 0, game.config.width, game.config.height, '1').setOrigin(0);

        // title
        textConfig.fontSize = '30px';
        textConfig.color = '#33ccff';
        this.add.text(game.config.width/2, game.config.height/6, 'Welcome to Forest Runner!!', textConfig).setOrigin(0.5);

        // rules contents
        textConfig.fontSize = '26px';
        textConfig.color = '#6633ff';

        this.add.text(game.config.width/2, game.config.height/3, 'Press UP for jumping, DOWN for zooming out', textConfig).setOrigin(0.5,1);
        this.add.text(game.config.width/2, game.config.height/2, 'Speeding up after 15 seconds!!', textConfig).setOrigin(0.5,1);
        this.add.text(game.config.width/2, game.config.height/1.5, 'Press F to Re-Start the game after beginning', textConfig).setOrigin(0.5,1);
        this.add.text(game.config.width/2, game.config.height/1.2, 'Good Luck!!', textConfig).setOrigin(0.5,1);

        // text size & color
        textConfig.fontSize = '40px';
        textConfig.color = '#ccff99';

        // bottom text contents
        this.add.text(game.config.width/2, game.config.height, 'Press SPACE To Start the Game!!', textConfig).setOrigin(0.5,1);

        // keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sfx_select.play();
            this.scene.start('playScene');    
        }
    }
}