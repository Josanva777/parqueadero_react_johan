function CreateAccount() {
    return (
        <section className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
            <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <h1 className="mt-6 text-xl font-semibold text-gray-700 dark:text-gray-200 text-center">
                    Crear Usuario
                </h1>
                <form className="flex flex-col overflow-y-auto md:flex-row">
                    <section className="flex items-center justify-center sm:p-12 md:w-1/2">
                        <div className="w-full">
                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Nombre</span>
                                <input className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" type="" placeholder="" />
                            </label>
                            <label className="block mt-4 text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Apellido</span>
                                <input className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" type="" placeholder="" />
                            </label>
                            <label className="block mt-4 text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Tipo Documento</span>
                                <select className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray">
                                    <option value="">Seleccionar</option>
                                    <option value="cc">Cédula de Ciudadania</option>
                                    <option value="ti">Tarjeta de Identidad</option>
                                    <option value="ce">Cédula de Extranjería</option>
                                </select>
                            </label>
                            <label className="block mt-4 text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Número de Documento</span>
                                <input className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" type="number" placeholder="" />
                            </label>
                            <div className=" mt-4 text-sm">
                                <span className=" text-gray-700 dark:text-gray-400">
                                    Genero
                                </span>
                                <div className="flex flex-col mt-2">
                                    <label className="flex-inline items-center text-gray-600 dark:text-gray-400">
                                        <input type="radio" className="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray" name="accountType" value="hombre"/>
                                        <span className="ml-2">Hombre</span>
                                    </label>
                                    <label className="inline-flex items-center mt-2 text-gray-600 dark:text-gray-400">
                                        <input type="radio" className="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray" name="accountType" value="mujer"/>
                                        <span className="ml-2">Mujer</span>
                                    </label>
                                    <label className="inline-flex items-center mt-2 text-gray-600 dark:text-gray-400">
                                        <input type="radio" className="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray" name="accountType" value="noEspecificar"/>
                                        <span className="ml-2">No Especificar</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="flex items-center p-8 justify-center sm:p-12 md:w-1/2">
                        <div className="w-full">
                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Email</span>
                                <input className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" placeholder="correo@micorreo.com" />
                            </label>
                            <label className="block mt-4 text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Contraseña</span>
                                <input className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" placeholder="***************" type="password" />
                            </label>
                            <label className="block mt-4 text-sm">
                                <span className="text-gray-700 dark:text-gray-400">
                                    Confirmar contraseña
                                </span>
                                <input className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" placeholder="***************" type="password" />
                            </label>

                            <div className="flex mt-6 text-sm">
                                <label className="flex items-center dark:text-gray-400">
                                    <input type="checkbox" className="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray" />
                                    <span className="ml-2" />
                                    Estoy de acuerdo con las
                                    <span className="underline">politicas de privacidad</span>
                                </label>
                            </div>

                            <button type="submit" className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple" href="./login.html">
                                Crear Cuenta
                            </button>

                            <hr className="my-8" />

                            <p className="mt-4">
                                <a className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline" href="./login.html">
                                    ¿Ya tienes una cuenta? Inicia Sesión
                                </a>
                            </p>
                        </div>
                    </section>
                </form>
            </div>
        </section>
    )
}

export default CreateAccount;