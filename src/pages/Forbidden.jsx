import Header from "../components/Header";
import LateralNav from "../components/LateralNav";

function Forbidden() {
  return (
    <div className="page-container">
      <Header />
      <div className="main-container">
        <LateralNav />
        <main className="content-container text-center">
          <h1 class="text-6xl font-semibold text-gray-700 dark:text-gray-200">
            403
          </h1>
          <p class="text-gray-700 dark:text-gray-300">
            Página protegida. No tienes acceso a esta página.
          </p>
          <a href="/disponibilidad">Ir al inicio</a>
        </main>
      </div>
    </div>
  )
}

export default Forbidden;