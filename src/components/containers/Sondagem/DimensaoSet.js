import LineEdit from '../../form/LineEdit'

function TipoSet({ fundacaoGeometry, changeSondagemInput }) {    
    if (fundacaoGeometry === "estaca circular" || fundacaoGeometry === "sapata circular") {
        return (
            <LineEdit
                text="Diâmetro="
                type="number"
                name="dimensao_1"
                width="50px"
                onChange={changeSondagemInput}
            />
        )
    }
    else if (fundacaoGeometry === "estaca retangular" || fundacaoGeometry === "sapata retangular") {
        return (
            <>
                <LineEdit
                    text="L="
                    type="number"
                    name="dimensao_1"
                    width="50px"
                    onChange={changeSondagemInput}
                />
                <LineEdit
                    text="B="
                    type="number"
                    name="dimensao_2"
                    width="50px"
                    onChange={changeSondagemInput}
                />
            </>
        )
    }
    else {
        return (
            <>
                <LineEdit
                    text="Df="
                    type="number"
                    name="dimensao_1"
                    width="50px"
                    onChange={changeSondagemInput}
                />
                <LineEdit
                    text="Db="
                    type="number"
                    name="dimensao_2"
                    width="50px"
                    onChange={changeSondagemInput}
                />
            </>
        )
    }
}

export default TipoSet