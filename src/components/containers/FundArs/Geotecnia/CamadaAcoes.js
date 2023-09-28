import {listar, cadastrarCamada, editarCamada, removerCamada, calcular} from '../../../services/sondagem'

import Button from '../../../form/Button'

function CamadaAcoes({ camadaDados, setAtualizarGeotecnia }) {
    function mudancasCamadaAcoes(ev) {
        const acao = ev.target.name
        const opcoes = {
            "cadastrar": () => {
                cadastrarCamada(camadaDados)
            },
            "editar": () => {
                if (camadaDados["ordem"] !== "") {
                    editarCamada(camadaDados)
                }
            },
            "remover": () => {
                if (camadaDados["ordem"] !== "") {
                    removerCamada(camadaDados)
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