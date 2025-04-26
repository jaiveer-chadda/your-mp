import { getConstituencyData } from '../master.js';

const paths = document.querySelectorAll('#map_container svg path');
const display = document.getElementById('infobox_title');
const info = document.getElementById('infobox');

paths.forEach(path => {
    path.addEventListener('mouseenter', evt => {
        display.textContent = evt.target.id.replace(/_/g, " ");
        display.style.fontWeight = 'bold';
    });
    path.addEventListener('mouseleave', () => {
        display.textContent = 'Hover over a constituency';
        display.style.fontWeight = 'normal';
    });

    path.addEventListener('click', evt => {
        info.innerHTML = '';

    });
});

// const formattedData = await getConstituencyData();