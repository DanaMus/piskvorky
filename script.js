'use strict';

const activePlayer = 'circle';
const buttonElm = document.querySelector('.square');

buttonElm.addEventListener('click', () => {
  if (activePlayer === 'circle') {
    buttonElm.classList.add('square-circle');
  } else {
    buttonElm.classList.add('square-cross');
  }
});
