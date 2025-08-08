const Announcements = () => {
  return (
    <div className='bg-white p-4 rounded-md'>
        <div className="flex items-center justify-between">
            <h1 className="font-semibold text-xl">Announcements</h1>
            <span className="text-blue-500">View all</span>
        </div>
        <div className="flex flex-col gap-4 mt-4">
            <div className="bg-primary p-2 rounded-md p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-white font-semibold">New School Year</h1>
                    <span className="text-white bg-myBrown text-sm rounded-md px-1 py-1">2 days ago</span>
                </div>
                <p className="text-sm text-white mt-2">The new school year will start on September 1st, 2023. Please make sure to complete your registration before the deadline.</p>
            </div>
            <div className="bg-myBrown p-2 rounded-md p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-white font-semibold">Speech from the Vice- Chancellor</h1>
                    <span className="text-white bg-primary text-sm rounded-md px-1 py-1">22 minutes ago</span>
                </div>
                <p className="text-sm text-white mt-2">The vice-chancellor speaks about the indescent dressing among students, vowing that any student caught dressng inappropriately willl face consequence</p>
            </div>
            <div className="bg-primary p-2 rounded-md p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-white font-semibold">Graduating in Styles</h1>
                    <span className="text-white bg-myBrown text-sm rounded-md px-1 py-1">10 minutes ago</span>
                </div>
                <p className="text-sm text-white mt-2">FUOYE Students graduating in styles after one year of strike</p>
            </div>
            <div className="bg-myBrown p-2 rounded-md p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-white font-semibold">Exam time table for freshers</h1>
                    <span className="text-white bg-primary text-sm rounded-md px-1 py-1">20 seconds ago</span>
                </div>
                <p className="text-sm text-white mt-2">The school has announced when the exam will take place advising students to check the official website for more details.</p>
            </div>
        </div>
    </div>
  )
}

export default Announcements