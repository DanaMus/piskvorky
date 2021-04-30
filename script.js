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
    /* if (
      !(
        buttonElm[i].classList.contains('square-circle') &&
        buttonElm[i].classList.contains('square-cross')
      )
    ) { */
    if (activePlayer === 'circle') {
      buttonElm[i].classList.add('square-circle');
      buttonElm[i].setAttribute('disabled', true);
      activePlayer = 'cross';
      if (isWinningMove(buttonElm[i]) === true) {
        setTimeout(() => {
          let confirmation = confirm('Vyhrálo kolečko.');
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
          let confirmation = confirm('Vyhrál křížek.');
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
  return false;
};
