async function resolve(promise) {
    try {
        let response = await promise;
        return response;
    } catch (error) {
        console.warn(promise);
        console.warn(response.status);
    }
}

async function getAllPokemonNames() {
    let url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302`;
    let response = await resolve(fetch(url));
    let responseAsJson = await response.json();
    names = responseAsJson.results;
}

function loadPreparation(content) {
    let stack = arrayDivvyUp(content);
    let count = 0;
    for (let i = 0; i < stack.count; i++) {
        let loadpack = [];
        for (let j = 0; j < stack.size; j++) {
            const url = content[count].url;
            const index = count;
            loadpack.push(() => getPokemon(url, index));
            count++;
        }
        loadlist.push(loadpack);
    }
}

function arrayDivvyUp(array) {
    let stack = {
        "size": array.length,
        "count": 1
    };
    let difference = stack.size - stack.count;
    for (let i = 1; i <= array.length / 2; i++) {
        let count = array.length / i;
        let diff = Math.abs(count - i);
        if (Number.isInteger(count) && diff < difference) {
            stack.size = count;
            stack.count = i;
            difference = diff;
        }
    }
    return stack;
}

async function getPokemon(url, index) {
    let response = await resolve(fetch(url));
    let responseAsJson = await response.json();
    pokemon[index] = responseAsJson;
}

async function bulkLoadPokemon() {
    if (loadtracker < loadlist.length) {
        let loding_part_of_list = loadlist[loadtracker];
        await Promise.all(loding_part_of_list.map(func => func()));
        loadtracker++;
    }
}

async function startDownload() {
    loadPreparation(names);
    await bulkLoadPokemon();
    // console.log(pokemon[0]);
}

async function checkDownload() {
    while (Object.keys(pokemon).length != names.length) {
        await bulkLoadPokemon();
    }
}