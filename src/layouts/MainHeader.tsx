import { FC, PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";

const MainHeader: FC<PropsWithChildren> = () => (
  <header className="flex items-between gap-4 p-4">
    <Image
      src="/herzen.png"
      width={100}
      height={100}
      alt="логотип РГПУ им. А. И. Герцена"
      priority
    />
    <nav className="flex">
      <ul>
        <li>
          <Link href="/">Главная</Link>
        </li>
        <li>
          <Link href="/about">About Us</Link>
        </li>
        <li>
          <Link href="/blog/hello-world">Blog Post</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default MainHeader;