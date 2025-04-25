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

        }
    );
