document.querySelector('button').addEventListener('click',()=>{
    if(document.querySelector("#sel").value == 'one') {
       document.location.href = "level_1.html"
    }
    if(document.querySelector("#sel").value == 'two') {
        document.location.href = "level_2.html"
     }
     if(document.querySelector("#sel").value == 'three') {
        document.location.href = "level_3.html"
     }
     if(document.querySelector("#sel").value == 'four') {
        document.location.href = "level_3.html"
     }
})
