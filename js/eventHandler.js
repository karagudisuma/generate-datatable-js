let tableHeaderId = document.getElementById('table-header');


function renderTableHeader(){
    let tHeader = `<tr>
        <th class="fw6 bb b--black-20 tl pb1 pr3 bg-white"></th>
        <th class="fw6 bb bl b--black-20 tl tc pb1 pr3 bg-white">${reportData.cols[1]}</th>
        <th class="fw6 bb bl b--black-20 tl tc pb1 pr3 bg-white">${reportData.cols[2]}</th>
        <th class="fw6 bb bl b--black-20 tl tc pb1 pr3 bg-white">${reportData.cols[3]}</th>
        <th class="fw6 bb bl b--black-20 tl tc pb1 pr3 bg-white">${reportData.cols[4]}</th>
    </tr>`;
    tableHeaderId.innerHTML = tHeader;
}
function renderTableBody(){

}

renderTableHeader();
renderTableBody();