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

export function ModalIn({
  setModalUpOpen,
  modalInOpen,
  setModalInOpen,
}: ModalProps) {
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
                options: { redirectTo: "http://localhost:3000/auth/callback" },
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
          <div className="w-full h-[0.1px] border border-white/10 mt-10" />{" "}
          {/* line */}
          <div className="flex flex-col py-3 gap-y-3 text-gray-400">
            <div className="space-y-2">
              <Label htmlFor="email">Email Adress</Label>
              <Input
                placeholder="Your email"
                id="email"
                name="email"
                className="border-white/20 focus:border-white/60 text-white"
              ></Input>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                placeholder="Your password"
                id="password"
                name="password"
                className="border-white/20 focus:border-white/60 text-white"
              ></Input>
            </div>
          </div>
          <Button className="py-2 bg-neutral-600 text-white/90 rounded-sm border border-green-500/70 mt-5">
            <span>Log In</span>
          </Button>
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
