import LineEdit from '../../form/LineEdit'

function DefinirDimensoesEntradasGeotecnia({ geometriaFundacao, mudarEntradasGeotecnia }) {        
    if (geometriaFundacao === "estaca circular" || geometriaFundacao === "sapata circular") {
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
    else if (geometriaFundacao === "estaca retangular" || geometriaFundacao === "sapata retangular") {
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