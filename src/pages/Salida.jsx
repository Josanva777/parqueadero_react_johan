import Header from "../components/Header";
import LateralNav from "../components/LateralNav";
import "./Salida.css";

function Salida() {
    return (
        <div className="page-container-salida">
            <Header />
            <div className="main-container-salida">
                <LateralNav />
                <main className="content-container-salida">
                    <div className="salida-wrapper">
                        <section className="form-group-Salida">
                            <div className="input-matricula-salida">
                                <input
                                    className="inputmatri-salida"
                                    type="text"
                                    name="matricula"
                                    placeholder="Placa"
                                    maxlength="6"
                                    required
                                />
                                <div className="buscar">
                                    <input class="button" type="submit" value="Buscar" id="btnBuscar" />
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Salida;