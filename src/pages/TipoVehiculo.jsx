import Header from "../components/Header";
import LateralNav from "../components/LateralNav";
import { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import { BsFillCarFrontFill } from "react-icons/bs";
import { alertNotification, formatCOP } from '../helpers/funciones';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import './TipoVehiculo.css';

let apiVehiculos = 'http://localhost:8081/api/vehicle_types';
const tocken = JSON.parse(localStorage.getItem('token'))

function TipoVehiculo() {
    const [vehicleTypes, setVehicleTypes] = useState([])

    function showButtons(show, id = null) {
        document.querySelector('#id').value = id
        if (!show) {
            document.querySelector('#btnSave').hidden = true;
            document.querySelector('#btnEdit').hidden = false;
            document.querySelector('#btnCancel').hidden = false;
            return
        }
        document.querySelector('#btnSave').hidden = true;
        document.querySelector('#btnEdit').hidden = false;
        document.querySelector('#btnCancel').hidden = false;

        getVehicleTypesById(id)
    }
    function getVehicleTypesById(id) {

        fetch(apiVehiculos + '/' + id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + tocken.accessToken,
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if(!data.success){
                    return
                }
                document.querySelector('#vehiculo').value = data.result.vehicleType;
                document.querySelector('#tarafiRegular').value = data.result.regularRate;
                document.querySelector('#tarafiMensual').value = data.result.monthlyRate;
                
            })
            .catch(error => console.error(error))
    }
    function getVehicleTypes() {
        fetch(apiVehiculos, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + tocken.accessToken,
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(result => setVehicleTypes(result.result))
            .catch(error => console.error(error))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        const id = data.get('id');
        const vehicleType = data.get('vehiculo');
        const regularRate = parseInt(data.get('tarafiRegular'));
        const monthlyRate = parseInt(data.get('tarafiMensual'));
        if (vehicleType === "" || regularRate === "" || monthlyRate === "") {
            alertNotification('Cuidado', 'Hay campos vacios', 'info')
            return
        }
        const objeto = { vehicleType: vehicleType, regularRate: regularRate, monthlyRate: monthlyRate }
        id ? editar(id, objeto) : guardarVehiculo(objeto)
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
                setVehicleTypes(getVehicleTypes())
            })
            .catch(error => console.error(error))
    }
    useEffect(() => {
        getVehicleTypes()
    }, [])

    function editar(id, objeto) {
        Swal.fire({
            title: "¿Estás seguro?",
            text: `Quiere actulizar la información`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Si, actualizar!"
        }).then((result) => {
            if (!result.isConfirmed) {
                alertNotification('¡Fallido!', 'No se actualizo el vehículo', 'error')
                return
            }
            fetch(apiVehiculos + '/' + id, {
                method: 'PUT',
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
                    setVehicleTypes(getVehicleTypes())
                })
                .catch(error => console.error(error))
        })
    }
    function eliminar(id) {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede revertir",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Si, eliminar!"
        }).then((result) => {
            if (!result.isConfirmed) {
                alertNotification('¡Fallido!', 'No se eliminó el vehículo', 'error')
                return
            }
            fetch(apiVehiculos + '/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + tocken.accessToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then(response => response.json())
                .then(result => {
                    if (!result.success) {
                        alertNotification('¡Fallido!', result.message, 'error')
                        return
                    }
                    alertNotification('¡Exitoso!', result.message, 'success')
                    setVehicleTypes(getVehicleTypes())
                })
                .catch(error => console.error(error))
        })
    }

    return (
        <div className="page-container">
            <Header />
            <div className="main-container">
                <LateralNav />
                <main className="content-container">
                    <div className="form-wrapper">
                        <h1 className="form-title">
                            <BsFillCarFrontFill className="form-icon" /> Registro tipo de vehiculos
                        </h1>
                        <form id="formVehicleTypes" onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <input
                                    type="number"
                                    name="id"
                                    id="id"
                                    hidden
                                />
                                <div className="form-group">
                                    <label>Vehiculo</label>
                                    <input
                                        type="text"
                                        name="vehiculo"
                                        id="vehiculo"
                                        placeholder="Tipo de vehiculo"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Tarifa regular</label>
                                    <input
                                        type="number"
                                        name="tarafiRegular"
                                        id="tarafiRegular"
                                        placeholder="Tarifa regular"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Tarifa Mensual</label>
                                    <input
                                        type="number"
                                        name="tarafiMensual"
                                        id="tarafiMensual"
                                        placeholder="Tarifa mensual"
                                    />
                                </div>
                            </div>
                            <div className="form-button mb-5">
                                <button id="btnSave" type="submit">Guardar</button>
                                <button className="mx-2" id="btnEdit" type="submit" hidden>Editar</button>
                                <button className="mx-2" id="btnCancel" type="button" onClick={() => showButtons(false)} hidden>Cancelar</button>
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
                                    !vehicleTypes ? (
                                        <tr>
                                            <td colSpan="5">
                                                <div className="flex justify-center items-center py-6">
                                                    <span className="loader"></span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        vehicleTypes.map((item, index) => {
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
                                                            <button className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none" onClick={() => showButtons(true, item.id)}>
                                                                <Edit className="w-5 h-5" /></button>
                                                            <button className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={() => eliminar(item.id)}>
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
                </main>
            </div>
        </div>
    )
}

export default TipoVehiculo;