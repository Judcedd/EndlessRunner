class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image('1', '1.png');
        this.load.audio('jump', 'jump.wav');
        this.load.audio('blip', 'blip.wav');
        this.load.audio('sit', 'sit.wav');
        this.load.audio('bgm1', 'initial_background.wav');
        this.load.audio('bgm2','scene2.wav');
        
    }
    create() {
        let menuConfig = {
            fontFamily: 'Fantasy',
            fontSize: '90px',
            color: '#6600ff',
            align: 'center',
            padding: {
                top: 5,
                bottom: 15,
            },
            fixedWidth: 0
        }
        
        // load background
        this.scenes = this.add.tileSprite(0, 0, game.config.width, game.config.height, '1').setOrigin(0);

        // title 
        this.add.text(game.config.width/2, game.config.height/4, 'Forest Runner', menuConfig).setOrigin(0.5);

        // other texts config
        menuConfig.fontSize = '40px';
        menuConfig.color = '#6699ff';
        menuConfig.fontFamily = 'Courier';

        // other texts
        this.add.text(game.config.width/2, game.config.height/2.5, 'LEFT To Start', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.8, 'RIGHT for Details', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.4, 'SPACE for Rules', menuConfig).setOrigin(0.5);

        // keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('blip');
            this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.sound.play('blip');
            this.scene.start('detailsScene'); 
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('blip');
            this.scene.start('rulesScene');
        }

    }
}