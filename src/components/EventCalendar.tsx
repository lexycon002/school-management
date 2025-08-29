// "use client"

// import Image from "next/image";
// import { useState } from "react";
// import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';

// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];

// // TEMPORARY DATA
// const events = [
//     {
//         id: 1,
//         title:"Operating System",
//         time: "8:00 AM - 10:00 AM",
//         decription: "Operating System is a course that teaches the fundamentals of operating systems, including process management, memory management, and file systems.",
//     },
//     {
//         id: 2,
//         title:"Biometric",
//         time: "10:00 AM - 12:00 PM",
//         decription: "Biometric is a course that teaches the fundamentals of biometric systems, including fingerprint recognition, facial recognition, and iris recognition.",
//     },
//     {
//         id: 3,
//         title:"Computer Graphics",
//         time: "12:00 PM - 2:00 PM",
//         decription: "Computer Graphics is a course that teaches the fundamentals of computer graphics, including 2D and 3D graphics, rendering techniques, and animation.",
//     },
// ]


// const EventCalendar = () => {

//     const [value, onChange] = useState<Value>(new Date());

//     return (
//         <div className="bg-white p-4 rounded-md">
//             <Calendar onChange={onChange} value={value} />
//             <div className="flex items-center justify-between">
//                 <h1 className="text-xl font-semibold my-4">Events</h1>
//                 <Image src="/moreDark.png" alt="Add Event" width={24} height={24} />
//             </div>
//             <div className="flex flex-col gap-4">
//                 {events.map((event) => (
//                     <div key={event.id} className="p-4 bg-gray-100 rounded-md border-2 border-gray-100 shadow-sm border-t-4 odd:border-t-primary even:border-t-myBrown">
//                         <div className="flex items-center justify-between">
//                             <h1 className="text-lg font-semibold">{event.title}</h1>
//                             <span className="text-sm text-gray-600">{event.time}</span>
//                         </div>
//                         <p className="text-sm text-gray-800 mt-2">{event.decription}</p>
//             </div>
//                 ))}
//         </div>
//         </div>
//     )
// }

// export default EventCalendar

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  const router = useRouter();

  useEffect(() => {
    if (value instanceof Date) {
      router.push(`?date=${value}`);
    }
  }, [value, router]);

  return <Calendar onChange={onChange} value={value} />;
};

export default EventCalendar;
