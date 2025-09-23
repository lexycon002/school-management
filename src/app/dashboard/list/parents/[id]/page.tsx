import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import FormContainer from "@/components/FormContainer";
import Performance from "@/components/Performance";
import StudentAttendanceCard from "@/components/StudentAttendanceCard";
import prisma from "@/lib/prisma";
import { Class, Parent, Student } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

interface PageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

const SingleParentPage = async ({ params }: PageProps) => {
  const { id } = params;

  // Get session from NextAuth
  const session = await getServerSession(authOptions);
  const role = session?.user?.role as string | undefined;

  const parent = await prisma.parent.findUnique({
    where: { id },
    include: {
      students: {
        include: {
          class: {
            include: { _count: { select: { lessons: true } } },
          },
        },
      },
    },
  });

  if (!parent) {
    return notFound();
  }

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* Left */}
      <div className="w-full xl:w-2/3">
        {/* Top */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* User Card */}
          <div className="bg-secondary py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src={parent.img || "/noAvatar.png"}
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">
                  {parent.name + " " + parent.surname}
                </h1>
                {role === "admin" && (
                  <FormContainer table="parent" type="update" data={parent} />
                )}
              </div>

              <div className="text-sm text-gray-500">
                <div>
                  Parent of:
                  {parent.students.length === 0 ? " No students." : ""}
                </div>
                <ul>
                  {parent.students.map((student) => (
                    <li key={student.id}>
                      {student.name} {student.surname} (
                      {student.class?.name || "No class"})
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>{parent.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>{parent.email || "-"}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>{parent.phone || "-"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Small Cards for each student */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {parent.students.map((student) => (
              <div
                key={student.id}
                className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]"
              >
                <Image
                  src="/singleAttendance.png"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <Suspense fallback="loading...">
                  <StudentAttendanceCard id={student.id} />
                </Suspense>
                <div>
                  <h1 className="text-xl font-semibold">
                    {student.class?.name || "No class"}
                  </h1>
                  <span className="text-sm text-gray-400">Class</span>
                  <div>Lessons: {student.class?._count?.lessons ?? 0}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Show schedule for first student if exists */}
        {parent.students[0]?.class?.id && (
          <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
            <h1>Student&apos;s Schedule</h1>
            <BigCalendarContainer
              type="classId"
              id={parent.students[0].class.id}
            />
          </div>
        )}
      </div>

      {/* Right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            {parent.students.map((student) => (
              <div key={student.id + "-shortcuts"}>
                {student.class?.id && (
                  <Link
                    className="p-3 rounded-md bg-myBrown"
                    href={`/dashboard/list/lessons?classId=${student.class.id}`}
                  >
                    {student.name}&apos;s Lessons
                  </Link>
                )}
                {student.class?.id && (
                  <Link
                    className="p-3 rounded-md bg-secondary"
                    href={`/dashboard/list/teachers?classId=${student.class.id}`}
                  >
                    {student.name}&apos;s Teachers
                  </Link>
                )}
                {student.class?.id && (
                  <Link
                    className="p-3 rounded-md bg-primary"
                    href={`/dashboard/list/exams?classId=${student.class.id}`}
                  >
                    {student.name}&apos;s Exams
                  </Link>
                )}
                {student.class?.id && (
                  <Link
                    className="p-3 rounded-md bg-secondary"
                    href={`/dashboard/list/assignments?classId=${student.class.id}`}
                  >
                    {student.name}&apos;s Assignments
                  </Link>
                )}
                <Link
                  className="p-3 rounded-md bg-primary"
                  href={`/dashboard/list/results?studentId=${student.id}`}
                >
                  {student.name}&apos;s Results
                </Link>
              </div>
            ))}
          </div>
        </div>
        {/* <Performance /> */}
        <Announcements />
      </div>
    </div>
  );
};

export default SingleParentPage;
