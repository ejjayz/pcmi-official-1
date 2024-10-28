"use client"; // Add this line at the top

import { useEffect, useState } from "react";
import SearchField from "@/components/SearchField";
import UserButton from "@/components/UserButton";
import Link from "next/link";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true); // State to track visibility
  const [lastScrollY, setLastScrollY] = useState(0); // State to track last scroll position
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null); // For managing timeout

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Clear the previous timeout to prevent instant hide/show
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    // If scrolling down, hide the navbar immediately
    if (currentScrollY > lastScrollY) {
      setIsVisible(false);
    } 
    // If scrolling up, show the navbar after a short delay
    else {
      setIsVisible(true);
    }

    // Update last scroll position
    setLastScrollY(currentScrollY);

    // Set a timeout to hide the navbar if the user stops scrolling
    setScrollTimeout(setTimeout(() => {
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      }
    }, 0)); // Set a shorter duration for hiding the navbar (50ms)
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout); // Clean up timeout on unmount
      }
    };
  }, [lastScrollY, scrollTimeout]);

  return (
    <header className={`sticky top-0 z-10 bg-card shadow-sm transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3">
        <Link href="/" className="text-2xl font-bold text-primary">
          𝗽𝗰𝗺𝗶  
        </Link>
        <div className="flex-grow max-w-lg">
          <SearchField />
        </div>
        <UserButton className="flex-shrink-0" />
      </div>
    </header>
  );
}
