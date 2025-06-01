import Header from "../components/Header";
import LateralNav from "../components/LateralNav";
import "./Entrada.css";

function Entrada() {
    return (
        <div className="page-container-entrada">
            <Header />
            <div className="main-container-entrada">
                <LateralNav />
                <main className="content-container-entrada">
                    <div className="entrada-wrapper">
                        <form className="form-group-entrada">
                            <div className="input-matricula">
                                <input
                                    className="inputmatri"
                                    type="text"
                                    name="matricula"
                                    placeholder="Placa"
                                    maxlength="6"
                                    required
                                />
                            </div>
                            <div className="list">
                                <div className="selector-tarifa">
                                    <legend>Tarifa</legend>
                                    <aside className="moto">
                                        <input
                                            type="radio"
                                            name="Tarifa"
                                            value="Moto" />
                                        <label for="lmoto">Moto</label>
                                    </aside>
                                    <aside className="moto">
                                        <input
                                            type="radio"
                                            name="Tarifa"
                                            value="Carro" />
                                        <label for="lmoto">Carro</label>
                                    </aside>
                                </div>
                                <div className="reset">
                                    <input class="button" type="submit" value="Guardar" id="btnGuardar" />
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Entrada;