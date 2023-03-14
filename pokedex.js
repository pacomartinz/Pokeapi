

//LLAMO A MIS POKEMONS A LA API

const getPokemons = async (url) => {
try{
const respuesta = await fetch(url);
const res = await respuesta.json();
return res
}catch (error){
    console.log(error);
}
};




//VAMOS A CREAR UNA FUNCIÓN QUE RECIBA NUESTROS POKEMONS QUE SE LOS ENVIAMOS DESDE LA FUNCIÓN INIT PARA TENER MÁS LIMPIO EL CÓDIGO

const mapear = (characters) =>{
    
    return characters.map((personaje)=>({
        nombre: personaje.name.toUpperCase(),
        imagen: personaje.sprites.other.home.front_default,
   
    }));
};

//CREAMOS UNA FUNCIÓN PARA PINTAR LOS POKEMONS Y SELECCIONAMOS LA OL DONDE QUEREMOS ALMACENARLOS

const pokemonsPintados = (charactersPintados) =>{
    const ol$$ = document.querySelector("#pokedex");
    const tarjeta = `
    <div class="tarjeta">
        <div class="tarjeta__imagen">
            <img src="${charactersPintados.imagen}">
        </div>
        <h3>${charactersPintados.nombre}</h3>
    </div>`

ol$$.innerHTML+= tarjeta;
};






const arrayPokes = [];

const init = async () => {
    //mi primer paso va a ser traerme la información que está en getPokemons, VAMOS A HACE EL BUCLE PARA RECORRER NUESTRA URL
    
    for (let i = 1; i <=151; i++) {
        const pokemons = await getPokemons(`https://pokeapi.co/api/v2/pokemon/${i}`);
        //console.log(pokemons)
        arrayPokes.push(pokemons);
        console.log(arrayPokes)

    }

    const pokemonsMapeados = mapear(arrayPokes);

    for (const myPokes of pokemonsMapeados) {
        pokemonsPintados(myPokes)
        
    }

    cogerInput(pokemonsMapeados)

}
init()


const cogerInput = (characters) => {
    //console.log(characters);
    const input$$ = document.querySelector("input");
    //console.log(input$$);
  
    //le damos evento de escuchar
  
    input$$.addEventListener("input", () => busqueda(input$$.value, characters));
  };
  //le damos filtro
  
  const busqueda = (filtro, characters) => {
    //console.log(characters);
    let charactersFiltrados = characters.filter((personaje) =>
      personaje.nombre.toLowerCase().includes(filtro)
    );
    // console.log(charactersFiltrados);
  
  
    ol$$ = document.querySelector("ol");
    ol$$.innerHTML = "";
    for (const characterrr of charactersFiltrados) {
      pokemonsPintados(characterrr);
    }
  };




