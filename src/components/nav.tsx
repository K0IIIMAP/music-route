"use client";

import React, { useState } from "react";
import Button from "./button";
import { FaUserAlt } from "react-icons/fa";
import Link from "next/link";

import { logOut } from "@/app/actions";
import { ModalUp } from "./modal-up";
import { ModalIn } from "./modal-in";
import { User } from "@/lib/types";
const handleLogOut = async () => {
  await logOut(); //action
  location.reload();
  // to stop all the playing songs
};

export default function Nav({ user }: { user: User | null }) {
  const [modalUpOpen, setModalUpOpen] = useState(false);
  const [modalInOpen, setModalInOpen] = useState(false);
  return (
    <nav className="flex justify-between items-center gap-x-4">
      {user ? (
        <div className="flex gap-x-4 items-center">
          <Button onClick={handleLogOut} className="bg-white px-6 py-2">
            Log Out
          </Button>

          <Link href="/account" className="bg-white p-3 rounded-full">
            <FaUserAlt className="text-black" />
          </Link>
        </div>
      ) : (
        <>
          <ModalUp
            modalUpOpen={modalUpOpen}
            setModalUpOpen={setModalUpOpen}
            modalInOpen={modalInOpen}
            setModalInOpen={setModalInOpen}
          />
          <ModalIn
            modalUpOpen={modalUpOpen}
            setModalUpOpen={setModalUpOpen}
            modalInOpen={modalInOpen}
            setModalInOpen={setModalInOpen}
          />
        </>
      )}
    </nav>
  );
}
