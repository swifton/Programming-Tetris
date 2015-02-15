function sheet(cols, rows) {
  this.pattern = new Array(cols);
  this.pattern[0] = new Array(rows);

  this.reset = reset;
  function reset() {
    for (var i = 0; i < wid; i++){
      data[i] = new Array(rows);

      for (var j = 0; j < hei; j++){
        data[i][j] = 9;
      }
    }
  }
  
  this.copy = copy;
  function copy() {
    var copy = new Array(sheet.length);
    copy[0] = new Array(sheet[0].length);
    reset(copy, 0, false);
    for (var i = 0; i < sheet.length; i++) {
      for (var j = 0; j < sheet[0].length; j++) {
        copy[i][j] = sheet[i][j];
      }
    }
    return copy;
  }


  reset();
}
