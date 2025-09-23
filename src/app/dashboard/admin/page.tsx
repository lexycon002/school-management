import { getServerSession } from "next-auth";
import Announcements from "@/components/Announcements";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import CountChartContainer from "@/components/CountChartContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

interface PageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const AdminPage = async ({ searchParams }: PageProps) => {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    // Force redirect to login if no session or wrong role
    return <div>Unauthorized</div>;
  }

  const resolvedParams = (await searchParams) || {};
  const filteredSearchParams = Object.fromEntries(
    Object.entries(resolvedParams).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
  );

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="admin" />
          <UserCard type="teacher" />
          <UserCard type="student" />
          <UserCard type="parent" />
        </div>
        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChartContainer />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChartContainer />
          </div>
        </div>
        {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendarContainer searchParams={filteredSearchParams} />
        <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;
