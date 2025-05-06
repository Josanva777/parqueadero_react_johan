function NotFound() {
  return (
    <div className="page-container">
      <Header />
      <div className="main-container">
        <LateralNav />
        <main className="content-container">
          <h1 class="text-6xl font-semibold text-gray-700 dark:text-gray-200">
            404
          </h1>
          <p class="text-gray-700 dark:text-gray-300">
            Página no encontrada. Verifique la dirección.
          </p>
          <a href="/">Ir al inicio</a>
        </main>
      </div>
    </div>
  )
}

export default NotFound;