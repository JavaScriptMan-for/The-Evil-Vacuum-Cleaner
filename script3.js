document.querySelector('.cnvc').style.cssText = `display: none`;
document.querySelector('canvas').style.cssText = `backround: none`

function ALL() {
    document.querySelector('#play').style.cssText = `display: none` 
    document.querySelector('.cnvc').style.cssText = `display: flex`;
     document.querySelector('video').style.cssText = `display: flex`

    const cnv = document.querySelector('#cnvs');
    const ctx = cnv.getContext("2d");
   
    //Переменные
    let scTime = [3000,5000,7000,4000,8000,6000,9000,10000,12000, 20000, 15000]
    let randSc = scTime[Math.floor(Math.random()*scTime.length)];
    let minets = 0;
    let seconds = 0;
    let ziroMin = "0";
    let ziroSec = "0";
    let cords = [80, 135, 180];
    let cords2 = [80,135,180]
    const Y = 20;
    isTick = false
    let game;
    let anim = 0.6;
    let isAsert = 1;
    let isGame = false

    //Картинки аудио видео
    const screamVideo = document.querySelector('video');
    screamVideo.src = "./video/консцена.mp4";

    const backround = new Image();
    backround.src = "./img/ground.gif"

    const screamer = new Audio();
    screamer.src = "./audio/peniviseScream.mp3"

    const player = new Image();
    player.src = "./img/player.png";

    const tick = new Audio();
    tick.src = "./audio/tick.mp3";

    const music = new Audio();
    music.src = "./audio/epic_music.mp3";

    const barr = new Image()
    barr.src = "./img/barr_1.png";

    const barr__2 = new Image();
    barr__2.src = "./img/barr_2.png";

    const scream = new Audio();
    scream.src = "./audio/scream.mp3"

     screamVideo.play();


     let randomBarr = [barr, barr__2]
    //Координаты
    class GameObject {
        constructor(src, x,y,width,height) {
            this.src = src;
            this.x = x;
            this.y = y;
             this.width = width;
             this.height = height
        }
        isGameObject = true
    }
    let pl = new GameObject(player, 180,100, 40,26);
    let barr_1 = new GameObject(randomBarr[Math.floor(Math.random()*randomBarr.length)], cords[Math.floor(Math.random()*3)], Y, 50,26)
    let barr_2 = new GameObject(randomBarr[Math.floor(Math.random()*randomBarr.length)], cords2[Math.floor(Math.random()*3)], Y, 50,26)

    ctx.drawImage(backround, 0,0, 87, 238)
 async   function Game() {
    music.play()
    await ctx.clearRect(0,0,cnv.width,cnv.height)
    await ctx.drawImage(pl.src, pl.x, pl.y, pl.width, pl.height);
    await ctx.drawImage(barr_1.src,barr_1.x, barr_1.y,barr_1.width,barr_1.height)
    await ctx.drawImage(barr_2.src, barr_2.x, barr_2.y, barr_2.width, barr_2.height)
    }
    function StartGame() {
        isGame = true
        isTick = true
        document.body.style.cssText = `filter: blur(2px) opacity(0.9) contrast(1.7);`
        document.querySelector('video').style.cssText = `display:none`;
        document.querySelector('canvas').style.backgroundImage = "url('./img/ground.gif')";
        document.querySelector('canvas').style.backgroundSize = "600"
        requestIdleCallback(()=>{
            game = setInterval(()=>{
                Game();
                document.querySelector('#time').innerHTML = `${ziroMin}${minets}:${ziroSec}${seconds} / 02:00`;
            },10)
        })
        let barrInt = setInterval(()=>{
            barr_1.y += anim
            barr_2.y += anim;

            if(barr_1.y > 130 || barr_2.y > 130) {
                barr_1.y = Y;
                barr_2.y = Y;
                isAsert += 1
                anim += 0.009
                if(isAsert % 2) {
                    barr_1.x = cords[Math.floor(Math.random()*cords.length)]
                    barr_2.x = cords2[Math.floor(Math.random()*cords2.length)]
                    barr_1.src = randomBarr[Math.floor(Math.random()*randomBarr.length)]
                    barr_2.src = randomBarr[Math.floor(Math.random()*randomBarr.length)]
                }
            }
        },10)
        document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;
let yDown = null;

function getTouches(evt) {
  return evt.touches ||             
         evt.originalEvent.touches; 
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;

    
};

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }
    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;
    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
         pl.x -= 45
        } else {
            pl.x += 45
        }
    } 
    xDown = null;
    yDown = null;
};
    }
    let timeEnd = setInterval(()=>{
        
        isTick == true ?   tick.play() : 0
      
    
        seconds += 1
        if(seconds == 60) {
            minets += 1
            seconds = 0;
        }
        if(seconds == 10) {
            ziroSec = ""
        }
        if(minets == 10) {
            ziroMin = ""
        }
        if(seconds < 10) {
            ziroSec = "0"
        }
        if(minets < 10) {
            ziroMin = "0"
    }
},1000)
   setTimeout(()=>{
        screamVideo.src = "./video/penivize.mp4";
      screamer.play();
      document.querySelector('canvas').style.cssText = `backround-image: url('./img/ground.gif')`
    setTimeout(StartGame, 2000)
     },randSc)
