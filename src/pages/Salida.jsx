import Header from "../components/Header";
import LateralNav from "../components/LateralNav";
import "./Salida.css";

function Salida() {
  const header = [
    "Matrícula",
    "Tarifa",
    "Hora de entrada",
    "Hora de salida",
    "Total de tiempo",
    "Recibo",
    "Acciones"
  ];

  return (
    <div className="page-container-salida">
      <Header />
      <div className="main-container-salida">
        <LateralNav />
        <main className="content-container-salida">
          <div className="salida-wrapper">
            <section className="form-group-Salida">
              <div className="input-matricula-salida">
                <input
                  className="inputmatri-salida"
                  type="text"
                  name="matricula"
                  placeholder="Matrícula"
                  maxLength="6"
                  required
                />
                <div className="buscar">
                  <input
                    className="button"
                    type="submit"
                    value="Buscar"
                    id="btnBuscar"
                  />
                </div>
              </div>
            </section>

            <div className="table-section-salida">
            <section className="table-salida">
              <table className="w-full whitespace-no-wrap">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                    {header.map((element, index) => (
                      <th className="px-4 py-3" key={index}>
                        {element}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                  {/* Aquí irán los registros de salida más adelante */}
                </tbody>
              </table>
            </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Salida;
