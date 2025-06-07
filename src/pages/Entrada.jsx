import { useEffect, useState } from "react";
import Header from "../components/Header";
import LateralNav from "../components/LateralNav";
import { Edit, Trash2 } from 'lucide-react';

import "./Entrada.css";

const apiEntrada = "http://localhost:8081/api/records";

function Entrada() {
  const [entradas, setEntradas] = useState([]);
  const headersTabla = [
    "Matrícula",
    "Tarifa",
    "Hora de entrada",
    "Recibo",
    "Acciones"
  ];
  const token = JSON.parse(localStorage.getItem("token"));

  const obtenerTipoParqueo = (id) => {
  switch (id) {
    case 1:
      return "Moto";
    case 2:
      return "Carro";
    default:
      return "Desconocido";
  }
  };

  const getEntradas = () => {
    fetch(apiEntrada, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
        Accept: "application/json"
      }
    })
      .then((response) => response.json())
      .then((result) => {
        const filtrados = result.result.filter(entrada => entrada.parkingTypeId === 1);
        setEntradas(filtrados);
      })
      .catch((error) => console.error("Error al obtener entradas:", error));
  };

  useEffect(() => {
    getEntradas();
  }, []);

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
                      <input type="radio" id="moto" name="Tarifa" value="Moto" />
                    </aside>
                    <aside className="moto">
                      <label htmlFor="carro">Carro</label>
                      <input type="radio" id="carro" name="Tarifa" value="Carro" />
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

            {/* Sección de la tabla */}
            <div className="table-section-entrada">
              <section className="table-entrada">
                <table className="w-full whitespace-no-wrap">
                  <thead>
                    <tr className="text-xs font-semibold tracking-wide text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                      {headersTabla.map((element, index) => (
                        <th className="px-4 py-3" key={index}>
                          {element}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    {!entradas.length ? (
                      <tr>
                        <td colSpan="5">
                          <div className="flex justify-center items-center py-6">
                            <span className="loader"></span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      entradas.map((entrada) => (
                        <tr className="text-gray-700 dark:text-gray-400" key={entrada.id}>
                          <td className="px-4 py-3">{entrada.plate}</td>
                          <td className="px-4 py-3">{obtenerTipoParqueo(entrada.vehicleTypeId)}</td>
                          <td className="px-4 py-3">{entrada.entryDate}</td>
                          <td className="px-4 py-3">{entrada.payment}</td>
                          <td className="px-4 py-3">
                            <div className="flex p-4 justify-center">
                              <button className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none mr-2">
                                <Edit className="w-5 h-5" />
                              </button>
                              <button className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
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
