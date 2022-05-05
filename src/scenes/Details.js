class Details extends Phaser.Scene {
    constructor() {
      super("detailsScene");
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
        this.cityscape = this.add.tileSprite(0, 0, game.config.width, game.config.height, '1').setOrigin(0);


        textConfig.fontSize = '40px';
        textConfig.color = '#000000';


        textConfig.color = '#ffffff';
      
        this.add.text(game.config.width/2, game.config.height, 'Press R for Menu', textConfig).setOrigin(0.5,1);

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.sfx_select.play();
            this.scene.start('menuScene');    
        }
    }
}
