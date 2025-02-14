let names = [];
let pokemon = {};
let filtered_pokemon = [];
let loadtracker = 0;
let loadlist = [];
let rendering = false;
let selected_general = true;
let select_image = 1;
let search_count = 0;

const colors = [
    { color: '#828282', name: 'normal' },
    { color: '#439937', name: 'grass' },
    { color: '#E5613E', name: 'fire' },
    { color: '#309AE2', name: 'water' },
    { color: '#E0BD28', name: 'electric' },
    { color: '#AAA581', name: 'rock' },
    { color: '#E59121', name: 'fighting' },
    { color: '#EA6C8D', name: 'psychic' },
    { color: '#6F4570', name: 'ghost' },
    { color: '#9454CC', name: 'poison' },
    { color: '#74ABD1', name: 'flying' },
    { color: '#A5733C', name: 'ground' },
    { color: '#576FBD', name: 'dragon' },
    { color: '#47C9C9', name: 'ice' },
    { color: '#A0A028', name: 'bug' },
    { color: '#6BADC9', name: 'steel' },
    { color: '#4F4747', name: 'dark' },
    { color: '#E28DE2', name: 'fairy' },
    { color: '#000000', name: 'shadow' },
    { color: '#68A090', name: 'unknown' },
    { color: '#FF4400', name: 'physical' },
    { color: '#2266CC', name: 'special' },
    { color: '#999999', name: 'status' },
];