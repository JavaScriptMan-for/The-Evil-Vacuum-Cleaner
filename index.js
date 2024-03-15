
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
         UpB()
           } else {
         DownB()
           }
       } else {
           if ( yDiff > 0 ) {
          //
           } else {
              //
           }
       }
       xDown = null;
       yDown = null;
   };


