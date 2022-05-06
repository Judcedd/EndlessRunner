class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    preload() {
        this.load.path = "./assets/";
        this.load.image('1', '1.png');
        this.load.image('2', '2.png');
        this.load.image('player','player.png');
        this.load.image('floor','floor.png');
        this.load.image('monster','monster.png');
        this.load.image('bat','bat.png');
       
    }

    create() { 
        // define keys
        this.jump_sound = this.sound.add('jump');
        this.sit = this.sound.add('sit');
        this.bgm1 = this.sound.add('bgm1');
        this.bgm2 = this.sound.add('bgm2');

        // add background music
        this.bgm1.play();

        // adding keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        
        // setting values
        this.jumpSpeed = -1000;
        this.changedSpeed = 5;
        this.speeding = 1;
        this.physics.world.gravity.y = 2600; 

        this.scenes = this.add.tileSprite(0, 0, game.config.width, game.config.height, '1').setOrigin(0);

        this.ground = this.add.group();
        this.enemy = this.add.group();

        // initial player setting
        this.player = this.physics.add.sprite(50, 450, 'player').setOrigin(0.5,0.5);

        // player state
        this.playerState = 1;

        // make ground tiles
        for(let i = 0; i < game.config.width; i += tileSize) { 
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize,  'floor').setScale(SCALE).setOrigin(0);
            let groundTile2 = this.physics.add.sprite(i, game.config.height - tileSize+10,  'floor').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            groundTile2.body.immovable = true;
            groundTile2.body.allowGravity = false;
            groundTile.setDepth(1);
            groundTile2.setDepth(1);
            this.ground.add(groundTile);
            this.ground.add(groundTile2);
        }
        

        // create monster(the big one)
        this.monster = this.physics.add.sprite(game.config.width, 455 ,  'monster').setOrigin(0);
        this.hood = this.physics.add.sprite(game.config.width+30, 445 ,  'monster').setOrigin(0.5,0.5);
        this.hood.setSize(50,60);
        this.hood.setDisplaySize(60,50);
        this.monster.body.allowGravity = false;
        this.hood.body.allowGravity = false;
        this.hood.body.immovable = true;
        

        // monster2 (the smaller one)
        this.bat =  this.physics.add.sprite(game.config.width, Math.random()*(425-380)+380,  'bat').setOrigin(0);
        this.bat.body.allowGravity = false;
        
        // add enemies to group
        this.enemy = this.add.group();
        this.bats = this.add.group();
        this.enemy.add(this.monster);
        this.enemy.add(this.bat);
        this.bats.add(this.bat)
        
        
        
        // player's physical settings
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.monster, this.ground);
        this.physics.add.collider(this.monster,  this.player, ()=>{
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            this.playerState--;
        });
        this.physics.add.collider(this.bats, this.player, ()=>{
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            this.playerState--;
        });
        this.physics.add.collider(this.player, this.hood, ()=>{
            this.player.body.setVelocityY(0);
            this.player.body.setVelocityX(-1*this.hood.body.velocity.x+300);
        });

        // game over flag
        this.gameOver = false;
        

        // speed setting
        this.monster.body.setVelocityX(-300);
        this.hood.body.setVelocityX(-300);
        this.bat.body.setVelocityX(-400);

        // setting a countdown 
        this.clock = this.time.delayedCall(15000, () => {
           
        }, null, this);
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
        this.timerRight = this.add.text(game.config.width/2-8, 12, + this.clock.getElapsedSeconds(), textConfig);

        // change to the next scene, speeding up
        this.scene2 = this.time.delayedCall(5000, () => {
            this.bgm1.stop();
            this.bgm2.play();
            this.player.setDepth(1);
            this.bat.setDepth(1);
            this.monster.setDepth(1);
            this.hood.setDepth(1);
            this.scenes.setDepth(0);
            this.scenes = this.add.tileSprite(0, 0, game.config.width, game.config.height, '2').setOrigin(0);
            this.scenes.setDepth(0);
            this.changedSpeed += 10;
            this.speeding = 2;
            }, null, this);
            this.state= "behind"

    }
    update() {
        
        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            this.sound.play('blip');
            this.scene.start('playScene');
            this.bgm1.stop();
            this.bgm2.stop();
    }
            
        // game ending handling
        if(this.gameOver){

            this.scene.start('menuScene');
            this.bgm1.stop();
            this.bgm2.stop();
        }


        if(!this.gameOver){
            this.scenes.tilePositionX += this.changedSpeed;
            this.player.onGround = this.player.body.touching.down;

            

            if(this.player.x<50){
                this.state = "behind";
            
            }else if(this.player.x>70){
               this.state = "ahead";
            }
            else{
                this.state = "zone";
            }
            
            if(this.player.onGround){
                this.jump = 1;
                this.jumping=false;
                
                
            
            }
         
            switch(this.state){
                case "behind":
                    this.player.body.velocity.x =20;
                    break;
                case "ahead":
                    this.player.body.velocity.x =-20;
                    break;
                case "zone":
                    this.player.body.velocity.x = 0;

            }
          

            // jumping control
            if(this.jump>0 && Phaser.Input.Keyboard.DownDuration(keyUP,100)&&!keyDOWN.isDown) {
         
                this.jump_sound.play();
                this.player.body.setVelocityY(-800);
                this.jumping=true;
            }
            if(this.jumping && keyDOWN.isUp) {
 
                this.jump--;
                this.jumping = false;
            }


            // change setting while jumping to scene2
            if(this.monster.body.x <-200){
                this.monster_reset();
            }
            
            if(this.bat.body.x <-200||this.bat.body.velocity.x==0){
                this.bat_reset();
            }
            
            if((this.bat.tilePositionX-this.monster.tilePositionX)>-100||(this.monster.tilePositionX-this.bat.tilePositionX)>-100){
                this.bat.body.velocity.x+=30;
            }

            if(keyDOWN.isDown){
                if(Phaser.Input.Keyboard.JustDown(keyDOWN)){
                   this.sit.play(); 
              
                }
                // initial size
                this.player.setSize(75,50);
                // changing size
                this.player.setDisplaySize(40,30);
                
                if(!this.jumping){
                this.player.body.setVelocityY(700);
                }
            }


            // player's state after pressing DOWN
            if(Phaser.Input.Keyboard.JustUp(keyDOWN)||this.player.y>game.config.height){
              
                this.player.body.setVelocityY(0);
              
                // jumping high after pressing keyDOWN
                this.player.y = 450;
                // player's position after pressing keyDOWN
                this.player.setSize(50,75);
                // player's scale after pressing keyDOWN
                this.player.setDisplaySize(45,70);

            }

            if(this.playerState <= 0||this.player.x<-30){
                
                this.gameOver = true;
            }
        }
        
        this.time1 = Math.trunc(15 - this.clock.getElapsedSeconds());
        this.timerRight.text = this.time1;

        
    }


    bat_reset(){
        this.bat.destroy();
        this.bat =  this.physics.add.sprite(game.config.width, Math.random()*(425-380)+380,  'bat').setOrigin(0);
        this.bat.body.allowGravity = false;
        this.bat.x = game.config.width+50;
        this.bat.setVelocityY(0);
        this.bat.setVelocityX((-1*((Math.random()*(500-400)+400)))*this.speeding);
        this.bat.y = Math.random()*(425-380)+380;
        this.bats.add(this.bat);

    }



    monster_reset(){
        this.monster.x = game.config.width+50;
        this.num = (-1*((Math.random()*(500-300)+300)))*this.speeding;
        this.monster.body.setVelocityX(this.num);
        this.hood.x = this.monster.x+30;
        this.hood.body.setVelocityX(this.num);

    }

}