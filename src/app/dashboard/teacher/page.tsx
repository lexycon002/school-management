import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";


const TeacherPage = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id; 

  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule</h1>
          {userId ? (
            <BigCalendarContainer type="teacherId" id={userId} />
          ) : (
            <p>No teacher ID found</p>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default TeacherPage;
