const playerOne = "X";
const playerTwo = "O";
let p1 = document.createElement("p");
p1.innerText = `Player One: ${playerOne}`;
let p2 = document.createElement("p");
p2.innerText = `Player Two: ${playerTwo}`;
const body = document.getElementById("player");
body.appendChild(p1);
body.appendChild(p2);

let flag = false;

const inputArray = [null, null, null, null, null, null, null, null, null];
function boxClicked(event, index) {
  event.preventDefault();
  if (event.target.value === playerOne || event.target.value === playerTwo) {
    return;
  }
  if (flag) {
    event.target.value = playerTwo;
  } else {
    event.target.value = playerOne;
  }
  flag = !flag;
  inputArray[index] = event.target.value;
  winningChecker();
}

let isDraw = 0;

function winningChecker() {
  isDraw++;
  let isNext = true;
  winningPossibleCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  winningPossibleCombo.map((combo) => {
    if (isNext) {
      let val = inputArray[combo[0]];
      let flag = true;
      combo.map((value) => {
        if (val !== inputArray[value]) flag = false;
      });
      if (flag) {
        val !== null && winnerSection(val);
        isNext = false;
      }
      if (isDraw === 9 && !flag) winnerSection("draw");
    }
  });
}

//This is an optional section for the winner and draw
//Winner Section
//#region 
function winnerSection(val) {
  if (val === "draw") {
    let div = document.getElementById("winnerDiv");
    if (!div) {
      div = document.createElement("div");
      div.setAttribute("id", "winnerDiv");
      document.body.appendChild(div);
    }
    let img = document.createElement("img");
    img.src = "./img/cross-svgrepo-com.svg";

    let cross = document.createElement("button");
    cross.textContent = "Game Tied";
    cross.setAttribute("id", "cancelButton");

    cross.addEventListener("click", function () {
      div.remove();
      resetGame();
    });

    div.appendChild(img);
    div.appendChild(cross);
    resetGame();
    return;
  }
  let div = document.getElementById("winnerDiv");
  if (!div) {
    div = document.createElement("div");
    div.setAttribute("id", "winnerDiv");
    document.body.appendChild(div);
  }
  let img = document.createElement("img");
  img.src = "./img/trophy-svgrepo-com.svg";

  let winningMessage = document.createElement("p");
  winningMessage.innerText =
    val === playerOne ? "Winner: Player One" : "Winner: Player Two";

  let cross = document.createElement("button");
  cross.textContent = "cancel";
  cross.setAttribute("id", "cancelButton");

  cross.addEventListener("click", function () {
    div.remove();
    resetGame();
  });

  div.appendChild(img);
  div.appendChild(winningMessage);
  div.appendChild(cross);
}
//#endregion

//reset Game
function resetGame() {
  flag = false;
  isDraw = 0;
  var boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => {
    box.value = "";
  });
  inputArray.forEach((_, index) => {
    inputArray[index] = null;
  });
}
