import Header from "../components/Header";
import LateralNav from "../components/LateralNav";
import Table from "../components/Table";
import { MdDelete } from "react-icons/md";
import "./Entrada.css";

function Entrada() {
    let header = ['Placa', 'Tarifa', 'Hora Entrada', 'Recibo', 'Eliminar'];
    let body = {
        placa: 'ABC123', tarifa: '$10', horaEntrada: '12:00', recibo: 'Recibo 1', eliminar: <button onClick={() => alert('Eliminar')} className="delete-btn">
            <MdDelete className="delete-icon" />
        </button>
    };
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
                                    type="text"
                                    name="matricula"
                                    placeholder="Matricula"
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
                        <section className="table-section-entrada">
                            <Table props={{ header: header, body: body }} />
                        </section>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Entrada;