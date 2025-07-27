import Image from "next/image"

const UserCard = ({type} : { type: string}) => {
  return (
    <div className="rounded-2xl odd:bg-myBrown even:bg-secondary p-4 flex-1 min-w-[120px]">
        <div className="flex items-center justify-between">
          <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">2025/26  </span>
          <Image src="/more.png" alt="more" width={20} height={20} className="float-right cursor-pointer"/>
        </div>
        <h1 className="text-2xl font-semibold my-4">1,250</h1>
        <h2 className="capitalize text-sm font-medium text-gray-500">{type}</h2>
    </div>
  )
}

export default UserCard