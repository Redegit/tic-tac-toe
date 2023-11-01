function checkWin() {
    for (let row of field) {
        if (row[0] === row[1] && row[1] === row[2] && row[0] !== "-") {
            return row[0];
        }
    }

    for (let x = 0; x < 3; x++) {
        if (field[0][x] === field[1][x] && field[1][x] === field[2][x] && field[0][x] !== "-") {
            return field[0][x];
        }
    }

    if (field[0][0] === field[1][1] && field[1][1] === field[2][2] && field[0][0] !== "-") {
        return field[0][0];
    }

    if (field[0][2] === field[1][1] && field[1][1] === field[2][0] && field[0][2] !== "-") {
        return field[0][2];
    }

    let countEmpty = 0;
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            if (field[y][x] === "-") {
                countEmpty++;
            }
        }
    }
    if (countEmpty === 0) {
        return "tie";
    }

    return false;
}

let field = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"]
];

function resetField() {
    field = [
        ["-", "-", "-"],
        ["-", "-", "-"],
        ["-", "-", "-"]
    ];
}

const statusElement = document.getElementById("status")
function updateStatus(text) {
    statusElement.textContent = text;
}

const fieldElement = document.getElementById("field");
function updateFieldUI() {
    fieldElement.innerHTML = '';

    if (turn === 'x') {
        updateStatus("Ходит крестик")
    } else {
        updateStatus("Ходит нолик")
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.value = field[i][j];
            cell.dataset.col = j;
            cell.dataset.row = i;
            cell.addEventListener("click", () => onCellClick(i, j));
            fieldElement.appendChild(cell);
        }
    }
}

let turn = "x";
let gameEnd = false;

updateFieldUI();

function onCellClick(y, x) {
    if (gameEnd) return;
    if (field[y][x] !== "-") {
        console.log("Тут уже занято");
        return;
    }

    field[y][x] = turn;
    turn = (turn === 'x') ? 'o' : 'x';

    updateFieldUI();

    let result = checkWin();
    if (result) {
        if (result === "tie") {
            updateStatus("Ничья, попробуйте еще раз");
        } else {
            if (result === "x") {
                updateStatus("Поздравляем! Победил крестик");
            } else {
                updateStatus("Поздравляем! Победил нолик");
            }
        }
        gameEnd = true;
        return;
    }
}

const restartButton = document.getElementById("btn-restart")
restartButton.addEventListener("click", () => {
    gameEnd = false;
    resetField();
    turn = 'x';
    updateFieldUI();
})