const intro = document.querySelector("#intro");

function intro1(){
    let primera = "Este juego es un memory un juego muy facil de lo que trata es encontrar las parejas.";
    intro.textContent = primera;
    setTimeout(intro2, 6500);
}
function intro2(){
    let segunda = "El juego termina cuando encuentres todas las parejas o se acabe el tiempo.";
    intro.textContent = segunda;
    setTimeout(intro3, 6500);
}
function intro3(){
    let tercera = "MUCHA SUERTE!!!";
    intro.textContent = tercera;
    setTimeout(redirecion, 3000);
}
function redirecion(){
    window.location.href='./index.php'
}
intro1()