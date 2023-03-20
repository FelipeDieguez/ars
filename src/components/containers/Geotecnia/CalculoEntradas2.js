import Select from '../../form/Select'

function CalculoEntradas2({ classeFundacao, mudarEntradasGeotecnia }) {      
    function mudancasCalculoEntradas2(ev) {
        const { name, value } = ev.target
        mudarEntradasGeotecnia(name, value)
    }
    
    if (classeFundacao === "sapatas") {
        return (
            <>
                <Select
                    text="Z(m)="
                    name="z"
                    list={[0.0, 0.1 , 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]}
                    width="45px"
                    onChange={mudancasCalculoEntradas2}
                />
                <Select
                        text="N.A.(m)="
                        name="na"
                        list={[0, 1 , 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                        width="50px"
                        onChange={mudancasCalculoEntradas2}
                />
            </>
        )
    }
    else {
        return (
            <>
            </>
        )
    }
}

export default CalculoEntradas2