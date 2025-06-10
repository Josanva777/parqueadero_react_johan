import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function RutaProtegidaAdmin({ protect }) {

    let token = JSON.parse(localStorage.getItem('token')) ?? '';
    const [rol, setRol] = useState('');
    const [cargando, setCargando] = useState(true);
    useEffect(() => {
        
        fetch('http://localhost:8081/api/auth/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.accessToken}`,
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
            .then(result => {
                setRol(result.result.rol)
                setCargando(false)
            })
        .catch(error => console.error(error))
    }, [])

    if (!token) return <Navigate to="/" />
    
    if (cargando) return (
        <div className="flex justify-center alings-center items-center py-6 h-screen">
            <span className="loader"></span>
        </div>);


    if (rol !== "Administrador") return <Navigate to="/no-autorizado"/>

    return protect;
}

export default RutaProtegidaAdmin