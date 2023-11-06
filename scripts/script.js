// Инициализация игрового поля
let field = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"]
];

// Функция сброса игрового поля
function resetField() {
    field = [
        ["-", "-", "-"],
        ["-", "-", "-"],
        ["-", "-", "-"]
    ];
}

// Получение элемента для отображения статуса игры
const statusElement = document.getElementById("status");

// Функция для обновления статуса игры
function updateStatus(text) {
    statusElement.textContent = text;
}

// Скрытие поля и кнопки перезапуска до начала игры
document.getElementById("field").style.display = "none";
document.getElementById("btn-restart").style.display = "none";
updateStatus("");

// Функция для обновления статуса игры с использованием имен игроков
function updateStatusWithNames(playerSymbol, player1Name, player2Name) {
    const playerName = playerSymbol === 'x' ? player1Name : player2Name;
    updateStatus(`Ходит ${playerName}`);
}

// Обработчик клика по кнопке "Начать игру"
document.getElementById("start-button").addEventListener("click", () => {
    const player1Name = document.getElementById("player1").value;
    const player2Name = document.getElementById("player2").value;

    if (player1Name && player2Name) {
        // Сохранение имен игроков
        game.player1Name = player1Name;
        game.player2Name = player2Name;

        // Скрытие формы ввода имен
        document.getElementById("player-names").style.display = "none";

        // Показ игрового поля и кнопки перезапуска
        document.getElementById("field").style.display = "grid";
        document.getElementById("btn-restart").style.display = "block";

        // Показ статуса игры
        document.getElementById("status").style.display = "block";

        // Обновление статуса и начало новой игры
        updateStatusWithNames('x', player1Name, player2Name);
        startNewGame();
    } else {
        alert("Пожалуйста, введите имена обоих игроков.");
    }
});



// Инициализация текущего игрока (крестик начинает)
let turn = "x";

// Объект для хранения имен игроков и состояния игры
const game = {
    player1Name: "",
    player2Name: "",
    gameEnd: false
};

// Функция начала новой игры
function startNewGame() {
    resetField();
    Cell.resetGameField();
    turn = 'x';
    game.gameEnd = false;
    updateStatusWithNames(turn, game.player1Name, game.player2Name);
}

// Переопределение функции onCellClick для обновления статуса игры с именами игроков
function onCellClick(row, col) {
    if (gameEnd || field[row][col] !== "-") return;
    
    field[row][col] = turn;
    Cell.findByCoord(row, col).element.dataset.value = turn;
    
    let result = checkWin();
    if (result.winner) {
        endGame(result);
    } else {
        turn = turn === 'x' ? 'o' : 'x';
        updateStatusWithNames(turn, game.player1Name, game.player2Name);
    }
}

// Функция для обработки окончания игры
function endGame(result) {
    game.gameEnd = true;
    let statusMessage = "";
    if (result.winner === "tie") {
        statusMessage = "Ничья, попробуйте еще раз";
    } else {
        const winnerName = result.winner === 'x' ? game.player1Name : game.player2Name;
        statusMessage = `Поздравляем! Победил ${winnerName}`;
    }
    updateStatus(statusMessage);
    drawLine(result);
}

// Обработчик события для кнопки перезапуска игры
document.getElementById("btn-restart").addEventListener("click", () => {
    startNewGame();
});

class Cell {
    static cellList = [];

    constructor(row_i, col_i, htmlElement) {
        this.row_i = row_i
        this.col_i = col_i
        this.element = htmlElement
        Cell.cellList.push(this)
    }

    static findByCoord(row_i, col_i) {
        return Cell.cellList.filter((cell) =>
            cell.row_i === row_i && cell.col_i === col_i
        )[0]
    }

    static clearCellList() {
        Cell.cellList = []
    }

    static createGameField() {
        const fieldElement = document.getElementById("field");
        fieldElement.innerHTML = "";
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement("div");
                cell.className = "cell";
                cell.dataset.value = field[i][j];
                cell.dataset.col = j;
                cell.dataset.row = i;
                cell.addEventListener("click", () => onCellClick(i, j));
                fieldElement.appendChild(cell);
                new Cell(i, j, cell);
            }
        }
    }

    static resetGameField() {
        Cell.clearCellList()
        Cell.createGameField()
    }
}


// Функция для проверки, кто выиграл или ничья в игре
function checkWin() {
    // Проверка выигрыша по горизонтали (по строкам)
    for (let row_i = 0; row_i < 3; row_i++) {
        if (field[row_i][0] === field[row_i][1] && field[row_i][1] === field[row_i][2] && field[row_i][0] !== "-") {
            return { winner: field[row_i][0], dim: "row", index: row_i };
        }
    }

    // Проверка выигрыша по вертикали (по столбцам)
    for (let col_i = 0; col_i < 3; col_i++) {
        if (field[0][col_i] === field[1][col_i] && field[1][col_i] === field[2][col_i] && field[0][col_i] !== "-") {
            return { winner: field[0][col_i], dim: "col", index: col_i };
        }
    }

    // Проверка выигрыша по диагонали (слева направо)
    if (field[0][0] === field[1][1] && field[1][1] === field[2][2] && field[0][0] !== "-") {
        return { winner: field[0][0], dim: "diag", index: 0 };
    }

    // Проверка выигрыша по диагонали (справа налево)
    if (field[0][2] === field[1][1] && field[1][1] === field[2][0] && field[0][2] !== "-") {
        return { winner: field[0][2], dim: "diag", index: 1 };
    }

    // Подсчет количества пустых ячеек
    let countEmpty = 0;
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            if (field[y][x] === "-") {
                countEmpty++;
            }
        }
    }

    // Если все ячейки заняты и нет выигрыша, то ничья
    if (countEmpty === 0) {
        return { winner: "tie" };
    }

    // Если игра продолжается, возвращаем null
    return { winner: null };
}

