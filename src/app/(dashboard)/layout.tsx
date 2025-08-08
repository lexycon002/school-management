import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";



// Dashboard layout component
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex">
      {/* left dashboard */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] bg-myBlue2 text-white">
        <Link href="/" className="flex items-center lg:jsutify-start gap-2 p-3">
          <Image src="/logo.png" alt="logo" width={30} height={30} />
          <span className="hidden lg:block font-bold">SchMgt</span>
        </Link>
        <Menu />
      </div>
      {/* right dashboard */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-gray-100 flex flex-col">
        <Navbar />
        <div className="p-4">
          {children}
        </div> 
      </div>
    </div>
  );
}
