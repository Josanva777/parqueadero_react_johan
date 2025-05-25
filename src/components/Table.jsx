import {Edit, Trash2 } from 'lucide-react';

function Table({props} ) {

    console.log(props.header)
    console.log(props.header)
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
                            <th className="px-4 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                        <tr className="text-gray-700 dark:text-gray-400">
                            {props.body.map((element, index) => {
                                return (
                                    <th className="px-4 py-3" key={index}>  
                                        {element}
                                    </th>
                                );
                            })}
                            <th className="px-4 py-3">
                                <div className="flex p-4 justify-center gap_20">
                                    <button className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none">
                                        <Edit className="w-5 h-5" /></button>
                                    <button className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                                        <Trash2 className="w-5 h-5" /></button>
                                </div>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table;