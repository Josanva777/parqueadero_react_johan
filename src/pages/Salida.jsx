import Header from "../components/Header";
import LateralNav from "../components/LateralNav.jsx";
import "./Salida.css";
import { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { alertNotification, alertaConfirmar } from '../helpers/funciones.js';

const apiSalida = "http://localhost:8081/api/records";
const apiVehicleTypes = "http://localhost:8081/api/vehicle_types";

function Salida() {
  const [salidas, setSalidas] = useState([]);
  const [matricula, setMatricula] = useState("");
  const [registroEncontrado, setRegistroEncontrado] = useState(null);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));

  const header = [
    "Matrícula",
    "Tipo",
    "Hora de entrada",
    "Hora de salida",
    "Total de tiempo",
    "Monto",
    "Estado",
    "Acciones"
  ];

  const calcularHoras = (inicio, fin) => {
    if (!inicio || !fin) return 0;
    const entrada = new Date(inicio.replace(" ", "T"));
    const salida = new Date(fin.replace(" ", "T"));
    const diferencia = salida.getTime() - entrada.getTime();
    return Math.ceil(diferencia / (1000 * 60 * 60));
  };

  const obtenerTipoParqueo = (id) => {
    if (id === 1) return "Moto";
    if (id === 2) return "Carro";
    return "Desconocido";
  };

  const obtenerRegularRate = (id) => {
    const tipo = vehicleTypes.find((v) => v.id === id);
    return tipo ? Number(tipo.regularRate) : 0;
  };

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
        const filtrados = result.result.filter(
          (salida) => salida.parkingTypeId === 1
        );
        setSalidas(filtrados);
      })
      .catch((error) => console.error("Error al obtener Salidas:", error));
  };

  const getVehicleTypes = () => {
    fetch(apiVehicleTypes, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
        Accept: "application/json"
      }
    })
      .then((response) => response.json())
      .then((result) => {
        setVehicleTypes(result.result || result);
      })
      .catch((error) => console.error("Error al obtener tipos de vehículo:", error));
  };

  const buscarPorPlaca = (valor) => {
    const placa = valor.toUpperCase();
    setMatricula(placa);

    const registro = salidas.find((item) => item.plate.toUpperCase() === placa);
    setRegistroEncontrado(registro || null);

    if (registro) {
      setSalidas((prev) => {
        const sinRegistro = prev.filter((item) => item.id !== registro.id);
        return [registro, ...sinRegistro];
      });
    }
  };

  const obtenerFechaHoraActual = () => {
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    const hours = String(fecha.getHours()).padStart(2, '0');
    const minutes = String(fecha.getMinutes()).padStart(2, '0');
    const seconds = String(fecha.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const confirmarFacturacion = () => {
    if (!registroEncontrado) {
      alertNotification("¡Error!", "No se encontró el vehículo", "error");
      return;
    }

    const fechaSalida = obtenerFechaHoraActual();
    const horas = calcularHoras(registroEncontrado.entryDate, fechaSalida);
    const regularRate = obtenerRegularRate(registroEncontrado.vehicleTypeId);
    const monto = horas * regularRate;

    Swal.fire({
      title: `¿Desea facturar ${registroEncontrado.plate}?`,
      html: `<h5>Tiempo: ${horas} hora(s)</h5><h5>Total: $${Math.round(monto)}</h5>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, facturar"
    }).then((result) => {
      if (result.isConfirmed) {
        const body = {
          ...registroEncontrado,
          exitDate: fechaSalida,
          payment: true,
          amount: monto
        };

        fetch(`${apiSalida}/${registroEncontrado.id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token?.accessToken}`,
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        })
          .then((res) => res.json())
          .then(() => {
            alertNotification("¡Éxito!", "Vehículo facturado", "success");

            setSalidas((prevSalidas) =>
              prevSalidas.map((salida) =>
                salida.id === registroEncontrado.id
                  ? { ...salida, exitDate: fechaSalida, payment: true, amount: monto }
                  : salida
              )
            );

            setRegistroEncontrado(null);
            setMatricula("");
          })
          .catch((error) => {
            console.error("Error al facturar:", error);
            alertNotification("¡Error!", "No se pudo facturar", "error");
          });
      }
    });
  };

  const handleFacturar = () => {
    confirmarFacturacion();
  };

  useEffect(() => {
    getVehicleTypes();
    getSalidas();
  }, []);

  function eliminarRegistro(id) {
    alertaConfirmar(id, getSalidas, apiSalida);
  }

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
                  value={matricula}
                  onChange={(e) => buscarPorPlaca(e.target.value)}
                  required
                />
                <div className="buscar">
                  <input
                    className="button"
                    type="button"
                    value="Facturar"
                    id="btnBuscar"
                    onClick={handleFacturar}
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
                        <td colSpan="8">
                          <div className="flex justify-center items-center py-6">
                            <span className="loader"></span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      salidas.map((salida) => {
                        const horas = salida.exitDate
                          ? calcularHoras(salida.entryDate, salida.exitDate)
                          : 0;

                        const regularRate = vehicleTypes.find((v) => v.id === salida.vehicleTypeId)?.regularRate || 0;

                        const monto = salida.payment && salida.amount
                          ? salida.amount
                          : (horas * regularRate);

                        return (
                          <tr className="text-gray-700 dark:text-gray-400" key={salida.id}>
                            <td className="px-4 py-3">{salida.plate}</td>
                            <td className="px-4 py-3">{obtenerTipoParqueo(salida.vehicleTypeId)}</td>
                            <td className="px-4 py-3">{salida.entryDate}</td>
                            <td className="px-4 py-3">{salida.exitDate || "-"}</td>
                            <td className="px-4 py-3">
                              {salida.exitDate ? horas + " horas" : "-"}
                            </td>
                            <td className="px-4 py-3">
                              {monto > 0 ? `$${Math.round(monto)}` : "-"}
                            </td>
                            <td className="px-4 py-3">
                              {salida.payment ? "Pagado" : "Pendiente"}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex p-4 justify-center">
                                <button
                                  onClick={() => eliminarRegistro(salida.id)}
                                  className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
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