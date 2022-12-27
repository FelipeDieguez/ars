import Select from '../../form/Select'

import fundacaoGeometrias from "../../data/fundacaoGeometrias.json"

function TipoSet( { tipos, changeSondagemInput, changeFundacaoGeometry } ) {
    return (
        <>
            <Select
                text="Tipo:"
                name="tipo"
                list={tipos}
                width="135px"
                onChange={(ev) => {const { name, value } = ev.target
                                    changeSondagemInput(name, value)
                                    changeFundacaoGeometry()
                                }}
            />
        </>
    )
}

export default TipoSet