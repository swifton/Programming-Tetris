function findCommand() {
  removedMatches = [];
  inefficientMatches = [];

  for (var i = 0; i < program[nOfFigure].sheets.length; i++) {
    var c = advancedMatching(program[nOfFigure].sheets[i], i);
    if (c != -1) {
      command = program[nOfFigure].sheets[c[0]];	  
      recognitionOffset = c[1];
      recognitionOffsetY = c[2];
      return;
    }
	
	
/*
    if (program[nOfFigure].sheets[i].symmetry) {
      c = advancedMatching(program[nOfFigure].sheets[i].symmetricSheet, i);
      if (c != -1) {
        command = program[nOfFigure].sheets[c[0]];
        recognitionOffset = c[1];
        recognitionOffsetY = c[2];
        return;
       }
    }
*/
  }
  command = new sheet(defaultPatternWid, defaultPatternHeit);
  recognitionOffset = 1;
}

var matchSearchingTime = 0;
var matchRemovingTime = 0;
var comparePatternsTime = 0;
//	var r0 = performance.now();
//  var r1 = performance.now();
  //comparePatternsTime += r1 - r0;

function advancedMatching(command, n) {
  matches = [];
  
  var q0 = performance.now();
  var r0;
  var r1;
  
  var upperLimitI = fieldWid - command.patternWid + (command.walls?1:0);
  var upperLimitJ = fieldHeit + 1 -command.patternHeit + 1;
  
  for (var i = command.walls?0:1; i < upperLimitI; i++) {
    for (var j = 0; j < upperLimitJ; j++) {  // fieldHeit + 1 because need to consider the floor
	 //r0 = performance.now();
      if (comparePatterns(command.pattern, field, i, j, command.patternWid, command.patternHeit, command.patternOffsetX, command.patternOffsetY)) {
        var topush = [n, i, j, command.patternWid, command.patternHeit];
        var a = matches.push(topush);
      }
    }
	//r1 = performance.now();
	//comparePatternsTime += r1 - r0;
  }
  var q1 = performance.now();
 
  var rm = removeMatches(matches, checkBorders, command, []);
  removedMatches = removedMatches.concat(rm[0]);
  matches = rm[1];


  var rm = removeMatches(matches, checkLanding, command, []);
  removedMatches = removedMatches.concat(rm[0]);
  matches = rm[1];

  //var rm = removeMatches(matches, checkExceptions, command, []);
  //removedMatches = removedMatches.concat(rm[0]);
  //matches = rm[1];
  
  var minHeit = 0;
  for (var i = 0; i < matches.length; i++) {
    if (minHeit < matches[i][2]) {minHeit = matches[i][2]}
  }

  var rm = removeMatches(matches, checkHeit, command, [minHeit]);
  inefficientMatches = inefficientMatches.concat(rm[0]);
  matches = rm[1];

  //var a = matches[matches.length - 1] || -1;
  var a = matches[Math.floor(Math.random()*matches.length)] || -1;
  
  
  var q2 = performance.now();
  matchSearchingTime += q1 - q0;
  matchRemovingTime += q2 - q1;
  
  return a;
}

function removeMatches(matchesArray, filterFunction, command, params) {
  var removedMatchesArray = [];
  var newMatchesArray = [];

  for (var i = 0; i < matchesArray.length; i++) {
    if (!filterFunction(matchesArray[i], command, params)) {
      removedMatchesArray.push(matches[i]);
    }
    else {
      newMatchesArray.push(matches[i]);
    }
  }

  return [removedMatchesArray, newMatchesArray];
}

function checkExceptions(match, command, params) {
  var exception = command.exceptions[0];
  if (!exception) {return true;}
  return !comparePatterns(exception.pattern, field, match[1] - (command.patternOffsetX - exception.patternOffsetX), match[2] - (command.patternOffsetY - exception.patternOffsetY), exception.patternWid, exception.patternHeit, exception.patternOffsetX, exception.patternOffsetY);
}

function checkLanding(match, command, params) {
  var fig = command.landing;
  for (var i = 0; i < 4; i++) {
    brk = [fig[i][0] + match[1] - command.patternOffsetX, fig[i][1] + match[2] - command.patternOffsetY];

    for (var j = brk[1]; j > -1; j--) {
      if (field[brk[0]][j] != 0) {return false;}
    }
  }
  return true;
}

function checkBorders(match, command, params) {
  var fig = command.landing;
  for (var i = 0; i < 4; i++) {
    brk = [fig[i][0] + match[1] - command.patternOffsetX, fig[i][1] + match[2] - command.patternOffsetY];
    if (field[brk[0]] == undefined) {return false;}
  }
  return true;
}

function checkHeit(match, command, params) {
  return match[2] == params[0];
}



function comparePatterns(pattern1, pattern2, offsetX, offsetY, patternWid, patternHeit, patternLeft, patternUp) {
  for (var i = 0; i < patternWid; i++) {
    for (var j = 0; j < patternHeit; j++) {
      if((pattern2[i + offsetX] == undefined) || (pattern2[i + offsetX][j + offsetY] == undefined)) {
        // print('undefined field invoked');
		if (pattern1[i + patternLeft] == undefined || pattern1[i + patternLeft][j + patternUp] == undefined) {continue;} // This is trash, fix it.
        if (pattern1[i + patternLeft][j + patternUp] == ANYTHING) {continue;}
        else {return false;}
      }
      if (!compare(pattern1[i][j], pattern2[i + offsetX][j + offsetY])) {return false;}
    }
  }

  return true;
}

function compare(pattern, field) {
  if (pattern == 9) {return true;}
  if ((pattern == 0) && (field == 0)) {return true;}
  if ((pattern == 8) && (field != 0)) {return true;} 
  return false;
}

