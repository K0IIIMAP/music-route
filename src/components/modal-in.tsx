"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Button from "./button";
import { ModalProps } from "@/lib/types";
import { supabaseClient } from "@/app/utils/supabase/client";
import { FaGithub } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { logInSchema } from "@/lib/schemas";
import { FieldValues, useForm } from "react-hook-form";
import { logIn } from "@/app/actions";
import { toast } from "sonner";

export function ModalIn({
  setModalUpOpen,
  modalInOpen,
  setModalInOpen,
}: ModalProps) {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(logInSchema) });

  const onSubmit = async (data: FieldValues) => {
    try {
      await logIn(data);
      toast.error("Successful log-in", {
        className: "bg-green-500/15 border-green-400 text-white/80",
      });
    } catch (error) {
      if (!(error instanceof Error)) return;
      toast.error(error.message, {
        className: "bg-red-400/15 border-red-500 text-white/80",
      });
    }
  };
  return (
    <Dialog open={modalInOpen} onOpenChange={setModalInOpen}>
      <DialogTrigger asChild>
        <div>
          <Button onClick={() => {}} className="bg-white px-6 py-2">
            Log In
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-neutral-800  border-none text-white">
        <DialogHeader className="flex items-center w-full">
          <DialogTitle>Welcome Back</DialogTitle>
          <DialogTitle>Log In</DialogTitle>
        </DialogHeader>
        <div className="py-5">
          <Button
            className="py-2 relative bg-neutral-600 text-white/90 rounded-sm border border-white/10"
            onClick={async () => {
              const supabase = supabaseClient();
              await supabase.auth.signInWithOAuth({
                provider: "github",
                options: {
                  redirectTo: `${process.env.NEXT_BASE_URL}/auth/callback`,
                },
              });
            }}
          >
            {" "}
            <FaGithub
              className="absolute left-[30px] top-1/2 -translate-y-1/2 text-white"
              size={25}
            />
            <span>Sign in with GitHub</span>
          </Button>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full h-[0.1px] border border-white/10 mt-10" />{" "}
            {/* line */}
            <div className="flex flex-col py-3 gap-y-3 text-gray-400">
              <div className="space-y-2 relative">
                <Label htmlFor="email">Email Adress</Label>
                <Input
                  placeholder="Your email"
                  id="email"
                  {...register("email")}
                  className="border-white/20 focus:border-white/60 text-white"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm absolute bottom-[-18px]">
                    {`${errors.email.message}`}
                  </p>
                )}
              </div>
              <div className="relative space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  placeholder="Your password"
                  id="password"
                  {...register("password")}
                  className="border-white/20 focus:border-white/60 text-white"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm absolute bottom-[-18px]">
                    {`${errors.password.message}`}
                  </p>
                )}
              </div>
            </div>
            <Button
              className="py-2 bg-neutral-600 text-white/90 rounded-sm border border-green-500/70 mt-5"
              disabled={isSubmitting}
            >
              <span>Log In</span>
            </Button>
          </form>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="text-sm text-neutral-500 font-medium underline hover:text-neutral-300 transition"
            onClick={() => {
              setModalUpOpen(true);
              setModalInOpen(false);
            }}
          >
            Don&apos;t have an account? Sign up
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
