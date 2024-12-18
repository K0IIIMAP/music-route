import Header from "@/components/header";
import ListItem from "@/components/list-item";
import { getSongs, getUser } from "../actions";

import PageContent from "@/components/page-content";

export default async function Home() {
  const songs = await getSongs();
  const user = await getUser();

  return (
    <div className="bg-neutral-900 rounded-lg h-screen w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Welcome Back</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4 ">
            <ListItem name="Liked Songs" image="/liked.png" href="/liked" />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-6 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold max-sm:text-center w-full">
            Newest songs
          </h1>
        </div>
        <div>
          <PageContent songs={songs} user={user} />
        </div>
      </div>
    </div>
  );
}
