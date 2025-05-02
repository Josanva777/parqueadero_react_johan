function BodyTable({ props }) {
  return (
    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
      <tr className="text-gray-700 dark:text-gray-400">
        {Object.values(props).map((item, index) => {
          return (
            <th className="px-4 py-3" key={index}>
              {item}
            </th>
          );
        })}
      </tr>
    </tbody>
  );
}

export default BodyTable;
