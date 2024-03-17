const cnv = document.querySelector('#cnvs');
const ctx = cnv.getContext("2d");

//Переменные
let crArrX = [75, 155];
let crArrY = [20, 86];
let crocX = 0;
let crocY = 0;
let isScream = false;
let seconds = 0;
let minets = 0;
let ziroSec = "0";
let ziroMin = "0"
let isTick = false;
let onCroc = 1;
let isPlay = false

let arrAgr = [0,1,2,3,4]

//Картинки и звуки
const crocodile = new Image();
crocodile.src = "./img/crocadile.png";

const evilCrocodile = new Image();
evilCrocodile.src = "./img/evilCrocodile.png"

const player = new Image();
player.src = "./img/player.png";

const backround = new Image();
backround.src = "./img/water.gif"

const scream = new Audio();
scream.src = "./audio/scream.mp3"

const music = new Audio();
music.src = "./audio/croc_music.mp3";

const tick = new Audio();
tick.src = "./audio/tick.mp3";

const jump = new Audio();
jump.src = "./audio/jump.mp3"

//Координаты картинок
class GameObject {
    constructor(sr,x,y,width,height) {
        this.sr = sr
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height
    }
    isGameObject = true;
}

let cr = new GameObject(crocodile,60,4,70,65);
let cr_2 = new GameObject(crocodile,140,4,70,65);
let cr_3 = new GameObject(crocodile,60,80,70,65);
let cr_4 = new GameObject(crocodile,140,80,70,65);
let pl = new GameObject(player,crArrX[crocX],crArrY[crocY],35,25)


async function Game() {
    await ctx.clearRect(0,0,cnv.width,cnv.height)
    await ctx.drawImage(cr.sr, cr.x,cr.y, cr.width, cr.height);
    await ctx.drawImage(cr_2.sr,cr_2.x, cr_2.y, cr_2.width, cr_2.height);
    await ctx.drawImage(cr_3.sr,cr_3.x, cr_3.y, cr_3.width, cr_3.height);
    await ctx.drawImage(cr_4.sr,cr_4.x, cr_4.y, cr_4.width, cr_4.height);
    await ctx.drawImage(pl.sr,crArrX[crocX], crArrY[crocY], pl.width, pl.height);
}
let game;
  requestIdleCallback(()=>{
    game = setInterval(()=>{
        Game();
        document.querySelector('#time').innerHTML = `${ziroMin}${minets}:${ziroSec}${seconds} / 04:00`;
        if(minets >= 4) {
            Win()
        }
    },10)

});


document.addEventListener('click',()=>{
    isTick = true
    isPlay = true
    if(isPlay) {
        music.play();
        setInterval(()=>{
            music.play()
        },21000)
    }
   
})
function onKey(e) {
    isPlay = true
    jump.play()
    isTick = true;
    if(isPlay) {
        music.play();
    }
   
    setInterval(()=>{
        music.play();
    },20000)
    if(e.keyCode == 65) {
        crArrX[crocX-=1]
    }
    if(e.keyCode == 68) {
        crArrX[crocX+=1]
    }
    if(e.keyCode == 83) {
        crArrY[crocY+=1]
    }
    if(e.keyCode == 87) {
        crArrY[crocY-=1]
    }
    if(crocX >= 2 && e.keyCode == 68) {
        Dead();
    }
    if(crocX < 0 && e.keyCode == 65) {
        Dead();
    }
    if(crocY < 0 && e.keyCode == 87) {
        Dead();
    }
    if(crocY >=2 && e.keyCode == 83) {
        Dead();
    }
}

document.addEventListener('keydown', onKey);
function Dead() {
   jump.volume = 0;
   music.volume = 0;
   tick.volume = 0;
    isPlay = false
    if(!isScream) {
        scream.play();
    }
    if(!isPlay) {
        music.pause()
    }
    clearInterval(timeEnd);
    clearInterval(game);
    localStorage.setItem("yesdTimeMin", minets);
    localStorage.setItem("yesdTimeSec", seconds);
    document.querySelector('#deadModal').showModal();
    delete Dead;
    Dead = ()=>{}
}
let timeEnd = setInterval(()=>{
    if(isTick) {
        tick.play()
    }

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
    //j
    document.querySelector('#time').innerHTML = `${ziroMin}${minets}:${ziroSec}${seconds} / 03:00`
},1000)

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
        
//Логика
let timeAgr = 5000;
let a,b,c,d

