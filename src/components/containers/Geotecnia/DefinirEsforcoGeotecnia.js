import Tab from '../../form/Tab'

function DefinirEsforcoGeotecnia({ esforcoGeotecnia, setEsforcoGeotecnia} ) {
    function mudarEsforcoGeotecnia(ev) {
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
                onChange={mudarEsforcoGeotecnia}
            />
            <Tab 
                text="Tração"
                id="tracao"
                name="tabelas"
                checked={esforcoGeotecnia === "tracao"}
                onChange={mudarEsforcoGeotecnia}
            />
        </>
    )
}

export default DefinirEsforcoGeotecnia