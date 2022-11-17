import { listar } from "../../services/sondagem";

async function TabelaSolos() {
  const data = await listar();

  return (
    <tr>
      {data.map(() => (
        <td></>
      ))}

    </>
  )

}
