const apiMensualidad = 'http://localhost:8081/api/records';
const apiVehiculo = 'http://localhost:8081/api/vehicle_types';
import { alertNotification, alertaConfirmar } from '../helpers/funciones';
import LateralNav from '../components/LateralNav';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { format, differenceInMonths } from 'date-fns';
import Swal from "sweetalert2";
import './Mensualidad.css';
import { Trash2 } from 'lucide-react';
import { formatCOP } from '../helpers/funciones';

function Mensualidad() {
  let header = ['PLACA', 'INICIO', 'FIN', 'VEHICULO', 'MONTO', 'ACCIONES'];

  const [plate, setPlate] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [numbersMonth, setNumbersMonth] = useState('');
  const [typeVehicle, setTypeVehicle] = useState('');
  const [mensualidad, setMensualidad] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);

  let token = JSON.parse(localStorage.getItem('token'))

  function getMensualidad() {
    fetch(apiMensualidad, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token.accessToken}`,
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        const resultado = result.result;
        let array = []

        resultado.map(item => {
          if (item.parkingTypeId === 2) {
            array.push(item);
          }
        })

        setMensualidad(array);
      })
      .catch(error => console.error(error))
  }

  function getVehiculo() {
    fetch(apiVehiculo, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token.accessToken}`,
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        setVehiculos(result.result)
      })
      .catch(error => console.error(error))
  }

  useEffect(() => {
    getMensualidad();
    getVehiculo();
  }, [])


  function handleSubmit(e) {
    e.preventDefault();

    let initialDate = new Date(startDate);
    initialDate.setDate(initialDate.getDate() + 1)
    let endDate = new Date(initialDate);
    endDate = new Date(endDate.setMonth(endDate.getMonth() + parseInt(numbersMonth)));

    const regExPlate = /^[A-Za-z]{3}[A-Za-z0-9]{3}$/;

    let pago;

    vehiculos.map(item => {
      if (item.id == typeVehicle) {
        pago = (item.monthlyRate * numbersMonth)
      }
    })


    if (!plate || !startDate || !numbersMonth || !typeVehicle) {
      alertNotification('Error!', 'Rellene todos los campos', 'error');
      return;
    }

    if (!regExPlate.test(plate)) {
      alertNotification('Error!', 'Digite una placa correcta', 'error');
      return;
    }

    if (initialDate <= new Date()) {
      alertNotification('Error!', 'Ingrese una fecha correcta', 'error');
      return;
    }

    let existPlate = mensualidad.find(item => plate === item.plate);
    if (existPlate) {
      alertNotification('¡Error', 'la placa existe', 'error');
      return;
    }


    let newMensualidad = {
      parkingTypeId: 2,
      plate: plate.toUpperCase(),
      entryDate: format(initialDate, 'yyyy-MM-dd HH:mm:ss'),
      exitDate: format(endDate, 'yyyy-MM-dd HH:mm:ss'),
      vehicleTypeId: parseInt(typeVehicle),
      paymet: true,
      amount: pago
    }

    createMessage(newMensualidad)

  }

  function createMessage(newMensualidad) {
    Swal.fire({
      title: `¿Desea facturar ${newMensualidad.plate}?`,
      html: `<h5>Tiempo: ${differenceInMonths(newMensualidad.exitDate, newMensualidad.entryDate)} Meses</h5> <h5>Total: $${newMensualidad.amount}</h5>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, facturar"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(apiMensualidad, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.accessToken}`
          },
          body: JSON.stringify(newMensualidad)
        })
          .then(response => response.json())
          .then(data => {
            setPlate('');
            setStartDate('');
            setNumbersMonth('');
            setTypeVehicle('');

            alertNotification('Éxito', data.message, 'success');

            getMensualidad();
          })
      }
    });
  }

  function eliminarRegistro(id) {
    alertaConfirmar(id, getMensualidad, apiMensualidad)
  }

  return (
    <section className="page-container">
      <Header />
      <div className="main-container">
        <LateralNav />
        <main className="content-container">
          <div className="form-wrapper">
            <h1 className="form-title">
              Registro de mensualidades
            </h1>
            <form id="formularioRegistro" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="div-plate form-group">
                  <input
                    className='plate-input'
                    type="text"
                    name="user"
                    value={plate}
                    placeholder="PLACA"
                    onChange={e => setPlate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Fecha de inicio</label>
                  <input
                    type="date"
                    name="initiaDate"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <label
                    className="inline-flex items-center text-gray-600 dark:text-gray-400"
                  >
                    <input
                      type="radio"
                      className="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                      name="accountType"
                      checked={typeVehicle === '1'}
                      onChange={e => setTypeVehicle(e.target.value)}
                      value="1"
                    />
                    <span className="ml-2">Moto</span>
                  </label>
                  <label
                    className="inline-flex items-center ml-6 text-gray-600 dark:text-gray-400"
                  >
                    <input
                      type="radio"
                      className="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                      name="accountType"
                      value="2"
                      checked={typeVehicle === '2'}
                      onChange={e => setTypeVehicle(e.target.value)}
                    />
                    <span className="ml-2">Carro</span>
                  </label>
                </div>
                <div className="form-group">
                  <label>Meses a pagar</label>
                  <input
                    type="number"
                    name="number"
                    min="1"
                    value={numbersMonth}
                    onChange={e => setNumbersMonth(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-button">
                <button type="submit">Registrar</button>
              </div>
            </form>
          </div>
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                {header.map((element, index) => {
                  return (
                    <th className="px-4 py-3" key={index}>
                      {element}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {!mensualidad.length ? (
                <tr>
                  <td colSpan="5">
                    <div className="flex justify-center items-center py-6">
                      <span className="loader"></span>
                    </div>
                  </td>
                </tr>
              ) : (
                mensualidad.map((row) => {
                  const vehiculo = vehiculos.find(item => item.id === row.vehicleTypeId);

                  return (
                    <tr className="text-gray-700 dark:text-gray-400" key={row.id}>
                      <td className="px-4 py-3">{row.plate}</td>
                      <td className="px-4 py-3">{row.exitDate}</td>
                      <td className="px-4 py-3">{row.entryDate}</td>
                      <td className="px-4 py-3">{vehiculo.vehicleType ?? ''}</td>
                      <td className="px-4 py-3">{formatCOP(row.amount)}</td>
                      <td className="px-4 py-3">
                        <div className="flex p-4 justify-center">
                          <button
                            onClick={() => eliminarRegistro(row.id)}
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
        </main>
      </div>
    </section>
  )
}

export default Mensualidad;