setInterval(()=>{
    if(crocX == 0 && crocY == 0) {
        onCroc = 1;
    }
    if(crocX == 1 && crocY == 0) {
        onCroc = 2
    }
    if(crocX == 0 && crocY == 1) {
        onCroc = 3
    }
    if(crocX == 1 && crocY == 1) {
        onCroc = 4
    }
},10)
setInterval(()=>{
    let agrEl = arrAgr[Math.floor(Math.random()*5)];
    if(agrEl == 0) {
        cr_2.sr,cr_3.sr,cr_4.sr,cr.sr = crocodile
        document.querySelector('#cr').innerHTML = "Никакой";
        timeAgr -= 200
    }
    if(agrEl == 1) {
        cr_2.sr,cr_3.sr,cr_4.sr = crocodile
        cr.sr = evilCrocodile;
        document.querySelector('#cr').innerHTML = "Первый крокодил";
        timeAgr -= 200
        setTimeout(()=>{
       a =  setInterval(()=>{
            if(onCroc == 1) {
                Dead()
            }
           },10) 
        },1000)
    }
    if(agrEl == 2) {
        cr.sr,cr_3.sr,cr_4.sr = crocodile
        cr_2.sr = evilCrocodile;
        document.querySelector('#cr').innerHTML = "Второй крокодил";
        timeAgr -= 200
        setTimeout(()=>{
             b = setInterval(()=>{
                if(onCroc == 2) {
                    Dead()
                }
            },10)
     
        },1000)
    }
    if(agrEl == 3) {
        cr.sr,cr_2.sr,cr_4.sr = crocodile
        cr_3.sr = evilCrocodile;
        document.querySelector('#cr').innerHTML = "Третий крокодил";
        timeAgr -= 200
        setTimeout(()=>{
             c = setInterval(()=>{
                if(onCroc == 3) {
                    Dead()
                }
            },10)  
        },1000)
    } 
    if(agrEl == 4) {
        cr.sr,cr_2.sr,cr_3.sr = crocodile
        cr_4.sr = evilCrocodile;
        document.querySelector('#cr').innerHTML = "Четвёртый крокодил";
        timeAgr -= 200
        setTimeout(()=>{
            d = setInterval(()=>{
                if(onCroc == 4) {
                    Dead()
                }
            },10)
        },1000)
    } 
    if(minets > localStorage.getItem('yesdTimeMin') && seconds > localStorage.getItem('yesdTimeSec') && localStorage.getItem('bestMin')) {
        localStorage.setItem("bestMin", minets)
        localStorage.setItem("bestSec", seconds)
    } 
    if(minets > localStorage.getItem('bestMin')) {
        localStorage.setItem('bestMin', minets);
        localStorage.setItem("bestSec", seconds)
    }
    if(minets === localStorage.getItem('bestMin') && seconds > localStorage.getItem('bestSec')) {
        localStorage.setItem('bestMin', minets);
        localStorage.setItem("bestSec", seconds)
    }
    clearInterval(a);
    clearInterval(b)
    clearInterval(c)
    clearInterval(d)
},timeAgr)
function Win() {
    localStorage.setItem('winned', true)
    Dead = ()=>{}
    clearInterval(game);
    delete Game;
    clearInterval(timeEnd)
    document.querySelector('#winModal').showModal();
    music.pause();
    tick.pause();
}
if(minets >= 4) {
    Win()
}



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
let swipe = 'never';
function handleTouchMove(evt) {
    isPlay = true
    jump.play()
    if(isPlay) {
        setInterval(()=>{
            music.play()
        },21000)
    }
    if ( ! xDown || ! yDown ) {
        return;
    }
    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;
    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
         crArrX[crocX -= 1]
         swipe = 'left'
        } else {
            crArrX[crocX += 1]
            swipe = 'right'
        }
    } else {
        if ( yDiff > 0 ) {
           crArrY[crocY -= 1]
           swipe = 'down'
        } else {
            crArrY[crocY+=1]
            swipe = 'up'
        }
    }
    xDown = null;
    yDown = null;
};
setInterval(()=>{
    if(crocX >= 2 && swipe == 'right') {
        Dead();
    }
    if(crocX < 0 && swipe == 'left') {
        Dead();
    }
    if(crocY < 0 && swipe == 'down') {
        Dead();
    }
    if(crocY >=2 &&swipe == 'up') {
        Dead();
    }
},100)
