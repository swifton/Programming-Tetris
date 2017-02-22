function editSheet(number, tetr) {
  editingWindowEnabled = true;
  editingSheet = number;
  editing = true;
  directiveWindow.reset(); // clean the directive window
  mainSheet = program[tetr].sheets[number].copyWithShift(defaultPatternWid, defaultPatternHeit);
  showFigure();
}

function deleteSheet(number, tetr) {
  program[tetr].heitOffset -= program[tetr].sheets[number].heitOffset;
  program[tetr].sheets.remove(number);
  program[tetr].gui.remove(program[tetr].gui.length - 1);
  alignSheetButtons(tetr);
  newSheet();
}

function toggleSymmetry(i, nn) {
  program[nn].sheets[i].symmetry = !program[nn].sheets[i].symmetry;
}

function toggleWalls(i, nn) {
  program[nn].sheets[i].walls = !program[nn].sheets[i].walls;
}

function swapTwoSheets(i, j, nn) { // There is a bug in this. I don't know where. Maybe not.
  var ns = program[nn].sheets[i];
  program[nn].sheets[i] = program[nn].sheets[j];
  program[nn].sheets[j] = ns;
  alignSheetButtons(nn);
  newSheet();
}

function alignSheetButtons(tetr) {
  var col = program[tetr];
  var heitOffset = 0;
  var programOffset = col.programOffset;

  for (var i = 0; i <  col.sheets.length; i++) {
    var shsh = col.sheets[i];
    var pWid = shsh.patternWid + 1;
    var pHeit = shsh.patternHeit;
    var wls = shsh.walls;
    var sym = shsh.symmetry;

    var xs = [TILE_WID, TILE_WID * pWid + 5, TILE_WID * (pWid + 1) + 5, TILE_WID * (pWid + 1) + 5 + 1 * TILE_WID, TILE_WID * (pWid + 1) + 5 + 2 * TILE_WID, TILE_WID * (pWid + 1) + 5 + 3 * TILE_WID, TILE_WID * (pWid + 1) + 5 + 4 * TILE_WID, TILE_WID * (pWid + 1) + 5 + 5 * TILE_WID, TILE_WID * (pWid + 1) + 5 + 6 * TILE_WID, TILE_WID * (pWid + 1) + 5 + 7 * TILE_WID];
    var ys = [heitOffset * TILE_WID + TILE_WID * (i + 1) + programOffset, heitOffset * TILE_WID + TILE_WID * (i + 1) + programOffset, heitOffset * TILE_WID + TILE_WID * (i + 2) + programOffset, heitOffset * TILE_WID + TILE_WID * (i + 2) + programOffset, heitOffset * TILE_WID + TILE_WID * (i + 2) + programOffset, heitOffset * TILE_WID + TILE_WID * (i + 2) + programOffset, heitOffset * TILE_WID + TILE_WID * (i + 2) + programOffset, heitOffset * TILE_WID + TILE_WID * (i + 2) + programOffset, heitOffset * TILE_WID + TILE_WID * (i + 2) + programOffset];

    var buts = col.gui[i].buttons;

    for (var j = 0; j < buts.length; j++) {
      buts[j].x = xs[j];
      buts[j].y = ys[j];
    }
	
	if (i == 0) {
		buts[2].visible = false;
	}
	else {
		buts[2].visible = true;
	}
	
	if (i == col.sheets.length - 1) {
		buts[3].visible = false;
	}
	else {
		buts[3].visible = true;
	}

    buts[0].buttonWid = TILE_WID * (pWid - 1);
    buts[0].buttonHeit = TILE_WID * pHeit;
	
	buts[1].buttonWid = 70;

    heitOffset += pHeit;
	
	buts[4].toggled = wls;
  }
}
