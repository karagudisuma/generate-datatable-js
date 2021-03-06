const MAX_ALLOWED_DATA = 1000000;
const MAX_ALLOWED_ROWS_PER_PAGE = 1000;
const START_OF_ROW = 1;

let tableHeaderId = document.getElementById('table-header');
let tableBodyId = document.getElementById('table-body');
let numRowsInTable = document.getElementById('numRowsInTable');
let totalRowsInArr = document.getElementById('totalRowsInArr');
let indexRowInTable = document.getElementById('indexRowInTable');
let lastPage = document.getElementById('lastPage');
let firstPage = document.getElementById('firstPage');
let nextPage = document.getElementById('nextPage');
let prevPage = document.getElementById('prevPage');
let nextLine = document.getElementById('nextLine');
let prevLine = document.getElementById('prevLine');


prevLine.addEventListener('click', event => {
    let currentIndexValue = parseInt(indexRowInTable.value);
    let totalRowsValue = parseInt(totalRowsInArr.value);
    let numOfRows = parseInt(numRowsInTable.value);
    let activeIndex = currentIndexValue - 1;
    removeActiveClass();
    if(activeIndex <= 0){
        indexRowInTable.value = (totalRowsValue - numOfRows + 1);
        //Show previus page and add active class to last row
        renderTableBody();
        removeActiveClass();
        indexRowInTable.value = totalRowsValue;
        addActiveClass(); 
    } 
    else{
        let query = `tr[data-row-index="${activeIndex - 1}"]`; 
        let activeRow = (document.querySelector(query));
        //Is at beginning of page
        if(activeRow === null){
            indexRowInTable.value = (activeIndex - numOfRows + 1);
            renderTableBody();
            removeActiveClass();
            indexRowInTable.value = activeIndex;
            addActiveClass();
        }
        else{
            indexRowInTable.value = activeIndex;
            activeRow.classList.add("bg-light-blue");
        }
    }
});

nextLine.addEventListener('click', event => {
    removeActiveClass();
    let currentIndexValue = parseInt(indexRowInTable.value);
    let totalRowsValue = parseInt(totalRowsInArr.value);
    let activeIndex = currentIndexValue + 1;
    if(activeIndex > totalRowsValue){
        indexRowInTable.value = 1;
        renderTableBody();
    } 
    else{
        let query = `tr[data-row-index="${indexRowInTable.value.toString()}"]`; 
        let activeRow = (document.querySelector(query));
        //Is at end of page
        if(activeRow === null){
            indexRowInTable.value = activeIndex;
            renderTableBody();
        }
        else{
            indexRowInTable.value = activeIndex;
            addActiveClass();
        }
    }
    
});

prevPage.addEventListener('click', event => {
    let currentIndexValue = parseInt(indexRowInTable.value);
    let numRows = parseInt(numRowsInTable.value);
    let totalArrLen = parseInt(totalRowsInArr.value);
    let prevIndex = currentIndexValue - numRows;
    prevIndex = (prevIndex < START_OF_ROW) ? (totalArrLen - numRows + 1) : prevIndex;
    indexRowInTable.value = prevIndex;
    renderTableBody();
});

nextPage.addEventListener('click', event => {
    let currentIndexValue = parseInt(indexRowInTable.value);
    let numRows = parseInt(numRowsInTable.value);
    let totalArrLen = parseInt(totalRowsInArr.value);
    let nextIndex = currentIndexValue + numRows;
    let nextIndexVal = (nextIndex <= totalArrLen) ? nextIndex : START_OF_ROW;
    indexRowInTable.value = nextIndexVal;
    renderTableBody();
});

firstPage.addEventListener("click", event => {
    indexRowInTable.value = START_OF_ROW;
    renderTableBody();
});

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
        let reportDataLength = reportData.data.length;
        let validRange = isAllowedLen(numOfRows, MAX_ALLOWED_DATA);
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
        let reportDataLength = reportData.data.length;
        let validRange = isAllowedLen(numOfRows, MAX_ALLOWED_ROWS_PER_PAGE);
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
        let validRange = isAllowedLen(numOfRows, MAX_ALLOWED_DATA);

        if(validRange) 
            generateData(numOfRows);

        let reportDataLength = reportData.data.length;
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
                        <th class="fw6 bb b--black-20 tl pb1 pr3"></th>
                        <th class="fw6 bb bl b--black-20 tl tc pb1 pr3">${cols[1]}</th>
                        <th class="fw6 bb bl b--black-20 tl tc pb1 pr3">${cols[2]}</th>
                        <th class="fw6 bb bl b--black-20 tl tc pb1 pr3">${cols[3]}</th>
                        <th class="fw6 bb bl b--black-20 tl tc pb1 pr3">${cols[4]}</th>
                    </tr>`;
    tableHeaderId.innerHTML = tHeader;
}
function renderTableBody(){
    let tBody = "";
    let i;
    let data = reportData.data;
    let startIndex = parseInt(indexRowInTable.value) - 1;
    let rowLength = parseInt(numRowsInTable.value);
    let reportDataLength = reportData.data.length;
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
    tableBodyId.innerHTML = tBody;
    addActiveClass();
}

function removeActiveClass(){
    let startIndex = (parseInt(indexRowInTable.value) - 1).toString();
    let query = `tr[data-row-index="${startIndex}"]`; 
    let activeRow = (document.querySelector(query));
    activeRow.classList.remove("bg-light-blue");
}

function addActiveClass(){
    let startIndex = (parseInt(indexRowInTable.value) - 1).toString();
    let query = `tr[data-row-index="${startIndex}"]`; 
    let activeRow = (document.querySelector(query));
    activeRow.classList.add("bg-light-blue");
}

function showError(msg){
    alert(msg);
}

function withinArrayLen(inputSize, maxSize){
    if (parseInt(inputSize) > parseInt(maxSize)){
        showError('Number is exceeding the input data size.');
        return false;
    }
    return true;
}

function isAllowedLen(inputSize, maxLen){
    if(parseInt(inputSize) > parseInt(maxLen)){
        showError('Number is exceeding the allowed limit.');
        return false;
    }
    return true;
}

renderTableHeader();
renderTableBody();