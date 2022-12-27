import LineEdit from '../../form/LineEdit'
import Select from '../../form/Select'

function SoloNsptSet({ solos, camada, setCamada }) {
    function updateCamada(ev) {
        const { name, value } = ev.target
        setCamada({ ...camada, [name]: value })
    }

    return (
        <>
            <Select
                text="Solo:"
                name="solo"
                list={solos}
                width="160px"
                onChange={updateCamada}
            />
            <LineEdit
                text="Nspt="
                type="number"
                name="nspt"
                width="50px"
                onChange={updateCamada}
            />
        </>
    )
}

export default SoloNsptSet