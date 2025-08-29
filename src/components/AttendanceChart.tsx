"use client"

import Image from 'next/image';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const AttendanceChart = ({
  data,
}: {
  data: { name: string; present: number; absent: number }[];
}) => {
  return (
    <div className='bg-white rounded-xl p-4 h-full'>
        <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Attendance</h1>
            <Image src="/moredark.png" alt="" width={20} height={20} />
        </div>
        <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          data={data}
          barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd"/>
          <XAxis dataKey="name" axisLine={false} tick={{ fill:"#219ebc"}} tickLine={false}/>
          <YAxis axisLine={false} />
          <Tooltip contentStyle={{borderRadius:"10px",borderColor:"lightgray"}}/>
          <Legend align="right" verticalAlign="top" wrapperStyle={{paddingTop:"20px", paddingBottom:"40px"}} />
          <Bar dataKey="present" fill="#219ebc" legendType="circle" radius={[8,8,0,0]} />
          <Bar dataKey="absent" fill="#e09f3e" legendType="circle"  radius={[8,8,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AttendanceChart