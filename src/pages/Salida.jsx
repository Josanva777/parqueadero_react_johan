import Header from "../components/Header";
import LateralNav from "../components/LateralNav";
import "./Salida.css";
import { useEffect, useState } from "react";
import { Edit, Trash2 } from 'lucide-react';


const apiSalida = "http://localhost:8081/api/records";

function Salida() {
  
  const calcularHoras = (inicio, fin) => {
  const entrada = new Date(inicio.replace(" ", "T"));
  const salida = new Date(fin.replace(" ", "T"));
  const diferencia = salida.getTime() - entrada.getTime();
  return Math.ceil(diferencia / (1000 * 60 * 60));
  };

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

  const [salidas, setSalidas] = useState([]);
  const header = [
    "Matrícula",
    "Tarifa",
    "Hora de entrada",
    "Hora de salida",
    "Total de tiempo",
    "Recibo",
    "Acciones"
  ];
  const token = JSON.parse(localStorage.getItem("token"));

  const getSalidas = () => {
  fetch(apiSalida, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
      Accept: "application/json"
    }
  })
    .then((response) => response.json())
    .then((result) => {
      const filtrados = result.result.filter(salida => salida.parkingTypeId === 1);
      setSalidas(filtrados);
    })
    .catch((error) => console.error("Error al obtener Salidas:", error));
  };
  
    useEffect(() => {
      getSalidas();
    }, []);

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
                    value="Facturar"
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
                    {!salidas.length ? (
                      <tr>
                        <td colSpan="5">
                          <div className="flex justify-center items-center py-6">
                            <span className="loader"></span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      salidas.map((salida) => (
                        <tr className="text-gray-700 dark:text-gray-400" key={salida.id}>
                          <td className="px-4 py-3">{salida.plate}</td>
                          <td className="px-4 py-3">{obtenerTipoParqueo(salida.vehicleTypeId)}</td>
                          <td className="px-4 py-3">{salida.entryDate}</td>
                          <td className="px-4 py-3">{salida.exitDate}</td>
                          <td className="px-4 py-3">{calcularHoras(salida.entryDate, salida.exitDate)} horas</td>
                          <td className="px-4 py-3">{salida.payment}</td>
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

export default Salida;
