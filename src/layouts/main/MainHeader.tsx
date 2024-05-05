import { FC, PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";

const MainHeader: FC<PropsWithChildren> = () => (
  <header className="flex items-center justify-between gap-4">
    <div className="flex items-center gap-8">
      <Image
        src="/herzen.png"
        width={120}
        height={120}
        alt="логотип РГПУ им. А. И. Герцена"
        priority
      />
      <h1 className="font-space-mono text-4xl">go-through</h1>
    </div>
    <nav>
      <ul className="flex gap-4">
        <li className="text-xl font-light transition-transform hover:scale-105">
          <Link href="/">Главная</Link>
        </li>
        <li className="text-xl font-light transition-transform hover:scale-105">
          <Link href="/theory">Теория</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default MainHeader;
