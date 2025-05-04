function HeaderTable({ props }) {
  return (
    <thead>
      <tr className="text-xs font-semibold tracking-wide text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
        {props.map((header, index) => {
          return (
            <th className="px-4 py-3" key={index}>
              {header}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

export default HeaderTable;
