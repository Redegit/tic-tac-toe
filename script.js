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

Cell.createGameField();

// Инициализация текущего игрока (крестик начинает)
let turn = "x";

// Флаг, указывающий на завершение игры
let gameEnd = false;

// Функция, вызываемая при клике на ячейку
function onCellClick(y, x) {
    if (gameEnd) { startNewGame(); return; } // Если игра завершена, игрок не может делать ход
    if (field[y][x] !== "-") {
        return;
    }

    // Устанавливаем значение в выбранную ячейку (ход текущего игрока)
    field[y][x] = turn;

    // Обновление ячейки
    Cell.findByCoord(y, x).element.dataset.value = turn;

    // Смена текущего игрока
    turn = (turn === 'x') ? 'o' : 'x';

    // Обновление статуса
    if (turn === 'x') {
        updateStatus("Ходит крестик");
    } else {
        updateStatus("Ходит нолик");
    }

    // Проверка, завершена ли игра
    let result = checkWin();

    function gameResult(status) {
        gameEnd = true;
        updateStatus(status)
        drawLine(result)
    }

    switch (result.winner) {
        case "tie":
            gameResult("Ничья, попробуйте еще раз");
            break;
        case "x":
            gameResult("Поздравляем! Победил крестик");
            break;
        case "o":
            gameResult("Поздравляем! Победил нолик");
            break;
        case null: break;
        default: break;
    }
}

function drawLine({ dim, index }) {
    function createLine(cell1, cell2, rotation_deg) {
        const line = document.createElement("line");

        line.className = "line";

        line_padding = 3; // in rem
        x_shift = y_shift = 0;
        switch (rotation_deg) {
            case "90deg":
                y_shift -= line_padding / 2;
                break;
            case "0deg":
                x_shift -= line_padding / 2;
                break;
            case "45deg":
                x_shift -= line_padding / 2 / Math.sqrt(2);
                y_shift -= line_padding / 2 / Math.sqrt(2);
                break;
            case "135deg":
                x_shift += line_padding / 2 - Math.sqrt(2);
                y_shift -= line_padding / 2 - Math.sqrt(2);
                break;
        }

        cell1_center = getCellCenter(cell1.element);
        cell2_center = getCellCenter(cell2.element);

        x_dif = cell1_center.center_x - cell2_center.center_x
        y_dif = cell1_center.center_y - cell2_center.center_y
        line_width = Math.sqrt(x_dif ** 2 + y_dif ** 2)

        line.style.cssText = `
            --width: calc(${line_width}px + ${line_padding}rem); 
            --left: calc(${cell1_center.center_x}px + ${x_shift}rem); 
            --top: calc(${cell1_center.center_y}px + ${y_shift}rem);
            rotate: ${rotation_deg}`
        const field = document.getElementById("field");
        field.appendChild(line);
    }

    function getCellCenter(cell) {
        console.log(cell.getBoundingClientRect());
        let { x, y, height, width } = cell.getBoundingClientRect();
        center_x = x + width / 2;
        center_y = y + height / 2;
        return { center_x, center_y }
    }

    switch (dim) {
        case "col":
            createLine(
                Cell.findByCoord(0, index),
                Cell.findByCoord(2, index),
                "90deg"
            );
            break;
        case "row":
            createLine(
                Cell.findByCoord(index, 0),
                Cell.findByCoord(index, 2),
                "0deg"
            );
            break;
        case "diag":
            if (index === 0) {
                createLine(
                    Cell.findByCoord(0, 0),
                    Cell.findByCoord(2, 2),
                    "45deg"
                );
            } else {
                createLine(
                    Cell.findByCoord(0, 2),
                    Cell.findByCoord(2, 0),
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
    updateStatus("Ходит крестик");
}
// Обработчик события для кнопки перезапуска игры
restartButton.addEventListener("click", () => {
    startNewGame();
});
