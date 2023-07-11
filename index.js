const squares = document.querySelectorAll(".square");
const winner = document.querySelector("#winner");
const playerTurn = document.querySelector("#playerTurn");
const resetBtn = document.querySelector("#reset");

let playerInTurn = "Player 1";
let selectedSquares = [], selectedSquare = "";
let playerOneSelected = [], playerTwoSelected = [];
let winnerOne = null, winnerTwo = null;

let controller = new AbortController();
let signal = controller.signal;

function sortArray(tab) {
    return tab.sort((a, b) => a["id"] - b["id"]);
}

function getId(tab) {
    return tab.map((item) => item["id"]);
}

function checkWinner(tab, player) {
    let counterRowA = 0, counterRowB = 0, counterRowC = 0;
    let counterCol1 = 0, counterCol2 = 0, counterCol3 = 0;
    let counterDiagOne = 0, counterDiagTwo = 0;
    let champion = "";

    tab.forEach((choice) => {
        if (choice.startsWith("a")) {
            ++counterRowA;
        } else if (choice.startsWith("b")) {
            ++counterRowB
        } else if (choice.startsWith("c")) {
            ++counterRowC;
        }

        if (choice.endsWith("1")) {
            ++counterCol1;
        } else if (choice.endsWith("2")) {
            ++counterCol2;
        } else if (choice.endsWith("3")) {
            ++counterCol3;
        }

        if (choice == "a1" || choice == "b2" || choice == "c3") {
            ++counterDiagOne;
        }

        if (choice == "a3" || choice == "b2" || choice == "c1") {
            ++counterDiagTwo;
        }

        if (counterRowA === 3 || counterRowB === 3 || counterRowC === 3 || counterCol1 === 3 || counterCol2 === 3 || counterCol3 === 3 || counterDiagOne === 3 || counterDiagTwo === 3) {
            champion = player;
        }
    });

    return champion;
}

squares.forEach((square, index) => {

    let isClicked = false;

    const handleClick = function (block, step) {

        switch (step) {
            case 1:
                selectedSquare = "a1";
                break;
            case 2:
                selectedSquare = "a2";
                break;
            case 3:
                selectedSquare = "a3";
                break;

            case 4:
                selectedSquare = "b1";
                break;
            case 5:
                selectedSquare = "b2";
                break;
            case 6:
                selectedSquare = "b3";
                break;
            case 7:
                selectedSquare = "c1";
                break;
            case 8:
                selectedSquare = "c2";
                break;
            case 9:
                selectedSquare = "c3";
                break;
            default:
                throw Error("Index out of range");
        }


        let selectedTempSquare = { id: selectedSquare, player: playerInTurn };
        selectedSquares.push(selectedTempSquare);

        if (block.textContent.length == 0) {
            if (playerInTurn == "Player 1") {
                block.textContent = "X";
                playerInTurn = "Player 2";
                playerTurn.textContent = playerInTurn;
            } else if (playerInTurn == "Player 2") {
                block.textContent = "O";
                playerInTurn = "Player 1";
                playerTurn.textContent = playerInTurn;
            }
        } else {
            if (selectedTempSquare.player == "Player 1") {
                playerInTurn = "Player 1";
            } else {
                playerInTurn = "Player 2";
            }
        }

        playerOneSelected = selectedSquares.filter((item) => item.player == "Player 1");
        playerOneSelected = sortArray(playerOneSelected);
        playerOneSelected = new Set(getId(playerOneSelected));
        console.log({ playerOneSelected });
        winnerOne = checkWinner(playerOneSelected, "Player 1");

        playerTwoSelected = selectedSquares.filter((item) => item.player == "Player 2");
        playerTwoSelected = sortArray(playerTwoSelected);
        playerTwoSelected = new Set(getId(playerTwoSelected));
        console.log({ playerTwoSelected });
        winnerTwo = checkWinner(playerTwoSelected, "Player 2");

        if (winnerOne) {
            controller.abort();
            winner.classList.replace("hidden", "block");
            winner.textContent = "Player 1 wins";
            resetBtn.style.backgroundColor = "#fff";
        } else if (winnerTwo) {
            controller.abort();
            winner.classList.replace("hidden", "block");
            winner.textContent = "Player 2 wins";
            resetBtn.style.backgroundColor = "#fff";
        }
    }

    square.addEventListener('click', function () {
        handleClick(square, index + 1);
    }, { signal });

    resetBtn.addEventListener('click', function () {
        window.location.reload();
    });

});