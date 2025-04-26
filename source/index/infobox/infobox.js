// import { getConstituencyWinners } from '../../meta/master.js';
// const formattedData = await getConstituencyWinners();

const paths = document.querySelectorAll('#map_container svg path');
const infoboxTitle = document.getElementById('infobox_title');

let infoLocked = false;

paths.forEach(path => {
    path.addEventListener('mouseenter', evt => {
        if (infoLocked) { return; }
        infoboxTitle.textContent = evt.target.id.replace(/_/g, " ");
        infoboxTitle.style.fontWeight = 'bold';
    });
    path.addEventListener('mouseleave', () => {
        if (infoLocked) { return; }
        infoboxTitle.textContent = 'Hover over a constituency';
        infoboxTitle.style.fontWeight = 'normal';
    });

    path.addEventListener('click', evt => {
        let constituencyName = evt.target.id.replace(/_/g, " ");
        infoLocked = true;
        document.querySelector("#infobox_title").textContent   = constituencyName;
        document.querySelector("#infobox_country").textContent = 'England';
    });
});

document.addEventListener('click', (evt) => {
    if (!evt.target.matches('#map_container svg path')) {
        infoLocked = false;

        infoboxTitle.textContent = 'Hover over a constituency';
        infoboxTitle.style.fontWeight = 'normal';

        document.querySelectorAll("#infobox p:not(#infobox_title)").forEach(p => {
            p.textContent = '';
        });
    }
});