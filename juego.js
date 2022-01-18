document.addEventListener('DOMContentLoaded', () => {
    const cartas = [ //array con imagenes del memory
        {
            name: 'MARP',
            img: './img/MARP.png'
        },
        {
            name: 'MARP',
            img: './img/MARP.png'
        },
        {
            name: 'GVEC',
            img: './img/GVEC.png'
        },
        {
            name: 'GVEC',
            img: './img/GVEC.png'
        },
        {
            name: 'CINT',
            img: './img/CINT.png'
        },
        {
            name: 'CINT',
            img: './img/CINT.png'
        },
        {
            name: 'AVIE',
            img: './img/AVIE.png'
        },
        {
            name: 'AVIE',
            img: './img/AVIE.png'
        },
        {
            name: 'DAM',
            img: './img/DAM.png'
        },
        {
            name: 'DAM',
            img: './img/DAM.png'
        },
        {
            name: 'DAW',
            img: './img/DAW.png'
        },
        {
            name: 'DAW',
            img: './img/DAW.png'
        },
        {
            name: 'AFI',
            img: './img/AFI.png'
        },
        {
            name: 'AFI',
            img: './img/AFI.png'
        },
        {
            name: 'ADIR',
            img: './img/ADIR.png'
        },
        {
            name: 'ADIR',
            img: './img/ADIR.png'
        },
        {
            name: 'POLI',
            img: './img/POLI.png'
        },
        {
            name: 'POLI',
            img: './img/POLI.png'
        }
    ]


    cartas.sort(() => 0.5 - Math.random()); //random para que te salgan las cartas aleatorias

    const grid = document.querySelector('.grid');
    const resultado = document.querySelector('#resultado');
    const tempo = document.querySelector('#tempo');
    const acabo = document.querySelector('#acabo');
    let victoria = true;
    let cartaEscogida = [];
    let cartaEscogidaId = [];
    let cartasGanadas = [];
    const opcionId1 = cartaEscogidaId[0];
    const opcionId2 = cartaEscogidaId[1];
    let seg;
    let puntuacion=0;
    const audio = document.querySelector('audio');
    const correcto = document.getElementById('correcto');
    const fallo =document.getElementById('fallo');
    // function cargar(){
    //     const musica = document.getElementById('musica');
    //     musica.innerHTML='<audio src="./musicaFondo.mp3" autoplay></audio>';
    // }
    
    function crearTablero() { //creo el tablero con cartas 
        for (let i = 0; i < cartas.length; i++) {
            let carta = document.createElement('img');
            carta.setAttribute('src', './img/carta_detras.png');
            carta.setAttribute('data-id', i);
            carta.draggable = false;
            carta.addEventListener('click', transicion);
            grid.appendChild(carta);
        }
    }

    
    function coincide() {//funcion que comprueba si la primera carta seleccionada es igual que la segunda si coincide cambia la imagen a blanco y sube el score, si no se vuelve a voltear la carta 
      
        
        let carta = document.querySelectorAll('img');
        const opcionId1 = cartaEscogidaId[0];
        const opcionId2 = cartaEscogidaId[1];
        if (cartaEscogida[0] === cartaEscogida[1]) {
            correcto.play();
            carta[opcionId1].style.visibility = 'hidden';
            carta[opcionId2].style.visibility = 'hidden';
            cartasGanadas.push(cartaEscogida);
        } else {
            
                carta[opcionId1].style.transform = "rotateY(180deg)";
                carta[opcionId2].style.transform = "rotateY(180deg)";
                carta[opcionId1].setAttribute('src', './img/carta_detras.png');
                carta[opcionId2].setAttribute('src', './img/carta_detras.png');
            
        }
       
         
        cartaEscogida = [];
        cartaEscogidaId = [];
        if (cartasGanadas.length <= cartas.length / 2) {//Le pone al score cuantos puntos tienes si los puntos que tienes es menor al lenght del array entre 2, ¿Porque entre 2? porque en el array tienes 2 objetos iguales 
            resultado.textContent = cartasGanadas.length;
        }

        if (cartasGanadas.length === cartas.length / 2) {//Te muestra un mensage de lo has logrado, cuando tu score es igual a al length entre 2
            resultado.textContent = 'Enorabuena lo has logrado ! :)';
            console.log(puntuacion);
            puntuacion = (parseInt(cartasGanadas.length) + parseInt(tempo.innerHTML));
            console.log(puntuacion);
            puntuacionUser();
            //modal();
        }
    }
    function transicion() {
        let carta = this;
        audio.play();
        carta.style.transform = "rotateY(360deg)"; //gira la carta
        setTimeout(voltearCarta, 125, carta);
    }

    function voltearCarta(carta) { //funcion para voltear la carta y mostrarte la carta es lo primero que se ejecuta cuando le das a una carta
        //let carta = this;
        if (cartaEscogidaId[0] !== carta.getAttribute('data-id')) {
            let cartaId = carta.getAttribute('data-id');
            cartaEscogida.push(cartas[cartaId].name);
            cartaEscogidaId.push(cartaId);
            carta.setAttribute('src', cartas[cartaId].img); //Voltea la carta
            if (cartaEscogida.length === 2) {
                setTimeout(coincide, 1000);
            }
        }
    }
    crearTablero();
    temporizador();
    function modal() {
        // Get the modal
        clearInterval(seg);
        let modal = document.getElementById("myModal");

        // Get the <span> element that closes the modal
        let span = document.getElementsByClassName("close")[0];
        
        modal.style.display = "block";
        if (victoria == true) {
            
            enorabuena.textContent = "Enorabuena lo has logrado !!! :)";
            scores.textContent = "Tu score es: " + cartasGanadas.length;
            tiempos.textContent = "Te han sobrado: " + tempo.innerHTML + " seg";
            result.textContent = "Tu puntuacion final es: " + puntuacion;
            //showRanking();
        } else {
            enorabuena.textContent = "Lo siento pero se te ha acabado el tiempo :( ";
            perdida.textContent = "No puedes entrar en el ranking";
            scores.textContent = "Tu score es: " + cartasGanadas.length;
            //showRanking();
        }
    }

    function temporizador() {
        
        if (tempo.innerHTML != 0) {
            seg = setInterval(function () { tiempo() }, 1000);
        }
    }
    function tiempo() {
        if (tempo.innerHTML != 0) {
            tempo.textContent = tempo.innerHTML - 1;
        } else {
            clearInterval(seg);
            tempo.textContent = "TIEMPO !!! "
            acabo.textContent = " "
            victoria = false;
            modal();
        }
    }
/*
    function showRanking() {
        let tablaRanking = document.getElementById("ranking");
        tablaRanking.innerHTML = "";
        const opcion = {
            method: 'POST',
            body: JSON.stringify({ action: 'ranking' })
        }


        fetch('./bd.php', opcion)
            .then(respuesta => respuesta.json())
            .then(resultado => {

                cont = 1;
                resultado.forEach(user => {

                    tablaRanking.innerHTML += `
 <tr>
     <td>${cont}</td>
     <td>${user.nickname}</td>
     <td>${user.score}</td>
 </tr>`
                    cont++;
                });
            });
    }
 function puntuacionUser() {
 const opciones = {
 method: 'POST',
 body: JSON.stringify({action: 'updateUserGame', puntuacion: puntuacion})
 }
     fetch('./bd.php', opciones).then(modal());

 }*/
})