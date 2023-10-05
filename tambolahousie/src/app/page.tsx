import Image from "next/image";
import NumberGenerator from "./NumberGenerator";

export default function Home() {
  return (
    <main className="flex flex-col items-center  p-4">
      <div className="font-bold text-2xl font-sans">
        NUMBER GENERATOR FOR HOUSIE, TAMBOLA and BINGO
      </div>
      <NumberGenerator />
    </main>
  );
}
