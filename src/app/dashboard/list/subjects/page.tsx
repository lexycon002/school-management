import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";

import { getServerSession } from "next-auth/next";
import authOptions from "@/pages/api/auth/[...nextauth]";

type SubjectList = Subject & { teachers: Teacher[] };

const SubjectListPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = (await searchParams) || {};
  const session = (await getServerSession(authOptions)) as any;
  const role = session?.user?.role;

  const { page, ...queryParams } = params;
  const p = page ? parseInt(Array.isArray(page) ? page[0] : page) : 1;

  // Build query
  const query: Prisma.SubjectWhereInput = {};

  for (const [key, value] of Object.entries(queryParams)) {
    if (!value) continue;
    const val = Array.isArray(value) ? value[0] : value;

    switch (key) {
      case "search":
        query.name = { contains: val, mode: "insensitive" };
        break;
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.subject.findMany({
      where: query,
      include: { teachers: true },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.subject.count({ where: query }),
  ]);

  // Table columns
  const columns = [
    { header: "Subject Name", accessor: "name" },
    { header: "Teachers", accessor: "teachers", className: "hidden md:table-cell" },
    { header: "Actions", accessor: "action" },
  ];

  // Row renderer
  const renderRow = (item: SubjectList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-secondary"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">
        {item.teachers.map((teacher) => teacher.name).join(", ")}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormContainer table="subject" type="update" data={item} />
              <FormContainer table="subject" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-myBrown">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-myBrown">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormContainer table="subject" type="create" />}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />

      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default SubjectListPage;
