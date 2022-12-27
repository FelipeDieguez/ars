import Table from '../../form/Table'

function TableModify({ setSelectedRow, data }) {
    return (
        <>
            <Table data={data} 
                    onChange={
                                (ev) => setSelectedRow(ev.target.id)
                            }
            />
        </>
    )
}

export default TableModify