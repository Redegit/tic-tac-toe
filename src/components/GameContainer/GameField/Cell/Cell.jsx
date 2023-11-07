import { useEffect, useState } from "react";
import { useGameContext } from "../../../../hook/useGameContext";
import "./cell.scss"

export const Cell = ({ row_i, col_i, field, updateField }) => {
    const { gameStep, gameState } = useGameContext();
    const [value, setValue] = useState(field[row_i][col_i])

    useEffect(() => {
        setValue(field[row_i][col_i])
    }, [field]);

    const onCellClick = () => {
        if (!gameState.gameGoing || value !== "-") return
        updateField(row_i, col_i)
        setValue(field[row_i][col_i])
        gameStep();
    }

    return (
        <div
            onClick={onCellClick}
            data-value={value}
            data-col={col_i}
            data-row={row_i}
            className="cell">
        </div>
    );
}
