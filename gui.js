function drawData(data, start){
  var wid = data.length;
  var heit = data[0].length;

  rectangle(start, wid * diam, heit * diam);

  for (var i = 0; i < wid; i++){
    for (var j = 0; j < heit; j++){
      if (data[i][j] != 0) {
        drawTile(start[0] + i * diam + radius, start[1] + j * diam + radius, Math.abs(data[i][j]), ctx);
      }
    }
  }

};

function drawButtons(buttons) {
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].draw();
  }
}

function drawFrame(sheet, start) {
  rectangle(add(start, [diam * (sheet.left), diam * (sheet.up)]), diam * (sheet.right - sheet.left), diam * (sheet.down - sheet.up));
}

function drawProg() {
  clear(c);
  drawData(directive.pattern, add(workplace, [0, diam]));
  drawData(mainSheet.pattern, add(workplace, [0, 7 * diam]));
  drawFrame(mainSheet, add(workplace, [0, 7 * diam]));

  for (i = 0; i < program.length; i++) {
    drawData(program[i].pattern, [diam, i * sheetH * diam + diam * (i + 1) + programOffset]);
    drawFrame(program[i], [diam, i * sheetH * diam + diam * (i + 1) + programOffset]);
  }

  drawButtons(progButtons);
}

function drawFrames() {
  var sh = program[advancedMatch];
  for (var i = 0; i < matches.length; i++) {
    rectangle(add(workplace, [diam * matches[i][0], diam * matches[i][1]]), diam * (sh.right - sh.left), diam * (sh.down - sh.up));
  }
}

function drawExec() {
  drawData(field, workplace);
  drawData(command.pattern, add(workplace, [sheetW * diam, 0]));
  drawFrames();
  drawButtons(execButtons);
}

function drawTile(x, y, im, cc) {
  cc.drawImage(images[im], x - radius, y - radius); 
}

function buttonPress(mousePos) {
  var x = mousePos.x;
  var y = mousePos.y;

  if (mode == "programming") {
    for (var i = 0; i < progButtons.length; i++) {
      progButtons[i].press(x, y);
    }
  }

  else if (mode == "executing") {
    for (var i = 0; i < execButtons.length; i++) {
      execButtons[i].press(x, y);
    }
  }
}

function button(label, x, y, wid, heit, func) {
  this.label = label;
  this.x = x;  
  this.y = y;
  this.wid = wid;
  this.heit = heit;

  this.draw = draw;
  function draw() {
    rectangle([this.x, this.y], this.wid, this.heit);
    drawLabel(this.label, this.x + 1, this.y + this.heit - 2)
  }

  this.press = press;
  function press(pressX, pressY) {
    if ((pressX > this.x) && (pressX < this.x + this.wid) && (pressY > this.y) && (pressY < this.y + this.heit)) {
      this.func()
    }
  }

  this.func = func;
}

function setupButtons() {
  var buttonHeit = 19;
  var sheetLeft = new button("<---------", workplace[0], (sheetH + 7) * diam + 3, 3 * diam, buttonHeit, function() {moveSheet(-1)});
  var sheetRight = new button("--------->", workplace[0] + 7 * diam, (sheetH + 7) * diam + 3, 3 * diam, buttonHeit, function() {moveSheet(1)});
  var sheetUp = new button("^", workplace[0] - diam, (7) * diam + 3, buttonHeit, diam, liftSheet);
  var sheetDown = new button("v", workplace[0] - diam, (9 + 7) * diam + 3, buttonHeit, diam, pushSheet);
  var save = new button("Save sheet", workplace[0], (sheetH + 8) * diam + 5, 115, buttonHeit, saveSheet);
  var newSheetButton = new button("New sheet", workplace[0] + save.wid + diam, (sheetH + 8) * diam + 5, 108, buttonHeit, newSheet);
  var saveProgram = new button("Save program", workplace[0], (sheetH + 8) * diam + 10 + 20, 140, buttonHeit, saveProg);
  var testButton = new button("Test", workplace[0] + saveProgram.wid + diam, (sheetH + 8) * diam + 10 + 20, 50, buttonHeit, test);
  var copySheet = new button("Copy Sheet", workplace[0], (sheetH + 9) * diam + 10 + 20, 140, buttonHeit, function() {mainSheet = mainSheet.copy(); editing = false;});

  var dirLeft = new button("<---------", workplace[0], 5 * diam + 3, 3 * diam, buttonHeit, function() {moveDirectionFigure(-1)});
  var rotate = new button("Rotate", workplace[0] + dirLeft.wid + radius, 5 * diam + 3, 3 * diam, buttonHeit, rotateDirectionFigure);
  var dirRight = new button("--------->", workplace[0] + 7 * diam, 5 * diam + 3, 3 * diam, buttonHeit, function() {moveDirectionFigure(1)});

  progButtons = [sheetLeft, sheetRight, sheetUp, sheetDown, save, newSheetButton, saveProgram, testButton, dirLeft, rotate, dirRight, copySheet];

  var figureLabels = ["Line", 'T', 'S', 'Z', 'Block', 'G', 'L'];

  for (var i = 0; i < 7; i++) {
    var figureButton = new button(figureLabels[i], workplace[0] + sheetW * diam + diam, diam * (i + 1), 60, buttonHeit, createShowFigure(i));
    progButtons.push(figureButton);
  }

  var newGameButton = new button("New Game", workplace[0], (fieldH + 2) * diam, 120, buttonHeit, newGame)
  var stopButton = new button("Stop", workplace[0] + newGameButton.wid + 10, (fieldH + 2) * diam, 100, buttonHeit, function() {pauseGame(); mode = "programming"; drawProg();})

  execButtons = [stopButton, newGameButton];
}























