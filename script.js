'use strict';

let activePlayer = 'circle';
const buttonElm = document.querySelectorAll('.square');
const playElm = document.querySelector('.gamein');

for (let i = 1; i < buttonElm.length; i++) {
  buttonElm[i].addEventListener('click', () => {
    if (
      !(
        buttonElm[i].classList.contains('square-circle') &&
        buttonElm[i].classList.contains('square-cross')
      )
    ) {
      if (activePlayer === 'circle') {
        buttonElm[i].classList.add('square-circle');
      } else {
        buttonElm[i].classList.add('square-cross');
      }
    }
  });
}
