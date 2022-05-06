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
      
        // sound effect & image
        this.sfx_select = this.sound.add('blip');
        this.scenes = this.add.tileSprite(0, 0, game.config.width, game.config.height, '1').setOrigin(0);

        // detail contents
        textConfig.fontSize = '30px';
        textConfig.color = '#6666ff';

        this.add.text(game.config.width/2, game.config.height/3, 'Game Name: Forest Runner', textConfig).setOrigin(0.5,1);
        this.add.text(game.config.width/2, game.config.height/2, 'Date Completed: 5/4/2022', textConfig).setOrigin(0.5,1);
        this.add.text(game.config.width/2, game.config.height/1.5, 'Creative Tilt: See README !!', textConfig).setOrigin(0.5,1);
        this.add.text(game.config.width/2, game.config.height/1.2, 'Collaborator: Qinglan Li + Yiye Zhu + Zhenglin Feng', textConfig).setOrigin(0.5,1);


        // bottom text size & color
        textConfig.fontSize = '40px';
        textConfig.color = '#ccff99';
        this.add.text(game.config.width/2, game.config.height, 'Press R for Menu', textConfig).setOrigin(0.5,1);

        // keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.sfx_select.play();
            this.scene.start('menuScene');    
        }
    }
}