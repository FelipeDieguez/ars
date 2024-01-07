import { TabList, Tabs, Tab } from '@chakra-ui/react'

function EsforcoDefinir({ updateGeotechnicsInputs} ) {
    function onGeotechnicsStressChange(ev) {
        const stress = ev.target.name
        updateGeotechnicsInputs("esforco", stress)
    }

    return (
        <>
            <Tabs size='sm' variant='enclosed'>
                <TabList>
                    <Tab
                        name='compressao'
                        onClick={onGeotechnicsStressChange}
                        fontSize='md'
                    >
                        Compressão
                    </Tab>
                    {/* <Tab
                        name='tracao'
                        onClick={onGeotechnicsStressChange}
                        _selected={{color: 'white', bg: 'blue'}}
                        fontSize='md'
                    >
                        Tração
                    </Tab> */}
                </TabList>
            </Tabs>
        </>
    )
}

export default EsforcoDefinir