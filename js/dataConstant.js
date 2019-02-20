let reportData = {
	"cols": [
		"Id",
		"Column 1",
		"Column 2",
		"Column 3",
		"Column 4"
	],
	"data": []
};

function generateData(rowNum){
	let i;
	//Flush array before loading data.
	reportData.data = [];
	for(i = 1; i <= rowNum; i++){
		reportData.data.push([`${i}`, `Column_1_Row_${i}_Data`, `Column_2_Row_${i}_Data`, `Column_3_Row_${i}_Data`, `Column_4_Row_${i}_Data`,]);
	}
}

generateData(100);