import { listar } "../../services/sondagem";

function FormSolos() {
  const [camada, setCamada] = useState();

  return (
    <>
       <SelectSolo />

       {/* exmplo */}
      {/* <Select
        text="Solo:"
        name="solo"
        list={solos[solo]}
        width="160px"
        onChange={updateCamada}
      /> */}

       <TabelaSolo />
    </>

  );
}
