"use server";

import { Song, User } from "@/lib/types";
import { supabaseServer } from "./utils/supabase/server";
import { uploadSongSchema, UploadSongT } from "@/lib/schemas";
import uniqid from "uniqid";
import { revalidatePath } from "next/cache";

export const logOut = async () => {
  const supabase = await supabaseServer();
  await supabase.auth.signOut();
};

export const getUser = async (): Promise<User | null> => {
  const supabase = await supabaseServer();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) {
    console.log(authError);
    return null;
  }
  const authUser = authData.user;
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", authUser.id)
    .single();
  if (error) {
    console.log(error);
    return null;
  }
  return data;
};

export const uploadSong = async (unvalidatedUploadData: unknown) => {
  console.log(unvalidatedUploadData);

  const { error: validateError } = uploadSongSchema.safeParse(
    unvalidatedUploadData
  );
  if (validateError) {
    throw new Error("Invalid upload data (file type or size)");
  }
  const uploadData = unvalidatedUploadData as UploadSongT; // for types after check
  const user = await getUser();
  if (!user) {
    throw new Error("Log in to add a song");
  }
  const supabase = await supabaseServer();
  const uniqueId = uniqid();
  // upload song
  const { data: songData, error: songError } = await supabase.storage
    .from("songs")
    .upload(`song-${uploadData.title}-${uniqueId}`, uploadData.songFile);
  if (songError) {
    throw new Error("Failed to upload song");
  }

  // upload image
  const { data: imageData, error: imageError } = await supabase.storage
    .from("images")
    .upload(`image-${uploadData.title}-${uniqueId}`, uploadData.imageFile);
  if (imageError) {
    throw new Error("Failed to upload image");
  }
  const { error } = await supabase.from("songs").insert({
    user_id: user.id,
    title: uploadData.title,
    author: uploadData.author,
    image_path: imageData.path,
    song_path: songData.path,
  });
  if (error) {
    throw new Error("Failed to insert song");
  }
  revalidatePath("/");
};

export const getSongs = async () => {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    return [];
  }
  return data;
};

export const getSongsById = async () => {
  const user = await getUser();
  if (!user) return;
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error) {
    return;
  }
  return data;
};

export const getSongsByTitle = async (title: string): Promise<Song[]> => {
  const supabase = await supabaseServer();
  if (!title) {
    const allSongs = await getSongs();
    return allSongs;
  }
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`);

  if (error) {
    console.log(error);
    return [];
  }
  return data;
};

export const getLikedSongs = async () => {
  const user = await getUser();
  if (!user) return;
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("liked_songs")
    .select("songs(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error) {
    return;
  }
  return data.map((likedSong: any) => likedSong.songs);
};
