import Sidebar from "@/components/Sidebar";
import PostFeed from "@/components/PostFeed";

export default function Home() {
  return (
    <div className="text-[#0F1419] min-h-screen 
    border-2 border-black max-w-[1440px] mx-auto
    flex
    ">
      <Sidebar />
      <PostFeed />
    </div>
  );
}
