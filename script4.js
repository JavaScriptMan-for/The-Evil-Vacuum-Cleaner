const cnv = document.querySelector('#cnvs');
const ctx = cnv.getContext("2d");

//Переменные

let minets = 0;
let seconds = 0;
let ziroMin = 0;
let ziroSec = 0

const threeCords = [0, 93, 223];
const plThreeCords = [30,130,230];
let place = 1;
let place_Crow = Math.floor(Math.random()*plThreeCords.length)
let randCords = threeCords[place_Crow];
let cr = null
const Y = 20;
let isGo = true;
let undCar;
let isTick = false;
let isCrush = true;
let crushed = 0;
let isScream = false
//Картинки и аудио
const backround = new Image();
backround.src = "./img/back_4.png";

const car = new Image();
car.src = "./img/car.png";

const player = new Image();
player.src = "./img/player.png";

const player_2 = new Image();
player_2.src = "./img/player_2).png";

const heart = new Image();
heart.src = "./img/heart.png";

const corova = new Image();
corova.src = "./img/crow.png";

const pult = new Image();
pult.src = "./img/pult.png";

const dead_crow = new Image();
dead_crow.src = "./img/dead_crow.png";

const scream = new Audio();
scream.src = "./audio/scream.mp3";

const brim = new Audio();
brim.src = "./audio/brim.mp3";

const pip = new Audio();
pip.src = "./audio/pip.mp3";

const tick = new Audio();
tick.src = "./audio/tick.mp3";

const crush = new Audio();
crush.src = "./audio/crush.mp3";

const mu = new Audio();
mu.src = "./audio/mu.mp3";
mu.volume = 0.4;

const mzzz = new Audio();
mzzz.src = "./audio/mzzz.mp3";

const  arrrrr = new Audio();
arrrrr.src = "./audio/a.mp3";

