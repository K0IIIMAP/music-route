"use client";

import React, { useEffect, useState } from "react";
import qs from "query-string";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { useDebounce } from "@/lib/hooks";
export default function SearchInput({ title }: { title: string }) {
  const [value, setValue] = useState(title || "");
  const debouncedValue = useDebounce(value, 100);
  const router = useRouter();
  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: "/search",
      query: query,
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input
      placeholder="What do you want to listen to?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="input"
    />
  );
}
