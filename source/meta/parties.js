import { getConstituencyWinners, addUS, getPartyColours } from './master.js';

const formattedData = await getConstituencyWinners();

for (const row of formattedData) {
    const id = addUS(row.name);
    const elem = document.getElementById(id);
    if (!elem) {
        console.warn(`No SVG element found with id "${id}"`);
        continue;
    }

    const colour = getPartyColours()[row.winner_2024];
    if (!colour) {
        console.warn(`No colour found for party "${row.winner_2024}"`);
        continue;
    }

    elem.style.setProperty('--constituency_colour', colour);
}

// console.log(formattedData)
