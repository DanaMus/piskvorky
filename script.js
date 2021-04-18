'use strict';

let activePlayer = 'circle';
const buttonElm = document.querySelectorAll('.square');
const playElm = document.querySelector('.gamein');
const playerElm = document.querySelector('.player');

const Player = () => {
  return `
    <p class="player-description">Hraje: <img src="${activePlayer}.svg" alt="${activePlayer}" class="${activePlayer} white" /></p>
  `;
};

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
        buttonElm[i].setAttribute('disabled', true);
        activePlayer = 'cross';
      } else {
        buttonElm[i].classList.add('square-cross');
        buttonElm[i].setAttribute('disabled', true);
        activePlayer = 'circle';
      }
      playerElm.innerHTML = Player();
    }
  });
}
