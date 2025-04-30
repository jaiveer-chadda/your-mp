import { getConstituencyWinners, remUS, getPartyColours } from '../../meta/master.js';

const constituencyWinners = await getConstituencyWinners();
// console.log(constituencyWinners)

const paths = document.querySelectorAll('#map_container svg path');
const infoboxTitle = document.getElementById('infobox_title');
const infoboxHRs = document.querySelectorAll('#infobox hr');
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

        document.getElementById("infobox_title").textContent              = remUS(evt.target.id);
        document.getElementById("infobox_country").textContent            = constituencyData.country;
        document.getElementById("infobox_region_and_county").textContent  =
            constituencyData.region + (constituencyData.county ? (" - " + constituencyData.county) : "");
        document.getElementById("infobox_mp_name").textContent            = constituencyData.MP_name;
        document.getElementById("infobox_mp_party").textContent           = remUS(constituencyData.winner_2024);
        document.getElementById("infobox_mp_tenure").textContent          = '--tenure--';
        MP_img.src = "resources/images/stand_in_mp_portrait.png"
        MP_img.style.display = "inline";
        infoboxHRs
            .forEach(hr => { hr.style.display = "block"; });
        document
            .querySelectorAll("#infobox_mp_info p span")
            .forEach(span => { span.style.display = "inline-block"; });
        document.getElementById("infobox_mp_party_colour").style.backgroundColor = getPartyColours()[constituencyData.winner_2024]
        document.getElementById("infobox_mp_info").style.display = "block";
    });
});

document.addEventListener('click', (evt) => {
    if (!(evt.target.matches('#map_container svg path, #infobox, #infobox *'))) {
        infoBoxLocked = false;
        infoboxTitle.textContent = 'Hover over a constituency';

        document
            .querySelectorAll("#infobox p:not(#infobox_title):not(#infobox_mp_party_line)")
            .forEach(p => { p.textContent = ''; });
        MP_img.style.display = "none";
        infoboxHRs
            .forEach(hr => { hr.style.display = "none"; });
        document
            .querySelectorAll("#infobox_mp_info p span")
            .forEach(span => { span.style.display = "none"; });
        document.getElementById("infobox_mp_info").style.display = "none";
    }
});