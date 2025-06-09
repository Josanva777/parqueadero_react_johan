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
    const [isDark, setIsDark] = useState(false);

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

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        setIsDark(document.documentElement.classList.contains('dark'));
        return () => observer.disconnect();
    }, []);

    // Opciones para las gráficas según modo oscuro
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: isDark ? '#e5e7eb' : '#222'
                }
            },
            title: {
                display: false
            }
        },
        scales: {
            x: {
                ticks: { color: isDark ? '#e5e7eb' : '#222' },
                grid: { color: isDark ? '#353a4a' : '#e0e0e0' }
            },
            y: {
                ticks: { color: isDark ? '#e5e7eb' : '#222' },
                grid: { color: isDark ? '#353a4a' : '#e0e0e0' }
            }
        }
    };

    const chartOptionsNoAxis = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: isDark ? '#e5e7eb' : '#222'
                }
            }
        }
    };

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

        const totalVehiculos = mensualidad + ocasional;
        const totalDinero = dineroCarros + dineroMotos;

        // Porcentajes
        const porcentajeMensualidad = totalVehiculos ? ((mensualidad / totalVehiculos) * 100).toFixed(1) : 0;
        const porcentajeOcasional = totalVehiculos ? ((ocasional / totalVehiculos) * 100).toFixed(1) : 0;
        const totalCarrosYMotos = dineroCarros + dineroMotos;
        const totalCarrosYMotosCount = records.filter(r => r.vehicleTypeId === 1).length + records.filter(r => r.vehicleTypeId === 2).length;
        const carrosCount = records.filter(r => r.vehicleTypeId === 1).length;
        const motosCount = records.filter(r => r.vehicleTypeId === 2).length;
        const porcentajeCarros = totalCarrosYMotosCount ? ((carrosCount / totalCarrosYMotosCount) * 100).toFixed(1) : 0;
        const porcentajeMotos = totalCarrosYMotosCount ? ((motosCount / totalCarrosYMotosCount) * 100).toFixed(1) : 0;

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
            },
            resumen: {
                totalVehiculos,
                totalDinero,
                mensualidad,
                ocasional,
                dineroCarros,
                dineroMotos,
                dineroMensualidad,
                dineroOcasional,
                porcentajeMensualidad,
                porcentajeOcasional,
                carrosCount,
                motosCount,
                porcentajeCarros,
                porcentajeMotos
            }
        };
    };

    const { parqueoChart, dineroVehiculosChart, dineroParqueoChart, resumen } = procesarDatos();

    return (
        <div className="page-container">
            <Header />
            <div className="main-container">
                <LateralNav />
                <main className="content-container reporte-container">
                    <h1 className="reporte-title-light-effect">
                        <span>Reportes</span>
                    </h1>
                    <div className="reporte-grid reporte-grid-responsive">
                        <div className="reporte-chart-card">
                            <h2 className="reporte-chart-title">Cantidad por tipo de parqueo</h2>
                            <div className="reporte-chart-wrapper">
                                <Bar data={parqueoChart} options={chartOptions} />
                            </div>
                            <table className="reporte-table">
                                <thead>
                                    <tr>
                                        <th>Tipo</th>
                                        <th>Cantidad</th>
                                        <th>%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Mensualidad</td>
                                        <td>{resumen.mensualidad}</td>
                                        <td>{resumen.porcentajeMensualidad}%</td>
                                    </tr>
                                    <tr>
                                        <td>Ocasional</td>
                                        <td>{resumen.ocasional}</td>
                                        <td>{resumen.porcentajeOcasional}%</td>
                                    </tr>
                                    <tr>
                                        <td><b>Total</b></td>
                                        <td colSpan={2}><b>{resumen.totalVehiculos}</b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="reporte-chart-card">
                            <h2 className="reporte-chart-title">Dinero por tipo de vehículo</h2>
                            <div className="reporte-chart-wrapper reporte-chart-wrapper--center">
                                <Pie data={dineroVehiculosChart} options={chartOptionsNoAxis} />
                            </div>
                            <table className="reporte-table">
                                <thead>
                                    <tr>
                                        <th>Tipo</th>
                                        <th>Cantidad</th>
                                        <th>%</th>
                                        <th>Dinero</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Carros</td>
                                        <td>{resumen.carrosCount}</td>
                                        <td>{resumen.porcentajeCarros}%</td>
                                        <td>${resumen.dineroCarros.toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <td>Motos</td>
                                        <td>{resumen.motosCount}</td>
                                        <td>{resumen.porcentajeMotos}%</td>
                                        <td>${resumen.dineroMotos.toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Total</b></td>
                                        <td colSpan={2}><b>{resumen.carrosCount + resumen.motosCount}</b></td>
                                        <td><b>${(resumen.dineroCarros + resumen.dineroMotos).toLocaleString()}</b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="reporte-chart-card">
                            <h2 className="reporte-chart-title">Dinero por tipo de parqueo</h2>
                            <div className="reporte-chart-wrapper reporte-chart-wrapper--center">
                                <Doughnut data={dineroParqueoChart} options={chartOptionsNoAxis} />
                            </div>
                            <table className="reporte-table">
                                <thead>
                                    <tr>
                                        <th>Tipo</th>
                                        <th>Dinero</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Mensualidad</td>
                                        <td>${resumen.dineroMensualidad.toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <td>Ocasional</td>
                                        <td>${resumen.dineroOcasional.toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Total</b></td>
                                        <td><b>${(resumen.dineroMensualidad + resumen.dineroOcasional).toLocaleString()}</b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="reporte-chart-card">
                            <h2 className="reporte-chart-title">Resumen General</h2>
                            <table className="reporte-table">
                                <tbody>
                                    <tr>
                                        <td><b>Total vehículos</b></td>
                                        <td>{resumen.totalVehiculos}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Total dinero recaudado</b></td>
                                        <td>${resumen.totalDinero.toLocaleString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Reporte;
