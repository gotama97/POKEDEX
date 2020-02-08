const pokedex = document.getElementById('pokedex');
const promises = [];

const fetchPokemon=()=>{
    for(let i=1;i<=200;i++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`
        promises.push(fetch(url).then(res=>res.json()))
    }
    
    Promise.all(promises).then(pokes=>{
    const pokeman = pokes.map(poke=>({
        name:poke.name,
        id:poke.id,
        image:poke.sprites['front_default'],
        types:poke.types.map(type=>type.type.name).join(", ")
        }))
        displayPoke(pokeman);
    })
}

const displayPoke = (pokes)=>{
    const innerPoke = pokes.map(poke=>`
    <li class="card">
    <img src="${poke.image}">
    <h2 class="title">${poke.id} ${poke.name}</h2>
    <p class="subtitle">${poke.types}</p>
</li>
    `).join("")
    pokedex.innerHTML=innerPoke;
}

fetchPokemon();