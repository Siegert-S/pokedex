function selectInfo(is) {
    selected_general = is;
    let general = document.getElementById('select_general');
    let skill = document.getElementById('select_skill');
    if (is) {
        general.classList.add('activ_selector');
        skill.classList.remove('activ_selector');
    } else {
        general.classList.remove('activ_selector');
        skill.classList.add('activ_selector');
    }
    renderShowFrame();
}

function renderNavBar() {
    let frame = document.getElementById('nav_bar');
    frame.innerHTML = printNavBar();
    frame.innerHTML += printBurgerMenu();
}

function printNavBar() {
    let htmlcode = /*html*/`
    <div class="nav_bar_menu">
        <div class="show_selector">
            <span>Info</span>
            <div onclick="selectInfo(true)" id="select_general" class="activ_selector buttons">General</div>
            <div onclick="selectInfo(false)" id="select_skill" class="buttons">Skill</div>
        </div>
        <div class="show_selector">
            <div class="img_selector">
                <span>Image</span>
                <div id="set_image_0" onclick="setImageSelector(0)" class="buttons">1</div>
                <div id="set_image_1" onclick="setImageSelector(1)" class="activ_selector buttons">2</div>
                <div id="set_image_2" onclick="setImageSelector(2)" class="buttons">3</div>
            </div>
        </div>
        <div class="show_selector">
        <input id="search_input" type="text" onkeyup="searching()" placeholder="Name or Id">
        <img class="search_img" src="./img/lupe.svg" alt="">
        </div>
    </div>
    <div class="burger_menu" onclick="showNav()">
        <img src="./img/lupe.svg" alt="">
    </div>
    `;

    return htmlcode;
}

function printBurgerMenu() {
    let htmlcode = /*html*/`
    <div id="side_nav" class="side_nav_bar_menu">
        <div class="show_selector">
            <span>Info</span>
            <div onclick="selectInfo(true)" id="select_general" class="activ_selector buttons">General</div>
            <div onclick="selectInfo(false)" id="select_skill" class="buttons">Skill</div>
        </div>
        <div class="show_selector">
            <div class="img_selector">
                <span>Image</span>
                <div id="set_image_0" onclick="setImageSelector(0)" class="buttons">1</div>
                <div id="set_image_1" onclick="setImageSelector(1)" class="activ_selector buttons">2</div>
                <div id="set_image_2" onclick="setImageSelector(2)" class="buttons">3</div>
            </div>
        </div>
        <div class="show_selector">
        <input id="search_input" type="text" onkeyup="searching()" placeholder="Name or Id">
        <img class="search_img" src="./img/lupe.svg" alt="">
        </div>
    </div>
    
    `;
    return htmlcode;
}

function showNav() {
let frame = document.getElementById('side_nav').classList.toggle('slide_in')
}

function setImageSelector(number) {
    select_image = number;
    for (let i = 0; i < 3; i++) {
        const element = document.getElementById(`set_image_${i}`);
        if (i == number) {
            element.classList.add('activ_selector');
        } else {
            element.classList.remove('activ_selector');
        }
    }
    renderContent(true);
}

function searching() {
    console.log('start suche')
    search();
    console.log('start render nach suche')
    renderContent(true);
}

function search() {
    let input = document.getElementById('search_input').value.toLowerCase();
    search_count = 0;
    filtered_pokemon = [];
    searchFor(input);
}

function searchFor(filter) {
    let count = Object.keys(pokemon).length
    for (let i = 0; i < count; i++) {
        const element = pokemon[i];
        if (typeof element !== 'undefined') {
            if (nameOrNumber(filter, element)) {
                filtered_pokemon.push(element);
            }
        }
    }
}

function nameOrNumber(filter, sample) {
    let test = parseInt(filter);
    search_count++;
    if (!isNaN(test)) {
        return sample.id.toString().includes(filter);
    } else {
        return sample.name.includes(filter);
    }
}


function testForCompletSearch() {
    if (!(search_count == Object.keys(pokemon).length)) {
        search();
        return false;
    }
    return true;
}