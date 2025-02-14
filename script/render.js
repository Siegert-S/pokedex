function providePokemonName(index) {
    return firstLetterUppercase(filtered_pokemon[index].name);
}

function firstLetterUppercase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function providePokemonHeight(index) {
    return filtered_pokemon[index].height;
}

function providePokemonId(index) {
    return filtered_pokemon[index].id;
}

function providePokemonWeight(index) {
    return filtered_pokemon[index].weight;
}

async function providePokemonImg(index) {
    const source = selectPokemonImgSource(index);
    const img = new Image();
    const imgLoaded = new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
    });
    img.src = source;
    try {
        await imgLoaded;
        return img.src;
    } catch (error) {
        return './img/pokemon-1536849_640.png';
    }
}

function selectPokemonImgSource(index) {
    let selected = ''
    switch (select_image) {
        case 0:
            selected = filtered_pokemon[index].sprites.other.dream_world.front_default;
            break;
        case 1:
            selected = filtered_pokemon[index].sprites.other.home.front_default;
            break;
        case 2:
            selected = filtered_pokemon[index].sprites.other.showdown.front_default;
            break;
        default:
            selected = filtered_pokemon[index].sprites.other.home.front_default;
            break;
    }
    return selected;
}

function providePokemonStats(index) {
    let stats = [];
    for (let i = 0; i < 6; i++) {
        const stat = {
            "name": filtered_pokemon[index].stats[i].stat.name,
            "value": filtered_pokemon[index].stats[i].base_stat
        }
        stats.push(stat);
    }
    return stats;
}

function providePokemonTypes(index) {
    let types = [];
    for (let i = 0; i < filtered_pokemon[index].types.length; i++) {
        types.push(filtered_pokemon[index].types[i].type.name);
    }
    return types;
}

function providePokemonStatsValue(index) {
    let stats = [];
    for (let i = 0; i < 6; i++) {
        const stat = filtered_pokemon[index].stats[i].base_stat;
        stats.push(stat);
    }
    return stats;
}

function setBGColor(index) {
    let color = typeToColor(providePokemonTypes(index));
    let htmlcode = '';
    if (color.length > 1) {
        htmlcode =/*html*/` style="background: linear-gradient(135deg `;
        for (let i = 0; i < color.length; i++) {
            const element = color[i];
            htmlcode +=/*html*/`,${element}`;
        }
        htmlcode +=/*html*/`);"`;
    } else {
        htmlcode =/*html*/`
            style="background: linear-gradient(to right, ${color}, ${color});"
        `;
    }
    return formatText(htmlcode);
}

function formatText(text) {
    text = text.replace(/\n/g, "");
    text = text.replace(/\s+/g, " ");
    return text;
}

function typeToColor(types) {
    let color = [];
    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < colors.length; j++) {
            const type = types[i];
            const colorname = colors[j].name;
            if (type == colorname) {
                color.push(colors[j].color);
            }
        }
    }
    return color;
}

async function renderContent(refresh) {
    rendering = true;

    let frame = document.getElementById('content');
    let count = frame.getElementsByClassName('poke_card').length;
    let start = refresh ? 0 : count;
    start = testForCompletSearch() ? start : 0;
    let end = count + 25 < filtered_pokemon.length ? count + 25 : filtered_pokemon.length;

    if (start == 0) {
        frame.innerHTML = '';
    }
    renderCard(frame, start, end);

    rendering = false;
}

async function renderCard(frame, start, end) {
    for (let i = start; i < end; i++) {
        frame.innerHTML += await printPokeCard(i);
        selected_general == true ? printPokemonGeneral(i) : printPokemonStats(i);
        refreshAllChart();
    }
}


async function printPokeCard(index) {
    let htmlcode =/*html*/`
        <div class="poke_card" id="poke_card_${index}">
            <div ${setBGColor(index)}>
                <div class="poke_img_frame">
                    <img src="${await providePokemonImg(index)}" alt="image of ${providePokemonName(index)}">
                </div>
                <div class="poke_nametag">
                    <div>ID: ${providePokemonId(index)}</div>
                    <div>Name: ${providePokemonName(index)}</div>
                </div>
                <div class="poke_show_frame">
                    <div class="poke_show_frame_nav">
                        <div onclick="changeShowFrame(${index},true)" id="general_tab_${index}" class="poke_show_frame_nav_tab">General</div>
                        <div onclick="changeShowFrame(${index},false)" id="stats_tab_${index}" class="poke_show_frame_nav_tab">Stats</div>
                    </div>
                    <div class="poke_show_frame_content" id="poke_show_frame_content_${index}">

                    </div>

                </div>
            </div>
        </div>
    `;
    return htmlcode;
}

function changeShowFrame(index, to_genaral) {
    if (to_genaral) {
        printPokemonGeneral(index);
    } else {
        printPokemonStats(index);
        renderChart(index);
    }
}

function printPokemonGeneral(index) {
    switchingTab(true, index);
    let frame = document.getElementById(`poke_show_frame_content_${index}`);
    frame.classList.remove('with_chard');
    frame.innerHTML =/*html*/`
        <div>
            Gewicht: ${(providePokemonWeight(index) / 10).toFixed(1)}kg
        </div>
        <div>
            Grösse: ${providePokemonHeight(index) * 10}cm
        </div>
    `;
    frame.innerHTML += printPokemonTypes(index);
}

function printPokemonTypes(index) {
    let types = providePokemonTypes(index);
    let color = typeToColor(providePokemonTypes(index));
    let htmlcode = '';
    for (let i = 0; i < types.length; i++) {
        const type = firstLetterUppercase(types[i]);
        const Color = color[i];
        htmlcode +=/*html*/`
            <div class="type_card" style="background-color: ${Color}">${type}</div>
        `;
    }
    return htmlcode;
}

function printPokemonStats(index) {
    switchingTab(false, index);
    let frame = document.getElementById(`poke_show_frame_content_${index}`);
    frame.classList.add('with_chard');
    let stats = providePokemonStats(index);
    let htmlcode = '<div class="stat_card_tab_holder">';
    for (let i = 0; i < stats.length; i++) {
        htmlcode +=/*html*/`
          <div class="stat_card_tab">
            <div>${stats[i].name}</div>
            <div>${stats[i].value}</div>
          </div>  
        `;
    }
    htmlcode += /*html*/`
        </div>
        <div><canvas class="pokemon_stat_chart" id="pokemon_stat_chart_${index}" role="img"></canvas></div>
        
    `;
    frame.innerHTML = htmlcode;
}