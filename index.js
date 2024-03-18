
   let level = 1;
   let isOpen = false



   function DownB() {
      if(level > 1) {
         level -= 1;
      }
   }
   function UpB() {
      if(level < 5) {
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
      if(level == 5) {
         if(isOpen) {
            document.location.href = "end.html"
         } else {
            alert('Пройдите все уровни!')
         }
         
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
         document.querySelector('#levelPrew').src = "./img/prew_3.jpg"
      }
      if(level == 4) {
         document.querySelector('#l').innerHTML = "Четвёртый уровень";
         document.querySelector('#levelPrew').src = "./img/uncown.jpg"
      }
      if(level == 5) {
         document.querySelector('#l').innerHTML = "Конец";
         if(!isOpen) {
            document.querySelector('#levelPrew').src = "./img/Конец_закрыто.png"
         }  
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

   setInterval(()=>{
      if(
         localStorage.getItem('isVerif_1') == 'true' &&
         localStorage.getItem('isVerif_2') == 'true' &&
         localStorage.getItem('isVerif_3') == 'true' &&
         localStorage.getItem('isVerif') == 'true'
      ) {
         isOpen = true;
         if(level == 5 && isOpen) {
            document.querySelector('#levelPrew').src = "./img/Конец_открыто.png"
         }
      }
   },1)
