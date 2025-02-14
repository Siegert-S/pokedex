async function startPage() {
    renderNavBar()
    await getAllPokemonNames();
    await startDownload();
    search();
    renderContent();
    checkDownload();
}

window.addEventListener('scroll', scrollCheck);

function scrollCheck() {
    let above80 = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) >= 0.8;
    if (above80 && !rendering) {
        renderContent();
    }
}

function renderShowFrame(index) {
    if (index !== undefined) {
        selected_general == true ? printPokemonGeneral(index) : printPokemonStats(index);
    } else {

        let frame = document.getElementById('content');
        let count = frame.getElementsByClassName('poke_show_frame_content').length;
        for (let i = 0; i < count; i++) {
            selected_general == true ? printPokemonGeneral(i) : printPokemonStats(i);
        }
    }
    refreshAllChart();
}

function switchingTab(tab_is_general, index) {
    if (tab_is_general) {
        document.getElementById(`general_tab_${index}`).classList.add('activ');
        document.getElementById(`stats_tab_${index}`).classList.remove('activ');
    } else {
        document.getElementById(`general_tab_${index}`).classList.remove('activ');
        document.getElementById(`stats_tab_${index}`).classList.add('activ');
    }
}

function getPosition(id) {
    let element = document.getElementById(id)
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX
    };
}