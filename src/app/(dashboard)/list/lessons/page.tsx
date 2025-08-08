import FormModal from "@/components/FormModal"
import Pagination from "@/components/Pagination"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import { lessonsData, role } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"

type Lesson = {
    id:number;
    subject:number;
    class: number;
    teacher:string;
}
const LessonListPage = () => {

    const columns = [
        {header: "Subject Name", accessor: "name"},
        {header: "Class", accessor: "class"},
        {header: "Teacher", accessor: "teacher", className: "hidden md:table-cell"},
        {header: "Supervisor", accessor: "supervisor", className: "hidden md:table-cell"},
        {header: "Actions", accessor: "actions", className: "hidden md:table-cell"},
    ]
    const renderRow = (item: Lesson) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-blue-50 text-sm hover:bg-gray-50">
            <td className="flex items-center gap-4 mb-4 mt-2">{item.subject}</td>
                <td>{item.class}</td>
                <td className="hidden md:table-cell">{item.teacher}</td>
            <td>
            <div className="flex items-center gap-2">
                {role === "admin" && (
                    <>
                    <FormModal table="result" type="update" data={item} />
                    <FormModal table="result" type="delete" data={item} id={item.id} />
                    </>
                    )}
                </div>
            </td>
        </tr>
    )
    return(
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* To list*/}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-myBrown">
                            <Image src="/filter.png" alt="" width={14} height={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-myBrown">
                            <Image src="/sort.png" alt="" width={14} height={14} />
                        </button>
                        { role === "admin" && (
                        <FormModal table="result" type="create"/>
                        )}
                    </div>
                </div>
            </div>
            {/* Table list */}
            <Table  columns = {columns} renderRow={renderRow} data={lessonsData}/>
            {/* Pagination */}
            <Pagination />
        </div>
    )
}

export default LessonListPage