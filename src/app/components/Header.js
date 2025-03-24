"use client";

import { Button, Navbar, TextInput } from "flowbite-react";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { dark, light } from "@clerk/themes";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FlowbiteProvider from "./Flowbiterovider";

export default function Header() {
  const path = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    router.push(`/search?${searchQuery}`);
  };

  useEffect(() => {
    setMounted(true);
    const urlParams = new URLSearchParams(searchParams);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [searchParams]);
  return (
    <FlowbiteProvider>
      <Navbar className="border-b-2 bg-white dark:bg-gray-900">
        <Link
          href="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            Erica&apos;s
          </span>
          Blog
        </Link>

        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            placeholder="Search..."
            rightIcon={AiOutlineSearch}
            className="text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <Button className="w-12 h-10 lg:hidden" color="gray" pill>
          <AiOutlineSearch />
        </Button>

        <div className="flex gap-2 md:order-2">
          <Button
            className="w-12 h-10 sm:inline cursor-pointer hover:bg-gray-300 hover:text-gray-50 dark:hover:bg-gray-700 transition-colors"
            color="gray"
            pill
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {mounted && (theme === "light" ? <FaSun /> : <FaMoon />)}
          </Button>

          <SignedIn className="cursor-pointer">
            <UserButton
              appearance={{
                baseTheme: theme === "light" ? light : dark,
              }}
              userProfileUrl="/dashboard?tab=profile"
            />
          </SignedIn>

          <SignedOut>
            <Link href="/sign-in">
              <Button
                className="cursor-pointer hover:bg-purple-700 dark:hover:bg-purple-500 transition-colors"
                gradientDuoTone="purpleToBlue"
              >
                Sign In
              </Button>
            </Link>
          </SignedOut>
          <Navbar.Toggle />
        </div>

        <Navbar.Collapse>
          <Link href="/">
            <Navbar.Link
              active={path === "/"}
              as={"div"}
              className="hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
            >
              Home
            </Navbar.Link>
          </Link>

          <Link href="/about">
            <Navbar.Link
              active={path === "/about"}
              as={"div"}
              className="hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
            >
              About
            </Navbar.Link>
          </Link>

          <Link href="/projects">
            <Navbar.Link
              active={path === "/projects"}
              as={"div"}
              className="hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
            >
              Projects
            </Navbar.Link>
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </FlowbiteProvider>
  );
}
