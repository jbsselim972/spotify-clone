import Center from "@/components/center";
import Player from "@/components/player";
import Sidebar from "@/components/sidebar";

export default function Home() {
  return (
    <>
      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </>
  );
}