const fermer = new Audio();
fermer.src = "./audio/fermer.mp3";
fermer.volume = 0.5;
//Игра
const game = setInterval(Game, 10);
//Координаты
class GameObject {
    constructor(src, x,y, width, height) {
        this.src = src;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    isGameObject = true;
}
let pl = new GameObject(player, plThreeCords[place],120, 40,26);
let love = new GameObject(player_2, 50,50,40,36);
let crow = new GameObject(corova, randCords, Y,60,36);
let __pult__ = new GameObject(pult, pl.x, pl.y, 32,22);
let c = new GameObject(car, pl.x,160, 40,60);
async function Game() {
    document.querySelector('#time').innerHTML = `${ziroMin}${minets}:${ziroSec}${seconds} / 01:20  |  ${crushed} / 25`
        await ctx.clearRect(0,0,cnv.width,cnv.height);
        await ctx.drawImage(backround,0,0,cnv.width,cnv.height);
        await ctx.drawImage(pl.src, plThreeCords[place], pl.y, pl.width, pl.height);
        await ctx.drawImage(crow.src, crow.x, crow.y, crow.width, crow.height);
        await ctx.drawImage(__pult__.src, plThreeCords[place] + 30, __pult__.y + 5, __pult__.width, __pult__.height);
        await ctx.drawImage(c.src,undCar, c.y, c.width, c.height);
}

if(localStorage.getItem('join') == null) {
    alert('Нажмите на экран для того, чтобы звуки появились');
}
//Логика

const Love = ()=> {
    pl.y = love.y + 10;
    pl.x = 100
    ctx.clearRect(0,0,cnv.width,cnv.height);
    ctx.drawImage(backround, 0, 0, cnv.width, cnv.height)
    ctx.drawImage(pl.src, pl.x, pl.y, pl.width, pl.height);
    ctx.drawImage(love.src, love.x, love.y, love.width, love.height);
    ctx.drawImage(heart,80, pl.y, 28,18);
    setInterval(Sex,100)
}
function Sex () {
    if(isTick) {

        arrrrr.play();
        setTimeout(()=>{
            mzzz.play()
        },500)
}
}

  

let timeEnd = setInterval(()=>{     
    isTick == true ?   tick.play() : 0;
    isTick == true ? fermer.play() : 0;
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

function onKey(e) {
    isScream = true
    if(e.keyCode === 65) {
        place -= 1;
    }
    if(e.keyCode === 68) {
        place += 1;
    }
    if(e.keyCode === 32) {
        if(isGo == true)  Crush();
    }
    if(e.keyCode === 72) {
  alert(
"Четвёртый уровень - клавишами WSAD или свайпами управлять персонажем на кнопку РАЗДОВИТЬ или клавишу SPACE (ПРОБЕЛ) вывезти машину!"
       )
    }
    isTick = true
}
function Up() {
        c.y -= 1;
}
function Crush() {
    pip.play();
    brim.play()
    undCar = plThreeCords[place]
    localStorage.setItem("un",undCar);
    c.x = localStorage.getItem('un')

 const u =   setInterval(Up, 10)   
 isGo = false
    setTimeout(()=>{
        clearInterval(u)
        c.y = 160; 
        isGo = true
    },2800) 
}
document.addEventListener('click', ()=>{
    isTick = true;
    isTick == true ?   tick.play() : 0;
    isTick == true ? fermer.play() : 0;
})
document.querySelector('#space').addEventListener('click', ()=>{
    if(isGo == true) Crush()
});
 const crow_crush =  setInterval(()=>{
        if(randCords == 0) {
            cr = plThreeCords[0];
        } else if(randCords == 93) {
            cr = plThreeCords[1]
        } else if(randCords == 223) {
            cr = plThreeCords[2]
        }
        if(cr == undCar && c.y == Y + 25) {
          crow.src = dead_crow;
          mu.play();
          crushed++
    if(isCrush) {
        corowDespawn();
        isCrush = false;
    }
        }
    },10)
function corowDespawn () {
    window.navigator.vibrate(200)
    setTimeout(()=>{
        crush.play();
        crow.src = corova;
        place_Crow = Math.floor(Math.random()*threeCords.length)
        randCords = threeCords[place_Crow];
        crow.x = randCords
     isCrush = true
      },1500)
}

const findDead = window.setInterval(()=>{
    if(place == -1) {
        Dead();
    }
    if(place == 3) {
        Dead();
    }
},10)

function Win() {
    Dead = ()=>{};
    clearInterval(game);
    clearInterval(timeEnd);
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,cnv.width,cnv.height);

    crush.volume = 0;
    brim.volume = 0;
    pip.volume = 0;
    tick.volume = 0;
    fermer.volume = 0;
   const loveOn = setInterval(Love, 10);
   Win = ()=>{}


    setTimeout(()=> {
        localStorage.setItem('isVerif_4', true);
        document.querySelector('#winModal').showModal();
        clearInterval(loveOn);
    },4000)
}

function Dead() {
    Win = ()=>{}
    if(isScream) {
        scream.play();
    }
    clearInterval(game);
    clearInterval(timeEnd);
    delete findDead;
    document.querySelector('#deadModal').showModal();
    mu.volume = 0;
    setTimeout(()=>{
        scream.volume = 0;
    },1200)
  
    crush.volume = 0;
    brim.volume = 0;
    pip.volume = 0;
    tick.volume = 0;
    fermer.volume = 0;
    Dead = ()=>{};
}

const findWin = setInterval(()=>{
    if(seconds >= 20 && minets == 1) {
       if(crushed >= 25) {
       Win();
       } else {
        Dead();
       }   
    } 
},10)

//Модальные окна
document.addEventListener('keydown', onKey);


document.querySelector('#reload').addEventListener('click', ()=>{
    document.querySelector('#deadModal').close();
    document.location.reload()
})

document.querySelector('#toMainMenu').addEventListener('click', ()=>{
    document.location.href = "index.html"
})
document.querySelector('#reload_').addEventListener('click', ()=>{
    document.querySelector("#winModal").close()
    setTimeout(()=>{
     document.location.reload()
    },500)
    })
 
    document.querySelector('#toMainMenu_').addEventListener('click', ()=>{
     document.querySelector("#winModal").close()
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
    //Свайпы
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
                place -= 1
            } else {
                place += 1
            }
        } else {
            if ( yDiff > 0 ) {
                isTick = true
                if(isGo == true) Crush()
      
            } 
        }
        xDown = null;
        yDown = null;
    };
        