const cnv = document.querySelector('#cnvs');
const ctx = cnv.getContext("2d");

//Переменные

//Картинки и аудио
const player = new Image();
player.src = "./img/player.png";

const player_2 = new Image();
player_2.src = "./img/player_2).png";
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
    isGameObject = true
}
let pl = new GameObject(player, 0,0, 40,26);
let love = new GameObject(player_2, 50,50,60,56)
async function Game() {
        await ctx.drawImage(pl.src, pl.x, pl.y, pl.width, pl.height)
}
//Логика
