function programmingSetup() {
  newSheet();
}

function newSheet() {
  sheet[0] = new Array(sheetH);
  reset(sheet, 9, false);
  editing = false;
  drawEverything();
}

function sheetInput(mousePos) {
  i = Math.floor((mousePos.x - workplace[0]) / diam);
  j = Math.floor((mousePos.y - workplace[1]) / diam);
  if ((i > sheetW - 1) || (j > sheetH - 1) || (i < 0) || (j < 0)) return;
  sheet[i][j] += 1;
  if (sheet[i][j] == 10) {sheet[i][j] = 0;}
  if (sheet[i][j] == 1) {sheet[i][j] = 8;}
  drawEverything();
}
	  
function saveSheet(){
  if (!editing) {
    program.push(copySheet(sheet));
    editingSheet = program.length - 1;
    editing = true;
    var i = program.length - 1;
    buttons.push(new button("", diam, i * sheetH * diam + diam * (i + 1), diam * sheetW, diam * sheetH, function() {editingSheet = i; editing = true; sheet = copySheet(program[i]); drawEverything();}));
  }
  else {
    program[editingSheet] = copySheet(sheet);
  }
  drawEverything();
}

function test(){
  
}

var findPosition = function(){
	var sh, bool;
	var WofSh;
	var HofSh;
	for (i = 0; i < NofSheets; i++){
		if (program[i][1][2] != NofTile) {continue;}
		sh = program[i][0];
		WofSh = program[i][1][0];
		HofSh = program[i][1][1];
		for (var k = 0; k < FieldW - WofSh; k++){
			for (var l = 0; l < FieldH - HofSh; l++){
				bool = 1;
				for (var m = 0; m < WofSH; m++){
					for (var n = 0; n < HofSH; n++){
						if (sh[m][n] != field[k+m][l+n]) {bool = 0;}
					}	
				}
				if (bool == 1) {return k;}
			}	
		}
	}
	return 0;
}
