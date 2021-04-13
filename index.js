
const onLoad = function() {
  const grid = document.querySelector('.grid');
  let elements = '';
  for(let i = 0; i < 42; i++){
    elements += `<div class="cell" id=${i} data-player=0></div>`
  }  

  grid.insertAdjacentHTML('afterbegin', elements);
}
onLoad();

let curPlayer = 1;
let winner;
const cells = document.querySelectorAll('.cell');


const reset = function(){
  cells.forEach(cell => {
    cell.setAttribute('data-player', 0);
    cell.setAttribute('style', 'background-color:white');
  })
  curPlayer = 1;
}


cells.forEach( cell => {
  cell.addEventListener('click', () => {
    const id = cell.getAttribute('id');
    if(isValid(id)){      
      cell.setAttribute('data-player', curPlayer);
      cell.setAttribute('style', curPlayer === 1 ? 'background-color:red' : 'background-color:yellow');
      if(checkWin(id)){
        alert(`Winner is ${curPlayer === 1 ? 'red' : 'yellow'}`);
        reset();
        return;
      }
      curPlayer = curPlayer * -1;
    }
  })
});


const isValid = function(id) {
  const cell = document.getElementById(id);
  const player = cell.getAttribute('data-player');

  if(player !== '0') return false; // it is occupied.

  if(parseInt(id) > 34) return true;

  //if cell below it is not occupied, return false
  const cellBelow = document.getElementById(parseInt(id) + 7);
  if(cellBelow.getAttribute('data-player') === '0') return false;

  return true;

}

const checkWin = function(id) {
  const pos = parseInt(id);

  let curPos = pos;
  let count = 0;

  /////////check the same row

  const leftMost = Math.floor(curPos / 7) * 7;
  const rightMost = leftMost + 6;

  //go to left
  while(curPos >= leftMost) {
    const leftElement = document.getElementById(curPos);
    if(leftElement.getAttribute('data-player') == curPlayer) {
      count++;
    }else{
      break;
    }

    curPos--;
  }

  //go to right
  curPos = pos;
  count--; // the cur pos would count twice
  while(curPos <= rightMost){
    const rightElement = document.getElementById(curPos);
    if(rightElement.getAttribute('data-player') == curPlayer) {
      count++;
    }else{
      break;
    }

    curPos++;
  }

  if(count >= 4) return true;


  ////check the same col
  count = 0;
  curPos = pos;
  //go upupwards is not needed
  //go downwards

  while(curPos / 7 <= 5){
    const downElement = document.getElementById(curPos);
    
    if(downElement.getAttribute('data-player') == curPlayer) {
      count++;
    }else{
      break;
    }

    curPos += 7;
  }
  
  if(count >= 4) return true;

  //check leftupper to right lower diagnol
  count = 0;
  curPos = pos;

  //go left upper
  while(curPos >= 0){
    const diagElement = document.getElementById(curPos);
    if(diagElement.getAttribute('data-player') == curPlayer) {
      count++;
    }else{
      break;
    }

    curPos -= 8;
  }

  //go right lower
  curPos = pos;
  count--; 
  while(curPos <= 41){
    const diagElement = document.getElementById(curPos);
    if(diagElement.getAttribute('data-player') == curPlayer) {
      count++;
    }else{
      break;
    }

    curPos += 8;
  }
  if(count >= 4) {
    console.log('leftupper', count);
    return true;
  }
  //check leftlower to right upper diagnol
  count = 0;
  curPos = pos;
  let row = Math.floor(curPos / 7);
  let col = curPos % 7;
  //go left lower
  while(row <= 5 && col >= 0){
    const diagElement = document.getElementById(row * 7 + col);
    if(diagElement.getAttribute('data-player') == curPlayer) {
      count++;
    }else{
      break;
    }

    row++;
    col--;
  }

  //go right upper
  row = Math.floor(curPos / 7);
  col = curPos % 7;
  count--; 
  while(row >= 0 && col <= 6){
    const diagElement = document.getElementById(row * 7 + col);
    if(diagElement.getAttribute('data-player') == curPlayer) {
      count++;
    }else{
      break;
    }

    row--;
    col++;
  }
  if(count >= 4) {
    console.log('leftlower', count);
    return true;
  }
  return false;

}
