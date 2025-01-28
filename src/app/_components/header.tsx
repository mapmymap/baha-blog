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
  });

  const refs = {
    search: useRef<HTMLDivElement>(null),
    input: useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    const query = searchParams.get('query');
    if (query) setState((s) => ({ ...s, searchboxOpen: true }));
  }, [searchParams]);

  useEffect(() => {
    if (!state.searchboxOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!refs.search.current?.contains(e.target as Node)) {
        handleClose();
      }
    };

    const timer = setTimeout(() => refs.input.current?.focus(), 100);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [state.searchboxOpen]);

  const handleSearch = (value: string) => {
    setState((s) => ({
      ...s,
      searchboxValue: value,
      currentPage: pathname !== '/search' ? pathname : s.currentPage,
    }));
    router.push(value ? `/search?query=${value}` : '/search');
  };

  const handleClose = () => {
    setState((s) => ({ ...s, searchboxOpen: false, searchboxValue: '' }));
    if (pathname === '/search') router.push(state.currentPage);
  };

  return (
    <nav
      className={`flex items-center justify-between sticky top-0 z-50 p-4 lg:px-8 
      bg-[#F7F6F5]/80 backdrop-blur-lg mb-4 transition-shadow duration-300
      ${state.searchboxOpen ? 'shadow-md' : 'shadow-none'}`}
    >
      <h2
        className={`transition-opacity duration-300 ${state.searchboxOpen ? 'opacity-0' : 'opacity-100'}`}
      >
        <Link
          href="/"
          className="flex items-end gap-4 text-2xl font-smallcaps font-semibold tracking-wider text-[#45433d]"
        >
          <Image
            src="./assets/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="filter dark:drop-shadow-lg"
            placeholder="empty"
          />
          | Blog
        </Link>
      </h2>

      <div
        ref={refs.search}
        className={`absolute inset-0 p-4 lg:px-8 flex items-center justify-center
          transition-all duration-300 ease-out origin-[calc(100%-54px)_center]
          ${state.searchboxOpen ? 'visible scale-100 opacity-100' : 'invisible scale-50 opacity-0'}`}
      >
        <input
          ref={refs.input}
          value={state.searchboxValue}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search blogs..."
          className="w-full h-full bg-transparent border-none text-lg 
            placeholder:text-gray-500 focus:outline-none focus:ring-0"
        />
        <button
          onClick={handleClose}
          className="m-2 flex items-center justify-center size-10 text-gray-600 rounded-full hover:bg-gray-200 focus:bg-gray-200"
        >
          <MdClose size={24} />
        </button>
      </div>

      <button
        onClick={() => {
          setState((s) => ({ ...s, searchboxOpen: true }));
          handleSearch('');
        }}
        className={`m-2 flex items-center justify-center size-10 text-gray-600 rounded-full hover:bg-gray-200 focus:bg-gray-200
          ${state.searchboxOpen ? 'invisible opacity-0' : 'visible opacity-100'}`}
        aria-label="Search"
      >
        <MdSearch size={24} />
      </button>
    </nav>
  );
};

export default Header;
