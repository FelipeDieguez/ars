import Tab from '../../form/Tab'

function EsforcoSet( {esforco, setEsforco} ) {
    return (
        <>
            <Tab 
                text="Compressão"
                id="compressao"
                name="tabelas"
                checked={esforco === "compressao"}
                onChange={(ev) => {setEsforco(ev.target.id)}}
            />
            <Tab 
                text="Tração"
                id="tracao"
                name="tabelas"
                checked={esforco === "tracao"}
                onChange={(ev) => {setEsforco(ev.target.id)}}
            />
        </>
    )
}

export default EsforcoSet