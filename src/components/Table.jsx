
function Table({ props }) {
    return (
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-no-wrap">
                    <thead>
                        <tr className="text-xs font-semibold tracking-wide text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                            {props.header.map((element, index) => {
                                return (
                                    <th className="px-4 py-3" key={index}>
                                        {element}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                        <tr className="text-gray-700 dark:text-gray-400">
                            {Object.values(props.body).map((element, index) => {
                                return (
                                    <th className="px-4 py-3" key={index}>
                                        {element}
                                    </th>
                                );
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table;