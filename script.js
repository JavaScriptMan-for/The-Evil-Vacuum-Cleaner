//Начало
const cnv = document.querySelector('#canvas');
const ctx = cnv.getContext("2d");

//Сторонние переменные
let date = new Date().getDate();
let key = "never";
let one = true;
let minets = 0;
let seconds = 0
let ziroMin = "0";
let ziroSec = "0";
let isTick = false;
let tryes = 0;
let scream_ = true

let left = -30;
let right = 1060;
let up = -10;
let dowm = 670;

//Классы
class GameObject {
    constructor(x,y,width,height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

    }
}
//Подключение медиа-файлов
const backround = new Image();
backround.src = "./img/backround.jpg";

const cleaner_1 = new Image();
cleaner_1.src = "./img/dust_cleaner_1.png";

const cleaner_2 = new Image();
cleaner_2.src = "./img/dust_cleaner_2.png";

const cleaner_3 = new Image();
cleaner_3.src = "./img/dust_Cleaner_3.png";

const player = new Image();
player.src = "./img/player.png";

const pause = new Image();
pause.src = "./img/pause.png";

const music = new Audio();
music.src = "./audio/music.mp3";

const tick = new Audio();
tick.src = "./audio/tick.mp3";

const scream = new Audio();
scream.src = "./audio/scream.mp3"

//Обозначение координат игровых объектов
let cl_1 = new GameObject(50,50,100,100);
let cl_2 = new GameObject(400,80, 100,100);
let cl_3 = new GameObject(60,620,100,100);
let pl = new GameObject(500, 500, 100,100);




//Функция игры
async function Game() {
    document.querySelector('.info').innerHTML = `${ziroMin}${minets}:${ziroSec}${seconds}`
    ctx.fillStyle = "blue";
    ctx.font = "20px Jura blue inline";
   await ctx.fillText("Пылесосущая долина - уровень 1", 10,15);
  await  ctx.drawImage(backround, 0,20, cnv.width, cnv.height);
  await ctx.drawImage(cleaner_1, cl_1.x,cl_1.y, cl_1.width,cl_1.height);
  await  ctx.drawImage(cleaner_2, cl_2.x,cl_2.y, cl_2.width,cl_2.height);
   await ctx.drawImage(cleaner_3, cl_3.x, cl_3.y, cl_3.width, cl_3.height);
   await ctx.drawImage(player, pl.x,pl.y,pl.width,pl.height);
    if(key == 'up') {pl.y -= 0.5};
   if(key == 'down') {pl.y += 0.5};
   if(key == 'left') {pl.x -= 0.5};
   if(key == 'right') {pl.x += 0.5};
   if(key == "never") {pl.x += 0; pl.y += 0}
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
    document.querySelector('#time').innerHTML = `${ziroMin}${minets}:${ziroSec}${seconds} / 03:00`
},1000)

document.addEventListener('click', ()=>{
    music.play();
    setInterval(()=>{
        music.play();
    },21000)
   setInterval(()=>{
    tick.play()
   },1000)
})

console.log("Игра началась! Спасибо за поддержку!");
//Действие игры
let game = setInterval(Game, 1);

//Хранилище
    document.cookie = `TRYES=${localStorage.getItem("tryes")}`
//Логика
function keyOn(e) {
    music.play();
    isTick = true
    if(e.keyCode == 87) {
        key = "up"
    }
    if(e.keyCode == 83) {
        key = "down"
    }
    if(e.keyCode == 65) {
        key = "left"
    }
    if(e.keyCode == 68) {
        key = "right"
    }
    if(e.keyCode == 13) {
        key = "never"
    }
    if(e.keyCode == 27) {
        document.querySelector('#pauseModal').showModal()
    }
}
document.addEventListener('keydown', keyOn);

document.querySelector('#up').addEventListener('click', ()=>{key = 'up'})
document.querySelector('#down').addEventListener('click', ()=>{key = 'down'})
document.querySelector('#left').addEventListener('click', ()=>{key = 'left'})
document.querySelector('#right').addEventListener('click', ()=>{key = 'right'})

