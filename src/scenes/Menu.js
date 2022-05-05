class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image('1', '1.png');
        this.load.audio('hit', 'hit.wav');
        this.load.audio('jump', 'jump.wav');
        this.load.audio('select', 'select.wav');
        this.load.audio('duck', 'duck.wav');
        this.load.audio('slide', 'sliding.wav');
        this.load.audio('bgm', 'initial_background.wav');
        this.load.audio('background', 'scene2.wav');
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
        
        this.scenes = this.add.tileSprite(0, 0, game.config.width, game.config.height, '1').setOrigin(0);

        this.add.text(game.config.width/2, game.config.height/4, 'Forest Runner', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '40px';
        menuConfig.color = '#6699ff';
        this.add.text(game.config.width/2, game.config.height/1.9, 'LEFT To Start', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.7, 'RIGHT for Details', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.5, 'SPACE for Rules', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.3, 'F To Re-Start after beginning', menuConfig).setOrigin(0.5);

        // define keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('select');
            this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.sound.play('select');
            this.scene.start('detailsScene'); 
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('select');
            this.scene.start('rulesScene');
        }

    }
}
