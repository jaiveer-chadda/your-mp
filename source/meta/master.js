export function addUS(text) { return text.replace(/ /g, "_"); }
export function remUS(text) { return text.replace(/_/g, " "); }

export function getPartyColours() {
    return {
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
}

function findWinner(fullObject) {
    let maxName = null;
    let maxValue = -Infinity;

    for (let key in fullObject) {
        if (key === "electionName" || key === "constituencyCode") {continue;}

        const raw = fullObject[key];
        const num = +raw;
        if (isNaN(num)) {continue;}

        if (num > maxValue) {
            maxValue = num;
            maxName  = key;
        }
    }
    return maxName
}

export function getConstituencyWinners() {
    return fetch('../../resources/constituency_info/results_formatted.csv')
    .then(
        response => response.text()
    )
    .then(
        text => {
            const [headerLine, ...lines] = text.trim().split(/\r?\n/);
            const headers = headerLine.split(',');

            const data = lines.map(line => {
                const values = line.split(',');
                return headers.reduce((obj, header, i) => {
                    obj[header] = values[i];
                    return obj;
                }, {});
            });

            let formattedData = []

            for (let i = 0; i < data.length; i++) {
                formattedData.push({
                    Name: data[i].Name,
                    ONS: data[i]['ONS Code'],
                    Winner: findWinner(data[i]).replace(/ /g, '_')
                })
            }
            // console.log(formattedData)
            return formattedData
        }
    )
    .catch(err => {
        console.error('Error fetching CSV:', err);
        return [];
    });
}