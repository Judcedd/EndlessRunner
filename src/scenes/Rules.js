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
      
        this.sfx_select = this.sound.add('select');
        this.scenes = this.add.tileSprite(0, 0, game.config.width, game.config.height, '1').setOrigin(0);

        textConfig.color = '#99ffff';
        this.add.text(game.config.width/2, game.config.height/1.1, 'Press SPACE to Play').setOrigin(0.5,1);
       

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sfx_select.play();
            this.scene.start('playScene');    
        }
    }
}
