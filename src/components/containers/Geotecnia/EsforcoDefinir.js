import Tab from '../../form/Tab'

function EsforcoDefinir({ esforcoGeotecnia, setEsforcoGeotecnia} ) {
    function mudancasEsforcoDefinir(ev) {
        const esforco = ev.target.id
        setEsforcoGeotecnia(esforco)
    }

    return (
        <>
            <Tab
                text="Compressão"
                id="compressao"
                name="tabelas"
                checked={esforcoGeotecnia === "compressao"}
                onChange={mudancasEsforcoDefinir}
            />
            {/* Adicionar Tração!
                <Tab 
                    text="Tração"
                    id="tracao"
                    name="tabelas"
                    checked={esforcoGeotecnia === "tracao"}
                    onChange={mudancasEsforcoDefinir}
                />
            */}
        </>
    )
}

export default EsforcoDefinir