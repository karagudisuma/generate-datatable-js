let tableHeaderId = document.getElementById('table-header');
let tableBodyId = document.getElementById('table-body');
let numRowsInTable = document.getElementById('numRowsInTable');
let totalRowsInArr = document.getElementById('totalRowsInArr');
let indexRowInTable = document.getElementById('indexRowInTable');
let reportDataLength = reportData.data.length;

indexRowInTable.addEventListener("keydown", (event) => {
    //On enter press
    if(event.keyCode === 13){
        let numOfRows = event.target.value;
        let validRange = isAllowedLen(numOfRows, 1000000);
        let validLen = withinArrayLen(numOfRows, reportDataLength);
        if(validLen && validRange){

        }
        else{
            indexRowInTable.value = 1;
        }
    }
});

numRowsInTable.addEventListener("keydown", (event) => {
    //On enter press
    if(event.keyCode === 13){
        let numOfRows = event.target.value;
        let validRange = isAllowedLen(numOfRows, 1000);
        let validLen = withinArrayLen(numOfRows, reportDataLength);
        if(validLen && validRange){
            
        }
        else{
            numRowsInTable.value = 10;
        }
    }
});

totalRowsInArr.addEventListener("keydown", event => {
    //On enter press
    if(event.keyCode === 13){
        let numOfRows = event.target.value;
        let validRange = isAllowedLen(numOfRows, 1000000);
        let validLen = withinArrayLen(numOfRows, reportDataLength);
        if(validLen && validRange){
            
        }
        else{
            totalRowsInArr.value = reportDataLength;
        }
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
    for(i = 0; i < 10; i++){
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
    if (inputSize > maxSize){
        showError('Number is exceeding the input data size');
        return false;
    }
    return true;
}

function isAllowedLen(inputSize, maxLen){
    if(inputSize > maxLen){
        showError('Number is exceeding the allowed limit');
        return false;
    }
    return true;
}

renderTableHeader();
renderTableBody();