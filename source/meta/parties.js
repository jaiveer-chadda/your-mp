import { getConstituencyWinners, addUS, getPartyColours } from './master.js';

const formattedData = await getConstituencyWinners();

for (let i=0;i<formattedData.length;i++) {
    const nameFormatted = addUS(formattedData[i].Name);

    try {
        let constituency = document.getElementById(nameFormatted);
        constituency.style.setProperty('--constituency_colour', getPartyColours()[formattedData[i].Winner]);
    } catch (error) {
        // console.log(nameFormatted)
        console.error(nameFormatted, error);
    }
}

// console.log(formattedData)
