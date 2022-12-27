import {listar, cadastrarCamada, editarCamada, removerCamada, calcular} from '../../services/sondagem'

import Button from '../../form/Button'

function CamadaAction({ camada, selectedRow, data, setUpdateTable, setCalculo }) {
    function changeCamadas(ev) {
        ev.preventDefault()
        const name = ev.target.name
        const options = {
            "cadastrar": () => {
                let count = data.length
                camada["#"] = count + 1
                cadastrarCamada(camada)
            },
            "editar": () => {
                if (typeof selectedRow === "string") {
                    camada["#"] = Number(selectedRow)
                    editarCamada(camada)
                }
            },
            "remover": () => {
                if (typeof selectedRow === "string") {
                    camada["#"] = Number(selectedRow)
                    removerCamada(camada)
                }
            }
        }
        for (const [key, value] of Object.entries(options)) {
            if (name === key) {
                value()
            }
        }
        setUpdateTable(1)
        setCalculo(0)
    }

    return (
        <>
            <Button
                text="Cadastrar"
                name="cadastrar"
                width="100px"
                onClick={changeCamadas}
            />
            <Button
                text="Editar"
                name="editar"
                width="70px"
                onClick={changeCamadas}
            />
            <Button
                text="Remover"
                name="remover"
                width="100px"
                onClick={changeCamadas}
            />
        </>
    )
}

export default CamadaAction