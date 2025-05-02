import Header from "../components/Header";
import LateralNav from "../components/LateralNav";
import Table from "../components/Table";
function TableExample() {
    let header = ['Nombre', 'Apellido', 'Edad', 'Email'];
    let body = {nombre:'Juan', apellido:'Pérez', edad:30, email:'correo@correo.com'}
    return (
        <div className="page-container">
            <Header />
            <div className="main-container">
                <LateralNav />
                <main className="content-container">
                    <Table props={{header:header, body:body}} />
                </main>
            </div>
        </div>
    )
}

export default TableExample;