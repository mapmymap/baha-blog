'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { MdSearch, MdClose } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [state, setState] = useState({
    searchboxOpen: false,
    searchboxValue: '',
    currentPage: '/',
    isScrolled: false,
  });

  const refs = {
    search: useRef<HTMLDivElement>(null),
    input: useRef<HTMLInputElement>(null),
  };

  // Handle initial search query
  useEffect(() => {
    const query = searchParams.get('query');
    if (query)
      setState((s) => ({
        ...s,
        searchboxOpen: true,
        searchboxValue: query,
      }));
  }, [searchParams]);

  // Handle click outside search box
  useEffect(() => {
    if (!state.searchboxOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!refs.search.current?.contains(e.target as Node)) {
        closeSearchBox();
      }
    };

    const focusTimer = setTimeout(() => refs.input.current?.focus(), 50);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [state.searchboxOpen]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setState((s) => ({
        ...s,
        isScrolled: scrollY > 10,
      }));

      requestAnimationFrame(() => {
        document.documentElement.style.setProperty(
          '--header-height',
          `max(var(--header-height-min), calc(var(--header-height-max) - ${scrollY * 0.2}px))`,
        );
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (value: string) => {
    setState((s) => ({
      ...s,
      searchboxValue: value,
      currentPage: pathname !== '/search' ? pathname : s.currentPage,
    }));
    router.push(value ? `/search?query=${value}` : '/search');
  };

  const closeSearchBox = () => {
    setState((s) => ({
      ...s,
      searchboxOpen: false,
      searchboxValue: '',
    }));
    if (pathname === '/search') router.push(state.currentPage);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[var(--header-height)] backdrop-blur-lg border-b
      transition-colors duration-[var(--easing-duration-short3)] ease-[var(--easing-standard)]
      ${state.isScrolled ? 'bg-[#F7F6F5]/80 border-gray-300/80' : 'bg-transparent border-transparent'}
      ${state.searchboxOpen ? 'shadow-md' : 'shadow-none'}
      `}
    >
      <div className="max-w-7xl mx-auto h-full p-4 lg:px-8 flex items-end justify-between">
        <h2
          className={`h-full transition-opacity duration-300 ${state.searchboxOpen ? 'opacity-0' : 'opacity-100'}`}
        >
          <Link
            href="/"
            className="h-full flex items-end gap-3 text-2xl font-smallcaps font-semibold tracking-wider"
          >
            <Image
              src="./assets/logo.png"
              alt="Baha Travels logo"
              height={50}
              width={50}
              className="h-full w-auto object-contain"
              placeholder="empty"
            />
            <span>/ Blog</span>
          </Link>
        </h2>

        <div
          ref={refs.search}
          className={`
            absolute inset-0 p-4 lg:px-8
            flex items-center justify-center
            transition-all duration-300 ease-[var(--easing-standard)]
            origin-[calc(100%-54px)_center]
            ${state.searchboxOpen ? 'visible scale-100 opacity-100' : 'invisible scale-50 opacity-0'}
          `.trim()}
        >
          <input
            ref={refs.input}
            type="search"
            value={state.searchboxValue}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search blogs..."
            className="w-full h-full bg-transparent border-none text-lg 
              placeholder:text-gray-500 focus:outline-none focus:ring-0"
            aria-label="Search blogs"
          />
          <button
            onClick={closeSearchBox}
            className="m-2 flex items-center justify-center size-10 rounded-full hover:bg-gray-200 focus:bg-gray-200"
          >
            <MdClose size={24} />
          </button>
        </div>

        <button
          onClick={() => {
            setState((s) => ({ ...s, searchboxOpen: true }));
            handleSearch('');
          }}
          className={`flex items-center justify-center h-full w-10 max-h-10 rounded-full hover:bg-gray-200 focus:bg-gray-200
            ${state.searchboxOpen ? 'invisible opacity-0' : 'visible opacity-100'}`}
          aria-label="Search"
        >
          <MdSearch size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Header;