function onKey(e) {
    if(e.keyCode == 65) {
        pl.x -= 45;
    }
    if(e.keyCode == 68) {
        pl.x += 45
    }
}

    document.addEventListener('keydown', onKey)

function Dead() {
    document.querySelector('canvas').style.backgroundImage = "url('./img/ground_dead.gif')";
    scream.play();
    music.pause()
    music.volume = 0;
    tick.volume = 0;
     clearInterval(timeEnd);
     clearInterval(game);
     localStorage.setItem("yesdTimeMin", minets);
     localStorage.setItem("yesdTimeSec", seconds);
     document.querySelector('#deadModal').showModal();
     delete Dead;
     Dead = ()=>{}
     setInterval(()=>{
        barr_1.y = Y
         barr_2.y = Y
     },1)
}

function Win () {
    Dead = ()=>{};
    music.volume = 0;
    scream.volume = 0;
    tick.volume = 0;
    delete Dead;
    clearInterval(timeEnd);
    clearInterval(game);
    clearInterval(findDead)
    document.querySelector("#winModal").showModal();
}
  const findDead =  setInterval(()=>{
        if(pl.x == barr_1.x && barr_1.y >= pl.y - 20) {
           Dead();
        }
        if(pl.x == barr_2.x && barr_2.y >= pl.y - 20) {
            Dead();
        }
        if(pl.x == barr_1.x + 10 && barr_1.y >= pl.y - 20) {
            Dead();
        }
        if(pl.x == barr_2.x + 10 && barr_2.y >= pl.y - 20) {
            Dead();
        }
        if(pl.x == 225) {
            Dead()
        }
        if(pl.x == 45) {
            Dead()
        }
        if(minets >= 2) {
            Win()
        }
    },10)
    
 document.querySelector('#reload').addEventListener('click', ()=>{
    document.querySelector('#deadModal').close();
    document.location.reload()
})

document.querySelector('#toMainMenu').addEventListener('click', ()=>{
    document.location.href = "index.html"
})
document.querySelector('#reload_').addEventListener('click', ()=>{
    document.querySelector("#modal").close()
    setTimeout(()=>{
     document.location.reload()
    },500)
    })
 
    document.querySelector('#toMainMenu_').addEventListener('click', ()=>{
     document.querySelector("#modal").close()
      document.location.href = "index.html"
     })
     document.querySelector('#pause').addEventListener('click', ()=>{
        document.querySelector('#pauseModal').showModal()
     })
     document.querySelector("#reload__").addEventListener('click',()=>{
        document.location.reload();
     })
     document.querySelector('#toMainMenu__').addEventListener('click', ()=>{
         document.location.href = "index.html"
        })
        document.querySelector('#closeModal').addEventListener('click',()=>{
            document.querySelector('#pauseModal').close()
        })
//1
setTimeout(()=>{

    if(isGame == false) {
        alert("Баг скоро исправиться! подождите");
        screamer.play();
        document.querySelector('canvas').style.cssText = `backround-image: url('./img/ground.gif')`
        StartGame()
    }
},16000)
}

