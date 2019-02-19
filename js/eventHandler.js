let tableHeaderId = document.getElementById('table-header');
let tableBodyId = document.getElementById('table-body');
let numRowsInTable = document.getElementById('numRowsInTable');
let totalRowsInArr = document.getElementById('totalRowsInArr');
let indexRowInTable = document.getElementById('indexRowInTable');
let lastPage = document.getElementById('lastPage');
let reportDataLength = reportData.data.length;

lastPage.addEventListener("click", event => {
    let numOfRowsValue = parseInt(numRowsInTable.value);
    let totalRowsValue = parseInt(totalRowsInArr.value);
    let rowsLeft = totalRowsValue % numOfRowsValue;
    let startIndex = (rowsLeft == 0) ? (totalRowsValue - numOfRowsValue + 1) : (totalRowsValue - rowsLeft + 1);
    indexRowInTable.value = parseInt(startIndex);
    renderTableBody();
});

indexRowInTable.addEventListener("keydown", (event) => {
    //On enter press
    if(event.keyCode === 13){
        let numOfRows = event.target.value;
        let validRange = isAllowedLen(numOfRows, 1000000);
        let validLen = withinArrayLen(numOfRows, reportDataLength);
        if(!validLen || !validRange){
            indexRowInTable.value = 1;
        }
        renderTableBody();
    }
});

numRowsInTable.addEventListener("keydown", (event) => {
    //On enter press
    if(event.keyCode === 13){
        let numOfRows = event.target.value;
        let validRange = isAllowedLen(numOfRows, 1000);
        let validLen = withinArrayLen(numOfRows, reportDataLength);
        if(!validLen || !validRange){
            numRowsInTable.value = 10;
        }
        renderTableBody();
    }
});

totalRowsInArr.addEventListener("keydown", event => {
    //On enter press
    if(event.keyCode === 13){
        let numOfRows = event.target.value;
        let validRange = isAllowedLen(numOfRows, 1000000);
        let validLen = withinArrayLen(numOfRows, reportDataLength);
        if(!validLen || !validRange){
            totalRowsInArr.value = reportDataLength;
        }
        renderTableBody();
    }
});

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
    let startIndex = parseInt(indexRowInTable.value) - 1;
    let rowLength = parseInt(numRowsInTable.value);
    rowLength = ((startIndex + rowLength) <= reportDataLength) ? (rowLength + startIndex): reportDataLength;
    for(i = startIndex; i < rowLength; i++){
        tBody += `<tr data-row-index=${i}>
                    <td class=" pr3 bb b--black-20 pl2">${data[i][0]}</td>
                    <td class=" pr3 bl bb b--black-20 pl2">${data[i][1]}</td>
                    <td class=" pr3 bl bb b--black-20 pl2">${data[i][2]}</td>
                    <td class=" pr3 bl bb b--black-20 pl2">${data[i][3]}</td>
                    <td class=" pr3 bl bb b--black-20 pl2">${data[i][4]}</td>
                </tr>`;
    }
    tableBodyId.innerHTML = tBody
}

function showError(msg){
    alert(msg);
}

function withinArrayLen(inputSize, maxSize){
    if (parseInt(inputSize) > parseInt(maxSize)){
        showError('Number is exceeding the input data size');
        return false;
    }
    return true;
}

function isAllowedLen(inputSize, maxLen){
    if(parseInt(inputSize) > parseInt(maxLen)){
        showError('Number is exceeding the allowed limit');
        return false;
    }
    return true;
}

renderTableHeader();
renderTableBody();