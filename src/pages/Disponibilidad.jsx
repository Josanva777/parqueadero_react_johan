import { useEffect, useState, useMemo } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, ArcElement } from 'chart.js';
import Header from '../components/Header';
import LateralNav from '../components/LateralNav';
import './Disponibilidad.css'
import './Reportes.css'
import { format, subDays, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';


ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ArcElement);

const apiReportes = 'http://localhost:8081/api/records';
let token = JSON.parse(localStorage.getItem('token'));

function Disponibilidad() {
    const [records, setRecords] = useState([]);
    const [isDark, setIsDark] = useState(false);
    const [dias, setDias] = useState([]);

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

    // Agrupa los registros por día (yyyy-MM-dd)
    function agruparPorDia() {
        const agrupados = {};
        records.forEach(item => {
            if (!item.entryDate) return;
            const fecha = item.entryDate.slice(0, 10);
            if (!agrupados[fecha]) agrupados[fecha] = [];
            agrupados[fecha].push(item);
        });
        // Ordena por fecha descendente
        return Object.entries(agrupados)
            .sort((a, b) => b[0].localeCompare(a[0]))
            .map(([fecha, items]) => ({ fecha, items }));
    }

    useEffect(() => {
        setDias(agruparPorDia());
    }, [records]);

    // Datos para la tabla y la gráfica
    function resumenDia(items) {
        let motos = 0, carros = 0;
        items.forEach(item => {
            if (item.vehicleTypeId === 1) {
                motos++;
            } else if (item.vehicleTypeId === 2) {
                carros++;
            }
        });
        return {
            motos, carros,
            total: motos + carros
        };
    }

    // Fechas de hoy en formato yyyy-MM-dd
    const hoyStr = format(new Date(), 'yyyy-MM-dd');
    const hoy = dias.find(d => d.fecha === hoyStr);
    const resumenHoy = hoy ? resumenDia(hoy.items) : { motos: 0, carros: 0, total: 0 };

    // Límites de celdas
    const LIMITE_MOTOS = 100;
    const LIMITE_CARROS = 100;
    const disponiblesMotos = LIMITE_MOTOS - resumenHoy.motos;
    const disponiblesCarros = LIMITE_CARROS - resumenHoy.carros;

    // Memoiza los datos de las gráficas para evitar recreaciones innecesarias
    const barCantidadData = useMemo(() => ({
        labels: ['Motos', 'Carros'],
        datasets: [
            {
                label: 'Cantidad',
                data: [resumenHoy.motos, resumenHoy.carros],
                backgroundColor: ['#36A2EB', '#FF6384']
            }
        ]
    }), [resumenHoy.motos, resumenHoy.carros]);

    const pieData = useMemo(() => ({
        labels: ['Motos', 'Carros'],
        datasets: [
            {
                label: 'Distribución',
                data: [resumenHoy.motos, resumenHoy.carros],
                backgroundColor: ['#36A2EB', '#FF6384']
            }
        ]
    }), [resumenHoy.motos, resumenHoy.carros]);

    // Gráfica de ocupación vs disponibles para motos y carros
    const motosOcupacionData = useMemo(() => ({
        labels: ['Ocupadas', 'Disponibles'],
        datasets: [
            {
                label: 'Motos',
                data: [resumenHoy.motos, disponiblesMotos < 0 ? 0 : disponiblesMotos],
                backgroundColor: ['#36A2EB', '#e0e0e0']
            }
        ]
    }), [resumenHoy.motos, disponiblesMotos]);

    const carrosOcupacionData = useMemo(() => ({
        labels: ['Ocupadas', 'Disponibles'],
        datasets: [
            {
                label: 'Carros',
                data: [resumenHoy.carros, disponiblesCarros < 0 ? 0 : disponiblesCarros],
                backgroundColor: ['#FF6384', '#e0e0e0']
            }
        ]
    }), [resumenHoy.carros, disponiblesCarros]);

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: isDark ? '#e5e7eb' : '#222'
                }
            }
        },
        scales: {
            x: {
                ticks: { color: isDark ? '#e5e7eb' : '#222' },
                grid: { color: isDark ? '#353a4a' : '#e0e0e0' }
            },
            y: {
                ticks: {
                    color: isDark ? '#e5e7eb' : '#222',
                    callback: function(value) {
                        if (Number.isInteger(value)) return value;
                        return '';
                    }
                },
                grid: { color: isDark ? '#353a4a' : '#e0e0e0' },
                beginAtZero: true,
                max: Math.max(LIMITE_MOTOS, LIMITE_CARROS)
            }
        }
    };

    // Utilidad para mostrar fecha amigable (ej: Hoy, Ayer, o 3 de enero de 2025)
    function fechaAmigable(fecha) {
        const hoy = format(new Date(), 'yyyy-MM-dd');
        const ayer = format(subDays(new Date(), 1), 'yyyy-MM-dd');
        if (fecha === hoy) return 'Hoy';
        if (fecha === ayer) return 'Ayer';
        return format(parseISO(fecha), "d 'de' MMMM 'de' yyyy", { locale: es });
    }

    // Nueva función para mostrar siempre la fecha larga (ej: 3 de enero de 2025)
    function fechaLargaHoy() {
        return format(new Date(), "d 'de' MMMM 'de' yyyy", { locale: es });
    }

    return (
        <div className="page-container">
            <Header />
            <div className="main-container">
                <LateralNav />
                <main className="content-container reporte-container">
                    <h1 className="dispo-title-light-effect">
                        <span>Disponibilidad diaria</span>
                    </h1>
                    <div className="dispo-table-section">
                        <table className="dispo-table">
                            <thead>
                                <tr>
                                    <th>Día</th>
                                    <th>Motos</th>
                                    <th>Carros</th>
                                    <th>Total vehículos</th>
                                    <th>Celdas libres motos</th>
                                    <th>Celdas libres carros</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dias.map(dia => {
                                    const resumen = resumenDia(dia.items);
                                    const libresMotos = LIMITE_MOTOS - resumen.motos;
                                    const libresCarros = LIMITE_CARROS - resumen.carros;
                                    return (
                                        <tr key={dia.fecha}>
                                            <td>{fechaAmigable(dia.fecha)}</td>
                                            <td>{resumen.motos}</td>
                                            <td>{resumen.carros}</td>
                                            <td>{resumen.total}</td>
                                            <td>{libresMotos < 0 ? 0 : libresMotos}</td>
                                            <td>{libresCarros < 0 ? 0 : libresCarros}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="reporte-grid dispo-reporte-grid-responsive">
                        <div className="reporte-chart-card">
                            <h2 className="reporte-chart-title">
                                Cantidad de vehículos hoy ({fechaLargaHoy()})
                            </h2>
                            <div className="reporte-chart-wrapper">
                                <Bar key={`bar-cantidad-hoy`} data={barCantidadData} options={chartOptions} />
                            </div>
                            <div className="dispo-chart-label">Cantidad de motos y carros registrados hoy</div>
                        </div>
                        <div className="reporte-chart-card">
                            <h2 className="reporte-chart-title">
                                Distribución de tipos de vehículos hoy
                            </h2>
                            <div className="reporte-chart-wrapper reporte-chart-wrapper--center">
                                <Pie key={`pie-hoy`} data={pieData} options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { labels: { color: isDark ? '#e5e7eb' : '#222' } }
                                    }
                                }} />
                            </div>
                            <div className="dispo-chart-label">Porcentaje motos vs carros hoy</div>
                        </div>
                        <div className="reporte-chart-card">
                            <h2 className="reporte-chart-title">
                                Ocupación de celdas para motos
                            </h2>
                            <div className="reporte-chart-wrapper reporte-chart-wrapper--center">
                                <Pie data={motosOcupacionData} options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { labels: { color: isDark ? '#e5e7eb' : '#222' } }
                                    }
                                }} />
                            </div>
                            <div className="dispo-chart-label">
                                {`Ocupadas: ${resumenHoy.motos} / ${LIMITE_MOTOS} | Disponibles: ${disponiblesMotos < 0 ? 0 : disponiblesMotos}`}
                            </div>
                        </div>
                        <div className="reporte-chart-card">
                            <h2 className="reporte-chart-title">
                                Ocupación de celdas para carros
                            </h2>
                            <div className="reporte-chart-wrapper reporte-chart-wrapper--center">
                                <Pie data={carrosOcupacionData} options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { labels: { color: isDark ? '#e5e7eb' : '#222' } }
                                    }
                                }} />
                            </div>
                            <div className="dispo-chart-label">
                                {`Ocupadas: ${resumenHoy.carros} / ${LIMITE_CARROS} | Disponibles: ${disponiblesCarros < 0 ? 0 : disponiblesCarros}`}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Disponibilidad;