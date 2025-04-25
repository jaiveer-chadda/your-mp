import { getConstituencyData } from '../master.js';

const paths = document.querySelectorAll('#map_container svg path');
const display = document.getElementById('infobox_title');

paths.forEach(path => {
    path.addEventListener('mouseenter', evt => {
        display.textContent = evt.target.id.replace(/_/g, " ");
    });
    path.addEventListener('mouseleave', () => {
        display.textContent = 'Hover over a constituency';
    });
});

const formattedData = await getConstituencyData();