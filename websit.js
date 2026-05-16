const bao =document.getElementById("bao");
const nav =document.getElementById("navbar")
const close = document.getElementById("close");
const  cart = document.getElementById("cart");

if (bao){
    bao.addEventListener("click",()=>{
        nav.classList.add("active");
    })
}

if (close){
    close.addEventListener("click",() =>{
        nav.classList.remove("active");
        cart.classList.remove("active");

    })

}


// var main =document.getElementById("myimg");
// var small =document.getElementsByClassName("small-im");
// small[0].onclick = function(){
//     main.src =small [0].src;
// }
// small[1].onclick = function(){
//     main.src =small [1].src;
// }

// small[2].onclick = function(){
//     main.src =small [2].src;
// }
// small[3].onclick = function(){
//     main.src =small [3].src;
// }





