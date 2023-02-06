// recibir respuesta botón de " buscar pokemones"
document.addEventListener("DOMContentLoaded", () =>{

    let generateBtn = document.querySelector('#generar-pokemon');
    generateBtn.addEventListener('click', RenderALL)
})

//función para ejecutar el la función fetchPokemones() del botón
function RenderALL(){
    let allPokemonContainer = document.querySelector('#container-Pokemon')
    allPokemonContainer.innerText = "";
    fetchPokemones();
}


//consulta de la API a todos los pokemones con el limite maximo.
function fetchPokemones(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10271') // al cambiar el numero se cambia el limite de consulta a la api el maximo de pokemones es 10271
    .then(response => response.json())
        .then(function(allpokemon){
        allpokemon.results.forEach(function(pokemon){
            fetchPokemonesData(pokemon);
        })//recorremos cada pokemon de la pi
    })
}


// url del pokemon 
function fetchPokemonesData(pokemon){
    let url = pokemon.url //guardar la variable del pokemon par aluego utilizar en el fetch. ejemplo: https://pokeapi.co/api/v2/pokemon/1/"
    fetch(url)
    .then(response => response.json())
    .then(function(pokeData){
        RenderCardPokemon(pokeData)
    })
}

// función el tipo o clase de pokemon

function CrearTipoPokemon(types, ul){
    types.forEach(function(type){
        let typeLi = document.createElement('li');
        typeLi.innerText = type['type']['name'];
        ul.append(typeLi)
    })
}

//Función para obtener la imagen de la pokeapi

function CrearImagenPokemon(pokeID, containerDiv){
    let pokeImgContainer = document.createElement('div')
    pokeImgContainer.classList.add('image')

    let ImagenPokemon = document.createElement('img')
    ImagenPokemon.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png`// URL de la imagen guardada den la pokeapi el pokeID es el id del pokemon

    pokeImgContainer.append(ImagenPokemon);
    containerDiv.append(pokeImgContainer);
}



// RENDER DE LOS DATOS del POKEMON
function RenderCardPokemon(pokeData){
    let allPokemonContainer = document.getElementById('container-Pokemon');
    let ContainerPokemon = document.createElement("div") //div se usa para guardar los datalles del pokemon 
    ContainerPokemon.classList.add('ui', 'card');

    CrearImagenPokemon(pokeData.id, ContainerPokemon);//contenedor de la imagen del pokemon

    let NombrePokemon = document.createElement('h4') // nombre del pokemon
    NombrePokemon.innerText = pokeData.name


    let IDPokemon = document.createElement('p')// ID del pokemon
    IDPokemon.innerText = `#${pokeData.id}`
   
    let TipoPokemon = document.createElement('ul') //ul lista con los tipos de pokemon
  

    CrearTipoPokemon(pokeData.types, TipoPokemon) // funcion para recorrer la matriz de los tipos de pokemon y agregar la etiqueta (li) a cada uno 

    ContainerPokemon.append(NombrePokemon, IDPokemon, TipoPokemon);   //Agregar todos los detalles al (div) donde se guardan los detalles del pokemon
    allPokemonContainer.appendChild(ContainerPokemon);       //agregar el (div) al ContainerPokemon principal 

}

// intento de abrir una nueva ventana con el pokemon seleccionado.

boton.onclick = function() { 
    let identificador = this.dataset.id;
    window.open("pokemon.html?id=" + identificador,"_blank").focus();
}






