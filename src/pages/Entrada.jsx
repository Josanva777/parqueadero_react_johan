import { useEffect, useState } from "react";
import Header from "../components/Header";
import LateralNav from "../components/LateralNav.jsx";
import { Edit, Trash2 } from 'lucide-react';
import Swal from "sweetalert2";
import { alertNotification, alertaConfirmar } from '../helpers/funciones.js';
import "./Entrada.css";

const apiEntrada = "http://localhost:8081/api/records";
const apiTarifa = "http://localhost:8081/api/vehicleTypes";
const token = JSON.parse(localStorage.getItem("token"));

function Entrada() {
  const [vehiculos, setVehiculos] = useState([]);
  const [entradas, setEntradas] = useState([]);
  const [matricula, setMatricula] = useState("");
  const [tipoVehiculo, setTipoVehiculo] = useState(null);

  const headersTabla = ["Matrícula", "Tarifa", "Hora de entrada", "Acciones"];

  const getFormattedDateTime = () => {
    const now = new Date();
    const pad = (n) => (n < 10 ? "0" + n : n);
    const year = now.getFullYear();
    const month = pad(now.getMonth() + 1);
    const day = pad(now.getDate());
    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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

  const getVehiculos = () => {
    fetch(apiTarifa, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
        Accept: "application/json"
      }
    })
      .then((response) => response.json())
      .then((result) => setVehiculos(result.result))
      .catch((error) => console.error("Error al obtener tarifas:", error));
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
        const filtrados = result.result.filter(
          (entrada) => entrada.parkingTypeId === 1 && !entrada.payment
        );
        setEntradas(filtrados);
      })
      .catch((error) => console.error("Error al obtener entradas:", error));
  };

  function createEntradaMessage(nuevaEntrada, apiEntrada, token, onSuccess) {
    Swal.fire({
      title: `¿Desea guardar la entrada de ${nuevaEntrada.plate}?`,
      html: `<h5>Hora de entrada: ${nuevaEntrada.entryDate}</h5>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, guardar"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(apiEntrada, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.accessToken}`
          },
          body: JSON.stringify(nuevaEntrada)
        })
          .then(response => {
            if (!response.ok) throw new Error("Error al guardar");
            return response.json();
          })
          .then(data => {
            alertNotification('¡Éxito!', 'Entrada guardada correctamente', 'success');
            onSuccess(data.result);
          })
          .catch(error => {
            console.error(error);
            alertNotification("¡Error!", "Ocurrió un error al guardar.", "error");
          });
      }
    });
  }

  const guardarEntrada = (e) => {
    e.preventDefault();

    if (!matricula || !tipoVehiculo) {
      alertNotification("¡Campos incompletos!", "Completa todos los campos.", "error");
      return;
    }

    const existPlate = entradas.find(item => item.plate === matricula);
    if (existPlate) {
      alertNotification("¡Error!", "La placa ya se encuentra registrada en entradas.", "error");
      return;
    }

    const nuevaEntrada = {
      plate: matricula,
      vehicleTypeId: tipoVehiculo,
      parkingTypeId: 1,
      entryDate: getFormattedDateTime()
    };

    createEntradaMessage(nuevaEntrada, apiEntrada, token, (nueva) => {
      setMatricula('');
      setTipoVehiculo(null);
      setEntradas((prev) => [nueva, ...prev]);
    });
  };

  useEffect(() => {
    getEntradas();
    getVehiculos();
  }, []);

  function eliminarRegistro(id) {
    alertaConfirmar(id, getEntradas, apiEntrada)
  }

  return (
    <div className="page-container-entrada">
      <Header />
      <div className="main-container-entrada">
        <LateralNav />
        <main className="content-container-entrada">
          <div className="entrada-wrapper">

            {/* Formulario */}
            <div className="formulario-entrada">
              <form className="form-group-entrada" onSubmit={guardarEntrada}>
                <div className="input-matricula">
                  <input
                    className="inputmatri"
                    type="text"
                    name="matricula"
                    placeholder="Matrícula"
                    maxLength="6"
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value.toUpperCase())}
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
                        value={1}
                        checked={tipoVehiculo === 1}
                        onChange={() => setTipoVehiculo(1)}
                      />
                    </aside>
                    <aside className="moto">
                      <label htmlFor="carro">Carro</label>
                      <input
                        type="radio"
                        id="carro"
                        name="Tarifa"
                        value={2}
                        checked={tipoVehiculo === 2}
                        onChange={() => setTipoVehiculo(2)}
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

            {/* Tabla */}
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
                          <td className="px-4 py-3">
                            <div className="flex p-4 justify-center">
                              <button
                                onClick={() => eliminarRegistro(entrada.id)}
                                className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                              >
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
