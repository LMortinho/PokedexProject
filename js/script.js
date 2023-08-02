const pokemonName = document.querySelector('.pokemon_name');
const pokemonId = document.querySelector('.pokemon_id');
const pokemonImage = document.querySelector('.pokemon_image');
const pokemonShiny = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const buttonShiny = document.querySelector('.btn-shiny');

let searchPokemon = 132;
var shiny = false;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    console.log(APIResponse);
    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = "Carregando...";
    pokemonId.innerHTML = "";

    const data = await fetchPokemon(pokemon);

    if(data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonId.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = "";
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = "Não Encontrado :(";
        pokemonId.innerHTML = "";
    }
    
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1 ) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

buttonShiny.addEventListener('click', async () => {
    if (shiny == true) {
        const data = await fetchPokemon(searchPokemon);

        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        shiny = false;
        buttonShiny.style.color = '';
    } else {
        const data = await fetchPokemon(searchPokemon);

        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
        shiny = true;
        buttonShiny.style.color = 'gold';
    }  
});


renderPokemon(searchPokemon)