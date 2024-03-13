
   let level = 1;




   function DownB() {
      if(level > 1) {
         level -= 1;
      }
   }
   function UpB() {
      if(level < 4) {
         level += 1
      }
   }
   document.querySelector('#back').addEventListener('click', DownB);
   document.querySelector('#up').addEventListener('click', UpB);

   document.querySelector('#play').addEventListener('click',()=>{
      if(level == 1) {
         document.location.href = "level_1.html"
      }
      if(level == 2) {
         document.location.href = "level_2.html"
      }
      if(level == 3) {
         document.location.href = "level_3.html"
      }
      if(level == 4) {
         document.location.href = "level_4.html"
      }
   })
   setInterval(()=>{
      if(level == 1) {
         document.querySelector('#l').innerHTML = "Первый уровень";
         document.querySelector('#levelPrew').src = "./img/prew_1.jpg"
      }
      if(level == 2) {
         document.querySelector('#l').innerHTML = "Второй уровень";
         document.querySelector('#levelPrew').src = "./img/prew_2.jpg"
      }
      if(level == 3) {
         document.querySelector('#l').innerHTML = "Третий уровень";
         document.querySelector('#levelPrew').src = "./img/uncown.jpg"
      }
      if(level == 4) {
         document.querySelector('#l').innerHTML = "Четвёртый уровень";
         document.querySelector('#levelPrew').src = "./img/uncown.jpg"
      }
   
   },100)
