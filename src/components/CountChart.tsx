"use client"

import Image from 'next/image';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';


const data = [
  {
    name: 'Toal',
    count: 106,
    fill: '#fff',
  },
  {
    name: 'Boys',
    count: 55,
    fill: '#219ebc',
  },
  {
    name: 'Girls',
    count: 45,
    fill: '#e09f3e',
  },
];




const CountChart = () => {
  return (
    <div className="bg-white rounded-xl p-4 h-full w-full">
        {/* radial title */}
        <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Students</h1>
            <Image src="/moredark.png" alt="" width={20} height={20} />
        </div>
        {/* radial illustration */}
        <div className="relative w-full h-[75%]">
        <ResponsiveContainer>
            <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={30} data={data}>
              <RadialBar
                  background
                  dataKey="count"/>
            </RadialBarChart>
        </ResponsiveContainer>
        <Image src="/maleFemale.png" alt="" width={50} height={50} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
        </div>
        {/* radial bottom illustration */}
        <div className="flex justify-center gap-16">
            <div className="flex flex-col gap-1">
              <div className="w-5 h-5 bg-secondary rounded-full"/>
              <h1 className="font-bold">1,350</h1>
              <h2 className='text-sm text-gray-500'>Boys (55%)</h2>
            </div>
            <div className="flex flex-col gap-1">
              <div className="w-5 h-5 bg-myBrown rounded-full"/>
              <h1 className="font-bold">1,350</h1>
              <h2 className='text-sm text-gray-500'>Girls (45%)</h2>
            </div>
        </div>
    </div>
  )
}

export default CountChart