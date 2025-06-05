import { useEffect, useState } from 'react';
import Header from '../components/Header';
import LateralNav from '../components/LateralNav';
import { alertNotification } from '../helpers/funciones';
import Swal from "sweetalert2";
import './Mensualidades.css';
const apiMensualidad = 'https://backend-parqueadero-j8gj.onrender.com/api/records';

function Mensualidad() {
  const [plate, setPlate] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [numbersMonth, setNumbersMonth] = useState('');
  const [typeVehicle, setTypeVehicle] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState([]);

  let token = JSON.parse(localStorage.getItem('token'))

  let typeValue = {
    1: 20000,
    2: 35000
  }

  function getMonthlyPayment() {
    fetch(apiMensualidad, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token.accessToken}`,
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.error(error))
  }

  useEffect(() => {
    getMonthlyPayment()
  }, [])


  // function handleSubmit(e) {
  //   e.preventDefault();

  //   let initialDate = new Date(startDate);
  //   initialDate.setDate(initialDate.getDate() + 1)
  //   let endDate = new Date(initialDate);
  //   endDate = new Date(endDate.setMonth(endDate.getMonth() + parseInt(numbersMonth)));

  //   const regExPlate = /^[A-Za-z]{3}[A-Za-z0-9]{3}$/;

  //   let newMonthlyPayment = {
  //     plate: plate,
  //     initialDate: initialDate,
  //     endDate: endDate,
  //     months: parseInt(numbersMonth),
  //     type: parseInt(typeVehicle)
  //   }

  //   if (!plate || !startDate || !numbersMonth || !typeVehicle) {
  //     alertNotification('Error!', 'Rellene todos los campos', 'error');
  //     return;
  //   }
  //   if (!regExPlate.test(plate)) {
  //     alertNotification('Error!', 'Digite una placa correcta', 'error');
  //     return;
  //   }

  //   if (initialDate <= new Date()) {
  //     alertNotification('Error!', 'Ingrese una fecha correcta', 'error');
  //     return;
  //   }

  //   //   let existPlate = monthlyPayment.find(item => plate === item.plate);
  //   //   if (!existPlate) {
  //   //     createMessage(newMonthlyPayment)
  //   //   } else {
  //   //     alertNotification('¡Error', 'la placa existe', 'error');
  //   //   }
  //   // } else {
  //   //   
  //   // }
  // }

  function createMessage(newMonthlyPayment) {
    Swal.fire({
      title: `¿Desea facturar ${newMonthlyPayment.plate}?`,
      html: `<h5>Tiempo: ${newMonthlyPayment.months} Meses</h5> <h5>Total: $${typeValue[newMonthlyPayment.type] * newMonthlyPayment.months}</h5>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, facturar"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(apiMonthlyPayment, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newMonthlyPayment)
        }).then(() => {
          alertNotification('¡Exitoso!', 'Mensualida creada correctamente', 'success');
          getMonthlyPayment();
          setPlate('');
          setStartDate('');
          setNumbersMonth('');
          setTypeVehicle('');
        })
      }
    });
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
            <form id="formularioRegistro" >
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
        </main>
      </div>
    </section>
  )
}

export default Mensualidad;