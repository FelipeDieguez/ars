import {listar, cadastrarCamada, editarCamada, removerCamada, calcular} from '../../services/sondagem'

import Button from '../../form/Button'

function DefinirSondagemGeotecnia({ entradasSondagem, setAtualizarSondagem, camadaSondagem, setResultados }) {
    function mudarSondagemGeotecnia(ev) {
        const acao = ev.target.name
        const opcoes = {
            "cadastrar": () => {
                cadastrarCamada(entradasSondagem)
            },
            "editar": () => {
                if (typeof camadaSondagem === "string") {
                    //Trocar para setCamada, ja tentei porém não atualizava instantâneo
                    entradasSondagem["ordem"] = Number(camadaSondagem)
                    editarCamada(entradasSondagem)
                }
            },
            "remover": () => {
                if (typeof camadaSondagem === "string") {
                    entradasSondagem["ordem"] = Number(camadaSondagem)
                    removerCamada(entradasSondagem)
                }
            }
        }
        for (const [key, value] of Object.entries(opcoes)) {
            if (acao === key) {
                value()
            }
        }
        setAtualizarSondagem(1)
        setResultados([])
    }

    return (
        <>
            <Button
                text="Cadastrar"
                name="cadastrar"
                width="100px"
                onClick={mudarSondagemGeotecnia}
            />
            <Button
                text="Editar"
                name="editar"
                width="70px"
                onClick={mudarSondagemGeotecnia}
            />
            <Button
                text="Remover"
                name="remover"
                width="100px"
                onClick={mudarSondagemGeotecnia}
            />
        </>
    )
}

export default DefinirSondagemGeotecnia