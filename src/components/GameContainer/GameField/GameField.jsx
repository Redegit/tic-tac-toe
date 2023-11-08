import { useEffect, useState } from "react";
import { Cell } from "./Cell/Cell";
import "./game_field.scss"
import { useGameContext } from "../../../hook/useGameContext";
import { Line } from "./Line/Line";

export const GameField = ({ reRenderToggler, setGameStatus, restartGame }) => {
    const [field, setField] = useState([
        ["-", "-", "-"],
        ["-", "-", "-"],
        ["-", "-", "-"]
    ]);
    const { gameState, endGame } = useGameContext();
    const [lineProps, setLineProps] = useState(null);
    const [fieldAnim, setFieldAnim] = useState(false);

    const resetField = () => {
        setField([
            ["-", "-", "-"],
            ["-", "-", "-"],
            ["-", "-", "-"]
        ]);
    }

    const updateField = (row_i, col_i) => {
        let fieldTmp = field;
        fieldTmp[row_i][col_i] = gameState.turn;
        setField(fieldTmp)

        let result = checkWin(fieldTmp);
        if (result.winner) {
            processGameEnd(result);
        }
    }
    useEffect(() => {
        resetField();
        setLineProps(null);
    }, [reRenderToggler]);

    const animField = () => {
        setFieldAnim(true);

        setTimeout(() => {
            restartGame();
        }, 500);

        setTimeout(() => {
            setFieldAnim(false);
        }, 600);
    }

    const handleFieldClick = () => {
        if (!gameState.gameGoing) {
            animField();
        }
    }

    // Функция для обработки окончания игры
    const processGameEnd = (result) => {
        endGame();
        let statusMessage = "";
        if (result.winner === "tie") {
            statusMessage = "Ничья, попробуйте еще раз";
        } else {
            statusMessage = `Поздравляем! Победил ${gameState.currentPlayer}`;
            setLineProps(result);
        }
        setGameStatus(statusMessage);
    }

    return (
        <div onClick={handleFieldClick} id="field" className={`field ${fieldAnim ? "active" : ""}`} >
            {!field.empty && field.map((row, row_i) =>
                row.map((col, col_i) =>
                    <Cell
                        key={String(row_i) + String(col_i)}
                        field={field}
                        col_i={col_i}
                        row_i={row_i}
                        updateField={updateField}
                    />
                )
            )}
            {lineProps && <Line {...lineProps} />}
        </div>

    );
}


// Функция для проверки, кто выиграл или ничья в игре
function checkWin(field) {
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


