import Select from '../../form/Select'

function CalculoEntradas2({ classeFundacao, metodoGeotecnia, esforcoGeotecnia, mudarEntradasGeotecnia, dadosGeotecnia }) {      
    function mudancasCalculoEntradas2(ev) {
        const { name, value } = ev.target
        mudarEntradasGeotecnia(name, value)
    }
    
    if (classeFundacao === "sapatas") {
        return (
            <>
                <Select
                    text="Prof.+"
                    name="dimensao_3"
                    list={[0.0, 0.1 , 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]}
                    width="45px"
                    onChange={mudancasCalculoEntradas2}
                />
                <Select
                        text="N.A.(m)="
                        name="dimensao_4"
                        list={[...Array(dadosGeotecnia[esforcoGeotecnia][metodoGeotecnia].length+2).keys()]}
                        width="50px"
                        onChange={mudancasCalculoEntradas2}
                />
            </>
        )
    }
    else {
        return (
            <>
                <Select
                    text="C.A.(m)="
                    name="dimensao_3"
                    list={[...Array(dadosGeotecnia[esforcoGeotecnia][metodoGeotecnia].length).keys()]}
                    width="45px"
                    onChange={mudancasCalculoEntradas2}
                />
            </>
        )
    }
}

export default CalculoEntradas2