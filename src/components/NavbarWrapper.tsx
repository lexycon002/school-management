// app/components/NavbarWrapper.tsx
import { getServerSession } from "next-auth"
import Navbar from "./Navbar"
import { authOptions } from "@/lib/authOptions"



export default async function NavbarWrapper() {
  const session = await getServerSession(authOptions)
  return <Navbar session={session} />
}
