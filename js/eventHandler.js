let tableHeaderId = document.getElementById('table-header');
let tableBodyId = document.getElementById('table-body');

function renderTableHeader(){
    let cols = reportData.cols;
    let tHeader =   `<tr>
                        <th class="fw6 bb b--black-20 tl pb1 pr3 bg-white"></th>
                        <th class="fw6 bb bl b--black-20 tl tc pb1 pr3 bg-white">${cols[1]}</th>
                        <th class="fw6 bb bl b--black-20 tl tc pb1 pr3 bg-white">${cols[2]}</th>
                        <th class="fw6 bb bl b--black-20 tl tc pb1 pr3 bg-white">${cols[3]}</th>
                        <th class="fw6 bb bl b--black-20 tl tc pb1 pr3 bg-white">${cols[4]}</th>
                    </tr>`;
    tableHeaderId.innerHTML = tHeader;
}
function renderTableBody(){
    let tBody = "";
    let i;
    let data = reportData.data;
    for(i = 0; i < 10; i++){
        tBody += `<tr>
                    <td class=" pr3 bb b--black-20 pl2">${data[i][0]}</td>
                    <td class=" pr3 bl bb b--black-20 pl2">${data[i][1]}</td>
                    <td class=" pr3 bl bb b--black-20 pl2">${data[i][2]}</td>
                    <td class=" pr3 bl bb b--black-20 pl2">${data[i][3]}</td>
                    <td class=" pr3 bl bb b--black-20 pl2">${data[i][4]}</td>
                </tr>`;
    }
    tableBodyId.innerHTML = tBody
}

renderTableHeader();
renderTableBody();