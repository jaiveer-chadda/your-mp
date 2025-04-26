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