import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* left dasboard */}
        <div className="w[14%] md:w[8%] lg:w-[16%] xl:w-[14%] bg-red-400 text-white">
            <Link href="/" className="flex items-center lg:jsutify-start gap-2 p-3">
              <Image src="/logo.png" alt="logo" width={30} height={30}/>
              <span className="hidden lg:block">SchMgt</span>
            </Link>
            <Menu/>
        </div>
      {/* right dashboard */}
      <div className="w[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-gray-100">
        <Navbar />
      </div>
    </div>

  );
}
