function checkWin() {
    // Проверка на победу
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

    // Проверка
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

    // Иначе возвращаем false, если не победа, не ничья
    return false;
}

let field = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"]
];

function updateFieldUI() {
    const fieldElement = document.getElementById("field");
    fieldElement.innerHTML = ''; // Очищаем содержимое элемента

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.innerText = field[i][j];
            cell.addEventListener("click", () => onCellClick(i, j)); // Добавляем обработчик клика
            fieldElement.appendChild(cell);
        }
    }
}

updateFieldUI();

let turn = "x";

function onCellClick(y, x) {
    if (field[y][x] !== "-") {
        console.log("Тут уже занято");
        return;
    }

    field[y][x] = turn;
    updateFieldUI();

    let result = checkWin();
    if (result) {
        if (result === "tie") {
            console.log("Ничья, попробуйте еще раз");
        } else {
            if (result === "x") {
                console.log("Поздравляем! Победил крестик");
            } else {
                console.log("Поздравляем! Победил нолик");
            }
        }
        return;
    }

    turn = (turn === 'x') ? 'o' : 'x';
}
