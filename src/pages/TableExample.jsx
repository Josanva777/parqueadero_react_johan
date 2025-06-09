import Header from "../components/Header";
import LateralNav from "../components/LateralNav";
import Table from "../components/Table";
let api = 'http://localhost:8081/api/auth';
function TableExample() {
    let token;
    function testAPi() {
        fetch(api + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: 'admin',
                password: '123456'
            })
        })
            .then(response => response.json())
            .then(data =>
                // token = data.result.accessToken // Guardar el token en una variable
                console.log(data)
            )
    }
    // function testAPi3() {
    //     fetch(api + '/register', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(
    //             {
    //                 email: "admin@correo.com",
    //                 password: "123456",
    //                 role: "Administrador",
    //                 userName: "admin"
    //             }
    //         )
    //     })
    //         .then(response => response.json())
    //         .then(data =>
    //             // token = data.result.accessToken // Guardar el token en una variable
    //             console.log(data)
    //         )
    // }
    function testAPi2() {
        fetch(api + "/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`  // Header para enviar el token
            }
        })
            .then(response => response.json())
            .then(data => console.log(data))
    }
    testAPi();
    // setTimeout(() => {
    //     testAPi2();
    // }, 2000); // Esperar un segundo para que el token se haya guardado







    let header = ['Nombre', 'Apellido', 'Edad', 'Email'];
    let body = [
        { nombre: 'Juan', apellido: 'Pérez', edad: 30, email: 'correo@correo.com' },
        { nombre: 'Sebas', apellido: 'Gil', edad: 25, email: 'email@correo.com' }
    ]
    return (
        <div className="page-container">
            <Header />
            <div className="main-container">
                <LateralNav />
                <main className="content-container">
                    <Table props={{ header: header, body: body }} />
                </main>
            </div>
        </div>
    )
}

export default TableExample;