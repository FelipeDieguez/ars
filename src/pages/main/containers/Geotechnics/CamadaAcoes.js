import { layerRegister, layerEdit, layerRemove } from '../../utils/services/investigation'

import Button from '../../components/Button'

function CamadaAcoes({ camadaDados, setAtualizarGeotecnia }) {
    function mudancasCamadaAcoes(ev) {
        const acao = ev.target.name
        const opcoes = {
            "cadastrar": () => {
                layerRegister(camadaDados)
            },
            "editar": () => {
                if (camadaDados["ordem"] !== "") {
                    layerEdit(camadaDados)
                }
            },
            "remover": () => {
                if (camadaDados["ordem"] !== "") {
                    layerRemove(camadaDados)
                }
            }
        }
        for (const [key, value] of Object.entries(opcoes)) {
            if (acao === key) {
                value()
            }
        }
        setAtualizarGeotecnia(1)
    }

    return (
        <>
            <Button
                text="Cadastrar"
                name="cadastrar"
                width="100px"
                onClick={mudancasCamadaAcoes}
            />
            <Button
                text="Editar"
                name="editar"
                width="70px"
                onClick={mudancasCamadaAcoes}
            />
            <Button
                text="Remover"
                name="remover"
                width="100px"
                onClick={mudancasCamadaAcoes}
            />
        </>
    )
}

export default CamadaAcoes