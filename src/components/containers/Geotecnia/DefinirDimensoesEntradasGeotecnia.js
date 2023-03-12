import LineEdit from '../../form/LineEdit'

import fundacaoGeometrias from "../../data/fundacaoGeometrias.json"

function DefinirDimensoesEntradasGeotecnia({ entradasGeotecnia, mudarEntradasGeotecnia }) {        
    if (fundacaoGeometrias[entradasGeotecnia["tipo"]] === "estaca circular" || fundacaoGeometrias[entradasGeotecnia["tipo"]] === "sapata circular") {
        return (
            <LineEdit
                text="Diâmetro(m)="
                type="number"
                name="dimensao_1"
                width="45px"
                onChange={mudarEntradasGeotecnia}
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
                    onChange={mudarEntradasGeotecnia}
                />
                <LineEdit
                    text="B(m)="
                    type="number"
                    name="dimensao_2"
                    width="45px"
                    onChange={mudarEntradasGeotecnia}
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
                    onChange={mudarEntradasGeotecnia}
                />
                <LineEdit
                    text="Db(m)="
                    type="number"
                    name="dimensao_2"
                    width="45px"
                    onChange={mudarEntradasGeotecnia}
                />
            </>
        )
    }
}

export default DefinirDimensoesEntradasGeotecnia