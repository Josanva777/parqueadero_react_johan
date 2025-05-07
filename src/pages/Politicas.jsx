import Header from "../components/Header";
import LateralNav from "../components/LateralNav";
function Politicas() {
    return (
        <div className="page-container">
            <Header />
            <div className="main-container">
                <LateralNav />
                <main className="content-container">
                    <h1>Politicas</h1>
                </main>
            </div>
        </div>
    )
}

export default Politicas;