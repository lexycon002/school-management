import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import Performance from "@/components/Performance";
import Image from "next/image";
import Link from "next/link";


const SingleStudentPage = () => {
    return (
        <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
            {/* left */}
        <div className="w-full xl:w-2/3">
            {/* top section */}
            <div className=" flex flex-col lg:flex-row gap-4">
                {/* usercard info */}
                <div className="bg-myBrown px-8 py-6 rounded-md flex-1 flex gap-4">
                    <div className="w-1/3">
                        <Image src="/students.png" alt="Teacher" width={144} height={144} className="rounded-full w-36 h-36 object-cover" />
                    </div>
                    <div className="w-2/3 flex flex-col justify-between gap-4">
                    <h1 className="text-lg font-semibold">Ashley Moore</h1>
                    <p className="text-sm text-gray-500">Students</p>
                    <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium mt-2">
                        <div className="w-full md:w-1/3  lg:w-full 2xl:w-1/3 flex items-center gap-2">
                            <Image src="/blood.png" alt="Location" width={16} height={16} className="mr-1" />
                            <span>A+</span>
                        </div>
                        <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                            <Image src="/date.png" alt="Date" width={16} height={16} className="mr-1" />
                            <span>January 2025</span>
                        </div>
                        <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                            <Image src="/mail.png" alt="Mail" width={16} height={16} className="mr-1" />
                            <span>Ashley.moore@gmail.com</span>
                        </div>
                        <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                            <Image src="/phone.png" alt="Phone" width={16} height={16} className="mr-1" />
                            <span>+1(545)725</span>
                        </div>
                    </div>
                    </div>
                </div>
                {/* Small cards */}
                <div className="flex-1 flex gap-4 justify-between flex-wrap">
                    <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w[48%] xl:w-[45%] 2xl:w-[48%]">
                        <Image src="/singleAttendance.png" alt="single Attendance" width={24} height={24} className="w-6 h-6" />
                        <div className="">
                            <h1 className="text-lg font-semibold">90%</h1>
                            <span className="text-sm text-gray-500">Attendance</span>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w[48%] xl:w-[45%] 2xl:w-[48%]">
                        <Image src="/singleBranch.png" alt="single Branch" width={24} height={24} className="w-6 h-6" />
                        <div className="">
                            <h1 className="text-lg font-semibold">7</h1>
                            <span className="text-sm text-gray-500">Grade</span>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w[48%] xl:w-[45%] 2xl:w-[48%]">
                        <Image src="/singleLesson.png" alt="single Attendance" width={24} height={24} className="w-6 h-6" />
                        <div className="">
                            <h1 className="text-lg font-semibold">20</h1>
                            <span className="text-sm text-gray-500">Lessons</span>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w[48%] xl:w-[45%] 2xl:w-[48%]">
                        <Image src="/singleClass.png" alt="single Classes" width={24} height={24} className="w-6 h-6" />
                        <div className="">
                            <h1 className="text-lg font-semibold">5B</h1>
                            <span className="text-sm text-gray-500">Class</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* bottom section */}
            <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
                <h1 className="text-lg font-semibold mb-4">Student's Schedule</h1>
                <BigCalendar />
            </div>
        </div>
            {/* right */}
        <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
            <h1 className="text-xl font-semibold">Shortcuts</h1>
            <div className="mt-4 flex gap-4 flex-wrap text-sm text-gray-500">
                <Link className="p-3 rounded-md bg-myBrown" href="/">Student's Results</Link>
                <Link className="p-3 rounded-md bg-myBlue" href="/">Student's Teacher</Link>
                <Link className="p-3 rounded-md bg-gray-200" href="/">Student's Lessons</Link>
                <Link className="p-3 rounded-md bg-secondary text-white" href="/">Student's Exams</Link>
                <Link className="p-3 rounded-md bg-gray-200" href="/">Student's Assignment</Link>
            </div>
        </div>
            <Performance />
            <Announcements />
        </div>
        
        </div>
    );
}

export default SingleStudentPage;