import Header from "../components/Header";
import LateralNav from "../components/LateralNav";
import "./Entrada.css";

function Entrada() {
  const header = [
    "Matrícula",
    "Tarifa",
    "Hora de entrada",
    "Recibo",
    "Acciones"
  ];

  return (
    <div className="page-container-entrada">
      <Header />
      <div className="main-container-entrada">
        <LateralNav />
        <main className="content-container-entrada">
          <div className="entrada-wrapper">
            
            {/* Sección del formulario */}
            <div className="formulario-entrada">
              <form className="form-group-entrada">
                <div className="input-matricula">
                  <input
                    className="inputmatri"
                    type="text"
                    name="matricula"
                    placeholder="Matrícula"
                    maxLength="6"
                    required
                  />
                </div>
                <div className="list">
                  <fieldset className="selector-tarifa">
                    <legend>Tarifa</legend>
                    <aside className="moto">
                      <label htmlFor="moto">Moto</label>
                      <input
                        type="radio"
                        id="moto"
                        name="Tarifa"
                        value="Moto"
                      />
                    </aside>
                    <aside className="moto">
                      <label htmlFor="carro">Carro</label>
                      <input
                        type="radio"
                        id="carro"
                        name="Tarifa"
                        value="Carro"
                      />
                    </aside>
                  </fieldset>
                  <div className="reset">
                    <input
                      className="button"
                      type="submit"
                      value="Guardar"
                      id="btnGuardar"
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="table-section-entrada">
              <section className="table-entrada">
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
                    {/* Aquí van las filas dinámicas */}
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

export default Entrada;
