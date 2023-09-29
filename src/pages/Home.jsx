import Sidebar from "../components/pages/home/ChatSidebar";
import Chats from "../components/pages/home/Chats";

function Home() {
  return (
    <section className="home">
      <div className="container">
        <Sidebar />
        <Chats />
      </div>
    </section>
  );
}

export default Home;
