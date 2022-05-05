class Rules extends Phaser.Scene {
    constructor() {
      super("rulesScene");
    }

    preload() {
        this.load.image('city', './assets/bg.png');
    }

    create() {
        let textConfig = {
            fontFamily: 'Alagard',
            fontSize: '90px',
            color: '#5C44C2',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        let dropshadow = {
            fontFamily: 'Alagard',
            fontSize: '90px',
            color: '#221A49',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.sfx_select = this.sound.add('select');
        this.cityscape = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'city').setOrigin(0);

        this.add.text(game.config.width/2 + 4, game.config.height/2 - 176, 'RunPocalypse', dropshadow).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - 180, 'RunPocalypse', textConfig).setOrigin(0.5);

        textConfig.fontSize = '40px';
        textConfig.color = '#000000';
        dropshadow.fontSize = '40px';
        dropshadow.color = '#505050';


        textConfig.color = '#ffffff';
        this.add.text(game.config.width/2+2, game.config.height+2, 'Press SPACE to Play', dropshadow).setOrigin(0.5,1);
       

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sfx_select.play();
            this.scene.start('playScene');    
        }
    }
}