// Функция для обновления статуса игры
function updateStatus(text) {
    statusElement.textContent = text;
}

Cell.createGameField();

// Флаг, указывающий на завершение игры
let gameEnd = false;

function setGameEndedData(status) {
    const root = document.getElementById("root");
    root.dataset.gameEnd = status;
}

// // Функция, вызываемая при клике на ячейку
// function onCellClick(y, x) {
//     if (gameEnd) { return; } // Если игра завершена, игрок не может делать ход
//     if (field[y][x] !== "-") {
//         return;
//     }

//     // Устанавливаем значение в выбранную ячейку (ход текущего игрока)
//     field[y][x] = turn;

//     // Обновление ячейки
//     Cell.findByCoord(y, x).element.dataset.value = turn;

//     // Смена текущего игрока
//     turn = (turn === 'x') ? 'o' : 'x';

//     // Обновление статуса
//     if (turn === 'x') {
//         updateStatus("Ходит крестик");
//     } else {
//         updateStatus("Ходит нолик");
//     }

//     // Проверка, завершена ли игра
//     let result = checkWin();

//     function gameResult(status) {
//         gameEnd = true;
//         updateStatus(status);
//         drawLine(result);
//         setGameEndedData(true);
//     }

//     switch (result.winner) {
//         case "tie":
//             gameResult("Ничья, попробуйте еще раз");
//             break;
//         case "x":
//             gameResult("Поздравляем! Победил крестик");
//             break;
//         case "o":
//             gameResult("Поздравляем! Победил нолик");
//             break;
//         case null: break;
//         default: break;
//     }
// }

function drawLine({ dim, index }) {
    function createLine(col_i, row_i, rotation_deg) {
        const line = document.createElement("line");

        line.className = "line";

        line_padding = 3; // in rem
        line_width = 0;
        x_shift = y_shift = 0;
        switch (rotation_deg) {
            case "90deg":
                y_shift -= line_padding / 2;
                line_width = `calc((100% + var(--gap)) / 3 * 2 + ${line_padding}rem)`
                break;
            case "0deg":
                x_shift -= line_padding / 2;
                line_width = `calc((100% + var(--gap)) / 3 * 2 + ${line_padding}rem)`
                break;
            case "45deg":
                x_shift -= line_padding / 2 / Math.sqrt(2);
                y_shift -= line_padding / 2 / Math.sqrt(2);
                line_width = `calc((100% + var(--gap)) / 3 * 2 * ${Math.sqrt(2)} + ${line_padding}rem)`
                break;
            case "135deg":
                x_shift += line_padding / 2 / Math.sqrt(2);
                y_shift -= line_padding / 2 / Math.sqrt(2);
                line_width = `calc((100% + var(--gap)) / 3 * 2 * ${Math.sqrt(2)} + ${line_padding}rem)`
                break;
        }

        let x_1 = getPosFromIndex(col_i);
        let y_1 = getPosFromIndex(row_i);

        function getPosFromIndex(index) {
            switch (index % 3) {
                // --gap - кастомный атрибут класса .field, использующийся для grid-gap 
               case 0: return `calc((100% - 2 * var(--gap)) / 6 )`;
               case 1: return `50%`;
               case 2: return `calc((500% + 2 * var(--gap)) / 6)`;
           }
        }

        line.style.cssText = `
            --width: ${line_width}; 
            --left: calc(${x_1} + ${x_shift}rem); 
            --top: calc(${y_1} + ${y_shift}rem);
            rotate: ${rotation_deg}`
        const field = document.getElementById("field");
        field.appendChild(line);
    }

    switch (dim) {
        case "col":
            createLine(
                index, 0, 
                "90deg"
            );
            break;
        case "row":
            createLine(
                0, index, 
                "0deg"
            );
            break;
        case "diag":
            if (index === 0) {
                createLine(
                    0, 0,
                    "45deg"
                );
            } else {
                createLine(
                    2, 0, 
                    "135deg"
                );
            }
            break;
    }
}

// Получение кнопки для перезапуска игры
const restartButton = document.getElementById("btn-restart");

function startNewGame() {
    gameEnd = false;
    resetField();
    Cell.resetGameField();
    turn = 'x';
    updateStatusWithNames(turn, game.player1Name, game.player2Name);
    setGameEndedData(false);
}

// Обработчик события для кнопки перезапуска игры
restartButton.addEventListener("click", () => {
    startNewGame();
});

const fieldElement = document.getElementById("field");
// Перезапуск игры по нажатию на игровое поле, если игра завершена
fieldElement.addEventListener("mousedown", (e) => {
    if (gameEnd && e.button === 0) startNewGame();
});

startNewGame();