import { useEffect, useState } from "react";
import "./line.scss"

export const Line = ({ dim, index }) => {
    const [style, setStyle] = useState({});

    useEffect(() => {
        switch (dim) {
            case "col":
                createLine(index, 0, "90deg");
                break;
            case "row":
                createLine(0, index, "0deg");
                break;
            case "diag":
                if (index === 0) {
                    createLine(0, 0, "45deg");
                } else {
                    createLine(2, 0, "135deg");
                }
                break;
            default: return console.error("Ошибка при построении линии 1");
        }
    }, []);


    function createLine(col_i, row_i, rotation_deg) {
        const line_padding = 3; // in rem
        let line_width = 0;
        let x_shift = 0;
        let y_shift = 0;

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
            default: return console.error("Ошибка при построении линии 2");
        }

        let x_1 = getPosFromIndex(col_i);
        let y_1 = getPosFromIndex(row_i);

        function getPosFromIndex(index) {
            switch (index % 3) {
                // --gap - кастомный атрибут класса .field, использующийся для grid-gap 
                case 0: return `calc((100% - 2 * var(--gap)) / 6 )`;
                case 1: return `50%`;
                case 2: return `calc((500% + 2 * var(--gap)) / 6)`;
                default: return console.error("Ошибка при построении линии 3");
            }
        }

        setStyle({
            "--width": line_width,
            "--left": `calc(${x_1} + ${x_shift}rem)`,
            "--top": `calc(${y_1} + ${y_shift}rem)`,
            rotate: rotation_deg
        })
    }

    return (
        <div style={style} className="line"></div>
    );
}
