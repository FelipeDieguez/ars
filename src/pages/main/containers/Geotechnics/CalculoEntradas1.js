import LineEdit from '../../components/LineEdit'

import foundationGeometries from "../../utils/data/foundationGeometries.json"

function CalculoEntradas1({ entradasGeotecnia, mudarEntradasGeotecnia }) {      
    function mudancasCalculoEntradas1(ev) {
        const { name, value } = ev.target
        mudarEntradasGeotecnia(name, value)
    }
    
    if (foundationGeometries[entradasGeotecnia["tipo"]] === "estaca circular" || foundationGeometries[entradasGeotecnia["tipo"]] === "sapata circular") {
        return (
            <LineEdit
                text="Diâmetro(m)="
                type="number"
                name="dimensao_1"
                width="45px"
                onChange={mudancasCalculoEntradas1}
            />
        )
    }
    else if (foundationGeometries[entradasGeotecnia["tipo"]] === "estaca retangular" || foundationGeometries[entradasGeotecnia["tipo"]] === "sapata retangular") {
        return (
            <>
                <LineEdit
                    text="L(m)="
                    type="number"
                    name="dimensao_1"
                    width="45px"
                    onChange={mudancasCalculoEntradas1}
                />
                <LineEdit
                    text="B(m)="
                    type="number"
                    name="dimensao_2"
                    width="45px"
                    onChange={mudancasCalculoEntradas1}
                />
            </>
        )
    }
    else {
        return (
            <>
                <LineEdit
                    text="Df(m)="
                    type="number"
                    name="dimensao_1"
                    width="45px"
                    onChange={mudancasCalculoEntradas1}
                />
                <LineEdit
                    text="Db(m)="
                    type="number"
                    name="dimensao_2"
                    width="45px"
                    onChange={mudancasCalculoEntradas1}
                />
            </>
        )
    }
}

export default CalculoEntradas1