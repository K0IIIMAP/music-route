"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getUser, uploadSong } from "@/app/actions";
import { User } from "@/lib/types";

import React, { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "./ui/button";

import { toast } from "sonner";

export default function UploadModal() {
  const [user, setUser] = React.useState<User | null>(null);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    const forAsync = async () => {
      const user = await getUser();
      setUser(user);
    };
    forAsync();
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();
  const onSubmit = async (data: FieldValues) => {
    try {
      const { author, title } = data;
      const songFile = data.songFile[0];
      const imageFile = data.imageFile[0];
      const uploadData = { title, author, songFile, imageFile };
      await uploadSong(uploadData);
      setOpen(false);
      reset();
      toast.error("Song uploaded successfully", {
        className: "bg-green-500/15 border-green-400 text-white/80",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          className: "bg-red-400/15 border-red-500 text-white/80",
        });
      } else {
        toast.error("Something went wrong", {
          className: "bg-red-400/15 border-red-500 text-white/80",
        });
      }
    }
  };
  return (
    <>
      <div className="inline-flex items-center gap-x-2">
        <TbPlaylist size={26} className="text-neutral-400" />
        <p className="text-neutral-400 font-medium text-md">Your Library</p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            onClick={(e) => {
              if (!user) {
                e.preventDefault();
                return toast.error("You must be logged in to user library", {
                  className: "bg-red-400/15 border-red-500 text-white/80",
                });
              }
            }}
          >
            <AiOutlinePlus
              size={20}
              className="text-neutral-400 cursor-pointer hover:text-white transition"
            />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-neutral-800  border-none text-white">
          <DialogHeader className="flex items-center w-full">
            <DialogTitle>Add a song</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-5">
              <div className="flex flex-col py-3 gap-y-3 text-gray-400">
                <div className="space-y-2">
                  <Input
                    placeholder="Song title"
                    className="input"
                    {...register("title")}
                    required
                    minLength={3}
                    maxLength={30}
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    placeholder="Song author"
                    className="input"
                    {...register("author")}
                    required
                    minLength={3}
                    maxLength={30}
                  />
                </div>
                <div className="space-y-2 mt-5">
                  <Label htmlFor="songFile" className="text-base text-white/90">
                    Song file
                    <span className="text-[12px] text-slate-500 ml-2">
                      (*** max size 25 mb)
                    </span>
                  </Label>
                  <Input
                    type="file"
                    {...register("songFile")}
                    className="input"
                    accept=".mp3"
                    required
                  />
                </div>
                <div className="space-y-2 mt-5">
                  <Label
                    htmlFor="imageFile"
                    className="text-base text-white/90"
                  >
                    Image File
                    <span className="text-[12px] text-slate-500 ml-2">
                      (*** max size 3 mb)
                    </span>
                  </Label>
                  <Input
                    type="file"
                    {...register("imageFile")}
                    className="input"
                    accept="image/*"
                    required
                  />
                </div>
              </div>
            </div>
            <Button disabled={isSubmitting}>Submit</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
