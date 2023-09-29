import Navbar from "../../global/Navbar";
import Search from "../../global/Search";
import ChatsList from "./ChatsList";

function ChatSidebar() {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />

      <ChatsList />
    </div>
  );
}

export default ChatSidebar;
