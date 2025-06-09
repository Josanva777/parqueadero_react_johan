import { useEffect, useState } from 'react';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import Header from '../components/Header';
import LateralNav from '../components/LateralNav';
import './Reportes.css'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const apiReportes = 'http://localhost:8081/api/records';
let token = JSON.parse(localStorage.getItem('token'));

function Reporte() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        fetch(apiReportes, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.accessToken}`,
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setRecords(data.result);
                } else {
                    alert("Error al cargar datos");
                }
            })
            .catch(err => console.error(err));
    }, []);

    const procesarDatos = () => {
        let mensualidad = 0;
        let ocasional = 0;
        let dineroCarros = 0;
        let dineroMotos = 0;
        let dineroMensualidad = 0;
        let dineroOcasional = 0;

        records.forEach(item => {
            if (item.parkingTypeId === 1) mensualidad++;
            else if (item.parkingTypeId === 2) ocasional++;

            if (item.vehicleTypeId === 1) {
                dineroCarros += 5000;
                if (item.parkingTypeId === 1) dineroMensualidad += 5000;
                else if (item.parkingTypeId === 2) dineroOcasional += 5000;
            } else if (item.vehicleTypeId === 2) {
                dineroMotos += 2000;
                if (item.parkingTypeId === 1) dineroMensualidad += 2000;
                else if (item.parkingTypeId === 2) dineroOcasional += 2000;
            }
        });

        return {
            parqueoChart: {
                labels: ['Mensualidad', 'Ocasional'],
                datasets: [{
                    label: 'Cantidad de Vehículos',
                    data: [mensualidad, ocasional],
                    backgroundColor: ['#36A2EB', '#FF6384']
                }]
            },
            dineroVehiculosChart: {
                labels: ['Carros', 'Motos'],
                datasets: [{
                    label: 'Dinero Recaudado',
                    data: [dineroCarros, dineroMotos],
                    backgroundColor: ['#4BC0C0', '#FFCE56']
                }]
            },
            dineroParqueoChart: {
                labels: ['Mensualidad', 'Ocasional'],
                datasets: [{
                    label: 'Dinero por Tipo de Parqueo',
                    data: [dineroMensualidad, dineroOcasional],
                    backgroundColor: ['#9966FF', '#FF6384']
                }]
            }
        };
    };

    const { parqueoChart, dineroVehiculosChart, dineroParqueoChart } = procesarDatos();

    return (
        <div className="page-container">
            <Header />
            <div className="main-container">
                <LateralNav />
                <main className="content-container reporte-container">

                    <div className="reporte-grid">

                        <div className="reporte-chart-card">
                            <h2 className="reporte-chart-title">Cantidad por tipo de parqueo</h2>
                            <div className="reporte-chart-wrapper">
                                <Bar data={parqueoChart} />
                            </div>
                        </div>
                        <div className="reporte-chart-card">
                            <h2 className="reporte-chart-title">Dinero por tipo de vehículo</h2>
                            <div className="reporte-chart-wrapper">
                                <Pie data={dineroVehiculosChart} />
                            </div>
                        </div>

                        <div className="reporte-chart-card">
                            <h2 className="reporte-chart-title">Dinero por tipo de parqueo</h2>
                            <div className="reporte-chart-wrapper">
                                <Doughnut data={dineroParqueoChart} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Reporte;
