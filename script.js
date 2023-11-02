// Функция для проверки, кто выиграл или ничья в игре
function checkWin() {
    // Проверка выигрыша по горизонтали (по строкам)
    for (let row of field) {
        if (row[0] === row[1] && row[1] === row[2] && row[0] !== "-") {
            return row[0];
        }
    }

    // Проверка выигрыша по вертикали (по столбцам)
    for (let x = 0; x < 3; x++) {
        if (field[0][x] === field[1][x] && field[1][x] === field[2][x] && field[0][x] !== "-") {
            return field[0][x];
        }
    }

    // Проверка выигрыша по диагонали (слева направо)
    if (field[0][0] === field[1][1] && field[1][1] === field[2][2] && field[0][0] !== "-") {
        return field[0][0];
    }

    // Проверка выигрыша по диагонали (справа налево)
    if (field[0][2] === field[1][1] && field[1][1] === field[2][0] && field[0][2] !== "-") {
        return field[0][2];
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
        return "tie";
    }

    // Если игра продолжается, возвращаем false
    return false;
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

// Получение элемента для отображения игрового поля
const fieldElement = document.getElementById("field");

// Функция для обновления пользовательского интерфейса (игрового поля)
function updateFieldUI() {
    fieldElement.innerHTML = '';

    if (turn === 'x') {
        updateStatus("Ходит крестик");
    } else {
        updateStatus("Ходит нолик");
    }

    // Создание и добавление ячеек в игровое поле
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

// Инициализация текущего игрока (крестик начинает)
let turn = "x";

// Флаг, указывающий на завершение игры
let gameEnd = false;

// Обновление интерфейса при загрузке страницы
updateFieldUI();

// Функция, вызываемая при клике на ячейку
function onCellClick(y, x) {
    if (gameEnd) return; // Если игра завершена, игрок не может делать ход
    if (field[y][x] !== "-") {
        console.log("Тут уже занято");
        return;
    }

    // Устанавливаем значение в выбранную ячейку (ход текущего игрока)
    field[y][x] = turn;
    // Смена текущего игрока
    turn = (turn === 'x') ? 'o' : 'x';

    // Обновление интерфейса
    updateFieldUI();

    // Проверка, завершена ли игра
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

// Получение кнопки для перезапуска игры
const restartButton = document.getElementById("btn-restart");

// Обработчик события для кнопки перезапуска игры
restartButton.addEventListener("click", () => {
    gameEnd = false;
    resetField();
    turn = 'x';
    updateFieldUI();
});
