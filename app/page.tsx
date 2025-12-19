"use client";

import Image from "next/image";
import Background from "../public/autumn-leaves-falling.gif";
import Editor from "@/components/TextEditor";

export default function Home() {
  return (
    <>
      <Image
        src={Background}
        alt="Autumn Leaves Falling"
        width={1920}
        height={1080}
        className="w-full object-cover h-screen"
      />
      <Editor />
    </>
  );
}