async function Dead() {
  localStorage.setItem("tryes", tryes);
  document.cookie = `TRYES=${localStorage.getItem("tryes")}`
    player.src = "./img/player_scream.png";
    setTimeout(()=>{
         clearInterval(game);
         clearInterval(timeEnd);
         localStorage.setItem("pastTime", document.querySelector('#time').innerHTML)
        music.pause();
        tick.pause()
        if(scream_ == true) {
         scream_ = false
          scream.play();
        }
    },10)
 
  
    if(one === true) {
        one = false
   await document.querySelector('#modal').showModal(); 
    }
  
}

    //Проверка, умер ли персонаж или нет. В ней присудствует погрешность
    function findWin() {
        if(minets == 3) {
            Dead = ()=>{};
            clearInterval(_one_)
            clearInterval(_two_)
            clearInterval(_three_)
            clearInterval(game)
            tick.pause();
            document.querySelector('.info').innerHTML = `${ziroMin}${minets}:${ziroSec}${seconds}`
            clearInterval(timeEnd)
            localStorage.setItem('minets', minets)
            console.log("Победа!");
            document.querySelector("#winModal").showModal()
        }
    }
    function findDead() {
        if (pl.x < cl_1.x + cl_1.width &&
            pl.x + pl.width > cl_1.x &&
            pl.y < cl_1.y + cl_1.height &&
           pl.height + pl.y > cl_1.y) {
         Dead()
         }
         if (pl.x < cl_2.x + cl_2.width &&
            pl.x + pl.width > cl_2.x &&
            pl.y < cl_2.y + cl_2.height &&
           pl.height + pl.y > cl_2.y) {
         Dead()
         }
         if (pl.x < cl_3.x + cl_3.width &&
            pl.x + pl.width > cl_3.x &&
            pl.y < cl_3.y + cl_3.height &&
           pl.height + pl.y > cl_3.y) {
         Dead()
         }
         if(Math.floor(pl.y <= up)) {
            Dead()
         } 
         if(Math.floor(pl.x <= left)) {
             Dead()
         }
         if(Math.floor(pl.x >= right)) {
             Dead()
         }
         if(Math.floor(pl.y >= dowm)) {
             Dead()
         }
    }
    
    
    let find = setInterval(()=>{
       findDead();
       findWin()
    },10)

   document.querySelector('#reload').addEventListener('click', ()=>{
   document.querySelector("#modal").close()
   setTimeout(()=>{
    document.location.reload()
   },500)
   })

   document.querySelector('#toMainMenu').addEventListener('click', ()=>{
    document.querySelector("#modal").close()
    setTimeout(()=>{
     document.location.href = "index.html"
    },500)
    })

    document.querySelector('#reload_').addEventListener('click', ()=>{
        document.querySelector("#modal").close()
        setTimeout(()=>{
         document.location.reload()
        },500)
        })
     
        document.querySelector('#toMainMenu_').addEventListener('click', ()=>{
         document.querySelector("#modal").close()
         setTimeout(()=>{
          document.location.href = "index.html"
         },500)
         })
         document.querySelector('#pause').addEventListener('click', ()=>{
            key = 'never'
            document.querySelector('#pauseModal').showModal()
         })
         document.querySelector('#closeModal').addEventListener('click', ()=>{
            document.querySelector('#pauseModal').close()
         })
         document.querySelector("#reload__").addEventListener('click',()=>{
            document.location.reload();
         })
         document.querySelector('#toMainMenu__').addEventListener('click', ()=>{
            document.querySelector("#modal").close()
            setTimeout(()=>{
             document.location.href = "index.html"
            },500)
            })
    //Движение пылесосов
         /* Первый пылесос */
         function moveOne() {
         var one =  setInterval(()=>{
                cl_1.x += 0.5
            },10)
            setTimeout(()=>{
                clearInterval(one);
                 var two =  setInterval(()=>{
                    cl_1.y += 0.7
                    },10)
                    setTimeout(()=>{
                        clearInterval(two)
                        var three = setInterval(()=>{
                            cl_1.x -= 0.6
                        },10)
                        setTimeout(()=>{
                            clearInterval(three)
                            var four = setInterval(()=>{
                                cl_1.y -= 1
                            },10)
                            setTimeout(()=>{
                                clearInterval(four)
                                cl_1.x =50;
                                cl_1.y =50
                            }, 8000)
                        },3000)
                    },7000)
            },5000)
         }

         moveOne();

      let _one_ =  setInterval(()=>{
            moveOne()
        },20_000)
        function moveTwo() {
          var one =  setInterval(()=>{
                cl_2.x += 0.7
            },10)

            setTimeout(()=>{
                clearInterval(one);

            var two =   setInterval(()=>{
                    cl_2.y += 1
                },10)

                setTimeout(() => {
                        clearInterval(two)

                    var three =    setInterval(()=>{
                            cl_2.x += 1
                        },10)
                        setTimeout(()=>{
                            clearInterval(three)

                        var four =    setInterval(()=>{
                                cl_2.y -= 2
                            },10)
                            setTimeout(()=>{
                                clearInterval(four)

                                var five = setInterval(()=>{
                                    cl_2.x -= 0.6
                                },10)
                                setTimeout(()=>{
                                    clearInterval(five)
                                    cl_2.x = 400;
                                    cl_2.y = 80
                                },4000)
                            },1500)
                        },3000)
                }, 3000);
            },4000)
        }
        
        moveTwo()
        let _two_ = setInterval(moveTwo, 15500);

        function moveThree() {
        var one =    setInterval(()=>{
            cl_3.y -= 1
            },10)
            setTimeout(()=>{
                clearInterval(one)

             var two =   setInterval(()=>{
                cl_3.x += 1
                },10)
                setTimeout(()=>{
                    clearInterval(two)
                    var three = setInterval(()=>{
                        cl_3.y +=0.5
                    },10)
                    setTimeout(()=>{
                        clearInterval(three)
                        var four = setInterval(()=>{
                            cl_3.x -= 1
                        },10)
                        setTimeout(()=>{
                            clearInterval(four)
                            var five = setInterval(()=>{
                                cl_3.y -=0.4
                            },10)
                            setTimeout(()=>{
                                clearInterval(five)

                             var six =   setInterval(()=>{
                                    cl_3.x += 1
                                },10)
                                setTimeout(()=>{
                                    clearInterval(six)

                                    var sevon = setInterval(()=>{
                                        cl_3.y += 0.8
                                    },10)
                                    setTimeout(()=>{
                                        clearInterval(sevon)

                                        var eigth = setInterval(()=>{
                                            cl_3.x += 0.6
                                        },10)
                                        setTimeout(()=>{
                                            clearInterval(eigth)

                                            var nine = setInterval(()=>{
                                                cl_3.x -= 1
                                            },10)
                                            setTimeout(()=>{
                                                clearInterval(nine)
                                                cl_3.x = 60;
                                                cl_3.y = 620
                                            },10000)
                                        },3500)
                                    },3000)
                                },10000)
                            },3000)
                        },10000)
                    },1000)
                },10000)
            },2000)
        }
        moveThree()
      let _three_ =  setInterval(moveThree,52500)
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
              key = "left"
            } else {
                key = "right"
            }
        } else {
            if ( yDiff > 0 ) {
                key = "up"
            } else {
                key = "down"
            }
        }
        xDown = null;
        yDown = null;
    };