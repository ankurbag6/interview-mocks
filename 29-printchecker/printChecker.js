/*
Given 4 inputs, write a program that will output a checkerboard pattern. We use the characters X and O to represent the black and white squares on the board. The number of rows and columns are variable. The width and height of each row and column are measured in characters and are also variable. Example:

XXXOOOXXXOOOXXX
XXXOOOXXXOOOXXX

OOOXXXOOOXXXOOO
OOOXXXOOOXXXOOO

XXXOOOXXXOOOXXX
XXXOOOXXXOOOXXX

OOOXXXOOOXXXOOO
OOOXXXOOOXXXOOO

The inputs for the above output:
  column_width = 3 // no.of times XXX or 000 in col
  columns = 5 // no. of groups of columsn
  row_height = 2 // no.of rows // tells us to being with one pattern eg. start with 
  rows = 4 // no. of groups of rows

Input -- 4 parameter
-- First character

Ouptut : Checkerboard pattern

Approach: 
- variables :flag - shouldPrintXinCol, shouldPrintXinRow, 
- 2D matrix represenation
 for(1..rows)
  for(1..columns)
    // what would be the logic to print
    // Print X and then 0 alternatively
    // cntofCurrentColWd = 0, cntofCurrentRowHt = 0
    // logic to switch flag - if(cntofCurrentColWd === column_width)
    // else print currentChar
    print(str)
*/

function printChecker(column_width, columns, row_height, rows) {
  let res = "";
  let shouldPrintXinRow = true;
  let cntofCurrentRowHt = 0;

  for (let r = 0; r < rows * row_height; r++) {
    // Each new row starts from the current row's "phase"
    let shouldPrintXinCol = shouldPrintXinRow;
    let cntofCurrentColWd = 0;
    cntofCurrentRowHt++;

    for (let c = 0; c < columns * column_width; c++) {
      cntofCurrentColWd++;
      res += shouldPrintXinCol ? "X" : "O";

      if (cntofCurrentColWd === column_width) {
        shouldPrintXinCol = !shouldPrintXinCol;
        cntofCurrentColWd = 0;
      }
    }

    res += "\n";

    if (cntofCurrentRowHt === row_height) {
      shouldPrintXinRow = !shouldPrintXinRow;
      cntofCurrentRowHt = 0;
    }
  }

  return res;
}

