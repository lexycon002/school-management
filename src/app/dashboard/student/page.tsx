import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendar from "@/components/EventCalendar";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

const StudentPage = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id; // make sure you expose this in [...nextauth].ts

  if (!userId) {
    return <p className="p-4">Not authenticated.</p>;
  }

  // Fetch classes for this student
  const classItems = await prisma.class.findMany({
    where: {
      students: { some: { id: userId } },
    },
  });

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">
            Schedule {classItems.length > 0 && `(${classItems[0].name})`}
          </h1>

          {classItems.length > 0 ? (
            <BigCalendarContainer type="classId" id={classItems[0].id} />
          ) : (
            <p className="text-gray-500 mt-4">
              You are not assigned to any class yet.
            </p>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
