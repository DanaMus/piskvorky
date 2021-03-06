'use strict';

let activePlayer = 'circle';
const buttonElm = document.querySelectorAll('.square');
const playElm = document.querySelector('.gamein');
const playerElm = document.querySelector('.player');

const Player = () => {
  return `
    <p class="player-description">Hraje: </p><p><img src="${activePlayer}.svg" alt="${activePlayer}" class="${activePlayer} white" /></p>
  `;
};

playerElm.innerHTML = Player(activePlayer);

for (let i = 0; i < buttonElm.length; i++) {
  buttonElm[i].addEventListener('click', () => {
    if (activePlayer === 'circle') {
      buttonElm[i].classList.add('square-circle');
      buttonElm[i].setAttribute('disabled', true);
      activePlayer = 'cross';
      /* Zhodnocení, jestli jde o výherní tah, v případě confirm-"ok" nová hra */
      if (isWinningMove(buttonElm[i]) === true) {
        setTimeout(() => {
          let confirmation = confirm('Vyhrálo kolečko. Chceš hrát znovu?');
          if (confirmation === true) {
            location.reload();
          }
        }, 200);
      }
    } else {
      buttonElm[i].classList.add('square-cross');
      buttonElm[i].setAttribute('disabled', true);
      activePlayer = 'circle';
      if (isWinningMove(buttonElm[i]) === true) {
        setTimeout(() => {
          let confirmation = confirm('Vyhrál křížek. Chceš hrát znovu?');
          if (confirmation === true) {
            location.reload();
          }
        }, 200);
      }
    }
    playerElm.innerHTML = Player();
    /* } */
  });
}

const getSymbol = (field) => {
  if (field.classList.contains('square-cross')) {
    return 'cross';
  } else if (field.classList.contains('square-circle')) {
    return 'circle';
  }
};

const boardSize = 10;
const fields = document.querySelectorAll('.square');

const getField = (row, column) => fields[row * boardSize + column];

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length && field !== fields[fieldIndex]) {
    fieldIndex++;
  }
  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);
  let i;

  let inRow = 1;
  i = origin.column;

  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }
  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  /* Zhodnocení diagonály - směr \ */

  /* K levému hornímu rohu */

  let inDiagonalA = 1;
  let r = origin.row;
  let c = origin.column;
  while (r > 0 && c > 0 && symbol === getSymbol(getField(r - 1, c - 1))) {
    inDiagonalA++;
    r--;
    c--;
  }

  /* K pravému dolnímu rohu */

  r = origin.row;
  c = origin.column;
  while (
    r < boardSize - 1 &&
    c < boardSize - 1 &&
    symbol === getSymbol(getField(r + 1, c + 1))
  ) {
    inDiagonalA++;
    r++;
    c++;
  }

  if (inDiagonalA >= symbolsToWin) {
    return true;
  }

  /* Zhodnocení diagonály - směr / */

  /* K pravému hornímu rohu */

  let inDiagonalB = 1;
  r = origin.row;
  c = origin.column;
  while (
    r > 0 &&
    c < boardSize - 1 &&
    symbol === getSymbol(getField(r - 1, c + 1))
  ) {
    inDiagonalB++;
    r--;
    c++;
  }

  /* K levému dolnímu rohu */

  r = origin.row;
  c = origin.column;
  while (
    r < boardSize - 1 &&
    c > 0 &&
    symbol === getSymbol(getField(r + 1, c - 1))
  ) {
    inDiagonalB++;
    r++;
    c--;
  }

  if (inDiagonalB >= symbolsToWin) {
    return true;
  }

  return false;
};
