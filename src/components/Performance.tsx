"use client"

import Image from "next/image";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const data = [
    {name: 'Group A', value: 87, fill: "#219ebc"},
    {name: 'Group A', value: 13, fill: "#e09f3e"},
];

const Performance = () => {
    return (
        <div className="bg-white p-4 rounded-md h-80 relative">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Performance</h1>
                <Image src="/moreDark.png" alt="more dark" width={16} height={16}/>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie dataKey="value"
                    startAngle={240}
                    endAngle={0}
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    fill="#8884d8"
                    />
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pt-12">
                <h1 className="text-3xl font-bold">7.5</h1>
                <p className="text-xs text-gray-500">top 5 best</p>
            </div>
            <h2 className="font-bold absolute bottom-3 left-0 right-0 m-auto text-center mt-2">1st Semester - 2nd Semester</h2>
        </div>
    )
}

export default Performance;