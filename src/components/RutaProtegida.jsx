import { Navigate } from 'react-router-dom';

function RutaProtegida({ protect }) {
    let accessToken = localStorage.getItem('token');
    return accessToken ? protect : <Navigate to="/" />
}

export default RutaProtegida