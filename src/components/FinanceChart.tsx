"use client"
import Image from "next/image"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    income: 4000,
    expenses: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    income: 3000,
    expenses: 1398,
    amt: 2210,
  },
  {
    name: 'Mar',
    income: 2000,
    expenses: 9800,
    amt: 2290,
  },
  {
    name: 'April',
    income: 2780,
    expenses: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    income: 1890,
    expenses: 4800,
    amt: 2181,
  },
  {
    name: 'Jun',
    income: 2390,
    expenses: 3800,
    amt: 2500,
  },
  {
    name: "Jul",
    income: 3490,
    expenses: 4300,
    amt: 2100,
  },
  {
    name: "Jul",
    income: 3490,
    expenses: 4300,
    amt: 2100,
  },
  {
    name: "Jul",
    income: 3490,
    expenses: 4300,
    amt: 2100,
  },
  {
    name: "Aug",
    income: 3490,
    expenses: 4300,
    amt: 2100,
  },
  {
    name: "Sep",
    income: 3490,
    expenses: 4300,
    amt: 2100,
  },
  {
    name: "Oct",
    income: 3490,
    expenses: 4300,
    amt: 2100,
  },
  {
    name: "Nov",
    income: 3490,
    expenses: 4300,
    amt: 2100,
  },
  {
    name: "Dec",
    income: 3490,
    expenses: 4300,
    amt: 2100,
  },
];
const FinanceChart = () => {
  return (
    <div className='h-full w-full bg-white rounded-xl p-4'>
        <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Finance</h1>
            <Image src="/moredark.png" alt="" width={20} height={20} />
        </div>
    <ResponsiveContainer width="100%" height="90%">
        <LineChart
        width={500}
        height={300}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#ddd"/>
        <XAxis dataKey="name" axisLine={false} tick={{ fill:"#219ebc"}} tickLine={false} tickMargin={10}/>
        <YAxis axisLine={false} tickMargin={20}/>
        <Tooltip />
        <Legend align="right" verticalAlign="top" wrapperStyle={{paddingTop:"15px", paddingBottom:"25px"}} />
        <Line type="monotone" dataKey="income" stroke="#219ebc" strokeWidth={5}/>
        <Line type="monotone" dataKey="expenses" stroke="#e09f3e" strokeWidth={5}/>
      </LineChart>
    </ResponsiveContainer>
    </div>
  )
}

export default FinanceChart