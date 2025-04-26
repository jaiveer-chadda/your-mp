import { getConstituencyWinners, remUS } from '../../meta/master.js';

const constituencyWinners = await getConstituencyWinners();
console.log(constituencyWinners)

const paths = document.querySelectorAll('#map_container svg path');
const infoboxTitle = document.getElementById('infobox_title');

let infoLocked = false;

paths.forEach(path => {
    path.addEventListener('mouseenter', evt => {
        if (infoLocked) { return; }
        infoboxTitle.textContent = remUS(evt.target.id);
    });
    path.addEventListener('mouseleave', () => {
        if (infoLocked) { return; }
        infoboxTitle.textContent = 'Hover over a constituency';
    });

    path.addEventListener('click', evt => {
        infoLocked = true;
        const constituencyWinnerData = constituencyWinners.find(cons => cons.Name === remUS(evt.target.id));

        document.querySelector("#infobox_title").textContent        = remUS(evt.target.id);
        document.querySelector("#infobox_country").textContent      = 'country';
        document.querySelector("#infobox_region").textContent       = 'region';
        document.querySelector("#infobox_mp_name").textContent      = 'mp name';
        document.querySelector("#infobox_mp_party").textContent     = remUS(constituencyWinnerData.Winner);
        document.querySelector("#infobox_mp_tenure").textContent    = 'tenure';
    });
});

document.addEventListener('click', (evt) => {
    if (!evt.target.matches('#map_container svg path')) {
        infoLocked = false;

        infoboxTitle.textContent = 'Hover over a constituency';

        document.querySelectorAll("#infobox p:not(#infobox_title)").forEach(p => {
            p.textContent = '';
        });
    }
});