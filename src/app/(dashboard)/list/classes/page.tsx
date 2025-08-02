import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { classesData, role } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"

type Class = {
    id:number;
    name:string;
    capacity:number;
    grade: number;
    supervisor:string[];
}
const ClassListPage = () => {

    const columns = [
        {header: "Subject Name", accessor: "name"},
        {header: "Capacity", accessor: "capapcity", className: "hidden md:table-cell"},
        {header: "Grade", accessor: "grade", className: "hidden md:table-cell"},
        {header: "Supervisor", accessor: "supervisor", className: "hidden md:table-cell"},
        {header: "Actions", accessor: "actions", className: "hidden md:table-cell"},
    ]
    const renderRow = (item: Class) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-blue-50 text-sm hover:bg-gray-50">
            <td className="flex items-center gap-4 mb-4 mt-2">
                {item.name}
            </td>
                <td className="hidden md:table-cell">{item.capacity}</td>
                <td className="hidden md:table-cell">{item.grade}</td>
                <td className="hidden md:table-cell">{item.supervisor}</td>
            <td>
                <div className="flex items-center gap-2">
                    <Link href={`/list/teachers/${item.id}`} className="">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-myBrown">
                        <Image src="/edit.png" alt="" width={14} height={14} />
                    </button>
                    </Link>
                {role === "admin" && (<button className="w-8 h-8 flex items-center justify-center rounded-full bg-primary">
                        <Image src="/delete.png" alt="" width={14} height={14} />
                    </button> 
                    )}
                </div>
            </td>
        </tr>
    )
    return(
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* To list*/}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-myBrown">
                            <Image src="/filter.png" alt="" width={14} height={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-myBrown">
                            <Image src="/sort.png" alt="" width={14} height={14} />
                        </button>
                        { role === "admin" && (<button className="w-8 h-8 flex items-center justify-center rounded-full bg-myBrown">
                            <Image src="/plus.png" alt="" width={14} height={14} />
                        </button>
                        )}
                    </div>
                </div>
            </div>
            {/* Table list */}
            <Table  columns = {columns} renderRow={renderRow} data={classesData}/>
            {/* Pagination */}
            <Pagination />
        </div>
    )
}

export default ClassListPage