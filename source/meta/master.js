export function addUS(text) { return text.replace(/ /g, "_"); }
export function remUS(text) { return text.replace(/_/g, " "); }

export function getPartyColours() {
    return {
        Labour: "#E4003B",
        Liberal_Democrat: "#FAA61A",
        Conservative: "#009FE3",
        Green: "#008066",
        Scottish_National_Party: "#FFF95D",
        Plaid_Cymru: "#3F8428",
        Reform_UK: "#00BED6",
        Social_Democratic_and_Labour_Party: "#e4003b",
        Sinn_Fein: "#0C694F",
        Democratic_Unionist_Party: "#D36A4B",
        Alliance_Party: "#CDAF2C",
        Independent: "#909090",
        Speaker: "#000000",
        Traditional_Unionist_Voice: "#0C3A6A",
        Ulster_Unionist_Party: "#A1CDF0"
    }
}

export function getConstituencyWinners() {
    return fetch('../../resources/constituency_info/constituency_winners.csv')
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
                    name: data[i].name,
                    ONS_code: data[i].ONS_code,
                    county: data[i].county,
                    region: data[i].region,
                    country: data[i].country,
                    winner_2019: addUS(data[i].winner_2019),
                    winner_2024: addUS(data[i].winner_2024),
                    MP_name: data[i].MP_name,
                    winner_votes: data[i].winner_votes,
                    percentage_of_total_votes: data[i].percentage_of_total_votes,
                    margin_of_total_votes: data[i].margin_of_total_votes,
                    total_votes: data[i].total_votes,
                    turnout: data[i].turnout
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