import { getConstituencyWinners, remUS } from '../../meta/master.js';

const constituencyWinners = await getConstituencyWinners();
// console.log(constituencyWinners)

const paths = document.querySelectorAll('#map_container svg path');
const infoboxTitle = document.getElementById('infobox_title');
const MP_img = document.getElementById('infobox_mp_img');

let infoBoxLocked = false;

paths.forEach(path => {
    path.addEventListener('mouseenter', evt => {
        if (infoBoxLocked) { return; }
        infoboxTitle.textContent = remUS(evt.target.id);
    });
    path.addEventListener('mouseleave', () => {
        if (infoBoxLocked) { return; }
        infoboxTitle.textContent = 'Hover over a constituency';
    });

    path.addEventListener('click', evt => {
        infoBoxLocked = true;
        const constituencyData = constituencyWinners.find(cons => cons.name === remUS(evt.target.id));

        document.querySelector("#infobox_title").textContent              = remUS(evt.target.id);
        document.querySelector("#infobox_country_and_region").textContent =
            constituencyData.country + (constituencyData.region ? (" - " + constituencyData.region) : "");
        document.querySelector("#infobox_county").textContent             =
            (constituencyData.county ? constituencyData.county : "---");
        document.querySelector("#infobox_mp_name").textContent            = constituencyData.MP_name;
        document.querySelector("#infobox_mp_party").textContent           = remUS(constituencyData.winner_2024);
        document.querySelector("#infobox_mp_tenure").textContent          = '--tenure--';
        MP_img.src = "resources/images/stand_in_mp_portrait.png"
        MP_img.style.display = "inline";
    });
});

document.addEventListener('click', (evt) => {
    if (!(evt.target.matches('#map_container svg path, #infobox, #infobox *'))) {
        infoBoxLocked = false;
        infoboxTitle.textContent = 'Hover over a constituency';

        document.querySelectorAll("#infobox p:not(#infobox_title)").forEach(p => {
            p.textContent = '';
        });
        MP_img.style.display = "none";
    }
});