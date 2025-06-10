import Header from "../../components/Header";
import LateralNav from "../../components/LateralNav";
import { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import { BsFillCarFrontFill } from "react-icons/bs";
import { alertNotification, formatCOP } from '../../helpers/funciones';
import { Link } from 'react-router-dom';

let apiVehiculos = 'http://localhost:8081/api/vehicle_types';
const tocken = JSON.parse(localStorage.getItem('token'))

function TipoVehiculo() {



    const [vehivleType, setVehicleType] = useState([])

    function getVehicleTypes() {
        fetch(apiVehiculos, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + tocken.accessToken,
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(result => setVehicleType(result.result))
            .catch(error => console.error(error))
    }
    

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        const vehicleType = data.get('vehiculo');
        const regularRate = parseInt(data.get('tarafiRegular'));
        const monthlyRate = parseInt(data.get('tarafiMensual'));
        if (vehicleType === "" || regularRate === "" || monthlyRate === "") {
            alertNotification('Cuidado', 'Hay campos vacios', 'info')
            return
        }
        guardarVehiculo({ vehicleType: vehicleType, regularRate: regularRate, monthlyRate: monthlyRate })
    };

    function guardarVehiculo(objeto) {
        if (!tocken || typeof tocken.accessToken !== 'string') {
            console.error('Token no válido:', tocken);
            alertNotification('Error', 'Token de autenticación inválido o no definido', 'error');
            return;
        }

        fetch(apiVehiculos, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + tocken.accessToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objeto)
        })
            .then(response => response.json())
            .then(result => {
                if (!result.success) {
                    alertNotification('¡Fallido!', result.message, 'error')
                    return
                }
                alertNotification('¡Exitoso!', result.message, 'success')
                setVehicleType(getVehicleTypes())
            })
            .catch(error => console.error(error))
    }
    useEffect(() => {
        getVehicleTypes()
    },[])
    console.log(vehivleType)

    return (
        <div className="page-container">
            <Header />
            <div className="main-container">
                <LateralNav />
                <main className="content-container">
                    <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
                        <div className="w-full overflow-x-auto">
                            <div className="form-wrapper">
                                <h1 className="form-title">
                                    <BsFillCarFrontFill className="form-icon" /> Registro tipo de vehiculos
                                </h1>
                                <form id="formularioRegistro" onSubmit={handleSubmit}>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Vehiculo</label>
                                            <input
                                                type="text"
                                                name="vehiculo"
                                                placeholder="Tipo de vehiculo"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Tarifa regular</label>
                                            <input
                                                type="number"
                                                name="tarafiRegular"
                                                placeholder="Tarifa regular"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Tarifa Mensual</label>
                                            <input
                                                type="number"
                                                name="tarafiMensual"
                                                placeholder="Tarifa mensual"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-button">
                                        <button type="submit">Guardar</button>
                                    </div>
                                </form>
                                <table className="w-full whitespace-no-wrap">
                                    <thead>
                                        <tr className="text-xs font-semibold tracking-wide text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                            <th className="px-4 py-3">Tipo Vehiculo</th>
                                            <th className="px-4 py-3">Tarifa Regular</th>
                                            <th className="px-4 py-3">Tarfia Mensual</th>
                                            <th className="px-4 py-3">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                        {
                                            !vehivleType ? (
                                                <tr>
                                                    <td colSpan="5">
                                                        <div className="flex justify-center items-center py-6">
                                                            <span className="loader"></span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : (

                                                vehivleType.map((item, index) => {
                                                    return (
                                                        <tr className="text-gray-700 dark:text-gray-400" key={index}>
                                                            <th className="px-4 py-3">
                                                                <div className="flex p-4 justify-center gap_20">
                                                                    {item.vehicleType}
                                                                </div>
                                                            </th>
                                                            <th className="px-4 py-3">
                                                                <div className="flex p-4 justify-center gap_20">
                                                                    {formatCOP(item.regularRate)}
                                                                </div>
                                                            </th>
                                                            <th className="px-4 py-3">
                                                                <div className="flex p-4 justify-center gap_20">
                                                                    {formatCOP(item.monthlyRate)}
                                                                </div>
                                                            </th>
                                                            <th className="px-4 py-3">
                                                                <div className="flex p-4 justify-center gap_20">
                                                                    <button className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none">
                                                                        <Edit className="w-5 h-5" /></button>
                                                                    <button className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                                                                        <Trash2 className="w-5 h-5" /></button>
                                                                </div>
                                                            </th>
                                                        </tr>
                                                    );
                                                })
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default TipoVehiculo;