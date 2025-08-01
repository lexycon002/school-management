
const Pagination = () => {
  return (
    <div className="p-4 flex items-center justify-between text-gray-400">
        <button disabled className="px-4 py-2 border rounded-md bg-slate-200 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed">Prev</button>
        <div className="flex items-center gap-2">
            <button className="px-2 rounded-sm bg-secondary">1</button>
            <button className="px-2 rounded-sm">|2</button>
            <button className="px-2 rounded-sm">3</button>
            ...
            <button className="px-2 rounded-sm">10</button>
        </div>
        <button className="px-4 py-2 border rounded-md bg-slate-200 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
    </div>
  )
}

export default Pagination