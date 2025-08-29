const Table = ( { columns,
    renderRow,
    data, }: { columns: Array<{ header: string; accessor: string; className?: string }>;
    renderRow: (item: any) => React.ReactNode; data?:  any[]
} ) => {
  return (
    <div className=''>
      <table className='w-full mt-4'>
        <thead>
          <tr className="text-left text-gray-500 text-sm">
            {columns.map((column) => (
              <th key={column.accessor} className={column.className}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Map through your data here and create table rows */}
          {data?.map((item) => renderRow(item))}
        </tbody>
      </table>
     </div>
  )
}

export default Table