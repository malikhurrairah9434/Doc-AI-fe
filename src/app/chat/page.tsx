import Navbar from "@/components/Navbar"
import ChatBox from "@/components/ChatBox"

export default function ChatPage() {
  return (
    <main className="h-screen flex flex-col">
      <Navbar />
      <ChatBox />
    </main>
  )
}
