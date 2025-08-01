import Announcements from "@/components/Announcements"
import BigCalendar from "@/components/BigCalendar"

const TeacherPages = () => {
  return (
    <div className="p-4 flex-1 flex gap-4 flex-col xl:flex-row">
      {/* left */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
            <h1 className="font-semibold text-xl">Schedule </h1>
            <BigCalendar />
        </div>
      </div>
      {/* right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
  </div>    
  )
}

export default TeacherPages