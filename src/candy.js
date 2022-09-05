const grid = document.querySelector(".grid");
const scoreDisplay = document.getElementById('score')
const width = 8;
const squares = [];
let score = 0;

//CandyColour
const candyColors = [
'url(/images/alternative-red.png',
'url(/images/alternative-yellow.png',
'url(/images/alternative-orange.png)',
'url(/images/alternative-purple.png)',
'url(/images/alternative-green.png)',
'url(/images/alternative-blue.png)'
]
  // "yellow", "orange", "purple", "green", "blue"];
//creat board
const createBoard = () => {
  //we are looping over our grid 64 times and incrementing by 1 each time
  for (let i = 0; i < width*width; i++) {
    //everytime we loop we are creating a div
    const square = document.createElement("div");
    //made squares dragable
    square.setAttribute("draggable", true);
    //give each sqaure an id - remember we are lopping over with an i
    square.setAttribute("id", i);
    //getting random color
    let randomColor = Math.floor(Math.random() * candyColors.length);
    //assign random color to the square
    square.style.backgroundImage = candyColors[randomColor];
    //get it to show inside our grid
    grid.appendChild(square);
    //we want to store all the div we create into an array so we can work with it
    squares.push(square);
  }
};

//evoke out function
createBoard();

//drag the candies
let colorBeingDragged;
let colorBeingReplaced;
let squareIdBeingDragged;
let squareIdBeingReplaced;

squares.forEach(square => square.addEventListener("dragstart", dragStart));
squares.forEach(square => square.addEventListener("dragend", dragEnd));
squares.forEach(square => square.addEventListener("dragover", dragOver));
squares.forEach(square => square.addEventListener("dragenter", dragEnter));
squares.forEach(square => square.addEventListener("dragleave", dragLeave));
squares.forEach(square => square.addEventListener("drop", dragDrop));

function dragStart() {
  //being able to see the colour being dragged
  colorBeingDragged = this.style.backgroundImage;
  //to replace squares in the correct place we need to set an Id
  //ensure it is a number with parse Int
  squareIdBeingDragged = parseInt(this.id);
  console.log(colorBeingDragged);
  console.log(this.id, "dragStart");
}

function dragOver(e) {
  //prevent the default action
  e.preventDefault();
  console.log(this.id, "dragOver");
}

function dragEnter(e) {
  e.preventDefault();
  console.log(this.id, "dragEnter");
}

function dragLeave() {
    console.log(this.id, "dragLeave");
    this.style.backgroundImage = ''
}

function dragEnd() {
 // console.log(this.id, "dragEnd");
    //define a valid move
let validMoves = [
    squareIdBeingDragged -1,
    squareIdBeingDragged -width,
    squareIdBeingDragged +1,
    squareIdBeingDragged +width,
  ];

  //if the square i passed though is included in our valid moves array
  //this statement is true

  let validMove = validMoves.includes(squareIdBeingReplaced);

  if (squareIdBeingReplaced && validMove) {
    squareIdBeingReplaced = null;
    //if squarebeingrepled but not a valid move
  } else if (squareIdBeingReplaced && !validMove) {
    //give back it's color
    squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
  } else squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
}

function dragDrop() {
 // console.log(this.id, "dragDrop");
  colorBeingReplaced = this.style.backgroundImage;
  squareIdBeingReplaced = parseInt(this.id);
  this.style.backgroundImage = colorBeingDragged;
  //gives the square being dragged store it in new position
  squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
}


//drop candies once some have cleared 
function moveCandyDown() {
  for (i = 0; i < 55; i++){
    //if a square is empty keep filling it by moving down 
    if (squares[i + width].style.backgroundImage === '') {
      squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
      squares[i].style.backgroundImage = ''
     
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)
      if (isFirstRow && (squares[i].style.backgroundImage === '')) {
        let randomColor = Math.floor(Math.random() * candyColors.length)
        squares[i].style.backgroundImage = candyColors[randomColor]
      }
    }
  }
}

//checkformatches

// check for row of three
function checkRowForThree() {
  for (i = 0; i < 61; i++) {
    let rowOfThree = [i, i+1, i+2];
    let decidedColor = squares[i].style.backgroundImage
    const isBlank = squares[i].style.backgroundImage === ''
    
      
    const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
    if (notValid.includes(i)) continue
    
    if (rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        score += 3;
        scoreDisplay.innerHTML = score;
        rowOfThree.forEach(index => {
        squares[index].style.backgroundImage = ''
      });
    }
  }
}
checkRowForThree()

// check for coloumn of three
function checkColumnForThree() {
  for (i = 0; i < 47; i++) {
    let columnOfThree = [i, i+width, i+width*2];
    let decidedColor = squares[i].style.backgroundImage
    const isBlank = squares[i].style.backgroundImage === ''
    
      
  
    if (columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        score += 3;
        scoreDisplay.innerHTML = score;
        columnOfThree.forEach(index => {
        squares[index].style.backgroundImage = ''
      });
    }
  }
}
checkColumnForThree()

// check for row of Four
function checkRowForFour() {
  for (i = 0; i < 60; i++) {
    let rowOfFour = [i, i+1, i+2, i+3];
    let decidedColor = squares[i].style.backgroundImage
    const isBlank = squares[i].style.backgroundImage === ''
    
      
    const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
    if (notValid.includes(i)) continue
    if (rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        score += 4;
        scoreDisplay.innerHTML = score;
        rowOfFour.forEach(index => {
        squares[index].style.backgroundImage = ''
      });
    }
  }
}
checkRowForFour()

//check for coloumn of Four 
function checkColumnForFour() {
  for (i = 0; i < 39; i++) {
    let columnOfFour = [i, i+width, i+width*2, i+width*3];
    let decidedColor = squares[i].style.backgroundImage
    const isBlank = squares[i].style.backgroundImage === ''     
  
    if (columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        score += 4;
        scoreDisplay.innerHTML = score;
        columnOfFour.forEach(index => {
        squares[index].style.backgroundImage = ''
      });
    }
  }
}

checkColumnForFour()

//check for five 
//adding a button to start and stop the game 

window.setInterval(function () {
  moveCandyDown()
  checkRowForFour()
  checkColumnForFour()
  checkRowForThree()
  checkColumnForThree()
 
}, 100)