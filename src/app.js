/* eslint-disable */
import "bootstrap";
import "./style.css";

/*function soloNumeros(e) {
  let key = e.keyCode || e.which,
    tecla = String.fromCharCode(key).toLowerCase(),
    numeros = "1234567",
    especiales = [],
    tecla_especial = false;
  for (let i in especiales) {
    if (key == especiales[i]) {
      tecla_especial = true;
      break;
    }
  }

  if (numeros.indexOf(tecla) == -1 && !tecla_especial) {
    return false;
  }
}*/

let valorinput;
let contenidoDeCartas;

function dibujaCartas(cartasADibujar, idContenedor) {
  //funcion que renderiza las cartas
  let contenedorCarta = document.getElementById(idContenedor);
  /*console.log (contenidoDeCartas);
return;*/
  //let cardArray1 = [];
  //for (let i = 0; i < valorinput; i++) {
  let carta, cartaBonita;
  for (let i = 0; i < cartasADibujar.length; i++) {
    carta = cartasADibujar[i];
    cartaBonita = rendercartas(carta);
    //cardArray1.push(rendercartas(carta))
    contenedorCarta.appendChild(cartaBonita);
  }
  console.log(contenedorCarta);

  // console.log(cardArray1);
  // return cardArray1;
}

function rendercartas(contenidoCarta) {
  /*   cotenidoCarta = { 
  palo : '♥' , 
  valor : 11,
  contenido : "K"
}*/

  let myDivcartas = document.createElement("div");
  myDivcartas.classList.add("card");

  let myDivpicaup = document.createElement("div");
  myDivpicaup.innerHTML = contenidoCarta.palo;
  myDivpicaup.classList.add("picaup");

  //alert(myDiv)

  let myDivvalor = document.createElement("div");
  if (contenidoCarta.contenido == 1) {
    myDivvalor.innerHTML = "A";
  } else if (contenidoCarta.contenido == 11) {
    myDivvalor.innerHTML = "J";
  } else if (contenidoCarta.contenido == 12) {
    myDivvalor.innerHTML = "Q";
  } else if (contenidoCarta.contenido == 13) {
    myDivvalor.innerHTML = "K";
  } else {
    myDivvalor.innerHTML = contenidoCarta.contenido;
  }
  myDivvalor.classList.add("card-numero");

  //por recomendadion nos dijeron, si una carta tiene valor 11 entonces dibuja j y asi con cada una de las letras para poder arreglar eso//

  let myDivpicadown = document.createElement("div");
  myDivpicadown.innerHTML = contenidoCarta.palo;
  myDivpicadown.classList.add("picadown");

  myDivcartas.appendChild(myDivpicaup);
  myDivcartas.appendChild(myDivvalor);
  myDivcartas.appendChild(myDivpicadown);

  if (contenidoCarta.palo == "♦" || contenidoCarta.palo == "♥") {
    myDivpicaup.style.color = "red";
    myDivvalor.style.color = "red";
    myDivpicadown.style.color = "red";
  }

  return myDivcartas;
}

let valor = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
let palo = ["♦", "♥", "♠", "♣"];

//Genera la cantidad de cartas segun input
function generateCarta(numeroCartas) {
  let cartas = [];
  for (let i = 0; i < numeroCartas; i++) {
    cartas.push(cartaRandom());
  }
  return cartas;
}
// contenido random
function cartaRandom() {
  let aleatoriovalor = Math.floor(Math.random() * 13);
  let aleatoriopalo = Math.floor(Math.random() * 4);
  let carta = {
    palo: palo[aleatoriopalo],
    valor: aleatoriovalor,
    contenido: valor[aleatoriovalor]
  };

  //cambie, la funcion que en vez de  generar un array me genera un objeto
  // carta.palo = (palo[aleatoriopalo]);
  //carta.valor = (valor[aleatoriovalor]);

  return carta;
}

let botonDraw = document.querySelector("#botonDraw");
let textBar = document.querySelector("#numerocartas");
botonDraw.addEventListener("click", function() {
  document.querySelector("#todaslascartas").innerHTML = "";
  const input = document.getElementById("numerocartas").value;
  if (input === "") {
    console.log("Invalid Input!");
  } else {
    valorinput = document.getElementById("numerocartas").value;
    contenidoDeCartas = generateCarta(valorinput);
    //cardArray2 = generatecarta(input);
    dibujaCartas(contenidoDeCartas, "todaslascartas");
  }
});

function selectionSortCartas(cartas) {
  let arr = Array.from(cartas);
  let contenedorSort = document.getElementById("todaslascartasordenadas");
  let arreglo = arr.length - 1;
  let nombreContenedor;
  let cartaSort;

  let min = 0;
  while (min < arreglo) {
    for (let i = min + 1; i < arr.length; i++) {
      if (arr[min].valor >= arr[i].valor) {
        let aux = arr[min];
        arr[min] = arr[i];
        arr[i] = aux;
        console.log(arr, min);
      }
    }
    nombreContenedor = "paso-" + min + "-" + arreglo;
    cartaSort = document.createElement("div");
    cartaSort.id = nombreContenedor;
    cartaSort.innerHTML = "<h3>" + min + "</h3>";
    contenedorSort.appendChild(cartaSort);
    dibujaCartas(arr, nombreContenedor);
    min++;
  }
  arr = [];
}
let botonSort = document.querySelector("#botonSort");
botonSort.addEventListener("click", function() {
  document.querySelector("#todaslascartasordenadas").innerHTML = "";

  selectionSortCartas(contenidoDeCartas);
});
