/** Connect to Moralis server */
const serverUrl = "https://5iod3lrqrtc2.usemoralis.com:2053/server";
const appId = "ksAzHZscHJAMrd9qFFWyoQ5pwShCnRW32CEjplFe";
Moralis.start({ serverUrl, appId });

/** Add from here down */
document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
       physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

  

//var game = new Phaser.Game(config);
var platforms;
var player;
var cursor;
var game;
 
function launch(){
        let user = Moralis.User.current();
        if (!user) {
          console.log("PLEASE LOG IN WITH METAMASK!!")
        }
        else{
          console.log(user.get("ethAddress") + " " + "logged in")
          game = new Phaser.Game(config);
          
        }

      }

      //launch();



function preload ()
{
    this.load.image('background', 'Assets/BG.png');
    this.load.image('ground', 'Assets/Tile/2.png');
    this.load.image('player', 'Assets/Characters/dog/Idle (1).png');
    
}

function create ()
{

cursors = this.input.keyboard.createCursorKeys();
    
this.add.image(400, 300, 'background').setScale(0.65);

platforms = this.physics.add.staticGroup();
platforms.create(600,400, 'ground').setScale(0.5).refreshBody();
platforms.create(665,400, 'ground').setScale(0.5).refreshBody();
platforms.create(535,400, 'ground').setScale(0.5).refreshBody();
platforms.create(730,400, 'ground').setScale(0.5).refreshBody();

player = this.physics.add.sprite(600, 250, 'player').setScale(0.2).refreshBody();

player.setBounce(0.2);
player.setCollideWorldBounds(true);

this.physics.add.collider(player, platforms);


/*
this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
});

this.anims.create({
    key: 'turn',
    frames: [ { key: 'dude', frame: 4 } ],
    frameRate: 20
});

this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
});
*/

}

function update ()
{
 if (cursors.left.isDown)
{
    player.setVelocityX(-160);

    
}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);


}
else
{
    player.setVelocityX(0);

   
}

if (cursors.up.isDown && player.body.touching.down)
{
    player.setVelocityY(-330);
}
}

async function login() {
  let user = Moralis.User.current();
  if (!user) {
   try {
      user = await Moralis.authenticate({ signingMessage: "Hello World!" })
      launch();
      console.log(user)
      console.log(user.get('ethAddress'))
   } catch(error) {
     console.log(error)
   }
  }
}

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
  location.reload();
}


/** Useful Resources  */

// https://docs.moralis.io/moralis-server/users/crypto-login
// https://docs.moralis.io/moralis-server/getting-started/quick-start#user
// https://docs.moralis.io/moralis-server/users/crypto-login#metamask

/** Moralis Forum */

// https://forum.moralis.io/