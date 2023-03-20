import LineEdit from '../../form/LineEdit'

import fundacaoGeometrias from "../../data/fundacaoGeometrias.json"

function CalculoEntradas1({ entradasGeotecnia, mudarEntradasGeotecnia }) {      
    function mudancasCalculoEntradas1(ev) {
        const { name, value } = ev.target
        mudarEntradasGeotecnia(name, value)
    }
    
    if (fundacaoGeometrias[entradasGeotecnia["tipo"]] === "estaca circular" || fundacaoGeometrias[entradasGeotecnia["tipo"]] === "sapata circular") {
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
    else if (fundacaoGeometrias[entradasGeotecnia["tipo"]] === "estaca retangular" || fundacaoGeometrias[entradasGeotecnia["tipo"]] === "sapata retangular") {
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