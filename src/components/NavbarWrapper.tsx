// app/components/NavbarWrapper.tsx
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import Navbar from "./Navbar"



export default async function NavbarWrapper() {
  const session = await getServerSession(authOptions)
  return <Navbar session={session} />
}
