import Header from "@/components/header";
import SearchContainer from "@/components/search-container";
import SearchInput from "@/components/search-input";
import React from "react";
import { getSongsByTitle, getUser } from "../actions";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { title: string };
}) {
  const { title } = await searchParams;
  const songs = await getSongsByTitle(title);
  const user = await getUser();

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Search</h1>
          <SearchInput title={title} />
        </div>
      </Header>
      <SearchContainer songs={songs} user={user} />
    </div>
  );
}
