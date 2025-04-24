let data_exp = {};

fetch('../../resources/constituency_info/results_formatted.csv')
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
        console.log(data)
        data_exp = data
    }
)
.catch(
    err => console.error('Error fetching CSV:', err)
);
