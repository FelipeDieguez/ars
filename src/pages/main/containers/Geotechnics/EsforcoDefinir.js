import Tab from '../../components/Tab'

function EsforcoDefinir({ geotechnicsStress, setGeotechnicsStress} ) {
    function onGeotechnicsStressChange(ev) {
        const stress = ev.target.id
        setGeotechnicsStress(stress)
    }

    return (
        <>
            <Tab
                text="Compressão"
                id="compressao"
                name="tabelas"
                checked={geotechnicsStress === "compressao"}
                onChange={onGeotechnicsStressChange}
            />
            {/* Adicionar Tração!
                <Tab 
                    text="Tração"
                    id="tracao"
                    name="tabelas"
                    checked={geotechnicsStress === "tracao"}
                    onChange={onGeotechnicsStressChange}
                />
            */}
        </>
    )
}

export default EsforcoDefinir