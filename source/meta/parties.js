import { getConstituencyData } from './master.js';

const partyColours = {
    Labour: "#e4003b",
    Liberal_Democrat: "#FAA61A",
    Conservative: "#009FE3",
    Green: "#008066",
    Scottish_National_Party: "#FFF95D",
    Plaid_Cymru: "#3F8428",
    Reform_UK: "#00bed6",
    Social_Democratic_and_Labour_Party: "#e4003b",
    Sinn_Fein: "#0C694F",
    Democratic_Unionist_Party: "#D36A4B",
    Alliance_Party: "#CDAF2C",
    Independent: "#909090",
    Speaker_of_the_House_of_Commons: "#000000",
    Traditional_Unionist_Voice: "#0C3A6A",
    Ulster_Unionist_Party: "#A1CDF0"
}

const formattedData = await getConstituencyData();

for (let i=0;i<formattedData.length;i++) {
    let nameFormatted = formattedData[i].Name.replace(/ /g, "_");

    try {
        let constituency = document.getElementById(nameFormatted);
        constituency.style.setProperty('--constituency_colour', partyColours[formattedData[i].Winner]);
    } catch (error) {
        // console.log(nameFormatted)
        console.error(nameFormatted, error);
    }
}

console.log(formattedData)
